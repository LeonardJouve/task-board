import type {Config} from "tailwindcss";

export default {
    content: ["./src/**/*.{html,tsx,jsx,js,ts}"],
    theme: {
        extend: {
            height: {
                "header": "var(--header-size)",
            },
            width: {
                "right-sidebar": "var(--right-sidebar-size)",
                "board-column": "var(--board-column-size)",
            },
            maxHeight: {
                "2rem": "2rem",
                "4rem": "4rem",
            },
        },
    },
    plugins: [],
} satisfies Config;

