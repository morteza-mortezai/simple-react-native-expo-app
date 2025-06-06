import { Modal, TouchableOpacity } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IconSymbol } from "./ui/IconSymbol";

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
  "شهراز",
  "لطیف",
  "میرزا",
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
  closed,
  fontSize,
  fontFamily,
  translationKey,
  showArabic,
  showTranslation,
}: any) {
  const [fontIndex, setFontIndex] = useState(0);
  const [modalFontSize, setModalFontSize] = useState(fontSize);
  const [modalFontFamily, setModalFontFamily] = useState(fontFamily);
  const [modalTranslationKey, setModalTranslationKey] =
    useState(translationKey);
  const [modalshowArabic, setModalshowArabic] = useState(showArabic);
  const [modalshowTranslation, setModalshowTranslation] =
    useState(showTranslation);

  const increaseFont = () =>
    setModalFontSize((s) => {
      const size = Math.min(s + 2, 40);
      saveValue("fontSize", size + "");
      return size;
    });

  const decreaseFont = () =>
    setModalFontSize((s) => {
      const size = Math.max(s - 2, 10);
      saveValue("fontSize", size + "");
      return size;
    });

  const cycleFont = () => {
    const nextIndex = (fontIndex + 1) % fontFamilies.length;
    setFontIndex(nextIndex);
    setModalFontFamily(fontFamilies[nextIndex]);
    saveValue("fontFamily", fontFamilies[nextIndex]);
  };
  function onClose() {
    closed({
      fontSize: modalFontSize,
      fontFamily: modalFontFamily,
      translationKey: modalTranslationKey,
      showArabic: modalshowArabic,
      showTranslation: modalshowTranslation,
    });
  }
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
            padding: 10,
            borderRadius: 12,
            elevation: 5,
          }}
        >
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
              <ThemedText style={{ fontSize: 24 }}>
                <IconSymbol name="minus" size={35} color={"red"} />
              </ThemedText>
            </TouchableOpacity>
            <ThemedText style={{ fontSize: 18 }}>
              اندازه قلم ({modalFontSize})
            </ThemedText>
            <TouchableOpacity onPress={increaseFont}>
              <ThemedText style={{ fontSize: 24 }}>
                <IconSymbol name="plus" size={35} color={"green"} />
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>

          {/* Font Family Switcher */}

          <ThemedView
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              marginVertical: 16,
            }}
          >
            <TouchableOpacity onPress={cycleFont}>
              <ThemedText>
                <IconSymbol name="arrow.right" size={45} color={"blue"} />
              </ThemedText>
            </TouchableOpacity>
            <ThemedText style={{ fontSize: 18 }}>
              تغییر قلم ({modalFontFamily})
            </ThemedText>
            <TouchableOpacity onPress={cycleFont}>
              <ThemedText>
                <IconSymbol name="arrow.left" size={45} color={"blue"} />
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>

          <ThemedView style={{ marginBottom: 22 }}>
            <ThemedText
              style={{
                fontSize: modalFontSize,
                textAlign: "center",
                fontFamily: modalFontFamily,
                lineHeight: 50,
              }}
            >
              بِسْمِ ٱللّٰهِ ٱلرَّحْمٰنِ ٱلرَّحِيمِ
            </ThemedText>
          </ThemedView>

          {translations.map((t) => (
            <TouchableOpacity
              key={t.key}
              onPress={async () => {
                setModalTranslationKey(t.key);
                await AsyncStorage.setItem("translationKey", t.key);
              }}
              style={{
                padding: 10,
                backgroundColor:
                  modalTranslationKey === t.key ? "#4CAF50" : "#ddd",
                borderRadius: 6,
                marginBottom: 6,
              }}
            >
              <ThemedText
                style={{
                  color: modalTranslationKey === t.key ? "white" : "black",
                }}
              >
                ترجمه &nbsp;
                {t.name}
              </ThemedText>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            onPress={async () => {
              const value = !modalshowArabic;
              setModalshowArabic(value);
              await AsyncStorage.setItem("showArabic", value.toString());
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 4,
            }}
          >
            <ThemedText style={{ fontSize: 16 }}>
              {modalshowArabic ? "☑" : "☐"}
            </ThemedText>
            <ThemedText style={{ marginLeft: 8 }}>نمایش متن عربی</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={async () => {
              const value = !modalshowTranslation;
              setModalshowTranslation(value);
              await AsyncStorage.setItem("showTranslation", value.toString());
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 4,
            }}
          >
            <ThemedText style={{ fontSize: 16 }}>
              {modalshowTranslation ? "☑" : "☐"}
            </ThemedText>
            <ThemedText style={{ marginLeft: 8 }}>نمایش ترجمه</ThemedText>
          </TouchableOpacity>

          {/* Close */}

          <TouchableOpacity
            onPress={onClose}
            style={{
              backgroundColor: "green",
              paddingVertical: 10,
              borderRadius: 8,
            }}
          >
            <ThemedText style={{ color: "white", textAlign: "center" }}>
              تایید
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </Modal>
  );
}
