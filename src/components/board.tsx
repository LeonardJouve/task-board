import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import useColumns, {getColumns} from "@store/columns";
import useTags from "@store/tags";
import BoardColumn from "@components/board_column";
import AddItem from "@components/add_item";
import RightSidebar from "@components/right_sidebar";
import type {BoardParams} from "@components/router";

const Board: React.FC = () => {
    const {columns, fetchColumns} = useColumns(getColumns);
    const {fetchTags} = useTags();
    const {boardId} = useParams<BoardParams>();

    useEffect(() => {
        if (boardId) {
            fetchColumns([Number(boardId)]);
            fetchTags([Number(boardId)]);
        }
    }, [boardId]);

    return (
        <div className="flex flex-1">
            <div className="flex flex-1 flex-row gap-7 p-5">
                {columns.map((column) => (
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
