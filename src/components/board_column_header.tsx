import React, {useState} from "react";
import type {UpdateColumn} from "@api/rest";
import type {Column} from "@store/columns";
import EditableText from "@components/editable_text";
import BoardColumnHeaderActions from "@components/board_column_header_actions";
import useColumns from "@store/columns";

type Props = {
    column: Column;
    onNewCard: () => void;
}

// TODO: rename / filter / new card

const BoardColumnHeader: React.FC<Props> = ({column, onNewCard}) => {
    const {updateColumn} = useColumns();
    const [isEditingName, setIsEditingName] = useState<boolean>(false);
    const [hover, setHover] = useState<boolean>(false);

    const handleMouseEnter = (): void => setHover(true);

    const handleMouseLeave = (): void => setHover(false);

    const handleUpdateColumn = (updatedColumn: UpdateColumn): void => {
        updateColumn(column.id, updatedColumn);
    };

    return (
        <div
            className="w-full px-2 py-1 bg-white rounded flex flex-row background-4"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <EditableText
                isEditing={isEditingName}
                setIsEditing={setIsEditingName}
                content={column.name}
                setContent={(name): void => handleUpdateColumn({name})}
                className="overflow-hidden whitespace-nowrap text-ellipsis font-bold"
            />
            {hover && (
                <BoardColumnHeaderActions
                    column={column}
                    onNewCard={onNewCard}
                />
            )}
        </div>
    );
};

export default BoardColumnHeader;
