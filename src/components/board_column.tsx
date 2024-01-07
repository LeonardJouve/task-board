import React, {useEffect, useState} from "react";
import {Draggable, Droppable} from "@hello-pangea/dnd";
import useCards, {getCardsInColumn} from "@store/cards";
import BoardColumnHeader from "@components/board_column_header";
import BoardCard from "@components/board_card";
import AddItem from "@components/add_item";
import {DroppableType} from "@components/board";
import {ModalId, type Column, type Tag} from "@typing/store";
import useModals from "@store/modals";

type Props = {
    column: Column;
};

const BoardColumn: React.FC<Props> = ({column}) => {
    const {cards, fetchCards, createCard} = useCards();
    const {openModal} = useModals();
    const [filterTagId, setFilterTagId] = useState<Tag["id"]|null>(null);

    useEffect(() => {
        fetchCards([column.id]);
    }, [column]);

    const handleCreateCard = async (): Promise<void> => {
        const card = await createCard({
            columnId: column.id,
        });

        if (!card) {
            return;
        }

        openModal({
            id: ModalId.BOARD_CARD,
            props: {card},
        });
    };

    const columnCards = getCardsInColumn(cards, column.id)
        .filter((card) => filterTagId === null || card.tagIds.includes(filterTagId));

    return (
        <div className="min-w-board-column max-w-board-column background-3 rounded-lg flex flex-col items-center gap-2 p-3 color-2">
            <BoardColumnHeader
                column={column}
                filterTagId={filterTagId}
                setFilterTagId={setFilterTagId}
                handleNewCard={handleCreateCard}
            />
            {columnCards.length ? (
                <Droppable
                    droppableId={`column-${column.id}`}
                    direction="vertical"
                    type={DroppableType.BOARD_CARDS}
                >
                    {(droppableProvided): React.JSX.Element => (
                        <div
                            className="flex flex-col gap-2 w-full"
                            ref={droppableProvided.innerRef}
                            {...droppableProvided.droppableProps}
                        >
                            {columnCards.map((card, index) => (
                                <Draggable
                                    key={`board-card-${card.id}`}
                                    draggableId={`board-card-${card.id}`}
                                    index={index}
                                >
                                    {(draggableProvided): React.JSX.Element => (
                                        <div
                                            ref={draggableProvided.innerRef}
                                            {...draggableProvided.draggableProps}
                                            {...draggableProvided.dragHandleProps}
                                        >
                                            <BoardCard
                                                key={`card-${card.id}`}
                                                card={card}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {droppableProvided.placeholder}
                        </div>
                    )}
                </Droppable>
            ) : (
                <AddItem
                    className="w-full rounded color-1 background-5 hover"
                    onAdd={handleCreateCard}
                />
            )}
        </div>
    );
};

export default BoardColumn;
