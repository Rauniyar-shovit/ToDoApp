import { SignInFormType as FormType, SignInFields } from "@/types";
import React from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import PrimaryButton from "../PrimaryButton";
import CustomTextInput from "../Reusable/CustomTextInput";
import { ThemedText } from "../ThemedText";

const SignInForm = () => {
  const defaultLoginValues = {
    email: "",
    password: "",
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({ mode: "onBlur", defaultValues: defaultLoginValues });

  const onSubmit = (data: any) => console.log(data);

  console.log("Form errors:", errors);
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
        <PrimaryButton handlePress={handleSubmit(onSubmit)}>
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
