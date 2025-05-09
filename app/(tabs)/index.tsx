import { Image } from "expo-image";
import {
  Platform,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { Link } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useState, useEffect } from "react";
import { Surah } from "@/model/quran";
import { toArabicDigits } from "@/hooks/arabicNumber";

export default function HomeScreen() {
  const [quran, setQuran] = useState<Surah[]>([]);

  useEffect(() => {
    (async () => {
      // dynamic import returns the module, .default is the JSON content
      const mod = await import("../../assets/quran.json");
      setQuran(mod.default.map((item) => ({ ...item, verses: undefined })));
    })();
  }, []);

  if (!quran) {
    return (
      <ActivityIndicator
        size="large"
        style={{ flex: 1, justifyContent: "center" }}
      />
    );
  }

  return (
    // <ParallaxScrollView
    //   headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
    //   headerImage={
    //     <Image
    //       source={require("@/assets/images/partial-react-logo.png")}
    //       style={styles.reactLogo}
    //     />
    //   }
    // >
    //       </ParallaxScrollView>
    <ThemedView style={{ flex: 1 }}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">لیست سوره ها</ThemedText>
      </ThemedView>

      <FlatList
        data={quran}
        initialNumToRender={50} // Render more items initially
        maxToRenderPerBatch={50} // Batch size
        windowSize={10} // How many screens worth of content to render
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item: surah, index }) => (
          <ThemedText style={styles.stepContainer}>
            <Link href={`/surah/${surah.id}`}>
              {toArabicDigits(index + 1)} - {surah.name}(
              {toArabicDigits(surah.total_verses)}
              آیه )
            </Link>
          </ThemedText>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    fontFamily: "ساده",
    paddingRight: 20,
    fontWeight: 600,
    fontSize: 20,
    marginBottom: 30,
    marginTop: 30,
  },
  stepContainer: {
    marginBottom: 24,
    fontFamily: "رنگی",
    paddingRight: 10,
    fontWeight: 600,
    fontSize: 20,
  },
});
