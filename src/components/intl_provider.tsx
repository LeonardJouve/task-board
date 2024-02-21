import React from "react";
import {useShallow} from "zustand/react/shallow";
import {IntlProvider as ReactIntlProvider} from "react-intl";
import useLocale from "@store/locale";


const IntlProvider: React.FC<React.PropsWithChildren> = ({children}) => {
    const {locale, messages} = useLocale(useShallow(({locale, messages}) => ({locale, messages})));

    return (
        <ReactIntlProvider
            locale={locale}
            messages={messages}
        >
            {children}
        </ReactIntlProvider>
    );
};

export default IntlProvider;
