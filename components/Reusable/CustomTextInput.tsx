import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  useColorScheme,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
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
  error,
}: CustomTextInputProps<T>) => {
  const colorScheme = useColorScheme();

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
      render={({ field: { onChange, onBlur, value } }) => {
        return (
          <View>
            <ThemedText style={[{ marginBottom: 10 }, labelStyles]}>
              {capitalizeLabel}
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
                style={[styles.inputText, textInputStyles]}
                placeholderTextColor="gray"
                {...textInputConfig}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />

              {/* {!error && (
              <Ionicons
                name="checkmark-circle-sharp"
                size={24}
                color="#aed4af"
              />
            )}

            {error && (
              <Ionicons name="close-circle-sharp" size={24} color="#ff706e" />
            )} */}
            </ThemedView>
            {error && <ThemedText>{error.message}</ThemedText>}
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
    color: Colors.white,
    flex: 1,
  },

  inputContainer: {
    paddingVertical: 9,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 24,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
