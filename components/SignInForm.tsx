import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { ThemedText } from "./ThemedText";
import PrimaryButton from "./PrimaryButton";
import { Controller, useForm } from "react-hook-form";
import { SignInFields, SignInForm as FormType } from "@/types";

const SignInForm = () => {
  const defaultLoginValues = {
    email: "",
    password: "",
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    defaultValues: defaultLoginValues,
  });

  return (
    // <>
    // <View>
    //   <ThemedText style={{ marginBottom: 10 }}>Email</ThemedText>
    //   <View
    //     style={{
    //       paddingVertical: 9,
    //       paddingHorizontal: 20,
    //       backgroundColor: "#2d3240",
    //       borderRadius: 12,
    //       marginBottom: 24,
    //     }}
    //   >
    //     <TextInput
    //       style={styles.inputText}
    //       placeholder="xyz@gmail.com"
    //       placeholderTextColor={"white"}
    //       keyboardType={"email-address"}
    //     />
    //   </View>
    // </View>

    //   <View>
    //     <ThemedText style={{ marginBottom: 10 }}>Password</ThemedText>
    //     <View
    //       style={{
    //         paddingVertical: 9,
    //         paddingHorizontal: 20,
    //         backgroundColor: "#2d3240",
    //         borderRadius: 12,
    //       }}
    //     >
    //       <TextInput
    //         style={styles.inputText}
    //         placeholder="****"
    //         placeholderTextColor={"white"}
    //         secureTextEntry={true}
    //       />
    //     </View>
    //   </View>
    //   <TouchableOpacity style={{ alignItems: "flex-end" }}>
    //     <ThemedText
    //       style={{
    //         fontFamily: "Roboto-ExtraLight",
    //         fontSize: 15,
    //         marginVertical: 10,
    //       }}
    //     >
    //       Forgot password?
    //     </ThemedText>
    //   </TouchableOpacity>

    //   <View
    //     style={{
    //       marginTop: 90,
    //     }}
    //   >
    //     <PrimaryButton handlePress={() => {}}>Sign In</PrimaryButton>
    //   </View>
    // </>
    <>
      {/* <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <View>
              <ThemedText style={{ marginBottom: 10 }}>Email</ThemedText>
              <View
                style={{
                  paddingVertical: 9,
                  paddingHorizontal: 20,
                  backgroundColor: "#2d3240",
                  borderRadius: 12,
                  marginBottom: 24,
                }}
              >
                <TextInput
                  style={styles.inputText}
                  placeholder="xyz@gmail.com"
                  placeholderTextColor={"gray"}
                  keyboardType={"email-address"}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </View>
            </View>
          </>
        )}
        name={""}
      /> */}
      {/* {errors.email && <Text>This is required.</Text>} */}
    </>
  );
};

export default SignInForm;

const styles = StyleSheet.create({
  inputText: {
    color: "white", // Optional: for visible text
  },
});
