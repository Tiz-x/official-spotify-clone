import { useState, useEffect } from "react";
import { BsSun, BsMoon } from "react-icons/bs";
import "./ThemeToggle.css";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    // Check for saved theme preference or default to 'dark'
    const savedTheme =
      (localStorage.getItem("theme") as "dark" | "light") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <BsSun size={20} /> : <BsMoon size={20} />}
    </button>
  );
};

export default ThemeToggle;