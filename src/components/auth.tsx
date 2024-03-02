import React from "react";
import {FormattedMessage} from "react-intl";
import ThemeSelector from "@components/theme_selector";
import Favicon from "@icons/favicon.svg";

type Props = React.PropsWithChildren;

const Auth: React.FC<Props> = ({children}) => (
    <div className="flex flex-1 flex-col">
        <div className="flex flex-row px-5 py-3 border-color-1 border-b-[1px] background-1 color-1 font-extrabold items-center gap-2">
            <img
                className="w-8 h-8"
                src={Favicon}
            />
            <h2 className="text-2xl">
                <FormattedMessage
                    id="components.application.name"
                    defaultMessage="Taskboard"
                />
            </h2>
            <div className="mr-0 ml-auto">
                <ThemeSelector/>
            </div>
        </div>
        <div className="flex flex-1 background-1 justify-center items-center flex-col p-4">
            <div className="color-2 px-7 py-5 background-2 rounded-lg">
                {children}
            </div>
        </div>
    </div>
);

export default Auth;
