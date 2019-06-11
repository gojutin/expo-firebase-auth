import React, { useState } from "react";
import {
  AsyncStorage,
  Button,
  StyleSheet,
  View,
  Text,
  ActivityIndicator
} from "react-native";
import firebase from "firebase";

const SignInScreen = props => {
  const [isPending, setIsPending] = useState(false);

  const signInAsync = async () => {
    try {
      setIsPending(true);
      await firebase.auth().signInAnonymously();
    } catch (error) {
      setIsPending(false);
    }
  };

  return (
    <View style={styles.container}>
      {isPending && <ActivityIndicator size="large" color="#0000ff" />}
      <Button title="Sign Up" onPress={signInAsync} />
      <Button title="Sign In" onPress={() => props.navigation.pop()} />
    </View>
  );
};

SignInScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default SignInScreen;
