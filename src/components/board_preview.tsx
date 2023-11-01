import React, {useEffect, useState} from "react";
import {useIntl} from "react-intl";
import {useNavigate} from "react-router-dom";
import useBoards from "@store/boards";
import useColumns, {getColumnsInBoard} from "@store/columns";
import Avatars from "@components/avatars";
import {Size} from "@components/avatar";
import ColumnPreview from "@components/column_preview";
import EditableText from "@components/editable_text";
import type {Board} from "@typing/store";
import type {UpdateBoard} from "@typing/rest";

type Props = {
    board: Board;
};

const BoardPreview: React.FC<Props> = ({board}) => {
    const {formatMessage} = useIntl();
    const navigate = useNavigate();
    const {updateBoard} = useBoards();
    const {columns, fetchColumns} = useColumns();
    const [isHover, setIsHover] = useState<boolean>(false);
    const [isEditingName, setIsEditingName] = useState<boolean>(false);
    const [isEditingDescription, setIsEditingDescription] = useState<boolean>(false);
    const boardColumns = getColumnsInBoard(columns, board.id);

    useEffect(() => {
        fetchColumns([board.id]);
    }, [board]);

    const handleOpenBoard = (): void => {
        navigate(`/board/${board.id}`);
    };

    const handleMouseEnter = (): void => setIsHover(true);

    const handleMouseLeave = (): void => setIsHover(false);

    const handleUpdateBoard = (updatedBoard: UpdateBoard): void => {
        updateBoard(board.id, updatedBoard);
    };

    return (
        <button
            className="rounded-lg min-h-board-preview max-h-board-preview flex flex-col relative p-4 background-2"
            onClick={handleOpenBoard}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="flex flex-row flex-1 gap-2 max-w-full max-h-full overflow-hidden">
                <div className={`flex flex-col gap-2 text-left color-1 max-w-full ${boardColumns.length ? "w-[20%]" : ""}`}>
                    <h2 className="flex text-2xl font-extrabold">
                        <EditableText
                            isEditing={isEditingName}
                            setIsEditing={setIsEditingName}
                            content={board.name}
                            setContent={(updatedName): void => handleUpdateBoard({name: updatedName})}
                            placeholder={formatMessage({
                                id: "components.default_board.name",
                                defaultMessage: "Name",
                            })}
                            isSingleLine={true}
                            isEllipsis={true}
                        />
                    </h2>
                    <span className="flex text-lg overflow-hidden text-ellipsis whitespace-nowrap font-semibold">
                        <EditableText
                            isEditing={isEditingDescription}
                            setIsEditing={setIsEditingDescription}
                            content={board.description}
                            setContent={(updatedDescription): void => handleUpdateBoard({description: updatedDescription})}
                            placeholder={formatMessage({
                                id: "components.default_board.description",
                                defaultMessage: "Description",
                            })}
                            isSingleLine={true}
                            isEllipsis={true}
                        />
                    </span>
                    {isHover && (
                        <Avatars
                            userIds={board.userIds}
                            size={Size.S}
                        />
                    )}
                </div>
                <div className="flex flex-row gap-4 overflow-hidden color-2">
                    {boardColumns.map((column) => (
                        <ColumnPreview
                            key={`column-preview-${column.id}`}
                            column={column}
                        />
                    ))}
                </div>
            </div>
        </button>
    );
};

export default BoardPreview;
