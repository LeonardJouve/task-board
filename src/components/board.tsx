import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {DragDropContext, Draggable, Droppable, type DropResult, type ResponderProvided} from "@hello-pangea/dnd";
import useColumns, {getColumnsInBoard} from "@store/columns";
import useTags from "@store/tags";
import BoardColumn from "@components/board_column";
import AddItem from "@components/add_item";
import RightSidebar from "@components/right_sidebar";

export enum DroppableType {
    BOARD_COLUMNS = "board-columns",
    BOARD_CARDS = "board-cards",
}

const Board: React.FC = () => {
    const {columns, fetchColumns, createColumn} = useColumns();
    const {fetchTags} = useTags();
    const params = useParams();
    const boardId = Number(params["boardId"]);
    const boardColumns = getColumnsInBoard(columns, boardId);

    useEffect(() => {
        if (!boardId) {
            return;
        }

        fetchColumns([boardId]);
        fetchTags([boardId]);
    }, [boardId]);

    const handleNewColumn = (): void => {
        createColumn({boardId});
    };

    const handleDragEnd = (result: DropResult, provided: ResponderProvided): void => {
        console.log(result, provided);
    };

    if (!boardId) {
        return null;
    }

    return (
        <div className="flex flex-1 background-1">
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="flex flex-1 flex-row gap-7 p-5 overflow-x-scroll">
                    {boardColumns.length ? (
                        <Droppable
                            droppableId={`board-${boardId}`}
                            direction="horizontal"
                            type={DroppableType.BOARD_COLUMNS}
                        >
                            {(droppableProvided): React.JSX.Element => (
                                <div
                                    className="flex flex-row gap-7"
                                    ref={droppableProvided.innerRef}
                                    {...droppableProvided.droppableProps}
                                >
                                    {boardColumns.map((column, index) => (
                                        <Draggable
                                            key={`board-column-${column.id}`}
                                            draggableId={`board-column-${column.id}`}
                                            index={index}
                                        >
                                            {(draggableProvided): React.JSX.Element => (
                                                <div
                                                    ref={draggableProvided.innerRef}
                                                    {...draggableProvided.draggableProps}
                                                    {...draggableProvided.dragHandleProps}
                                                >
                                                    <BoardColumn column={column}/>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {droppableProvided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ) : null}
                    <AddItem
                        className="min-w-board-column max-w-board-column h-full rounded-lg background-2 color-2 hover"
                        onAdd={handleNewColumn}
                    />
                </div>
            </DragDropContext>
            <RightSidebar/>
        </div>
    );
};

export default Board;
