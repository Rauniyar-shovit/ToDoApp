import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import { ThemedText } from "./ThemedText";

type CustomTextInputProps<T extends FieldValues> = {
  control: Control<FieldValues, any, T>;
  name: keyof T;
  labelStyles?: TextStyle;
  inputContainerStyles?: ViewStyle;
  textInputStyles?: TextStyle;
  textInputConfig: TextInputProps;
  validation:
    | Omit<
        RegisterOptions<FieldValues, string>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
      >
    | undefined;
  isRequired: boolean;
};

const CustomTextInput = <T extends FieldValues>({
  control,
  name,
  labelStyles,
  inputContainerStyles,
  textInputStyles,
  textInputConfig,
  validation,
  isRequired = true,
}: CustomTextInputProps<T>) => {
  return (
    <Controller
      control={control}
      rules={{
        required: isRequired,
        ...validation,
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <View>
          <ThemedText style={[{ marginBottom: 10 }, labelStyles]}>
            Email
          </ThemedText>
          <View style={[styles.inputContainer, inputContainerStyles]}>
            <TextInput
              style={[styles.inputText, textInputStyles]}
              {...textInputConfig}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          </View>
        </View>
      )}
      name={name as string}
    />
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  inputText: {
    color: "white", // Optional: for visible text
  },

  inputContainer: {
    paddingVertical: 9,
    paddingHorizontal: 20,
    backgroundColor: "#2d3240",
    borderRadius: 12,
    marginBottom: 24,
  },
});
