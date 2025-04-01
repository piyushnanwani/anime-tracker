import { Text, View, TextInput, Button, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import {
  useNavigation
} from "@react-navigation/native";
import { auth } from "../firebaseConfig";
import {signInWithEmailAndPassword} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('user', jsonValue)
    } catch (error) {
      console.log("error in storing data: ", error);
    }
  }

  const signInHandler = async () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in: ", user);
      storeData(user);
    } catch (error) {
      console.log("error in logging in: ", error);
    }
  }

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
        <TextInput placeholder="Email" style={styles.textInputStyle} value={email} onChangeText={(v) => setEmail(v) } />
        <TextInput placeholder="Password" style={styles.textInputStyle} value={password} onChangeText={(text)=> setPassword(text)} />
        <View style={styles.btnStyle}>
          <Button color="#284798" title="Sign in" onPress={signInHandler} />
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
