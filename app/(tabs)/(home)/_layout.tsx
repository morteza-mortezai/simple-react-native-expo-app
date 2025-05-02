import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function HomeLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="surah" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}
