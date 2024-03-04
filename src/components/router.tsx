import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "@components/login";
import Register from "@components/register";
import AuthGuard from "@components/auth_guard";
import Board from "@components/board";
import SelectBoard from "@components/select_board";
import Header from "@components/header";
import BoardProvider from "@components/board_provider";
import ErrorBanner from "@components/error_banner";
import AuthHeader from "@components/auth_header";

const Router: React.FC = () => (
    <BrowserRouter>
        <Routes>
            <Route
                path="/login"
                element={(
                    <AuthHeader>
                        <Login/>
                    </AuthHeader>
                )}
            />
            <Route
                path="/register"
                element={(
                    <AuthHeader>
                        <Register/>
                    </AuthHeader>
                )}
            />
            <Route
                path="/*"
                element={
                    <AuthGuard>
                        <Header/>
                        <ErrorBanner/>
                        <Routes>
                            <Route
                                path="/board/:boardId"
                                element={(
                                    <BoardProvider>
                                        <Board/>
                                    </BoardProvider>
                                )}
                            />
                            <Route
                                path="/"
                                element={(
                                    <BoardProvider>
                                        <SelectBoard/>
                                    </BoardProvider>
                                )}
                            />
                        </Routes>
                    </AuthGuard>
                }
            />
        </Routes>
    </BrowserRouter>
);

export default Router;
