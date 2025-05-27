import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  useColorScheme,
  View,
  ViewStyle,
} from "react-native";
import React, { useState } from "react";
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import { ThemedText } from "../ThemedText";
import { Colors } from "@/constants/Color";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemedView } from "../ThemedView";

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
  error: FieldError | undefined;
  errorTextStyles?: TextStyle;
  contentContainerStyles?: ViewStyle;
  isDirty: boolean | undefined;
};

const CustomTextInput = <T extends FieldValues>({
  control,
  name,
  labelStyles,
  contentContainerStyles,
  inputContainerStyles,
  textInputStyles,
  textInputConfig,
  validation,
  isRequired = true,
  label,
  error,
  errorTextStyles,
  isDirty,
}: CustomTextInputProps<T>) => {
  const colorScheme = useColorScheme();

  const capitalizedLabel =
    (label as string).charAt(0).toUpperCase() +
    (label as string).slice(1).toLowerCase();

  const displayValidationIcons = (
    <>
      {!error && isDirty && (
        <Ionicons
          name="checkmark-circle-sharp"
          size={24}
          color={Colors.success}
        />
      )}

      {error && (
        <Ionicons name="close-circle-sharp" size={24} color={Colors.danger} />
      )}
    </>
  );

  return (
    <Controller
      control={control}
      rules={{
        required: {
          value: isRequired,
          message: `${capitalizedLabel} is required`,
        },
        ...validation,
      }}
      render={({ field: { onChange, onBlur, value } }) => {
        return (
          <View style={[{ marginBottom: 32 }, contentContainerStyles]}>
            <ThemedText style={[{ marginBottom: 10 }, labelStyles]}>
              {capitalizedLabel}
            </ThemedText>
            <ThemedView
              style={[
                styles.inputContainer,
                inputContainerStyles,

                colorScheme === "light"
                  ? {
                      borderColor: Colors.dark.background,
                      borderWidth: 1,
                    }
                  : { backgroundColor: Colors.gray[500], borderWidth: 0 },
              ]}
            >
              <TextInput
                style={[
                  styles.inputText,
                  textInputStyles,
                  {
                    color:
                      colorScheme === "light"
                        ? Colors.light.text
                        : Colors.dark.text,
                  },
                ]}
                placeholderTextColor="gray"
                {...textInputConfig}
                onBlur={() => {
                  onBlur();
                  // setIsInputBlur(true);
                }}
                onChangeText={onChange}
                value={value}
              />

              {displayValidationIcons}
            </ThemedView>
            {error && (
              <ThemedText style={[styles.errorText, errorTextStyles]}>
                {error.message}
              </ThemedText>
            )}
          </View>
        );
      }}
      name={name}
    />
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  inputText: {
    flex: 1,
  },

  inputContainer: {
    paddingVertical: 9,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },

  errorText: {
    color: Colors.danger,
    fontFamily: "Roboto-Light",
    fontSize: 13,
    marginTop: 3,
    marginLeft: 5,
  },
});
