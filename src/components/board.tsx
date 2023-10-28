import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import useColumns, {getColumnsInBoard} from "@store/columns";
import useTags from "@store/tags";
import BoardColumn from "@components/board_column";
import AddItem from "@components/add_item";
import RightSidebar from "@components/right_sidebar";

const Board: React.FC = () => {
    const {columns, fetchColumns, createColumn} = useColumns();
    const {fetchTags} = useTags();
    const params = useParams();
    const boardId = Number(params["boardId"]);

    useEffect(() => {
        if (!boardId) {
            return;
        }

        fetchColumns([boardId]);
        fetchTags([boardId]);
    }, [boardId]);

    const handleNewColumn = (): void => {
        createColumn({boardId});
    };

    if (!boardId) {
        return null;
    }

    return (
        <div className="flex flex-1 background-1">
            <div className="flex flex-1 flex-row gap-7 p-5 overflow-x-scroll">
                {getColumnsInBoard(columns, boardId).map((column) => (
                    <BoardColumn
                        key={`column-${column.id}`}
                        column={column}
                    />
                ))}
                <AddItem
                    className="min-w-board-column max-w-board-column h-full rounded-lg background-2 color-2 hover"
                    onAdd={handleNewColumn}
                />
            </div>
            <RightSidebar/>
        </div>
    );
};

export default Board;
