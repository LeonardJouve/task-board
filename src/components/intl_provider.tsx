import React from "react";
import {IntlProvider as ReactIntlProvider} from "react-intl";
import useLocale, {DEFAULT_LOCALE} from "@store/locale";


const IntlProvider: React.FC<React.PropsWithChildren> = ({children}) => {
    const intl = useLocale();

    return (
        <ReactIntlProvider
            locale={intl.locale}
            messages={intl.messages}
            defaultLocale={DEFAULT_LOCALE}
        >
            {children}
        </ReactIntlProvider>
    );
};

export default IntlProvider;
