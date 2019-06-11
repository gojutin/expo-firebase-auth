import React, { useEffect } from "react";
import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import { View, Text } from "react-native";

// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.

const HomeScreen = () => (
  <View>
    <Text>Home Screen</Text>
  </View>
);
const OtherScreen = () => (
  <View>
    <Text>Other Screen</Text>
  </View>
);
const SignInScreen = () => (
  <View>
    <Text>Sign In</Text>
  </View>
);
const AuthLoadingScreen = props => {
  useEffect(() => {
    props.navigation.navigate("Auth");
  }, []);
  return (
    <View>
      <Text>Auth Loading</Text>
    </View>
  );
};

const AppStack = createStackNavigator({ Home: HomeScreen, Other: OtherScreen });
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "Auth"
    }
  )
);
