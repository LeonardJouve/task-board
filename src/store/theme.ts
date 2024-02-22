import {create} from "zustand";
import {persist} from "zustand/middleware";
import {Theme} from "@typing/store";

type ThemeState = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

const useTheme = create<ThemeState>()(persist((set) => ({
    theme: document.documentElement.classList.contains("dark") || window.matchMedia("(prefers-color-scheme: dark)").matches ? Theme.DARK : Theme.LIGHT,
    setTheme: (theme): void => set(() => {
        theme === Theme.DARK ? document.documentElement.classList.add("dark") : document.documentElement.classList.remove("dark");

        return {theme};
    }),
}), {
    name: "theme",
    onRehydrateStorage: (): ((state?: ThemeState) => void) => (state): void => state?.theme === Theme.DARK ? document.documentElement.classList.add("dark") : document.documentElement.classList.remove("dark"),
}));

export default useTheme;
