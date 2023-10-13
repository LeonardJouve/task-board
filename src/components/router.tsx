import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Main from "@components/main";
import Auth from "@components/auth";

const Rooter: React.FC = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/login" Component={Auth}/>
            <Route path="/register" Component={Auth}/>
            <Route path="/" Component={Main}/>
        </Routes>
    </BrowserRouter>
);

export default Rooter;
