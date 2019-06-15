import React, { useRef, useEffect, MutableRefObject } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { View } from "react-native";
import { colors } from "../utils";

export interface BottomSheetProps {
  onClose: () => void;
}

const BottomSheet = React.forwardRef<any, BottomSheetProps>(
  ({ onClose, children }, ref) => {
    useEffect(() => {
      // TODO- FIX THESE TYPES
      ref.current.open();
    }, []);
    return (
      <RBSheet
        ref={ref}
        height={400}
        onClose={onClose}
        closeOnDragDown={false}
        duration={300}
        customStyles={{
          container: {
            // justifyContent: "center",
            // alignItems: "center",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingTop: 20
            // minHeight: 400
          },
          wrapper: {}
        }}
      >
        <View
          style={{
            width: 40,
            backgroundColor: colors.lightGray,
            borderRadius: 4,
            borderColor: colors.lightGray,
            alignSelf: "center",
            position: "relative",
            top: -25,
            height: 4
          }}
        />
        {children}
      </RBSheet>
    );
  }
);

export default BottomSheet;
