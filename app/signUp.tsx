import SignUpForm from "@/components/Forms/SignUpForm";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Color";
import { useRouter } from "expo-router";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUp = () => {
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1, overflow: "hidden" }}>
            <ThemedView style={styles.container}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                }}
              >
                <View style={styles.headingContainer}>
                  <ThemedText style={styles.headingText}>
                    Create your {"\n"}Timesly account
                  </ThemedText>
                  <ThemedText style={{ fontFamily: "Roboto-ExtraLight" }}>
                    Your time matters — let&apos;s make the most of it
                  </ThemedText>
                </View>

                {/* sign up form */}
                <SignUpForm />

                {/* redirection  */}
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
                    Already have an account?{" "}
                  </Text>
                  <TouchableOpacity onPress={() => router.replace("/signIn")}>
                    <ThemedText style={styles.redirectionText}>
                      Log in
                    </ThemedText>
                  </TouchableOpacity>
                </View>
              </View>
            </ThemedView>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;

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
    marginBottom: 42,
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
