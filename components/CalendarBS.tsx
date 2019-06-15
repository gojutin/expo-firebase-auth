import React, { useState, useRef, useEffect } from "react";
import { Button, StyleSheet, View } from "react-native";
import { CalendarList } from "react-native-calendars";
import BottomSheet from "./BottomSheet";
import { formatDate, generateHaptic } from "../utils";

export interface CalendarProps {
  onClose: () => void;
  onSelection: (date: string) => void;
  markedDates: any;
  value: string;
}

const Calendar: React.FC<CalendarProps> = ({
  onClose,
  onSelection,
  markedDates,
  value
}) => {
  const [marked, setMarked] = useState(markedDates);
  useEffect(() => {
    ref.current.open();
  }, []);

  const ref = useRef(null);
  const handleClose = () => {
    ref.current.close();
  };

  const handleSelection = day => {
    generateHaptic();

    const formattedDate = day.dateString || day;
    // @ts-ignore
    // setMarked(value => ({
    //   ...markedDates,

    // }));
    onSelection(formattedDate);
  };

  return (
    <BottomSheet ref={ref} onClose={onClose}>
      <View style={styles.buttonGroup}>
        <Button
          title="Today"
          onPress={() => {
            handleSelection(formatDate(new Date()));
          }}
        />
      </View>

      <CalendarList
        // Enable horizontal scrolling, default = false
        horizontal={true}
        // Enable paging on horizontal, default = false
        pagingEnabled={true}
        theme={{
          selectedDayBackgroundColor: "#00adf5",
          todayTextColor: "#00adf5"
        }}
        onDayPress={handleSelection}
        markedDates={markedDates}
      />
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    backgroundColor: "#fff",
    position: "absolute",
    top: 30,
    right: 20,
    zIndex: 1000
  }
});

export default Calendar;
