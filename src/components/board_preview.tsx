import React from "react";
import {useNavigate} from "react-router-dom";
import type {Board} from "@store/boards";
import Avatars from "@components/avatars";
import {Size} from "@components/avatar";

type Props = {
    board: Board;
}

const BoardPreview: React.FC<Props> = ({board}) => {
    const navigate = useNavigate();

    const handleOpenBoard = (): void => {
        navigate(`/board/${board.id}`);
    };

    return (
        <button
            className="border-gray-300 border-[1px] rounded-lg h-board-preview flex flex-col relative p-4"
            onClick={handleOpenBoard}
        >
            <div className="flex flex-col">
                <h2 className="flex text-2xl">
                    {board.name}
                </h2>
                <span className="flex text-lg">
                    {board.description}
                </span>
            </div>
            <Avatars
                className="absolute right-2 top-2"
                userIds={board.userIds}
                size={Size.S}
            />
        </button>
    );
};

export default BoardPreview;
