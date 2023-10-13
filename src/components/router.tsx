import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Main from "@components/main";
import Login from "@components/login";
import Register from "@components/register";

const Rooter: React.FC = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/login" Component={Login}/>
            <Route path="/register" Component={Register}/>
            <Route path="/" Component={Main}/>
        </Routes>
    </BrowserRouter>
);

export default Rooter;
