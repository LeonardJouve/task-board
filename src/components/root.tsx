import React from "react";
import ReactDOM from "react-dom/client";
import IntlProvider from "@components/intl_provider";
import Router from "@components/router";
import Modals from "@components/modals/modals";

const root = document.getElementById("root");

if (root) {
    ReactDOM.createRoot(root).render(
        <React.StrictMode>
            <IntlProvider>
                <div className="w-screen h-screen flex flex-col">
                    <Router/>
                </div>
                <Modals/>
            </IntlProvider>
        </React.StrictMode>,
    );
}
