import {
  StyleSheet,
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
  Path,
  RegisterOptions,
} from "react-hook-form";
import { ThemedText } from "../ThemedText";
import { Colors } from "@/constants/Color";

type CustomTextInputProps<T extends FieldValues> = {
  control: Control<T, any, T>;
  name: Path<T>;
  labelStyles?: TextStyle;
  inputContainerStyles?: ViewStyle;
  textInputStyles?: TextStyle;
  textInputConfig?: TextInputProps;
  validation?:
    | Omit<
        RegisterOptions<T, Path<T>>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
      >
    | undefined;
  isRequired?: boolean;
  label: keyof T;
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
  label,
}: CustomTextInputProps<T>) => {
  const capitalizeLabel =
    (label as string).charAt(0).toUpperCase() +
    (label as string).slice(1).toLowerCase();

  return (
    <Controller
      control={control}
      rules={{
        required: {
          value: isRequired,
          message: `${capitalizeLabel} is required`,
        },
        ...validation,
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <View>
          <ThemedText style={[{ marginBottom: 10 }, labelStyles]}>
            {capitalizeLabel}
          </ThemedText>
          <View style={[styles.inputContainer, inputContainerStyles]}>
            <TextInput
              style={[styles.inputText, textInputStyles]}
              placeholderTextColor="gray"
              {...textInputConfig}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          </View>
        </View>
      )}
      name={name}
    />
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  inputText: {
    color: Colors.white,
    fontFamily: "Roboto-Light",
  },

  inputContainer: {
    paddingVertical: 9,
    paddingHorizontal: 20,
    backgroundColor: "#2d3240",
    borderRadius: 12,
    marginBottom: 24,
  },
});
