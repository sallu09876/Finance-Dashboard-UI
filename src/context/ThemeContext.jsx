import { createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const getPreferredTheme = () =>
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  const [theme, setTheme] = useLocalStorage("finsight_theme", getPreferredTheme());

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useThemeContext must be used within ThemeProvider");
  return context;
}
