import ImageViewer from "@/components/ImageViewver";
import { Link } from "expo-router";
import { useState, useRef, useEffect } from "react";
import Button from "@/components/Button";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
// import quranData from "../../assets/quran.json";

import { Surah } from "@/model/quran";

export default function Index() {
  const [quran, setQuran] = useState<Surah[]>([]);

  useEffect(() => {
    (async () => {
      // dynamic import returns the module, .default is the JSON content
      const mod = await import("../../../assets/quran.json");
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
    <View style={styles.container}>
      <FlatList
        data={quran}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item: surah, index }) => (
          <View style={{ marginBottom: 24 }}>
            <Link href={`/(tabs)/surah/${surah.id}`}>
              {index + 1}-{surah.name}({surah.total_verses}
              آیه )
            </Link>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#000",
    direction: "rtl",
    flex: 1,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  imageContainer: {
    position: "relative",
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    padding: 10,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
});
