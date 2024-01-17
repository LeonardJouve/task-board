import React, {useEffect} from "react";
import {DragDropContext, Draggable, Droppable, type DropResult, type ResponderProvided} from "@hello-pangea/dnd";
import useColumns, {getColumnsInCurrentBoard, sortColumns} from "@store/columns";
import useBoards from "@store/boards";
import useTags from "@store/tags";
import BoardColumn from "@components/board_column";
import AddItem from "@components/add_item";
import RightSidebar from "@components/right_sidebar";

export enum DroppableType {
    BOARD_COLUMNS = "board-columns",
    BOARD_CARDS = "board-cards",
}

const Board: React.FC = () => {
    const {currentBoardId} = useBoards();
    const {fetchColumns, createColumn} = useColumns();
    const boardColumns = useColumns(getColumnsInCurrentBoard());
    const {fetchTags} = useTags();

    useEffect(() => {
        if (!currentBoardId) {
            return;
        }

        fetchColumns([currentBoardId]);
        fetchTags([currentBoardId]);
    }, [currentBoardId]);

    if (!currentBoardId) {
        return null;
    }

    const handleNewColumn = (): void => {
        createColumn({boardId: currentBoardId});
    };

    const handleDragEnd = (result: DropResult, provided: ResponderProvided): void => {
        console.log(result, provided);
    };

    return (
        <div className="flex flex-1 background-1">
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="flex flex-1 flex-row gap-7 p-5 overflow-x-scroll">
                    {boardColumns.length ? (
                        <Droppable
                            droppableId={`board-${currentBoardId}`}
                            direction="horizontal"
                            type={DroppableType.BOARD_COLUMNS}
                        >
                            {(droppableProvided): React.JSX.Element => (
                                <div
                                    className="flex flex-row gap-7"
                                    ref={droppableProvided.innerRef}
                                    {...droppableProvided.droppableProps}
                                >
                                    {sortColumns(boardColumns).map(({id}, index) => (
                                        <Draggable
                                            key={`board-column-${id}`}
                                            draggableId={`board-column-${id}`}
                                            index={index}
                                        >
                                            {(draggableProvided): React.JSX.Element => (
                                                <div
                                                    ref={draggableProvided.innerRef}
                                                    {...draggableProvided.draggableProps}
                                                    {...draggableProvided.dragHandleProps}
                                                >
                                                    <BoardColumn columnId={id}/>
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
