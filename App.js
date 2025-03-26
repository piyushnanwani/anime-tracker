import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const RootStack = createNativeStackNavigator({
  screens: {
    Login: LoginScreen,
    Register: RegisterScreen
  }
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return (
      <Navigation />
  );
}
