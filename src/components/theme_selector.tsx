import React, {useState} from "react";

const ThemeSelector: React.FC = () => {
    const [isDark, setIsDark] = useState<boolean>(document.documentElement.classList.contains("dark"));

    const handleChangeTheme = (): void => {
        isDark ? document.documentElement.classList.remove("dark") : document.documentElement.classList.add("dark");
        setIsDark(!isDark);
    };

    return (
        <button className="hover:bg-slate-100 flex justify-center items-center aspect-square rounded">
            <i
                className={`text-2xl ${isDark ? "icon-theme-dark" : "icon-theme-light"}`}
                onClick={handleChangeTheme}
            />
        </button>
    );
};

export default ThemeSelector;
