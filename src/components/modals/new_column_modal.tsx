import React from "react";
import {FormattedMessage} from "react-intl";
import GenericModal from "@components/modals/generic_modal";
import type {Board} from "@store/boards";

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    boardId: Board["id"];
};

const NewColumnModal: React.FC<Props> = ({open, setOpen, boardId}) => {
    const handleConfirm = console.log;

    return (
        <GenericModal
            open={open}
            setOpen={setOpen}
            header={(
                <FormattedMessage
                    id="components.new_column_modal.header"
                    defaultMessage="Create a new column"
                />
            )}
            content={<></>}
            onConfirm={handleConfirm}
        />
    );
};

export default NewColumnModal;
