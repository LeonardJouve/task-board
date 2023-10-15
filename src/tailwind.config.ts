import type {Config} from "tailwindcss";

export default {
    content: ["./src/**/*.{html,tsx,jsx,js,ts}"],
    theme: {
        extend: {
            height: {
                "header": "var(--header-size)",
            },
            width: {
                "board-column": "var(--board-column-size)",
                "right-sidebar": "var(--right-sidebar-size)",
            },
        },
    },
    plugins: [],
} satisfies Config;

