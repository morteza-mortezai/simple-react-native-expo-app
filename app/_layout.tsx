import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    "امیری رنگی": require("../assets/fonts/AmiriQuran-Regular.ttf"),
    "امیری ساده": require("../assets/fonts/Amiri-Regular.ttf"),
    القلم: require("../assets/fonts/Al-Qalam-Quran-Majeed-Web-Regular.ttf"),
    شهراز: require("../assets/fonts/ScheherazadeNew-Regular.ttf"),
    لطیف: require("../assets/fonts/Lateef-Regular.ttf"),
    میرزا: require("../assets/fonts/Mirza-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="surah" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar />
    </ThemeProvider>
  );
}
