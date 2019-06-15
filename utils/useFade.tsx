import React, { useEffect } from "react";
import { Animated } from "react-native";

import useDimensions from "./useDimensions";
const [width, height] = useDimensions();

interface UseFadeArgs {
  duration?: number;
  to?: number;
}

export default ({ to = 1, duration = 300 }: UseFadeArgs) => {
  const fadeAnimation = new Animated.Value(0);
  useEffect(() => {
    Animated.timing(fadeAnimation, {
      toValue: to,
      duration
    }).start();
  });

  return fadeAnimation;
};
