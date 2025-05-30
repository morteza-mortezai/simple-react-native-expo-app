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

export function SettingsModal({
  visible,
  onClose,
  fontSize,
  setFontSize,
  fontFamily,
  setFontFamily,
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
