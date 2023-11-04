import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {FormattedMessage, useIntl} from "react-intl";
import useBoards from "@store/boards";
import useUsers from "@store/users";
import Menu, {MenuTrigger, type Item} from "@components/menu";
import SplitButton from "@components/split_button";
import GenericModal from "@components/modals/generic_modal";
import type {Board} from "@typing/store";

const BoardSelector: React.FC = () => {
    const {formatMessage} = useIntl();
    const navigate = useNavigate();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const {boards, fetchBoards, deleteBoard, leaveBoard} = useBoards();
    const {me} = useUsers();
    const params = useParams();
    const [isLeaveModalOpen, setIsLeaveModalOpen] = useState<boolean>(false);
    const board = boards[Number(params["boardId"])];

    useEffect(() => {
        fetchBoards();
    }, []);

    const handleSelectBoard = (boardId: Board["id"]): void => navigate(`/board/${boardId}`);

    const handleGoToBoardSelection = (): void => navigate("/");


    const handleAskDeleteBoard = (): void => {
        if (!board) {
            return;
        }

        setIsDeleteModalOpen(true);
    };

    const handleDeleteBoard = (): void => {
        if (!board) {
            return;
        }

        deleteBoard(board.id);
    };

    const handleAskLeaveBoard = (): void => {
        if (!board) {
            return;
        }

        setIsLeaveModalOpen(true);
    };

    const handleLeaveBoard = (): void => {
        if (!board) {
            return;
        }

        leaveBoard(board.id);
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
        <>
            <SplitButton
                className="w-[30%] background-2 rounded flex flex-nowrap"
                left={(
                    <Menu
                        name="board-selector"
                        className="max-w-[30%]"
                        placement="bottom-start"
                        triggers={[MenuTrigger.CLICK, MenuTrigger.DISMISS]}
                        button={(
                            <span className="w-full text-start whitespace-nowrap overflow-hidden text-ellipsis">
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
                        button={<i className="icon-dot-menu before:duration-300 before:transition-transform"/>}
                        items={actionItems}
                    />
                )}
            />
            <GenericModal
                isDangerous={true}
                isOpen={isLeaveModalOpen}
                setIsOpen={setIsLeaveModalOpen}
                header={(
                    <FormattedMessage
                        id="components.leave_board_modal.header"
                        defaultMessage="Leave board"
                    />
                )}
                content={(
                    <FormattedMessage
                        id="components.leave_board_modal.content"
                        defaultMessage="Do you really want to leave this board ? You wont be able to join it afterwards."
                    />
                )}
                onConfirm={handleLeaveBoard}
            />
            <GenericModal
                isDangerous={true}
                isOpen={isDeleteModalOpen}
                setIsOpen={setIsDeleteModalOpen}
                header={(
                    <FormattedMessage
                        id="components.delete_board_modal.header"
                        defaultMessage="Delete board"
                    />
                )}
                content={(
                    <FormattedMessage
                        id="components.delete_board_modal.content"
                        defaultMessage="Do you really want to delete this board ? This will also delete all columns contained inside."
                    />
                )}
                onConfirm={handleDeleteBoard}
            />
        </>
    );
};

export default BoardSelector;
