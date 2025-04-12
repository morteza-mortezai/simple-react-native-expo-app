import React from "react";
import { ImageSourcePropType, Image, StyleSheet } from "react-native";

interface ImageViewerProps {
  imageUrl: ImageSourcePropType | string;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ imageUrl }) => {
  const source = typeof imageUrl === "string" ? { uri: imageUrl } : imageUrl;
  return <Image source={source} style={styles.image} resizeMode="contain" />;
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImageViewer;
