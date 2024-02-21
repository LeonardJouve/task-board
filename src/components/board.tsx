import React, {useEffect} from "react";
import {useShallow} from "zustand/react/shallow";
import {DragDropContext, Draggable, Droppable, type DropResult} from "@hello-pangea/dnd";
import useColumns, {getSortedColumnsInCurrentBoard} from "@store/columns";
import useBoards from "@store/boards";
import useTags from "@store/tags";
import BoardColumn from "@components/board_column";
import AddItem from "@components/add_item";
import RightSidebar from "@components/right_sidebar";
import useCards, {getCard, getSortedCardsInColumn} from "@store/cards";

export enum DroppableType {
    BOARD_COLUMNS = "board-columns",
    BOARD_CARDS = "board-cards",
}

export enum DragDropPrefix {
    BOARD_DROPPABLE = "board-droppable-",
    COLUMN_DROPPABLE = "column-droppable-",
    COLUMN_DRAGGABLE = "column-draggable-",
    CARD_DRAGGABLE = "card-draggable-",
}

const Board: React.FC = () => {
    const currentBoardId = useBoards(({currentBoardId}) => currentBoardId);
    const {fetchColumns, createColumn, moveColumn} = useColumns(useShallow(({fetchColumns, createColumn, moveColumn}) => ({fetchColumns, createColumn, moveColumn})));
    const boardColumns = useColumns(getSortedColumnsInCurrentBoard());
    const cardsState = useCards();
    const fetchTags = useTags(({fetchTags}) => fetchTags);

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

    const handleDragEnd = (result: DropResult): void => {
        if (result.reason !== "DROP") {
            return;
        }

        switch (result.type) {
        case DroppableType.BOARD_COLUMNS: {
            const columnId = parseInt(result.draggableId.replace(DragDropPrefix.COLUMN_DRAGGABLE, ""));

            let index = result.destination?.index;
            if (index === undefined) {
                break;
            }
            if (result.source.index < index) {
                ++index;
            }

            const nextId = boardColumns[index]?.id ?? null;

            moveColumn(columnId, nextId);
            break;
        }
        case DroppableType.BOARD_CARDS: {
            const cardId = parseInt(result.draggableId.replace(DragDropPrefix.CARD_DRAGGABLE, ""));

            const droppableId = result.destination?.droppableId;
            if (!droppableId) {
                break;
            }

            const columnId = parseInt(droppableId.replace(DragDropPrefix.COLUMN_DROPPABLE, ""));

            let index = result.destination?.index;
            if (index === undefined) {
                break;
            }

            const card = getCard(cardId)(cardsState);

            if (columnId === card?.columnId && result.source.index < index) {
                ++index;
            }

            const nextId = getSortedCardsInColumn(columnId)(cardsState)[index]?.id ?? null;

            cardsState.moveCard(cardId, columnId, nextId);
            break;
        }
        }
    };

    return (
        <div className="flex flex-1 background-1">
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="flex flex-1 flex-row gap-7 p-5 overflow-x-scroll">
                    {boardColumns.length ? (
                        <Droppable
                            droppableId={DragDropPrefix.BOARD_DROPPABLE + currentBoardId}
                            direction="horizontal"
                            type={DroppableType.BOARD_COLUMNS}
                        >
                            {(droppableProvided): React.JSX.Element => (
                                <div
                                    className="flex flex-row gap-7"
                                    ref={droppableProvided.innerRef}
                                    {...droppableProvided.droppableProps}
                                >
                                    {boardColumns.map(({id}, index) => (
                                        <Draggable
                                            key={DragDropPrefix.COLUMN_DRAGGABLE + id}
                                            draggableId={DragDropPrefix.COLUMN_DRAGGABLE + id}
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
