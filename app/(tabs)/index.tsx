import ImageViewer from "@/components/ImageViewver";
import { Text, View, StyleSheet } from "react-native";
const imagePlaceHolder =require('@/assets/images/flower.jpg');

export default function Index() {
  return (
    <View style={styles.container}>ads
      <Text style={styles.text}>Image Viewer</Text>
      <View style={styles.imageContainer}>
        <ImageViewer imageUrl={imagePlaceHolder} />
      </View>
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
    alignItems: "center",
    padding:10
  },
});
