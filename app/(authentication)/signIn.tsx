import SignInForm from "@/components/Forms/SignInForm";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Color";
import { useRouter } from "expo-router";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignIn = () => {
  const colorScheme = useColorScheme();

  const router = useRouter();

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
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={{ flex: 1, overflow: "hidden" }}>
          <ThemedView style={styles.container}>
            <TouchableOpacity
              style={styles.registerBtn}
              onPress={() => router.push("/(authentication)/signUp")}
            >
              <ThemedText>Register</ThemedText>
            </TouchableOpacity>

            <View
              style={{
                flex: 1,
                justifyContent: "center",
              }}
            >
              <View style={styles.headingContainer}>
                <ThemedText style={styles.headingText}>
                  Sign in to {"\n"}Timesly
                </ThemedText>
                <ThemedText style={{ fontFamily: "Roboto-ExtraLight" }}>
                  Welcome back, you&apos;ve been missed!
                </ThemedText>
              </View>

              <SignInForm />

              <View style={styles.redirectionContainer}>
                <Text
                  style={[
                    styles.haveAccountText,
                    {
                      color:
                        colorScheme === "dark"
                          ? Colors.gray[200]
                          : Colors.light.text,
                    },
                  ]}
                >
                  Don&apos;t have an account?{" "}
                </Text>
                <TouchableOpacity
                  onPress={() => router.replace("/(authentication)/signUp")}
                >
                  <ThemedText style={styles.redirectionText}>
                    Sign Up
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          </ThemedView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 35,
    marginVertical: 20,
  },
  registerBtn: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  headingContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
    marginBottom: 70,
  },
  headingText: {
    paddingVertical: 20,
    fontSize: 35,
    fontFamily: "Roboto-SemiBold",
    lineHeight: 50,
    letterSpacing: 0.05,
  },
  redirectionContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  haveAccountText: {
    fontFamily: "Roboto-ExtraLight",
    fontSize: 14,
  },

  redirectionText: {
    color: Colors.primary,
    fontFamily: "Roboto-Regular",
    fontSize: 14,
  },
});
