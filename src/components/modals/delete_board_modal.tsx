import React from "react";
import {FormattedMessage} from "react-intl";
import useBoards from "@store/boards";
import GenericModal from "@components/modals/generic_modal";
import {ModalId, type Board} from "@typing/store";

type Props = {
    boardId: Board["id"];
};

const DeleteBoardModal: React.FC<Props> = ({boardId}) => {
    const {deleteBoard} = useBoards();

    const handleDeleteBoard = (): void => {
        deleteBoard(boardId);
    };

    return (
        <GenericModal
            id={ModalId.DELETE_BOARD}
            isDangerous={true}
            header={(
                <FormattedMessage
                    id="components.delete_board.header"
                    defaultMessage="Delete board"
                />
            )}
            content={(
                <FormattedMessage
                    id="components.delete_board.content"
                    defaultMessage="Do you really want to delete this board ? This will also delete all columns contained inside."
                />
            )}
            onConfirm={handleDeleteBoard}
        />
    );
};

export default DeleteBoardModal;
