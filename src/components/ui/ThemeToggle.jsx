import { Moon, Sun } from "lucide-react";
import { useThemeContext } from "../../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, setTheme } = useThemeContext();
  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="rounded-xl border border-slate-300 p-2 text-slate-600 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700"
      aria-label="Toggle theme"
      aria-pressed={isDark}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
