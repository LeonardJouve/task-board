import React from "react";
import {FormattedMessage} from "react-intl";
import useBoards from "@store/boards";
import GenericModal from "@components/modals/generic_modal";
import {ModalId, type Board} from "@typing/store";

type Props = {
    boardId: Board["id"];
};

const LeaveBoardModal: React.FC<Props> = ({boardId}) => {
    const leaveBoard = useBoards(({leaveBoard}) => leaveBoard);

    const handleLeaveBoard = (): void => {
        leaveBoard(boardId);
    };

    return (
        <GenericModal
            id={ModalId.LEAVE_BOARD}
            isDangerous={true}
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
    );
};

export default LeaveBoardModal;
