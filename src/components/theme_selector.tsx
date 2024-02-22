import React from "react";
import {useShallow} from "zustand/react/shallow";
import useTheme from "@store/theme";
import {Theme} from "@typing/store";

const ThemeSelector: React.FC = () => {
    const {theme, setTheme} = useTheme(useShallow(({theme, setTheme}) => ({theme, setTheme})));

    const handleChangeTheme = (): void => setTheme(theme === Theme.DARK ? Theme.LIGHT : Theme.DARK);

    return (
        <button className="background-2 hover flex justify-center items-center aspect-square rounded">
            <i
                className={`text-2xl ${theme === Theme.DARK ? "icon-theme-dark" : "icon-theme-light"}`}
                onClick={handleChangeTheme}
            />
        </button>
    );
};

export default ThemeSelector;
