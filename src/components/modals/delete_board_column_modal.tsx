import React from "react";
import {FormattedMessage} from "react-intl";
import useColumns from "@store/columns";
import GenericModal from "@components/modals/generic_modal";
import {ModalId, type Column} from "@typing/store";

type Props = {
    columnId: Column["id"];
};

const DeleteBoardColumnModal: React.FC<Props> = ({columnId}) => {
    const deleteColumn = useColumns(({deleteColumn}) => deleteColumn);

    const handleDelete = (): void => {
        deleteColumn(columnId);
    };

    return (
        <GenericModal
            id={ModalId.DELETE_BOARD_COLUMN}
            isDangerous={true}
            header={(
                <FormattedMessage
                    id="components.delete_board_column.header"
                    defaultMessage="Delete column"
                />
            )}
            content={(
                <FormattedMessage
                    id="components.delete_board_column.content"
                    defaultMessage="Do you really want to delete this column ? This will also delete all cards contained inside."
                />
            )}
            onConfirm={handleDelete}
        />
    );
};

export default DeleteBoardColumnModal;
