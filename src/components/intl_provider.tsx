import React from "react";
import {IntlProvider as ReactIntlProvider} from "react-intl";
import useLocale from "@store/locale";


const IntlProvider: React.FC<React.PropsWithChildren> = ({children}) => {
    const intl = useLocale();

    return (
        <ReactIntlProvider
            locale={intl.locale}
            messages={intl.messages}
            defaultLocale={intl.defaultLocale}
        >
            {children}
        </ReactIntlProvider>
    );
};

export default IntlProvider;
