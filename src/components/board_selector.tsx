import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {FormattedMessage} from "react-intl";
import useBoards from "@store/boards";

const BoardSelector: React.FC = () => {
    const {boards, fetchBoards} = useBoards();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const params = useParams();
    const board = boards[Number(params["boardId"])];

    useEffect(() => {
        fetchBoards();
    }, []);

    const handleOpen = (): void => setIsOpen(!isOpen);

    return (
        <>
            <button
                className="background-2 hover px-2 py-1 rounded"
                onClick={handleOpen}
            >
                {board?.name ?? (
                    <FormattedMessage
                        id="components.board_selector.select_board"
                        defaultMessage="Select board"
                    />
                )}
                <i className={`icon-chevron-up before:duration-300 before:transition-transform ${isOpen ? "before:rotate-180" : "before:rotate-0"}`}/>
            </button>
        </>
    );
};

export default BoardSelector;
