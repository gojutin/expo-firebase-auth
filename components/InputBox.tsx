import React, { useState } from "react";
import { create, db } from "../api";
import Overlay from "./Overlay";
import {
  KeyboardAvoidingView,
  View,
  TextInput,
  StyleSheet,
  Button,
  Animated,
  Text,
  TouchableOpacity
} from "react-native";
import Calendar from "./CalendarBS";
import { useFade } from "../utils";
import { FontAwesome5 as FontAwesome } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { CalendarList } from "react-native-calendars";

import { useDimensions } from "../utils";
import { formatDate } from "../utils";

const [width, height] = useDimensions();

export interface InputBoxProps {
  onSubmit: (arg: any) => void;
  onCancel: () => void;
}

const InputBox: React.SFC<InputBoxProps> = ({ onCancel, onSubmit }) => {
  const [body, setBody] = useState("");
  const [notes, setNotes] = useState("");
  const [dueDate, setDueDate] = useState("");

  const fadeOut = useFade({ to: 0, duration: 200 });
  const fadeIn = useFade({ to: 1, duration: 500 });
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Text");

  const handleSave = () => {
    onSubmit({ body, notes, dueDate });
    setShowModal(false);
  };

  const toggleModal = () => {
    setShowModal(x => !x);
  };

  const MemoBox = React.useMemo(
    () => (
      <>
        <TextInput
          placeholder="New Task"
          autoFocus
          style={styles.input}
          onChangeText={text => setBody(text)}
          value={body}
          onSubmitEditing={handleSave}
          returnKeyType="done"
        />
        <View style={styles.buttonGroup}>
          <TouchableOpacity>
            <View style={{ width: 80 }}>
              <FontAwesome
                name={"ellipsis-h"}
                size={25}
                color={"#333"}
                onPress={toggleModal}
              />
            </View>
          </TouchableOpacity>

          <Button title="Save" onPress={handleSave} />
        </View>
      </>
    ),
    [body]
  );

  const options = [
    { name: "Text", icon: "stream" },
    { name: "Date", icon: "calendar-alt" },
    { name: "Time", icon: "clock" },
    { name: "Repeat", icon: "redo" },
    { name: "Users", icon: "users" }
  ];

  return (
    <>
      <View style={{ flex: 1, width }}>
        <Modal
          isVisible={showModal}
          avoidKeyboard={false}
          backdropOpacity={1}
          backdropColor="white"
        >
          <View style={{ flex: 1, paddingTop: 50 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
                marginBottom: 30
              }}
            >
              {options.map(option => {
                return (
                  <TouchableOpacity
                    key={option.name}
                    onPress={() => setSelectedOption(option.name)}
                    activeOpacity={0.9}
                  >
                    <View style={{ width: 50 }}>
                      <FontAwesome
                        name={option.icon}
                        size={22}
                        color={
                          selectedOption === option.name ? "#00adf5" : "#333"
                        }
                      />
                    </View>
                  </TouchableOpacity>
                );
              })}
              <Button title="Save" onPress={handleSave} />
            </View>
            {selectedOption === "Date" && (
              <View style={{ alignItems: "center" }}>
                <CalendarList
                  // Enable horizontal scrolling, default = false
                  style={{ width }}
                  horizontal={false}
                  minDate={formatDate(new Date())}
                  pastScrollRange={0}
                  theme={{
                    selectedDayBackgroundColor: "#00adf5",
                    todayTextColor: "#00adf5"
                  }}
                  onDayPress={day => {
                    setDueDate(day.dateString);
                  }}
                  markedDates={{
                    [`${dueDate}`]: {
                      selected: true,
                      selectedColor: "steelblue"
                    }
                  }}
                />
              </View>
            )}
            {selectedOption === "Text" && (
              <>
                <TextInput
                  placeholder="New Task"
                  autoFocus
                  style={styles.largeInput}
                  onChangeText={text => setBody(text)}
                  value={body}
                  onSubmitEditing={handleSave}
                  returnKeyType="done"
                />
                <TextInput
                  placeholder="Details"
                  style={styles.input}
                  onChangeText={text => setNotes(text)}
                  value={notes}
                  onSubmitEditing={() => setShowModal(false)}
                  returnKeyType="done"
                />
              </>
            )}
          </View>
          {/* <View>
            <Button
              color="tomato"
              title="Cancel"
              onPress={() => {
                setShowModal(false);
                onCancel();
              }}
            />
          </View> */}
        </Modal>
      </View>
      <Overlay onPress={onCancel} />
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Animated.View
          style={styles.box}
          // style={[styles.box, { opacity: showModal ? fadeOut : fadeIn }]}
        >
          {MemoBox}
        </Animated.View>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0
  },
  box: {
    height: 100,
    width,
    alignSelf: "stretch",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20
  },
  input: {
    height: 40,
    fontSize: 18
  },
  largeInput: {
    height: 50,
    fontSize: 22
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }
});

export default InputBox;
