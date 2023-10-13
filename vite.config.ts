import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import {fileURLToPath} from "node:url";

const dir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    plugins: [react()],
    root: "./",
    resolve: {
        alias: {
            "@components": path.resolve(dir, "src/components"),
            "@store": path.resolve(dir, "src/store"),
            "@intl": path.resolve(dir, "src/intl"),
            "@api": path.resolve(dir, "src/api"),
        },
    },
});
