import React from "react";
import { useState } from "react";
const theme = {
    light: "winter",
    dark: "dracula",
};
export default function useDarkMode(): {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
} {
    const [darkMode, setDarkMode] = useState(false);
    const toggleDarkMode = React.useCallback(() => {
        setDarkMode((prev) => !prev);
    }, []);
    React.useEffect(() => {
        const htmlElement = document.querySelector("html")!;
        if (darkMode) {
            htmlElement.classList.add("dark");
            htmlElement.setAttribute("data-theme", theme.dark);
        } else {
            htmlElement.classList.remove("dark");
            htmlElement.setAttribute("data-theme", theme.light);
        }
    }, [darkMode]);

    return { isDarkMode: darkMode, toggleDarkMode };
}
