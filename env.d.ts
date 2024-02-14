interface ImportMetaEnv {
    readonly VITE_API_URL: string;
}

interface ImportMeta { // eslint-disable-line no-redeclare
    readonly env: ImportMetaEnv;
}
