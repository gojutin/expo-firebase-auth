import "./firebase.config";
import firebase from "firebase";

import React, { useState } from "react";
import { AppLoading } from "expo";
import { createStackNavigator, createAppContainer } from "react-navigation";

import SignInScreen from "./screens/Auth/SignInScreen";
import SignUpScreen from "./screens/Auth/SignUpScreen";
import HomeScreen from "./screens/HomeScreen";

const AppStack = createStackNavigator({ Home: HomeScreen });
const AuthStack = createStackNavigator({
  SignIn: SignInScreen,
  SignUp: SignUpScreen
});

const App = () => {
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const startAuthListener = () => {
    return new Promise(resolve => {
      return firebase.auth().onAuthStateChanged(function(user) {
        resolve();
        setIsLoggedIn(user ? true : false);
      });
    });
  };

  const App = createAppContainer(isLoggedIn ? AppStack : AuthStack);

  if (!isReady) {
    return (
      <AppLoading
        // @ts-ignore
        startAsync={startAuthListener}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  } else {
    return <App />;
  }
};

export default App;
