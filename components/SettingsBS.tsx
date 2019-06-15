import React, { useRef, useEffect } from "react";
import { Button, StyleSheet, View, Switch } from "react-native";
import BottomSheet from "./BottomSheet";
import { auth } from "../Auth/api";

export interface ListsBottomSheetProps {
  onClose: () => void;
  darkMode: string;
  setDarkMode: any;
}

const ListsBottomSheet: React.FC<ListsBottomSheetProps> = ({
  onClose,
  setDarkMode,
  darkMode
}) => {
  useEffect(() => {
    ref.current.open();
  }, []);
  const ref = useRef(null);
  const handleClose = () => {
    ref.current.close();
  };

  const signOut = async () => {
    return auth().signOut();
  };

  return (
    <>
      <BottomSheet ref={ref} onClose={onClose}>
        <View style={styles.buttonGroup}>
          <Button title="Sign Out" onPress={signOut} />
          <Button title="Close" onPress={handleClose} />
          <Switch
            value={darkMode === "true" ? true : false}
            onValueChange={v => setDarkMode(v ? "true" : "false")}
          />
        </View>
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#fff"
  }
});

export default ListsBottomSheet;
