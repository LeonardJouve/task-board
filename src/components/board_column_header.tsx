import React, {useState} from "react";
import {useIntl} from "react-intl";
import EditableText from "@components/editable_text";
import BoardColumnHeaderActions from "@components/board_column_header_actions";
import useColumns from "@store/columns";
import type {UpdateColumn} from "@typing/rest";
import type {Column} from "@typing/store";

type Props = {
    column: Column;
    onNewCard: () => void;
}

// TODO: rename / filter / new card

const BoardColumnHeader: React.FC<Props> = ({column, onNewCard}) => {
    const {formatMessage} = useIntl();
    const {updateColumn} = useColumns();
    const [isEditingName, setIsEditingName] = useState<boolean>(false);

    const handleUpdateColumn = (updatedColumn: UpdateColumn): void => {
        updateColumn(column.id, updatedColumn);
    };

    return (
        <div className="group w-full px-2 py-1 rounded flex flex-row background-4 justify-between">
            <EditableText
                className="font-bold"
                isEditing={isEditingName}
                setIsEditing={setIsEditingName}
                content={column.name}
                setContent={(name): void => handleUpdateColumn({name})}
                placeholder={formatMessage({
                    id: "components.default_column.name",
                    defaultMessage: "Name",
                })}
                isSingleLine={true}
                isEllipsis={true}
            />
            {!isEditingName && (
                <div className="group-hover:block hidden">
                    <BoardColumnHeaderActions
                        column={column}
                        onNewCard={onNewCard}
                    />
                </div>
            )}
        </div>
    );
};

export default BoardColumnHeader;
