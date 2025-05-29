import { SignInFormType as FormType, SignInFields } from "@/types";
import React from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import PrimaryButton from "../PrimaryButton";
import CustomTextInput from "../Reusable/CustomTextInput";
import { ThemedText } from "../ThemedText";
import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

const SignInForm = () => {
  const defaultLoginValues = {
    email: "",
    password: "",
  };

  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, dirtyFields },
  } = useForm<FormType>({
    mode: "onChange",
    defaultValues: defaultLoginValues,
  });

  const onSignIn = async (data: FormType) => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(auth)/(tabs)");
      } else {
        setError("password", {
          type: "manual",
          message: "Unexpected error occurred. Please try again.",
        });
      }
    } catch (err: any) {
      const clerkError = err?.errors?.[0];

      if (clerkError?.code === "form_password_incorrect") {
        setError("email", {
          type: "manual",
          message: "Incorrect email or password",
        });
        setError("password", {
          type: "manual",
        });
      } else if (clerkError?.code === "form_identifier_not_found") {
        setError("email", {
          type: "manual",
          message: "No account found with this email.",
        });
        setError("password", {
          type: "manual",
        });
      } else {
        setError("password", {
          type: "manual",
          message: "An unexpected error occurred.",
        });
      }
    }
  };
  return (
    <>
      <CustomTextInput<FormType>
        control={control}
        name={SignInFields.EMAIL}
        textInputConfig={{
          placeholder: "xyz@gmail.com",
          keyboardType: "email-address",
        }}
        label={SignInFields.EMAIL}
        validation={{
          pattern: {
            value:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "Please enter a valid email",
          },
        }}
        error={errors[SignInFields.EMAIL]}
        isDirty={dirtyFields[SignInFields.EMAIL]}
      />

      <CustomTextInput<FormType>
        control={control}
        name={SignInFields.PASSWORD}
        textInputConfig={{
          placeholder: "••••••••",
          secureTextEntry: true,
        }}
        label={SignInFields.PASSWORD}
        validation={{
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters",
          },
          maxLength: {
            value: 20,
            message: "Password cannot exceed 20 characters",
          },
        }}
        error={errors[SignInFields.PASSWORD]}
        contentContainerStyles={{ marginBottom: 8 }}
        isDirty={dirtyFields[SignInFields.PASSWORD]}
      />

      <TouchableOpacity style={{ alignItems: "flex-end" }}>
        <ThemedText style={styles.forgotPasswordText}>
          Forgot password?
        </ThemedText>
      </TouchableOpacity>

      <View
        style={{
          marginVertical: 48,
        }}
      >
        <PrimaryButton handlePress={handleSubmit(onSignIn)}>
          Sign In
        </PrimaryButton>
      </View>
    </>
  );
};

export default SignInForm;

const styles = StyleSheet.create({
  forgotPasswordText: {
    fontFamily: "Roboto-ExtraLight",
    fontSize: 15,
  },
});
