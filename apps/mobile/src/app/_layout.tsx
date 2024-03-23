import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { Stack } from "expo-router/stack";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "PlusJakartaSans-Bold": require("./../../assets/fonts/PlusJakartaSans-Bold.ttf"),
    "PlusJakartaSans-Regular": require("./../../assets/fonts/PlusJakartaSans-Regular.ttf"),
    "PlusJakartaSans-Light": require("./../../assets/fonts/PlusJakartaSans-Light.ttf"),
    "PlusJakartaSans-Medium": require("./../../assets/fonts/PlusJakartaSans-Medium.ttf"),
    "PlusJakartaSans-SemiBold": require("./../../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
