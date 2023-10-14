import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "@components/login";
import Register from "@components/register";
import AuthGuard from "@components/auth_guard";
import Board from "@components/board";
import SelectBoard from "@components/select_board";
import Header from "@components/header";
import useBoards from "@store/boards";

export type BoardParams = {
    boardId: string;
};

const Rooter: React.FC = () => {
    const {fetchBoard, fetchBoards} = useBoards();

    return (
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
                                <Route
                                    path="/board/:boardId"
                                    element={<Board/>}
                                    loader={async ({params}): Promise<void> => await fetchBoard(Number(params["boardId"]))}
                                />
                                <Route
                                    path="/"
                                    element={<SelectBoard/>}
                                    loader={async (): Promise<void> => await fetchBoards()}
                                />
                            </Routes>
                        </AuthGuard>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default Rooter;
