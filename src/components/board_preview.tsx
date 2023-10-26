import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import useColumns, {getColumnsInBoard} from "@store/columns";
import Avatars from "@components/avatars";
import {Size} from "@components/avatar";
import ColumnPreview from "@components/column_preview";
import type {Board} from "@store/boards";

type Props = {
    board: Board;
}

const BoardPreview: React.FC<Props> = ({board}) => {
    const navigate = useNavigate();
    const {columns, fetchColumns} = useColumns();
    const [isHover, setIsHover] = useState<boolean>(false);

    useEffect(() => {
        fetchColumns([board.id]);
    }, [board]);

    const handleOpenBoard = (): void => {
        navigate(`/board/${board.id}`);
    };

    const handleMouseEnter = (): void => setIsHover(true);

    const handleMouseLeave = (): void => setIsHover(false);

    return (
        <button
            className="rounded-lg min-h-board-preview max-h-board-preview flex flex-col relative p-4 background-2"
            onClick={handleOpenBoard}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="flex flex-row flex-1 gap-2 max-w-full max-h-full">
                <div className="flex flex-col flex-1 gap-2 text-left max-w-[20%] color-1">
                    <h2 className="text-2xl overflow-hidden text-ellipsis whitespace-nowrap font-extrabold">
                        {board.name}
                    </h2>
                    <span className="text-lg overflow-hidden text-ellipsis whitespace-nowrap font-semibold">
                        {board.description}
                    </span>
                    {isHover && (
                        <Avatars
                            userIds={board.userIds}
                            size={Size.S}
                        />
                    )}
                </div>
                <div className="flex flex-row gap-4 flex-[4_4_0%] overflow-hidden color-2">
                    {getColumnsInBoard(columns, board.id).map((column) => (
                        <ColumnPreview
                            key={`column-preview-${column.id}`}
                            column={column}
                        />
                    ))}
                </div>
            </div>
        </button>
    );
};

export default BoardPreview;
