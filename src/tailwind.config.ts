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
            },
        },
    },
    plugins: [],
} satisfies Config;

