import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello.</Text>
      <Link href="/about">Go to About</Link>
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
