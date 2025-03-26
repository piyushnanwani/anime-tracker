import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createStaticNavigation,
  useNavigation
} from "@react-navigation/native";
import { useState } from "react";
import { Button, Text, View } from "react-native";

export default function SeasonalScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Seasonal Screen</Text>
      <Button
        onPress={() => navigation.navigate("Profile")}
        title="Go to Profile"
      >
        Go to Profile
      </Button>
    </View>
  );
}
