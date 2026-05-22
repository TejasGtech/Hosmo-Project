import { theme_dark, theme_light } from "@/Theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("light");
  const theme = mode === "dark" ? theme_dark : theme_light;

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    const savedTheme = await AsyncStorage.getItem("APP_THEME");
    if (savedTheme) setMode(savedTheme);
  };

  const toggleTheme = async () => {
    const newTheme = mode === "light" ? "dark" : "light";
    setMode(newTheme);
    await AsyncStorage.setItem("APP_THEME", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
