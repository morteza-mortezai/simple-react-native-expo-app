import { Modal, TouchableOpacity } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const saveValue = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error("Error saving to storage:", error);
  }
};

const fontFamilies = [
  "امیری ساده",
  "امیری رنگی",
  "روبیک",
  "پلی پن",
  "شهراز",
  "لطیف",
  "میرزا",
  "کتیبه",
  "القلم",
]; // Update with your actual loaded fonts

const translations = [
  {
    name: "مهدی الهی قمشه ای",
    key: "fa1",
  },
  {
    name: "فولادوند",
    key: "fa2",
  },
];

export function SettingsModal({
  visible,
  onClose,
  fontSize,
  setFontSize,
  fontFamily,
  setFontFamily,
  setTranslationKey,
  translationKey,
  showArabic,
  setShowArabic,
  showTranslation,
  setShowTranslation,
}) {
  const [fontIndex, setFontIndex] = useState(0);

  const increaseFont = () =>
    setFontSize((s) => {
      const size = Math.min(s + 2, 40);
      saveValue("fontSize", size + "");
      return size;
    });

  const decreaseFont = () =>
    setFontSize((s) => {
      const size = Math.max(s - 2, 10);
      saveValue("fontSize", size + "");
      return size;
    });

  const cycleFont = () => {
    const nextIndex = (fontIndex + 1) % fontFamilies.length;
    setFontIndex(nextIndex);
    setFontFamily(fontFamilies[nextIndex]);
    saveValue("fontFamily", fontFamilies[nextIndex]);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <ThemedView
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.3)",
        }}
      >
        <ThemedView
          style={{
            margin: 24,
            padding: 20,
            borderRadius: 12,
            elevation: 5,
          }}
        >
          <ThemedText
            style={{
              fontWeight: "bold",
              fontSize: 18,
              marginBottom: 16,
              textAlign: "center",
            }}
          >
            تنظیمات متن
          </ThemedText>

          {/* Font Size Controls */}
          <ThemedView
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              marginVertical: 16,
            }}
          >
            <TouchableOpacity onPress={decreaseFont}>
              <ThemedText style={{ fontSize: 24 }}>➖</ThemedText>
            </TouchableOpacity>
            <ThemedText style={{ fontSize: 18 }}>{fontSize}</ThemedText>
            <TouchableOpacity onPress={increaseFont}>
              <ThemedText style={{ fontSize: 24 }}>➕</ThemedText>
            </TouchableOpacity>
          </ThemedView>

          {/* Font Family Switcher */}

          <TouchableOpacity
            onPress={cycleFont}
            style={{
              backgroundColor: "blue",
              paddingVertical: 10,
              borderRadius: 8,
              marginBottom: 10,
            }}
          >
            <ThemedText style={{ color: "white", textAlign: "center" }}>
              تغییر فونت ({fontFamily})
            </ThemedText>
          </TouchableOpacity>

          {translations.map((t) => (
            <TouchableOpacity
              key={t.key}
              onPress={async () => {
                setTranslationKey(t.key);
                await AsyncStorage.setItem("translationKey", t.key);
              }}
              style={{
                padding: 10,
                backgroundColor: translationKey === t.key ? "#4CAF50" : "#ddd",
                borderRadius: 6,
                marginBottom: 6,
              }}
            >
              <ThemedText
                style={{
                  color: translationKey === t.key ? "white" : "black",
                }}
              >
                ترجمه &nbsp;
                {t.name}
              </ThemedText>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            onPress={async () => {
              const value = !showArabic;
              setShowArabic(value);
              await AsyncStorage.setItem("showArabic", value.toString());
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 4,
            }}
          >
            <ThemedText style={{ fontSize: 16 }}>
              {showArabic ? "☑" : "☐"}
            </ThemedText>
            <ThemedText style={{ marginLeft: 8 }}>نمایش متن عربی</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={async () => {
              const value = !showTranslation;
              setShowTranslation(value);
              await AsyncStorage.setItem("showTranslation", value.toString());
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 4,
            }}
          >
            <ThemedText style={{ fontSize: 16 }}>
              {showTranslation ? "☑" : "☐"}
            </ThemedText>
            <ThemedText style={{ marginLeft: 8 }}>نمایش ترجمه</ThemedText>
          </TouchableOpacity>

          {/* Close */}

          <TouchableOpacity
            onPress={onClose}
            style={{
              backgroundColor: "red",
              paddingVertical: 10,
              borderRadius: 8,
            }}
          >
            <ThemedText style={{ color: "white", textAlign: "center" }}>
              خروج
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </Modal>
  );
}
