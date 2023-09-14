import {create} from "zustand";
import type {IntlConfig} from "react-intl";
import en from "@intl/en.json";

type LocaleState = {
    locale: IntlConfig["locale"];
    defaultLocale: IntlConfig["locale"];
    messages: IntlConfig["messages"];
    setLocale: (locale: Locales) => Promise<void>;
}

export enum Locales {
    EN = "en",
    FR = "fr",
}

export const DEFAULT_LOCALE = Locales.EN;

const getLocale = (): LocaleState["locale"] => DEFAULT_LOCALE;

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
    locale: getLocale(),
    defaultLocale: DEFAULT_LOCALE,
    messages: en,
    setLocale: async (locale: Locales): Promise<void> => {
        const messages = await getMessages(locale);
        return set((state: LocaleState) => ({
            ...state,
            locale,
            messages,
        }));
    },
}));

export default useLocale;
