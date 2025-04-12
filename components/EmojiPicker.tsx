import React from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import Button from "./Button";
interface EmojiPickerProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactElement;
}
const EmojiPicker: React.FC<EmojiPickerProps> = ({
  isVisible,
  onClose,
  children,
}) => (
  <View>
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Text>Select</Text>
          <Button onPress={onClose} label="close" />
        </View>

        <View>{children}</View>
      </View>
    </Modal>
  </View>
);
export default EmojiPicker;

const styles = StyleSheet.create({
  modalContent: {
    height: "25%",
    width: "100%",
    backgroundColor: "#25292e",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: "absolute",
    bottom: 0,
  },
  titleContainer: {
    // height: "16%",
    backgroundColor: "#464C55",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "#fff",
    fontSize: 16,
  },
});
