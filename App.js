import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/tabs/HomeScreen";
import DiscussionScreen from "./screens/tabs/DiscussionScreen";
import DiscoverScreen from "./screens/tabs/DiscoverScreen";
import SeasonalScreen from "./screens/tabs/SeasonalScreen";
import MyListScreen from "./screens/tabs/MyListScreen";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createStaticNavigation,
  useNavigation
} from "@react-navigation/native";
import {useState} from 'react'
import { Button, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";


const AuthStack = createNativeStackNavigator({
  screens: {
    Login: LoginScreen,
    Register: RegisterScreen
  }
});

const AuthScreensNavigator = createStaticNavigation(AuthStack);

const MyTabs = createBottomTabNavigator({
  screenOptions: ({ route }) => ({
    tabBarIcon: ({ color, size }) => {
      const icons = {
        Home: "home",
        Discussion: "message-text",
        Discover: "compass",
        Seasonal: "leaf",
        MyList: "format-list-bulleted-square"
      };

      return (
        <MaterialCommunityIcons
          name={icons[route.name]}
          color={color}
          size={size}
        />
      );
    }
  }),
  screens: {
    Home: HomeScreen,
    Discussion: DiscussionScreen,
    Discover: DiscoverScreen,
    Seasonal: SeasonalScreen,
    MyList: MyListScreen
  }
});

const TabsNavigator = createStaticNavigation(MyTabs);

export default function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);
  return !isUserLoggedIn ? <AuthScreensNavigator /> : <TabsNavigator />;
}
