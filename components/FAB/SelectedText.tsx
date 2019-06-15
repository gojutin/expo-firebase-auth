import React from "react";
import { View, Text } from "react-native";

type TextType = "Calendar" | "Files" | "Settings" | "";

export interface SelectedTextProps {
  text: TextType;
}

const SelectedText: React.SFC<SelectedTextProps> = ({ text }) => {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 250,
        alignSelf: "center"
      }}
    >
      <Text style={{ color: "white", fontSize: 20 }}>{text}</Text>
    </View>
  );
};

export default SelectedText;
