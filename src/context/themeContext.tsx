// theme-context.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ThemeContextType = {
  primary: string;
  setPrimary: (color: string) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  primary: "#2AB3A3",
  setPrimary: () => {},
});

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [primary, setPrimaryState] = useState("#2AB3A3");

  useEffect(() => {
    (async () => {
      try {
        const storedColor = await AsyncStorage.getItem("@primaryColor");
        if (storedColor) {
          setPrimaryState(storedColor);
        }
      } catch (error) {
        console.error("Failed to load theme color:", error);
      }
    })();
  }, []);

  // Save theme color when changed
  const setPrimary = async (color: string) => {
    try {
      setPrimaryState(color);
      await AsyncStorage.setItem("@primaryColor", color);
    } catch (error) {
      console.error("Failed to save theme color:", error);
    }
  };

  return (
    <ThemeContext.Provider value={{ primary, setPrimary }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
