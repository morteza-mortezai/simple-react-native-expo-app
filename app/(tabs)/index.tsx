import ImageViewer from "@/components/ImageViewver";
import { useState } from "react";
import Button from "@/components/Button";
import { Text, View, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import EmojiPicker from "@/components/EmojiPicker";
import EmojiList from "@/components/EmojiList";
import EmojiSticker from "@/components/EmojiSticker";
import { ImageSource } from "expo-image";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const imagePlaceHolder = require("@/assets/images/flower.jpg");


export default function Index() {
  const [selectedImage, setSelectedImage] = useState<undefined | string>(
    undefined
  );
  const [selectedEmoji, setSelectedEmoji] = useState<undefined | ImageSource>(
    undefined
  );
  const [isVisible, setIsVisible] = useState<boolean>(false);

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  }
  return (
    <GestureHandlerRootView style={styles.container}>
      <Text style={styles.text}>Image Viewer</Text>
      <View style={styles.imageContainer}>
        <ImageViewer imageUrl={selectedImage || imagePlaceHolder} />
        {selectedEmoji && (
          <EmojiSticker imageSize={40} stickerSource={selectedEmoji} />
        )}
      </View>

      <EmojiPicker isVisible={isVisible} onClose={() => setIsVisible(false)}>
        <>
          <EmojiList
            closeModal={() => setIsVisible(false)}
            onSelect={(emoji) => {
              setSelectedEmoji(emoji);
            }}
          />
        </>
      </EmojiPicker>
      <View style={styles.actionContainer}>
        <Button label="choose photo" onPress={pickImage} />
        <Button label="choose emoji" onPress={() => setIsVisible(true)} />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  imageContainer: {
    position:'relative',
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
