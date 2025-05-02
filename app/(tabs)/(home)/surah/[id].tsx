import { Text, View, StyleSheet } from "react-native";

export default function Surah() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Surah page.</Text>
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
});
