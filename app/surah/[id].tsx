import { useLocalSearchParams, useNavigation } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import {
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { useState, useLayoutEffect, useEffect } from "react";
import { Surah } from "@/model/quran";
import { toArabicDigits } from "@/hooks/arabicNumber";
import { SettingsModal } from "@/components/SettingModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function SurahDetail() {
  const { id } = useLocalSearchParams();
  const [surah, setSurah] = useState<Surah | null>(null);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [fontSize, setFontSize] = useState(28);
  const [lineHeight] = useState(fontSize * 2.5);
  const [marginBottom] = useState(fontSize * 0.8);
  const [fontFamily, setFontFamily] = useState("امیری ساده");
  const [translationKey, setTranslationKey] = useState("fa1");
  const [showArabic, setShowArabic] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);

  const colorScheme = useColorScheme();
  const iconColor = colorScheme === "dark" ? "#fff" : "#000";
  function onClosed({
    fontSize,
    fontFamily,
    translationKey,
    showArabic,
    showTranslation,
  }: any) {
    setModalVisible(false);
    setFontSize(fontSize);
    setFontFamily(fontFamily);
    setTranslationKey(translationKey);
    setShowArabic(showArabic);
    setShowTranslation(showTranslation);
  }

  useEffect(() => {
    const loadFontSettings = async () => {
      try {
        const storedFontSize = await AsyncStorage.getItem("fontSize");
        const storedFontFamily = await AsyncStorage.getItem("fontFamily");
        const storedTranslationKey = await AsyncStorage.getItem(
          "translationKey"
        );

        if (storedFontSize) {
          setFontSize(Number(storedFontSize));
        }

        if (storedFontFamily) {
          setFontFamily(storedFontFamily);
        }
        if (storedTranslationKey) {
          setTranslationKey(storedTranslationKey);
        }
      } catch (error) {
        console.error("Failed to load font settings", error);
      }
    };

    loadFontSettings();
  }, []);

  useLayoutEffect(() => {
    (async () => {
      const mod = await import("../../assets/quran.json");
      const found = mod.default.find((s) => s.id.toString() === id);
      if (found) {
        setSurah(found);

        navigation.setOptions({
          // Header LEFT: back + settings
          headerTitle: "",
          headerLeft: () => (
            <ThemedView style={{ flexDirection: "row", alignItems: "center" }}>
              {/* Settings icon */}
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={{ paddingHorizontal: 8 }}
              >
                <ThemedText>تنظیمات</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          ),

          // Header RIGHT: surah name & count
          headerRight: () => (
            <>
              <ThemedView
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                {/* Back button manually */}
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{ paddingRight: 5 }}
                >
                  <IconSymbol
                    name={"chevron.right"}
                    size={35}
                    color={iconColor}
                  />
                </TouchableOpacity>
                <ThemedView style={{ marginRight: 8 }}>
                  <ThemedText
                    style={{
                      fontSize: 16,
                      fontFamily,
                    }}
                  >
                    {found.name}({toArabicDigits(found.total_verses)})
                  </ThemedText>
                </ThemedView>
              </ThemedView>
            </>
          ),
        });
      }
    })();
  }, [id, navigation]);

  if (!surah) {
    return (
      <ActivityIndicator
        size="large"
        style={{ flex: 1, justifyContent: "center", marginTop: 50 }}
      />
    );
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <ThemedView
          style={{
            padding: 16,
          }}
        >
          <ThemedText
            style={{
              fontSize,
              fontFamily,
              lineHeight,
              textAlign: "center",
              marginBottom,
            }}
          >
            بِسْمِ ٱللّٰهِ ٱلرَّحْمٰنِ ٱلرَّحِيمِ
          </ThemedText>
          {/* Display verses if you have them */}
          {surah.verses?.map((verse, idx) => (
            <ThemedView key={idx + "m"} style={{ marginBottom }}>
              {showArabic && (
                <ThemedText
                  style={{
                    fontSize,
                    fontFamily,
                    lineHeight,
                    marginBottom: marginBottom * 0.5,
                  }}
                >
                  {verse.text}﴿{toArabicDigits(idx + 1)}﴾
                </ThemedText>
              )}
              {showTranslation && (
                <ThemedText
                  style={{
                    lineHeight: lineHeight * 0.7,
                    fontSize: fontSize * 0.7,
                  }}
                >
                  {verse[translationKey]} ({toArabicDigits(idx + 1)})
                </ThemedText>
              )}
            </ThemedView>
          ))}
          <ThemedText
            style={{ fontSize: 12, textAlign: "center", color: "green" }}
          >
            با قرائت فاتحه ای سبب شادی روح اموات و درگذشتگانمان شویم.
          </ThemedText>
        </ThemedView>
      </ScrollView>

      <SettingsModal
        visible={modalVisible}
        closed={onClosed}
        fontSize={fontSize}
        fontFamily={fontFamily}
        translationKey={translationKey}
        showArabic={showArabic}
        showTranslation={showTranslation}
      />
    </SafeAreaView>
  );
}
