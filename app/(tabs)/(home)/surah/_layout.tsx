import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function HomeLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="[id]" options={{ headerShown: true ,headerTitle:'نام سوره'}} />
     
      </Stack>
      <StatusBar style="light" />
    </>
  );
}
