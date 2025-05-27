import { SignUpFormType as FormType, SignUpFields } from "@/types";
import React from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import PrimaryButton from "../PrimaryButton";
import CustomTextInput from "../Reusable/CustomTextInput";

const SignUpForm = () => {
  const defaultSingUpValues = {
    email: "",
    password: "",
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({ mode: "onBlur", defaultValues: defaultSingUpValues });

  const onSubmit = (data: any) => console.log(data);

  console.log("Form errors:", errors);

  return (
    <>
      <CustomTextInput<FormType>
        control={control}
        name={SignUpFields.NAME}
        textInputConfig={{
          placeholder: "johndoe123",
        }}
        label={SignUpFields.NAME}
        validation={{
          pattern: {
            value: /^[a-zA-Z\s'-]{2,}$/,
            message: "Please enter a valid name",
          },
        }}
        error={errors[SignUpFields.NAME]}
      />

      <CustomTextInput<FormType>
        control={control}
        name={SignUpFields.EMAIL}
        textInputConfig={{
          placeholder: "xyz@gmail.com",
          keyboardType: "email-address",
        }}
        label={SignUpFields.EMAIL}
        validation={{
          pattern: {
            value:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "Please enter a valid email",
          },
        }}
        error={errors[SignUpFields.EMAIL]}
      />

      <CustomTextInput<FormType>
        control={control}
        name={SignUpFields.PASSWORD}
        textInputConfig={{
          placeholder: "••••••••",
          secureTextEntry: true,
        }}
        label={SignUpFields.PASSWORD}
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
        error={errors[SignUpFields.PASSWORD]}
        contentContainerStyles={{ marginBottom: 8 }}
      />

      <View style={styles.submitBtnContainer}>
        <PrimaryButton handlePress={handleSubmit(onSubmit)}>
          Sign Up
        </PrimaryButton>
      </View>
    </>
  );
};

export default SignUpForm;

const styles = StyleSheet.create({
  submitBtnContainer: {
    marginVertical: 45,
  },
});
