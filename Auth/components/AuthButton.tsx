import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent
} from "react-native";
import { colors } from "../../utils";

export interface AuthButtonProps {
  onPress: (e: GestureResponderEvent) => void;
  disabled: boolean;
}

const AuthButton: React.FC<AuthButtonProps> = ({
  onPress,
  disabled,
  children
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={styles.button}
    >
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 6,
    backgroundColor: colors.blue,
    width: 300
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold"
  }
});

export default AuthButton;
