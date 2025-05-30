import {
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Pressable,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import { useState, useEffect, useMemo, useDeferredValue } from "react";
import { Surah } from "@/model/quran";
import { toArabicDigits } from "@/hooks/arabicNumber";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";

export default function HomeScreen() {
  const [quran, setQuran] = useState<Surah[] | null>(null);
  const [search, setSearch] = useState<string>("");
  const deferredSearch = useDeferredValue(search);

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

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={{ paddingEnd: 20, marginBottom: 6 }}>جستجو</ThemedText>
      <TextInput
        style={styles.searchInput}
        value={search}
        onChangeText={setSearch}
      />

      {filteredQuran?.length === 0 && (
        <ThemedText style={{ textAlign: "center", marginTop: 20 }}>
          سوره‌ای یافت نشد.
        </ThemedText>
      )}
      <ScrollView>
        <FlatList
          data={filteredQuran}
          initialNumToRender={15}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item: surah, index }) => (
            <Pressable
              style={({ pressed }) => [
                styles.itemContainer,
                pressed && { backgroundColor: "#f0f0f0" },
              ]}
              onPress={() => router.push(`/surah/${surah.id}`)}
            >
              <ThemedText style={styles.surahIndex}>
                . {toArabicDigits(index + 1)}
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
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    padding: 5,
    marginHorizontal: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    fontSize: 18,
    textAlign: "right", // optional for RTL
    writingDirection: "rtl",
    color: "white",
  },
  container: {
    paddingTop: 50,
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
    width: 40,
    textAlign: "center",
  },
  textContainer: {
    flexGrow: 1,
    flex: 1,
    justifyContent: "space-between",
  },

  separator: {
    height: 1,
    backgroundColor: "#888",
    marginHorizontal: 20,
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
    color: "#888", // lighter grey
    fontWeight: "400",
  },
});
