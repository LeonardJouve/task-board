import React, {useState} from "react";
import type {Column} from "@store/columns";
import EditableText from "@components/editable_text";
import BoardColumnHeaderActions from "@components/board_column_header_actions";

type Props = {
    column: Column;
}

// TODO: rename / filter / new card

const BoardColumnHeader: React.FC<Props> = ({column}) => {
    const [isEditingName, setIsEditingName] = useState<boolean>(false);
    const [hover, setHover] = useState<boolean>(false);

    const handleMouseEnter = (): void => setHover(true);

    const handleMouseLeave = (): void => setHover(false);

    return (
        <div
            className="w-full px-2 py-1 bg-white rounded flex flex-row"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <span className="font-bold flex flex-1">
                <EditableText
                    isEditing={isEditingName}
                    setIsEditing={setIsEditingName}
                    content={column.name}
                    setContent={console.log}
                />
            </span>
            {hover && <BoardColumnHeaderActions column={column}/>}
        </div>
    );
};

export default BoardColumnHeader;
