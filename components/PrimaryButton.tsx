import { Colors } from "@/constants/Color";
import { Ionicons } from "@expo/vector-icons";
import React, { ReactNode } from "react";
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

type PrimaryButtonProps = {
  btnContainerStyles?: ViewStyle;
  btnTextStyles?: TextStyle;
  children: ReactNode;
  handlePress: () => void;
  iconName?: keyof typeof Ionicons.glyphMap;
};

const PrimaryButton = ({
  btnContainerStyles,
  btnTextStyles,
  children,
  handlePress,
  iconName = "arrow-forward-outline",
}: PrimaryButtonProps) => {
  return (
    <View style={{ alignItems: "center" }}>
      <TouchableOpacity
        style={[styles.btnContainer, btnContainerStyles]}
        onPress={handlePress}
      >
        <Text style={[styles.btnText, btnTextStyles]}>{children} </Text>

        <Ionicons name={iconName} size={18} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: Colors.primary,
    borderRadius: 32,
    paddingHorizontal: 28,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
  },
});
