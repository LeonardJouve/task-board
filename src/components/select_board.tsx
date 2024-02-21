import React, {useEffect} from "react";
import {useShallow} from "zustand/react/shallow";
import useBoards from "@store/boards";
import BoardPreview from "@components/board_preview";
import AddItem from "@components/add_item";

const SelectBoard: React.FC = () => {
    const {boards, createBoard, fetchBoards} = useBoards(useShallow(({boards, createBoard, fetchBoards}) => ({boards, createBoard, fetchBoards})));

    useEffect(() => {
        fetchBoards();
    }, []);

    const handleNewBoard = (): void => {
        createBoard({});
    };

    return (
        <div className="flex flex-1 flex-col p-5 gap-5 background-1 overflow-y-scroll">
            {Object.values(boards).map(({id}) => (
                <BoardPreview
                    boardId={id}
                    key={`board-preview-${id}`}
                />
            ))}
            <AddItem
                className="min-h-board-preview max-h-board-preview rounded-lg background-3 color-2 hover"
                onAdd={handleNewBoard}
            />
        </div>
    );
};

export default SelectBoard;
