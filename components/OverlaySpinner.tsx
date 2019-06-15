import React, { useEffect } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  ActivityIndicator,
  GestureResponderEvent,
  Animated
} from "react-native";
import { useFade, useDimensions } from "../utils";

const [width, height] = useDimensions();

export interface OverlayProps {
  onPress?: (e: GestureResponderEvent) => void;
}

const Overlay: React.SFC<OverlayProps> = ({ onPress }) => {
  const fade = useFade({ to: 0.7 });

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View style={[styles.overlay, { width, height, opacity: fade }]}>
        <ActivityIndicator size="large" color="#fff" />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

var styles = StyleSheet.create({
  // Flex to fill, position absolute,
  // Fixed left/top, and the width set to the window width
  overlay: {
    flex: 1,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    left: 0,
    top: 0,
    opacity: 0.7,
    backgroundColor: "black",
    width,
    height
  }
});

export default Overlay;
