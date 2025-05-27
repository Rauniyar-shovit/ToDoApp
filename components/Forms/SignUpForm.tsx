import { SignUpFormType as FormType, SignUpFields } from "@/types";
import React from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import PrimaryButton from "../PrimaryButton";
import CustomTextInput from "../Reusable/CustomTextInput";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

const SignUpForm = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const defaultSingUpValues = {
    email: "",
    password: "",
    name: "",
  };

  const {
    control,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<FormType>({
    mode: "onChange",
    defaultValues: defaultSingUpValues,
  });

  const onSignUpPress = async (data: any) => {
    if (!isLoaded) return;

    try {
      console.log("SignUp data:", data);

      await signUp.create({
        emailAddress: data.email,
        password: data.password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      router.push({
        pathname: "/verify/[email]",
        params: { email: data.email },
      });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      // setPendingVerification(true);
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
    console.log(data);
  };

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
        isDirty={dirtyFields[SignUpFields.NAME]}
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
        isDirty={dirtyFields[SignUpFields.EMAIL]}
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
        isDirty={dirtyFields[SignUpFields.PASSWORD]}
        contentContainerStyles={{ marginBottom: 8 }}
      />

      <View style={styles.submitBtnContainer}>
        <PrimaryButton handlePress={handleSubmit(onSignUpPress)}>
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
