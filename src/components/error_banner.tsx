import React, {useEffect, useRef} from "react";
import {useShallow} from "zustand/react/shallow";
import {FormattedMessage} from "react-intl";
import useErrors from "@store/errors";

const ErrorBanner: React.FC = () => {
    const {error, setError} = useErrors(useShallow(({error, setError}) => ({error, setError})));
    const errorTimeout = useRef<number|null>(null);

    useEffect(() => {
        if (errorTimeout.current) {
            window.clearTimeout(errorTimeout.current);
        }

        errorTimeout.current = window.setTimeout(() => setError(null), 10000);
    }, [error]);

    if (!error) {
        return null;
    }

    const {action, message} = error;

    const handleClose = (): void => {
        if (errorTimeout.current) {
            window.clearTimeout(errorTimeout.current);
        }

        setError(null);
    };

    return (
        <div
            className="flex flex-row items-center p-2 background-dangerous-1 color-dangerous justify-center text-2xl gap-1 relative"
            onClick={action}
        >
            <i className="icon-danger text-3xl"/>
            <FormattedMessage
                id="components.error_banner.error"
                defaultMessage="An error occured: {message}"
                values={{message: <FormattedMessage {...message}/>}}/>
            <i
                className="icon-close absolute top-0 right-0 cursor-pointer"
                onClick={handleClose}
            />
        </div>
    );
};

export default ErrorBanner;
