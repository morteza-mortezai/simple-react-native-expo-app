    import { Text, View, StyleSheet } from "react-native";
    import { Link } from "expo-router";

    export default function NotFound() {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Page Not Found.</Text>
          <Link style={styles.button} href="/">Go to Home</Link>
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        backgroundColor: "#000",
        flex: 1,
        display:'flex',
        flexDirection:'column',
        justifyContent: 'center' ,
        alignItems: 'center',
      },
      text: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center",
      },
      button:{
        marginTop: 10,
        color: "#000",
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 5,
        flexGrow:0
      }
    });
    