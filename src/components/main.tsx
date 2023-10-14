import React from "react";
import AuthGuard from "@components/auth_guard";
import RightSidebar from "@components/right_sidebar";
import Header from "@components/header";
import Board from "@components/board";

const Main: React.FC = () => (
    <AuthGuard>
        <Header/>
        <div className="w-full h-full flex flex-row">
            <Board/>
            <RightSidebar/>
        </div>
    </AuthGuard>
);

export default Main;
