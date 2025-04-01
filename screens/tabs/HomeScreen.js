import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createStaticNavigation,
  useNavigation
} from "@react-navigation/native";
import { useState, useEffect } from "react";
import { Button, Text, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      console.log("error in getting data: ", e);
    }
  }

  useEffect(() => {
    getData().then((user) => {
      if (user) {
        setUser(user);
      }
    });
  },[])

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Text style={{fontSize: 32}} >{user ? `Welcome ${user._tokenResponse.email}` : "Welcome"}</Text>
      <Button
        onPress={() => navigation.navigate("Profile")}
        title="Go to Profile"
      >
        Go to Profile
      </Button>
    </View>
  );
}
