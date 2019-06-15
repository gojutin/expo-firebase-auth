import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
  Image
} from "react-native";

export interface GoogleButtonProps {
  onPress: (e: GestureResponderEvent) => void;
  signUp?: boolean;
}

const GoogleButton: React.FC<GoogleButtonProps> = ({ onPress, signUp }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Image style={styles.icon} source={require("../../assets/google.png")} />
      <Text style={styles.buttonText}>
        Sign {signUp ? "Up" : "In"} with Google
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20
  },
  button: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: "#333",
    backgroundColor: "#fff",
    width: 300
  },
  buttonText: {
    color: "#333",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10
  }
});

export default GoogleButton;
