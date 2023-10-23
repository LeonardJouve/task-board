import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import useBoards from "@store/boards";
import useColumns, {getColumnsInBoard} from "@store/columns";
import useTags from "@store/tags";
import BoardColumn from "@components/board_column";
import AddItem from "@components/add_item";
import RightSidebar from "@components/right_sidebar";
import type {BoardParams} from "@components/router";

const Board: React.FC = () => {
    const {fetchBoard} = useBoards();
    const {columns, fetchColumns} = useColumns();
    const {fetchTags} = useTags();
    const params = useParams<BoardParams>();
    const boardId = Number(params.boardId);

    useEffect(() => {
        if (!boardId) {
            return;
        }

        fetchBoard(boardId);
        fetchColumns([boardId]);
        fetchTags([boardId]);
    }, [boardId]);

    return (
        <div className="flex flex-1">
            <div className="flex flex-1 flex-row gap-7 p-5">
                {getColumnsInBoard(columns, boardId).map((column) => (
                    <BoardColumn
                        key={`column-${column.id}`}
                        column={column}
                    />
                ))}
                <AddItem
                    className="w-board-column h-full rounded-lg"
                    description="New column"
                    onAdd={console.log}
                />
            </div>
            <RightSidebar/>
        </div>
    );
};

export default Board;
