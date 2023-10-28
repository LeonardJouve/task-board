import {create} from "zustand";
import type {IntlConfig} from "react-intl";
import en from "@intl/en.json";
import {Locales} from "@typing/store";

type LocaleState = {
    locale: IntlConfig["locale"];
    messages: IntlConfig["messages"];
    setLocale: (locale: Locales) => Promise<void>;
}

export const DEFAULT_LOCALE = Locales.EN;

const getMessages = async (locale: LocaleState["locale"]): Promise<LocaleState["messages"]> => {
    switch (locale) {
    case Locales.EN:
        return en;
    case Locales.FR:
        return (await import("@intl/fr.json")).default;
    default:
        return en;
    }
};

const useLocale = create<LocaleState>((set) => ({
    locale: DEFAULT_LOCALE,
    messages: en,
    setLocale: async (locale): Promise<void> => {
        const messages = await getMessages(locale);
        return set(() => ({
            locale,
            messages,
        }));
    },
}));

export default useLocale;
