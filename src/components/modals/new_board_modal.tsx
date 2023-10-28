import React from "react";
import {FormattedMessage} from "react-intl";
import useBoards from "@store/boards";
import GenericModal from "@components/modals/generic_modal";

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const NewBoardModal: React.FC<Props> = ({open, setOpen}) => {
    const {createBoard} = useBoards();

    const handleConfirm = (): void => {
        createBoard({});
    };

    const content = (<></>);

    return (
        <GenericModal
            open={open}
            setOpen={setOpen}
            header={(
                <FormattedMessage
                    id="components.new_board_modal.header"
                    defaultMessage="Create a new board"
                />
            )}
            content={content}
            onConfirm={handleConfirm}
        />
    );
};

export default NewBoardModal;
