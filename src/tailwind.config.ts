import type {Config} from "tailwindcss";

export default {
    content: ["./**/*.{html,tsx,jsx,js,ts}"],
    darkMode: "class",
    theme: {
        extend: {
            height: {
                "board-preview": "var(--board-preview-size)",
            },
            width: {
                "board-column": "var(--board-column-size)",
                "right-sidebar": "var(--right-sidebar-size)",
            },
            minWidth: {
                "board-column": "var(--board-column-size)",
            },
            maxWidth: {
                "board-column": "var(--board-column-size)",
            },
            minHeight: {
                "board-preview": "var(--board-preview-size)",
            },
            maxHeight: {
                "board-preview": "var(--board-preview-size)",
            },
            colors: {
                "light-1": "#FFFFFF",
                "dark-1": "#202030",
                "light-2": "#f4f4f4",
                "dark-2": "#2b2b40",
                "light-3": "#ddeeff",
                "dark-3": "#353550",
                "light-4": "#FFFFFF",
                "dark-4": "#404060",
                "light-5": "#FCFCFC",
                "dark-5": "#535370",
                "light-6": "#111111",
                "dark-6": "#858585",
                "light-7": "#171717",
                "dark-7": "#B0B0B0",
                "light-dangerous-1": "#BB1100",
                "dark-dangerous-1": "#A00A00",
                "light-dangerous-2": "#A00A00",
                "dark-dangerous-2": "#881100",
                "light-dangerous-3": "#FFFFFF",
                "dark-dangerous-3": "#FFFFFF",
            },
        },
    },
    plugins: [],
} satisfies Config;

