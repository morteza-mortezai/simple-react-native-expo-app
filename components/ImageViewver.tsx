import React from "react";
import { ImageSourcePropType, Image, StyleSheet } from "react-native";

interface ImageViewerProps {
  imageUrl: ImageSourcePropType;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ imageUrl }) => {
  return <Image source={imageUrl} style={styles.image} resizeMode="contain" />;
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});

export default ImageViewer;
