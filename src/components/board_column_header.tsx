import React, {useState} from "react";
import {useIntl} from "react-intl";
import EditableText from "@components/editable_text";
import BoardColumnHeaderActions from "@components/board_column_header_actions";
import useColumns, {getColumn} from "@store/columns";
import type {UpdateColumn} from "@typing/rest";
import type {Column, Tag} from "@typing/store";

type Props = {
    columnId: Column["id"];
    filterTagId: Tag["id"]|null;
    setFilterTagId: (tagId: Tag["id"]|null) => void;
    handleNewCard: () => void;
};

const BoardColumnHeader: React.FC<Props> = ({columnId, filterTagId, setFilterTagId, handleNewCard}) => {
    const {formatMessage} = useIntl();
    const updateColumn = useColumns(({updateColumn}) => updateColumn);
    const column = useColumns(getColumn(columnId));
    const [isEditingName, setIsEditingName] = useState<boolean>(false);

    if (!column) {
        return null;
    }

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
                        columnId={column.id}
                        filterTagId={filterTagId}
                        setFilterTagId={setFilterTagId}
                        handleNewCard={handleNewCard}
                    />
                </div>
            )}
        </div>
    );
};

export default BoardColumnHeader;
