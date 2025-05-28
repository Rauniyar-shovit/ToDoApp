import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import React, { Fragment, useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  isClerkAPIResponseError,
  useSignIn,
  useSignUp,
} from "@clerk/clerk-expo";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { Colors } from "@/constants/Color";
import { FontAwesome6 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import PrimaryButton from "@/components/PrimaryButton";
import { formatTime } from "@/utils";
import { CELL_COUNT, RESEND_INTERVAL } from "@/constants/constants";

const Page = () => {
  const colorScheme = useColorScheme();
  const router = useRouter();

  const [counter, setCounter] = useState(RESEND_INTERVAL);
  const [isDisabled, setIsDisabled] = useState(true);

  const { email } = useLocalSearchParams<{
    email: string;
  }>();

  const [code, setCode] = useState("");
  const { signIn } = useSignIn();

  const { isLoaded, signUp, setActive } = useSignUp();

  // verify
  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  // otp resend counter
  useEffect(() => {
    if (isDisabled && counter > 0) {
      const timer = setInterval(() => {
        setCounter((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }

    if (counter === 0) {
      setIsDisabled(false);
    }
  }, [counter, isDisabled]);

  // handle resend Otp
  const handleResend = async () => {
    // send OTP here
    if (!isLoaded) return;

    try {
      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
    } catch (error) {
      console.error("Error sending verification code:", error);
      if (isClerkAPIResponseError(error)) {
        Alert.alert("Error", error.errors[0].message);
      }
    }

    setIsDisabled(true);
    setCounter(RESEND_INTERVAL);
  };

  // const verifySignIn = async () => {
  //   try {
  //     await signIn?.attemptFirstFactor({ strategy: "email_code", code });

  //     await setActive!({ session: signIn?.createdSessionId });
  //   } catch (error) {
  //     console.log(JSON.stringify(error, null, 2));
  //     if (isClerkAPIResponseError(error)) {
  //       if (error.errors[0].code === "form_identifier_not_found") {
  //         Alert.alert("Error", error.errors[0].message);
  //       }
  //     }
  //   }
  // };

  const verifyCode = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
      if (isClerkAPIResponseError(error)) {
        if (error.errors[0].code === "form_identifier_not_found") {
          Alert.alert("Error", error.errors[0].message);
        }
      }
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          colorScheme === "dark"
            ? Colors.dark.background
            : Colors.light.background,
      }}
    >
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ marginTop: 8 }}
        >
          <FontAwesome6
            name="arrow-left"
            size={24}
            color={colorScheme === "dark" ? Colors.white : Colors.light.text}
          />
        </TouchableOpacity>

        <View style={{ marginBottom: 20 }}>
          <ThemedText style={styles.header}>Verification</ThemedText>
          <ThemedText style={styles.descriptionText}>
            We&apos;ve sent a verification code to your email address{" "}
          </ThemedText>
        </View>

        <CodeField
          ref={ref}
          {...props}
          autoFocus={true}
          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
          value={code}
          onChangeText={setCode}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          testID="my-code-input"
          renderCell={({ index, symbol, isFocused }) => (
            <Fragment key={index}>
              <View
                key={index}
                style={[styles.cellRoot, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}
              >
                <Text style={styles.cellText}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
            </Fragment>
          )}
        />
        <PrimaryButton
          showIcon={false}
          btnContainerStyles={{
            marginVertical: 20,
          }}
          handlePress={verifyCode}
        >
          Continue
        </PrimaryButton>

        <View
          style={{
            flexDirection: "row",
            gap: 4,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ThemedText style={styles.resendText}>Re-send code in</ThemedText>
          <TouchableOpacity disabled={isDisabled} onPress={handleResend}>
            <Text style={{ color: Colors.primary }}>
              {isDisabled ? `${formatTime(counter)}` : "Resend OTP"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 35,
    marginVertical: 20,
  },
  descriptionText: {
    fontSize: 16,
    color: Colors.gray[200],
  },
  codeFieldRoot: {
    marginVertical: 20,
    marginLeft: "auto",
    marginRight: "auto",
    gap: 12,
  },
  cellRoot: {
    width: 42,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.gray[500],
    borderRadius: 10,
  },

  cellText: {
    color: Colors.white,
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Roboto-SemiBold",
  },
  focusCell: {
    borderColor: "white",
    borderWidth: 1,
  },
  header: {
    paddingTop: 24,
    fontSize: 32,
    fontFamily: "Roboto-Regular",
    marginVertical: 24,
  },
  resendText: {
    color: Colors.gray[200],
    fontSize: 16,
    alignSelf: "center",
  },
});
