import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PanResponder,
  Animated,
  Easing
} from "react-native";
import { generateHaptic } from "../../utils";
import actions from "./actions";
import Overlay from "../../components/Overlay";
import SelectedText from "./SelectedText";

import { FontAwesome5, Ionicons } from "@expo/vector-icons";

interface FABProps {
  onSelection: (s: string) => void;
  onPress: () => void;
}

type TextType = "Calendar" | "Files" | "Settings" | "";

const FAB: React.FC<FABProps> = ({ onSelection, onPress }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<TextType>("");

  // This is basically a copy of the selectedAction state since the state cannot be read in the useMemo
  // and the useRef cannot be used in the JSX.
  const selected = useRef<string>();
  const open = useRef<boolean>();

  useEffect(() => {
    selected.current = selectedAction;
  }, [selectedAction]);

  const panResponder = useRef<{ panHandlers: any }>({ panHandlers: {} });

  useMemo(() => {
    panResponder.current = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        generateHaptic();
        // @ts-ignore
        this.timeout = setTimeout(() => {
          setIsOpen(true);
          open.current = true;
        }, 200);
      },
      onPanResponderMove: (evt, gestureState) => {
        // console.log(gestureState.dx, gestureState.dy);
        clearTimeout(this.timeout);
        setIsOpen(true);
        open.current = true;
        if (
          gestureState.dy < -60 &&
          gestureState.dy > -140 &&
          gestureState.dx < 20 &&
          gestureState.dx > -20
        ) {
          if (selected.current !== "Calendar") {
            setSelectedAction("Calendar");
            generateHaptic();
          }
        } else if (
          gestureState.dy < -30 &&
          gestureState.dy > -80 &&
          gestureState.dx < -45 &&
          gestureState.dx > -110
        ) {
          if (selected.current !== "Lists") {
            setSelectedAction("Lists");
            generateHaptic();
          }
        } else if (
          gestureState.dy < 40 &&
          gestureState.dy > -10 &&
          gestureState.dx < -55 &&
          gestureState.dx > -120
        ) {
          if (selected.current !== "Settings") {
            setSelectedAction("Settings");
            generateHaptic();
          }
        }
        // else if (
        //   gestureState.dy < 60 &&
        //   gestureState.dy > -60 &&
        //   gestureState.dx < 60 &&
        //   gestureState.dx > -60
        // ) {
        //   if (selected.current !== "Add") {
        //     setSelectedAction("Add");
        //     generateHapticFeedback();
        //   }
        // }
        else {
          setSelectedAction("");
        }
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        if (selected.current) {
          onSelection(selected.current);
        } else if (!open.current) {
          onPress();
        }
        clearTimeout(this.timeout);
        setIsOpen(false);
        open.current = false;

        setSelectedAction("");
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },

      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      }
    });
  }, []);

  let bounceAnimation = useRef(new Animated.Value(0)).current;
  let positionAnimation = useRef(new Animated.Value(60)).current;
  let fadeAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isOpen) {
      triggerOpenAnimation();
    } else {
      triggerCloseAnimation();
    }
  }, [isOpen]);

  const triggerOpenAnimation = () => {
    Animated.parallel([
      Animated.sequence([
        Animated.parallel([
          Animated.timing(bounceAnimation, {
            toValue: 310,
            duration: 220
            // easing: Easing.out(Easing.bounce)
          }),
          Animated.timing(positionAnimation, {
            toValue: -65,
            duration: 220
          })
        ]),
        Animated.parallel([
          Animated.timing(bounceAnimation, {
            toValue: 240,
            duration: 200
          }),
          Animated.timing(positionAnimation, {
            toValue: -30,
            duration: 200
          })
        ]),
        Animated.parallel([
          Animated.timing(bounceAnimation, {
            toValue: 260,
            duration: 220
          }),
          Animated.timing(positionAnimation, {
            toValue: -40,
            duration: 220
          })
        ])
      ]),
      Animated.timing(fadeAnimation, {
        toValue: 0.8,
        duration: 300,
        useNativeDriver: true
      })
    ]).start();
  };

  const triggerCloseAnimation = () => {
    Animated.parallel([
      Animated.timing(bounceAnimation, {
        toValue: 0,
        duration: 300
      }),
      Animated.timing(positionAnimation, {
        toValue: 90,
        duration: 300
      })
    ]).start();
  };

  const styles = StyleSheet.create({
    container: {
      position: "absolute",
      bottom: 60,
      right: 60
    },
    fab: {
      width: 60,
      height: 60,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#03A9F4",
      borderRadius: 30,
      elevation: 8,
      shadowColor: "#333",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 2
    }
  });

  return (
    <>
      {isOpen && <Overlay />}

      <Animated.View
        style={{
          position: "absolute",
          bottom: positionAnimation,
          right: positionAnimation,
          borderRadius: 300,
          backgroundColor: "#03A9F4",
          opacity: 0.7,
          height: bounceAnimation,
          width: bounceAnimation,
          shadowColor: "#fff",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 20
        }}
      />

      <SelectedText text={selectedAction} />

      <View style={styles.container}>
        <View {...panResponder.current.panHandlers}>
          {isOpen &&
            actions.map(action => (
              <Animated.View
                key={action.title}
                style={[
                  action.style,
                  {
                    position: "absolute",
                    opacity: fadeAnimation
                  }
                ]}
              >
                <FontAwesome5
                  name={action.icon}
                  size={30}
                  color={
                    selectedAction === action.title
                      ? action.selectedColor
                      : action.color
                  }
                />
              </Animated.View>
            ))}
          <TouchableOpacity style={styles.fab}>
            <View>
              <Ionicons
                name={isOpen ? "md-close" : "md-add"}
                size={30}
                color="white"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default FAB;
