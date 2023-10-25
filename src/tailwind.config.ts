import type {Config} from "tailwindcss";

export default {
    content: ["./src/**/*.{html,tsx,jsx,js,ts}"],
    darkMode: "class",
    theme: {
        extend: {
            height: {
                "header": "var(--header-size)",
                "board-preview": "var(--board-preview-size)",
            },
            width: {
                "board-column": "var(--board-column-size)",
                "right-sidebar": "var(--right-sidebar-size)",
            },
            minWidth: {
                "board-column": "var(--board-column-size)",
                "header": "var(--header-size)",
            },
            maxWidth: {
                "board-column": "var(--board-column-size)",
            },
            minHeight: {
                "header": "var(--header-size)",
            },
            maxHeight: {
                "header": "var(--header-size)",
            },
            colors: {
                "primary-light": "#FFFFFF",
                "primary-dark": "#000000",
            },
        },
    },
    plugins: [],
} satisfies Config;

