import React from "react";
import ReactDOM from "react-dom/client";
import IntlProvider from "@components/intl_provider";
import Router from "@components/router";

const root = document.querySelector(".root");

if (root) {
    ReactDOM.createRoot(root).render(
        <React.StrictMode>
            <IntlProvider>
                <div className="w-screen h-screen flex flex-col">
                    <Router/>
                </div>
            </IntlProvider>
        </React.StrictMode>,
    );
}
