import { Text, View, TextInput, Button, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import {
  useNavigation
} from "@react-navigation/native";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 24,
            fontWeight: "medium",
            marginTop: 40
          }}
        >
          Login Screen
        </Text>
      </View>

      <View style={{ flex: 1 }}>
        <TextInput placeholder="Username" style={styles.textInputStyle} />
        <TextInput placeholder="Password" style={styles.textInputStyle} />
        <View style={styles.btnStyle}>
          <Button color="#284798" title="Sign in" />
        </View>
        <Text
          style={{
            color: "gray",
            fontSize: 18,
            textAlign: "center",
            marginVertical: 16
          }}
        >
          Don't have an Account ?{" "}
        </Text>
        <Pressable onPress={() => {
          navigation.navigate("Register");
        }} >
        <Text
          style={{
            color: "#284798",
            fontSize: 18,
            textAlign: "center",
            marginVertical: 8,
            fontWeight: "bold"
          }}
        >
          Create Account{" "}
        </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    padding: 24,
  },
  textInputStyle: {
    borderBottomColor: 'black', borderBottomWidth: 1, marginTop: 16
  },
  btnStyle: {
    marginTop: 16
  }
  });
