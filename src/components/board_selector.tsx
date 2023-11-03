import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {FormattedMessage} from "react-intl";
import useBoards from "@store/boards";
import Menu, {MenuTrigger} from "@components/menu";

const BoardSelector: React.FC = () => {
    const {boards, fetchBoards} = useBoards();
    const params = useParams();
    const board = boards[Number(params["boardId"])];

    useEffect(() => {
        fetchBoards();
    }, []);

    // ${isOpen ? "before:-rotate-180" : "before:rotate-0"}

    return (
        <Menu
            name="board-selector"
            className="max-w-[30%]"
            placement="bottom-start"
            triggers={[MenuTrigger.CLICK, MenuTrigger.DISMISS]}
            button={(
                <button className="background-2 hover px-2 py-1 rounded">
                    {board?.name ?? (
                        <FormattedMessage
                            id="components.board_selector.select_board"
                            defaultMessage="Select board"
                        />
                    )}
                    <i className="icon-chevron-up before:duration-300 before:transition-transform"/>
                </button>
            )}
            items={Object.values(boards).map((b) => ({
                text: b.name,
                isSelected: b.id === board?.id,
            }))}
        />
    );
};

export default BoardSelector;
