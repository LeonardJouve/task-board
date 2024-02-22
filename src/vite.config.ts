import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import {fileURLToPath} from "node:url";

const dir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    plugins: [
        react(),
    ],
    root: "./",
    resolve: {
        alias: {
            "@components": path.resolve(dir, "components"),
            "@store": path.resolve(dir, "store"),
            "@intl": path.resolve(dir, "intl"),
            "@api": path.resolve(dir, "api"),
            "@typing": path.resolve(dir, "types"),
            "@utils": path.resolve(dir, "utils"),
            "@icons": path.resolve(dir, "icons"),
        },
    },
});
