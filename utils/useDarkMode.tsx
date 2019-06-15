import { useState, useEffect } from "react";
import { AsyncStorage } from "react-native";

const useDarkMode = () => {
  const storePreference = async darkMode => {
    try {
      await AsyncStorage.setItem("@darkMode", darkMode);
    } catch (error) {
      // Error saving data
    }
  };

  const [darkMode, setDarkMode] = useState("false");

  useEffect(() => {
    const retrievePreference = async () => {
      try {
        const value = await AsyncStorage.getItem("@darkMode");
        setDarkMode(value || "false");
      } catch (error) {
        // Error retrieving data
      }
    };

    retrievePreference();
  }, []);

  useEffect(() => {
    storePreference(darkMode);
  }, [darkMode]);

  return [darkMode, setDarkMode];
};

export default useDarkMode;
