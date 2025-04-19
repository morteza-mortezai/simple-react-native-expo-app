import ImageViewer from "@/components/ImageViewver";
import { useState, useRef, useEffect } from "react";
import Button from "@/components/Button";
import { Text, View, StyleSheet, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import EmojiPicker from "@/components/EmojiPicker";
import EmojiList from "@/components/EmojiList";
import EmojiSticker from "@/components/EmojiSticker";
import { ImageSource } from "expo-image";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as MediaLibrary from "expo-media-library";
const imagePlaceHolder = require("@/assets/images/flower.jpg");
import { captureRef } from "react-native-view-shot";
import domtoimage from "dom-to-image";

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<undefined | string>(
    undefined
  );
  const [selectedEmoji, setSelectedEmoji] = useState<undefined | ImageSource>(
    undefined
  );
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const viewRef = useRef<View>(null);
  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  }
  const [status, requestPermission] = MediaLibrary.usePermissions();
  useEffect(() => {
    if (status === null) {
      requestPermission();
    }
  }, [status]);
  const onSaveImageAsync = async () => {
    if (Platform.OS !== "web") {
      try {
        const localUri = await captureRef(viewRef, { quality: 1 });

        await MediaLibrary.saveToLibraryAsync(localUri);
        if (localUri) {
          alert("image saved");
        }
      } catch (error) {}
    } else {
      try {
        if (viewRef.current) {
          const dataUrl = await domtoimage.toJpeg(viewRef.current, {
            quality: 0.95,

          });
        
          let link = document.createElement("a");
          link.download = "sticker-smash.jpeg";
          link.href = dataUrl;
          link.click();
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
  const Wrapper = Platform.OS === "web" ? "div" : View;

  return (
    <GestureHandlerRootView style={styles.container}>
      <Text style={styles.text}>Image Viewer</Text>
      <View ref={viewRef} style={styles.imageContainer} collapsable={false}>
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
        <Button label="screen shot" onPress={onSaveImageAsync} />
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
