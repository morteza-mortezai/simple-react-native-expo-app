import {
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Pressable,
  View,
  TextInput,
  useColorScheme,
} from "react-native";
import { useState, useEffect, useMemo, useDeferredValue } from "react";
import { Surah } from "@/model/quran";
import { toArabicDigits } from "@/hooks/arabicNumber";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [quran, setQuran] = useState<Surah[] | null>(null);
  const [search, setSearch] = useState<string>("");
  const deferredSearch = useDeferredValue(search);
  const colorScheme = useColorScheme();

  useEffect(() => {
    (async () => {
      const mod = await import("../../assets/quran.json");
      setQuran(mod.default.map((item) => ({ ...item, verses: undefined })));
    })();
  }, []);

  const filteredQuran = useMemo(
    () => quran?.filter((s) => s.name.includes(deferredSearch)),
    [quran, deferredSearch]
  );

  if (!quran) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  const inputStyle = {
    ...styles.searchInput,
    color: colorScheme === "dark" ? "#fff" : "#000",
    backgroundColor: colorScheme === "dark" ? "#222" : "#fff",
    borderColor: colorScheme === "dark" ? "#555" : "#ccc",
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={styles.container}>
        <TextInput
          style={inputStyle}
          value={search}
          onChangeText={setSearch}
          placeholder="نام سوره..."
          placeholderTextColor={colorScheme === "dark" ? "#aaa" : "#666"}
        />

        {filteredQuran?.length === 0 && (
          <ThemedText style={{ textAlign: "center", marginTop: 20 }}>
            سوره‌ای یافت نشد.
          </ThemedText>
        )}

        <FlatList
          data={filteredQuran}
          initialNumToRender={15}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item: surah, index }) => (
            <Pressable
              style={styles.itemContainer}
              onPress={() => router.push(`/surah/${surah.id}`)}
            >
              <ThemedText style={styles.surahIndex}>
                {" "}
                {toArabicDigits(index + 1)}
              </ThemedText>

              <View style={styles.textRow}>
                <ThemedText style={styles.surahName}>{surah.name}</ThemedText>
                <ThemedText style={styles.surahDetails}>
                  {" "}
                  ({toArabicDigits(surah.total_verses)} آیه)
                </ThemedText>
              </View>
            </Pressable>
          )}
        />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    padding: 5,
    marginHorizontal: 20,
    marginBottom: 10,
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 18,
    textAlign: "right", // optional for RTL
    writingDirection: "rtl",
  },
  container: {
    paddingTop: 20,
    flex: 1,
    paddingVertical: 12,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  surahIndex: {
    fontSize: 18,
    fontFamily: "امیری ساده",
    // width: 45,
    textAlign: "center",
  },
  textContainer: {
    flexGrow: 1,
    flex: 1,
    justifyContent: "space-between",
  },

  textRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "baseline",
  },

  surahName: {
    fontSize: 20,
    fontFamily: "امیری ساده",
    fontWeight: "600",
  },

  surahDetails: {
    fontSize: 16,
    fontFamily: "امیری ساده",
    // color: "#888", // lighter grey
    fontWeight: "400",
  },
});
