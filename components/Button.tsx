import { Pressable, View, Text,StyleSheet } from "react-native";
interface ButtonProps {
  label: string;
  onPress: () => void;
}
const Button: React.FC<ButtonProps> = ({ label, onPress }) => {
  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.buttonText} onPress={() => onPress()}>
        <Text style={styles.label}>{label}</Text>
      </Pressable>
    </View>
  );
};
const styles=StyleSheet.create({
    buttonContainer:{

        padding: 10,
        backgroundColor: "#007BFF",
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        width: '100%',
    },
    label: {
        
        textAlign:'center',
        fontSize: 14,
        color: "#fff",
    },
})
export default Button;
