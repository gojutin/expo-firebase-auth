import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Keyboard,
  GestureResponderEvent
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export interface AuthInputProps {
  placeholder: string;
  type: "email" | "password";
  valid: boolean;
  value: string;
  onChangeText: (text: string) => void;
  autoFocus?: boolean;
}

const AuthInput: React.FC<AuthInputProps> = props => {
  const { placeholder, type, valid, value, onChangeText, autoFocus } = props;
  const isPassword = type === "password";
  return (
    <View style={styles.textInput}>
      <Ionicons
        name={isPassword ? "ios-key" : "md-mail"}
        size={30}
        color={valid ? "#66BB6A" : "#d1d1d1"}
      />
      <TextInput
        autoFocus={autoFocus}
        secureTextEntry={isPassword}
        autoCapitalize="none"
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#000",
    paddingBottom: 10,
    marginBottom: 20,
    borderBottomColor: "#efefef",
    borderBottomWidth: 1,
    width: "100%"
  },
  input: {
    fontSize: 20,
    flex: 1,
    paddingLeft: 20
  }
});

export default AuthInput;
