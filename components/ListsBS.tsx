import React, { useRef, useEffect } from "react";
import { Button, StyleSheet, View, TouchableOpacity, Text } from "react-native";
import BottomSheet from "./BottomSheet";
import { Ionicons } from "@expo/vector-icons";
import { generateHaptic } from "../utils";

export interface ListsBottomSheetProps {
  onClose: () => void;
  onSelection: (selection: string) => void;
  selected: string;
}

const ListsBottomSheet: React.FC<ListsBottomSheetProps> = ({
  onClose,
  onSelection,
  selected
}) => {
  useEffect(() => {
    ref.current.open();
  }, []);
  const ref = useRef(null);
  const handleClose = () => {
    ref.current.close();
  };

  const options = [
    "All",
    "Scheduled",
    "Unscheduled",
    "Shared",
    "Repeating",
    "Completed",
    "Overdue"
  ];
  return (
    <>
      <BottomSheet ref={ref} onClose={onClose}>
        <View style={styles.buttonGroup}>
          {options.map(option => {
            const isSelected = selected === option;
            return (
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.buttonItem}
                onPress={() => {
                  onSelection(option);
                  generateHaptic();
                }}
                key={option}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: isSelected ? "#00adf5" : "#939393"
                  }}
                >
                  {option}
                </Text>
                {isSelected && (
                  <Ionicons name={"md-checkmark"} size={20} color={"#00adf5"} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    backgroundColor: "#fff"
  },
  buttonItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 8,
    paddingLeft: 20,
    paddingRight: 20
  }
});

export default ListsBottomSheet;
