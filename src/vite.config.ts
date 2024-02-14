import {defineConfig} from "vite";
import basicSsl from "@vitejs/plugin-basic-ssl";
import react from "@vitejs/plugin-react";
import path from "node:path";
import {fileURLToPath} from "node:url";

const dir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    plugins: [
        basicSsl(),
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
        },
    },
});
