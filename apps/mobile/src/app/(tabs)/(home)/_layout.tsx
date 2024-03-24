import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: "white" },
      }}
    >
      <Stack.Screen name="index" options={{ headerTitle: "Home" }} />
      <Stack.Screen
        name="post"
        options={{ presentation: "modal", headerShown: false }}
      />
    </Stack>
  );
}
