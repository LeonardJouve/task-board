import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import useBoards from "@store/boards";
import useColumns, {getColumnsInBoard} from "@store/columns";
import useTags from "@store/tags";
import BoardColumn from "@components/board_column";
import AddItem from "@components/add_item";
import RightSidebar from "@components/right_sidebar";
import NewColumnModal from "@components/modals/new_column_modal";

const Board: React.FC = () => {
    const {fetchBoard} = useBoards();
    const {columns, fetchColumns} = useColumns();
    const {fetchTags} = useTags();
    const params = useParams();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const boardId = Number(params["boardId"]);

    useEffect(() => {
        if (!boardId) {
            return;
        }

        fetchBoard(boardId);
        fetchColumns([boardId]);
        fetchTags([boardId]);
    }, [boardId]);

    const handleNewColumn = (): void => setIsModalOpen(true);

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
                    className="min-w-board-column max-w-board-column h-full rounded-lg background-2 color-2"
                    onAdd={handleNewColumn}
                />
                <NewColumnModal
                    open={isModalOpen}
                    setOpen={setIsModalOpen}
                    boardId={boardId}
                />
            </div>
            <RightSidebar/>
        </div>
    );
};

export default Board;
