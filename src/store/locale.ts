import {create} from "zustand";
import type {IntlConfig} from "react-intl";
import en from "@intl/en.json";
import {Locale} from "@typing/store";

type LocaleState = {
    locale: IntlConfig["locale"];
    messages: IntlConfig["messages"];
    setLocale: (locale: Locale) => Promise<void>;
};

const getMessages = async (locale: LocaleState["locale"]): Promise<LocaleState["messages"]> => {
    switch (locale) {
    case Locale.EN:
        return en;
    case Locale.FR:
        return (await import("@intl/fr.json")).default;
    default:
        return en;
    }
};

const useLocale = create<LocaleState>((set) => ({
    locale: Locale.EN,
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
