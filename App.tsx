import "./firebase.config";
import { auth } from "./api";

import React, { useState } from "react";
import { AppLoading } from "expo";
import { createStackNavigator, createAppContainer } from "react-navigation";

import AuthStack from "./Auth/navigator";
import HomeScreen from "./screens/HomeScreen";

const App = () => {
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const AppStack = createStackNavigator({ Home: HomeScreen });

  const startAuthListener = () =>
    new Promise(resolve => {
      return auth().onAuthStateChanged(user => {
        resolve();
        setIsLoggedIn(user ? true : false);
      });
    });

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
