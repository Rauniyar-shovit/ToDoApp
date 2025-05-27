import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import {
  isClerkAPIResponseError,
  useSignIn,
  useSignUp,
} from "@clerk/clerk-expo";
// import { defaultStyles } from "@/constants/Styles";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { Colors } from "@/constants/Color";
import { FontAwesome6 } from "@expo/vector-icons";
// import Colors from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
const CELL_COUNT = 6;

const Page = () => {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { email, signIn: signin } = useLocalSearchParams<{
    email: string;
    signIn?: string;
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

  //   useEffect(() => {
  //     console.log(code.length);
  //     if (code.length === 6) {
  //       if (signin === "true") {
  //         verifySignIn();
  //       } else {
  //         verifyCode();
  //       }
  //     }
  //   }, [code, signIn]);

  //   const verifySignIn = async () => {
  //     try {
  //       await signIn?.attemptFirstFactor({ strategy: "email_code", code });

  //       await setActive!({ session: signIn?.createdSessionId });
  //     } catch (error) {
  //       console.error(JSON.stringify(error, null, 2));
  //       if (isClerkAPIResponseError(error)) {
  //         if (error.errors[0].code === "form_identifier_not_found") {
  //           Alert.alert("Error", error.errors[0].message);
  //         }
  //       }
  //     }
  //   };

  //   const verifyCode = async () => {
  //     try {
  //       await signUp?.attemptEmailAddressVerification({ code });

  //       await setActive!({ session: signUp?.createdSessionId });
  //     } catch (error) {
  //       console.error(JSON.stringify(error, null, 2));
  //       if (isClerkAPIResponseError(error)) {
  //         if (error.errors[0].code === "form_identifier_not_found") {
  //           Alert.alert("Error", error.errors[0].message);
  //         }
  //       }
  //     }
  //   };

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

        <ThemedText style={styles.header}> Verification</ThemedText>
        <Text style={styles.descriptionText}>
          Code sent to {email} unless you already have an account.
        </Text>
        <CodeField
          ref={ref}
          {...props}
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

              {index === 2 ? (
                <View
                  key={`separator-${index}`}
                  style={styles.separator}
                ></View>
              ) : (
                <></>
              )}
            </Fragment>
          )}
        />
        <Link href="/(authentication)/signIn" replace asChild>
          <TouchableOpacity>
            <Text style={styles.textLink}>Already have an account? Log in</Text>
          </TouchableOpacity>
        </Link>
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
    fontSize: 18,
    marginTop: 20,
    color: Colors.gray[500],
  },
  codeFieldRoot: {
    marginVertical: 20,
    marginLeft: "auto",
    marginRight: "auto",
    gap: 12,
  },
  cellRoot: {
    width: 45,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.gray[500],
    borderRadius: 8,
  },
  cellText: { color: "#000", fontSize: 36, textAlign: "center" },
  focusCell: {
    borderColor: "#000",
  },
  separator: {
    height: 2,
    width: 10,
    backgroundColor: Colors.gray[500],
    alignSelf: "center",
  },

  header: {
    paddingVertical: 40,
    backgroundColor: "blue",
    fontSize: 48,
    fontFamily: "Roboto-SemiBold",
    marginVertical: 32,
  },
  textLink: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: "500",
  },
});
