import ImageViewer from "@/components/ImageViewver";
import { useState } from "react";
import Button from "@/components/Button";
import { Text, View, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
const imagePlaceHolder = require("@/assets/images/flower.jpg");

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<undefined | string>(
    undefined
  );
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
    <View style={styles.container}>
      <Text style={styles.text}>Image Viewer</Text>
      <View style={styles.imageContainer}>
        <ImageViewer imageUrl={selectedImage|| imagePlaceHolder} />
      </View>
      <Button label="choose photo" onPress={pickImage} />
    </View>
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
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    padding: 10,
  },
});
