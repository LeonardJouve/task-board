import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "@components/login";
import Register from "@components/register";
import AuthGuard from "@components/auth_guard";
import Board from "@components/board";
import SelectBoard from "@components/select_board";
import Header from "./header";

const Rooter: React.FC = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route
                path="/*"
                element={
                    <AuthGuard>
                        <Header/>
                        <Routes>
                            <Route path="/board/:boardId" element={<Board/>}/>
                            <Route path="/" element={<SelectBoard/>}/>
                        </Routes>
                    </AuthGuard>
                }
            />
        </Routes>
    </BrowserRouter>
);

export default Rooter;
