import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react({
        babel: {
            plugins: [
                ["module-resolver", {
                    "root": ["."],
                    "alias": {
                        "@components": "./src/components",
                        "@typing": "./src/types",
                        "@store": "./src/store",
                    },
                }],
            ],
        },
    })],
});
