import React from "react";
import {useNavigate} from "react-router-dom";
import useColumns from "@store/columns";
import Avatars from "@components/avatars";
import {Size} from "@components/avatar";
import ColumnPreview from "@components/column_preview";
import type {Board} from "@store/boards";

type Props = {
    board: Board;
}

const BoardPreview: React.FC<Props> = ({board}) => {
    const navigate = useNavigate();
    const {columns} = useColumns();

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
                className="absolute self-end"
                userIds={board.userIds}
                size={Size.S}
            />
            {Object.values(columns).map((column) => (
                <ColumnPreview
                    key={`column-preview-${column.id}`}
                    column={column}
                />
            ))}
        </button>
    );
};

export default BoardPreview;
