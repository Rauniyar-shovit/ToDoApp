import { ThemedView } from "@/components/ThemedView";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
SplashScreen.preventAutoHideAsync();

function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="(authentication)/signIn" />
      <Stack.Screen name="(authentication)/signUp" /> */}
      <Stack.Screen name="verify/[email]" />
    </Stack>
  );
}

export default function RootLayout() {
  const [fontLoaded, fontError] = useFonts({
    "Roboto-Bold": require("@/assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Light": require("@/assets/fonts/Roboto-Light.ttf"),
    "Roboto-ExtraLight": require("@/assets/fonts/Roboto-ExtraLight.ttf"),
    "Roboto-Regular": require("@/assets/fonts/Roboto-Regular.ttf"),
    "Roboto-SemiBold": require("@/assets/fonts/Roboto-SemiBold.ttf"),
  });

  useEffect(() => {
    if (fontLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontLoaded, fontError]);

  if (!fontLoaded && !fontError) {
    return null;
  }

  return (
    <ClerkProvider tokenCache={tokenCache}>
      <ThemedView style={{ flex: 1 }}>
        <StatusBar style="auto" animated />
        <Layout />
      </ThemedView>
    </ClerkProvider>
  );
}
