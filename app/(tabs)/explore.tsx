import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabTwoScreen() {
  return (
    <SafeAreaView>
      <ThemedText style={{ padding: 45, textAlign: "center" }}>
        برای شادی روح تمامی درگذشتگان و اموات، فاتحه‌ای قرائت کنیم.
      </ThemedText>
    </SafeAreaView>
  );
}
