import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  // CheckBox,
  StyleSheet
} from "react-native";
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth } from '../firebaseConfig';

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [isChecked, setIsChecked] = useState(false);


  async function signUpHandler(){
    if (!email || !username || !password || !birthday) {
      alert("Please fill in all fields");
      return;
    }
    // Exception handling
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User created: ", user);
    } catch (error) {
      console.log("error in creating user: ", error);
    }

    setEmail("");
    setUsername("");
    setPassword("");
    setBirthday("");

  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        maxLength={16}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Birthday (YYYY-MM-DD)"
        value={birthday}
        onChangeText={setBirthday}
      />

      {/* <View style={styles.checkboxContainer}>
        <CheckBox value={isChecked} onValueChange={setIsChecked} />
        <Text style={styles.label}>
          I have read and agree to the Terms of Use and Privacy Policy
        </Text>
      </View> */}

      <TouchableOpacity style={styles.button} onPress={signUpHandler}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20
  },
  label: {
    marginLeft: 8
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center"
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  }
});

export default RegisterScreen;
