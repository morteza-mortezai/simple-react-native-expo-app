import { FlatList, Pressable } from "react-native";
import { Image } from "react-native";
interface EmojiListProps {
  onSelect: (emoji: any) => void;
  closeModal: () => void;
}
const EmojiList: React.FC<EmojiListProps> = ({ onSelect, closeModal }) => {
  const list = [
    require("../assets/images/emoji/emoji1.jpeg"),
    require("../assets/images/emoji/emoji2.jpeg"),
    require("../assets/images/emoji/emoji3.jpeg"),
    require("../assets/images/emoji/emoji4.jpeg"),
    require("../assets/images/emoji/emoji5.jpeg"),
    require("../assets/images/emoji/emoji6.jpeg"),
  ];
  return (
    <FlatList
      horizontal
      data={list}
      renderItem={({ item, index }) => (
        <Pressable onPress={() => [onSelect(item),closeModal()]}>
          <Image
            source={item}
            style={{ width: 150, height: 150 }}
            key={index}
          />
        </Pressable>
      )}
    />
  );
};

export default EmojiList;
