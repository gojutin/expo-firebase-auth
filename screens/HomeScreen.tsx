import firebase from "firebase";
import React from "react";
import { Button, StyleSheet, View } from "react-native";

const HomeScreen = () => {
  const signOut = async () => {
    return firebase.auth().signOut();
  };

  return (
    <View style={styles.container}>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
};

HomeScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default HomeScreen;
