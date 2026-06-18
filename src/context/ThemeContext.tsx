import React, { createContext, useContext, useMemo } from "react";
import { SDUITheme } from "../types/sdui.types";

const DefaultTheme: SDUITheme = {
  primary: "#FF9933",
  background: "#FFF5E6",
};

const ThemeContext = createContext<SDUITheme>(DefaultTheme);

export const ThemeProvider: React.FC<{
  theme?: SDUITheme;
  children: React.ReactNode;
}> = ({ theme, children }) => {
  const mergedTheme = useMemo(() => ({ ...DefaultTheme, ...theme }), [theme]);

  return (
    <ThemeContext.Provider value={mergedTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useSDUITheme = () => useContext(ThemeContext);
