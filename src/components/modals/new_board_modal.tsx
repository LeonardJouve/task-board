import React from "react";
import {FormattedMessage} from "react-intl";
import GenericModal from "@components/modals/generic_modal";

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const NewBoardModal: React.FC<Props> = ({open, setOpen}) => {
    const handleConfirm = console.log;

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
            content={<></>}
            onConfirm={handleConfirm}
        />
    );
};

export default NewBoardModal;
