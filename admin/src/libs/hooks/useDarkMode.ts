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
    const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
    const toggleDarkMode = React.useCallback(() => {
        setDarkMode((prev) => !prev);
    }, []);
    React.useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const htmlElement = document.querySelector("html")!;
        if (darkMode) {
            htmlElement.classList.add("dark");
            htmlElement.setAttribute("data-theme", theme.dark);
            localStorage.setItem("darkMode", "true");
        } else {
            htmlElement.classList.remove("dark");
            htmlElement.setAttribute("data-theme", theme.light);
            localStorage.setItem("darkMode", "false");
        }
    }, [darkMode]);

    return { isDarkMode: darkMode, toggleDarkMode };
}
