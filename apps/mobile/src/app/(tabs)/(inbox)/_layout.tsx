import { Stack } from "expo-router";

export default function InboxLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: "Messages",
        contentStyle: { backgroundColor: "white" },
      }}
    />
  );
}
