import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";

const Index = () => {
  const { signOut } = useAuth();
  return (
    <View>
      <Button onPress={() => signOut()} title="Loggout" />

      <Text>Index</Text>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({});
