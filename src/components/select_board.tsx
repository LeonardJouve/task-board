import React, {useEffect, useState} from "react";
import useBoards from "@store/boards";
import BoardPreview from "@components/board_preview";
import AddItem from "@components/add_item";
import NewBoardModal from "@components/modals/new_board_modal";

const SelectBoard: React.FC = () => {
    const {boards, createBoard, fetchBoards} = useBoards();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        fetchBoards();
    }, []);

    const handleNewBoard = (): void => {
        createBoard({});
    };

    return (
        <div className="flex flex-1 flex-col p-8 gap-5 background-1 overflow-y-scroll">
            {Object.values(boards).map((board) => (
                <BoardPreview
                    board={board}
                    key={`board-preview-${board.id}`}
                />
            ))}
            <AddItem
                className="min-h-board-preview max-h-board-preview rounded-lg background-3 color-2 hover"
                onAdd={handleNewBoard}
            />
            <NewBoardModal
                open={isModalOpen}
                setOpen={setIsModalOpen}
            />
        </div>
    );
};

export default SelectBoard;
