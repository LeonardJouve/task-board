import React from "react";
import ReactDOM from "react-dom/client";
import Header from "@components/header";
import Main from "@components/board";
import RightSidebar from "@components/right_sidebar";

const root = document.querySelector(".root");

if (root) {
    ReactDOM.createRoot(root).render(
        <React.StrictMode>
            <div className="w-screen h-screen flex flex-col">
                <Header/>
                <div className="w-full h-full flex flex-row">
                    <Main/>
                    <RightSidebar/>
                </div>
            </div>
        </React.StrictMode>,
    );
}
