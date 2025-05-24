import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Color";
import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignIn = () => {
  const colorScheme = useColorScheme();

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
      <ThemedView style={styles.container}>
        <TouchableOpacity style={styles.registerBtn}>
          <ThemedText>Register</ThemedText>
        </TouchableOpacity>

        <View style={styles.headingContainer}>
          <ThemedText style={styles.headingText}>
            Sign in to {"\n"}Timesly
          </ThemedText>
          <ThemedText style={{ fontFamily: "Roboto-ExtraLight" }}>
            Welcome back, you&apos;ve been missed!
          </ThemedText>
        </View>
      </ThemedView>
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
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  headingText: {
    paddingVertical: 20,
    fontSize: 35,
    fontFamily: "Roboto-SemiBold",
    lineHeight: 50,
    letterSpacing: 0.2,
  },
});
