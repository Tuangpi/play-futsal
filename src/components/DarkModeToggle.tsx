import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun } from "lucide-react";

export default function DarkModeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="rounded cursor-pointer text-text hover:text-text-muted transition-colors"
    >
      {theme === "light" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
