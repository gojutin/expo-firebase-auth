import React, { useState, useEffect, useReducer } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import FAB from "../components/FAB";
import InputBox from "../components/InputBox";
import CalendarBS from "../components/CalendarBS";
import ListsBS from "../components/ListsBS";
import SettingsBS from "../components/SettingsBS";
import TaskItem from "../components/TaskItem";
import store, { useStoreActions, useStoreState } from "../store";
import { StoreProvider } from "easy-peasy";
import { formatDate, formatPrettyDate, colors } from "../utils";
import { useDarkMode } from "../utils";

const HomeScreen = () => {
  const [showInputBox, setShowInputBox] = useState(false);
  const [selectedAction, setSelectedAction] = useState("");
  const [filter, setFilter] = useState({
    type: "Date",
    value: formatDate(new Date())
  });
  const [markedDates, setMarkedDates] = useState({});
  const tasks = useStoreState(state => state.tasks.allTasks());

  useEffect(() => {
    console.log("TASKS", tasks);
  }, [tasks]);

  // const tasks = useStoreState(state => state.tasks.allInProgressTasks);

  const [darkMode, setDarkMode] = useDarkMode();

  useEffect(() => {
    let markedDates = {
      [`${filter.value}`]: {
        selected: true,
        selectedColor: "steelblue"
      }
    };
    tasks
      .filter(task => task.dueDate !== "")
      .forEach(task => {
        markedDates[task.dueDate] = {
          marked: true,
          selected: task.dueDate === filter.value,
          selectedColor: "steelblue"
        };
      });
    setMarkedDates(markedDates);
  }, [tasks, filter]);

  const subscribeToInProgressTasks = useStoreActions(
    actions => actions.tasks.subscribeToInProgressTasks
  );

  const subscribeToCompletedTasks = useStoreActions(
    actions => actions.tasks.subscribeToCompletedTasks
  );

  const toggleTaskCompleted = useStoreActions(
    actions => actions.tasks.toggleTaskCompleted
  );

  function reducer(state, action) {
    const inProgressTasks = tasks.filter(task => task.completed === false);
    switch (action.type) {
      case "All":
        return inProgressTasks;
      case "Scheduled":
        return inProgressTasks.filter(task => task.dueDate !== "");
      case "Unscheduled":
        return inProgressTasks.filter(task => task.dueDate == "");
      case "Completed":
        return tasks.filter(task => task.completed);
      case "Date":
        return inProgressTasks.filter(task => task.dueDate === action.value);
      default:
        return inProgressTasks;
    }
  }

  const [filteredTasks, dispatch] = useReducer(reducer, []);

  const addTask = useStoreActions(actions => actions.tasks.addTask);

  useEffect(() => {
    dispatch(filter);
  }, [tasks]);

  useEffect(() => {
    subscribeToInProgressTasks();
    subscribeToCompletedTasks();
  }, []);

  const handleInputBoxSubmit = inputValue => {
    if (inputValue.body.length) {
      addTask(inputValue);
    }

    toggleInputBox();
  };

  const handleToggleTaskCompleted = ({ id, currentState }) => {
    return toggleTaskCompleted({ id, currentState });
  };

  const handleClearMenuAction = () => {
    setSelectedAction("");
  };

  const toggleInputBox = () => {
    handleClearMenuAction();
    setShowInputBox(i => !i);
  };

  const handleDateSelection = date => {
    const action = { type: "Date", value: date };
    setFilter(action);
    dispatch(action);
  };

  const handleListSelection = type => {
    const action = { type, value: "" };
    setFilter(action);
    dispatch(action);
  };

  const getListTitle = () => {
    if (filter.value) {
      const today = formatDate(new Date());
      const date = formatDate(filter.value);
      if (today === date) {
        return "Today";
      }
      return formatPrettyDate(filter.value);
    } else {
      return filter.type;
    }
  };

  const isDarkMode = darkMode === "true";

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#333" : "#fff" }
      ]}
    >
      <Text
        style={{
          fontSize: 25,
          fontWeight: "bold",
          // alignSelf: "left",
          paddingTop: 20,
          paddingBottom: 20,
          height: 60,
          color: isDarkMode ? colors.lightGray : "#333"
        }}
      >
        {getListTitle()}
      </Text>
      {filteredTasks.map(task => {
        return (
          <TaskItem
            key={task.id}
            item={task}
            onCheck={handleToggleTaskCompleted}
          />
        );
      })}

      {showInputBox && (
        <InputBox onSubmit={handleInputBoxSubmit} onCancel={toggleInputBox} />
      )}
      {selectedAction === "Calendar" && (
        <CalendarBS
          markedDates={markedDates}
          onClose={handleClearMenuAction}
          onSelection={handleDateSelection}
          value={filter.value}
        />
      )}

      {selectedAction === "Lists" && (
        <ListsBS
          onClose={handleClearMenuAction}
          selected={filter.type}
          onSelection={handleListSelection}
        />
      )}

      {selectedAction === "Settings" && (
        <SettingsBS
          onClose={handleClearMenuAction}
          setDarkMode={setDarkMode}
          darkMode={darkMode}
        />
      )}

      <FAB
        onPress={toggleInputBox}
        onSelection={selection => setSelectedAction(selection)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 30,
    paddingTop: 80
  }
});

const Final = () => (
  <StoreProvider store={store}>
    <HomeScreen />
  </StoreProvider>
);

Final.navigationOptions = {
  header: null
};

export default Final;
