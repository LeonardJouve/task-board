import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {FormattedMessage, useIntl} from "react-intl";
import useBoards, {getCurrentBoard} from "@store/boards";
import useUsers from "@store/users";
import useModals from "@store/modals";
import Menu, {MenuTrigger, type Item} from "@components/menu";
import SplitButton from "@components/split_button";
import {ModalId, type Board} from "@typing/store";

const BoardSelector: React.FC = () => {
    const {formatMessage} = useIntl();
    const navigate = useNavigate();
    const {boards, fetchBoards} = useBoards();
    const board = useBoards(getCurrentBoard());
    const {me} = useUsers();
    const {openModal} = useModals();

    useEffect(() => {
        fetchBoards();
    }, []);

    const handleSelectBoard = (boardId: Board["id"]): void => navigate(`/board/${boardId}`);

    const handleGoToBoardSelection = (): void => navigate("/");

    const handleAskDeleteBoard = (): void => {
        if (!board) {
            return;
        }

        openModal({
            id: ModalId.DELETE_BOARD,
            props: {boardId: board.id},
        });
    };

    const handleAskLeaveBoard = (): void => {
        if (!board) {
            return;
        }

        openModal({
            id: ModalId.LEAVE_BOARD,
            props: {boardId: board.id},
        });
    };

    const actionItems: Item[] = [
        {
            leftDecorator: "leave",
            text: formatMessage({
                id: "components.board_action_menu.leave_board",
                defaultMessage: "Leave board",
            }),
            isDangerous: true,
            onPress: handleAskLeaveBoard,
        },
    ];

    if (board?.ownerId !== me?.id) {
        actionItems.unshift({
            leftDecorator: "delete",
            text: formatMessage({
                id: "components.board_action_menu.delete_board",
                defaultMessage: "Delete board",
            }),
            isDangerous: true,
            onPress: handleAskDeleteBoard,
        });
    }

    const selectItems: Item[] = Object.values(boards).map((b) => ({
        text: b.name || formatMessage({
            id: "components.default_board.name",
            defaultMessage: "Name",
        }),
        isSelected: b.id === board?.id,
        onPress: () => handleSelectBoard(b.id),
    }));

    if (board) {
        selectItems.unshift({
            text: formatMessage({
                id: "components.board_selector.select_board",
                defaultMessage: "Select board",
            }),
            rightDecorator: "globe",
            onPress: handleGoToBoardSelection,
        });
    }

    return (
        <SplitButton
            className="w-[30%] background-2 rounded flex flex-nowrap"
            left={(
                <Menu
                    name="board-selector"
                    className="max-w-[30%]"
                    placement="bottom-start"
                    triggers={[MenuTrigger.CLICK, MenuTrigger.DISMISS]}
                    button={(
                        <span className="px-2 py-1 w-full text-start whitespace-nowrap overflow-hidden text-ellipsis">
                            {board ? board.name || formatMessage({
                                id: "components.default_board.name",
                                defaultMessage: "Name",
                            }) : (
                                <FormattedMessage
                                    id="components.board_selector.select_board"
                                    defaultMessage="Select board"
                                />
                            )}
                        </span>
                    )}
                    items={selectItems}
                />
            )}
            right={board && (
                <Menu
                    name="board-actions"
                    className="max-w-[30%]"
                    placement="bottom-start"
                    triggers={[MenuTrigger.CLICK, MenuTrigger.DISMISS]}
                    button={<i className="px-1 py-1 icon-dot-menu before:duration-300 before:transition-transform"/>}
                    items={actionItems}
                />
            )}
        />
    );
};

export default BoardSelector;
