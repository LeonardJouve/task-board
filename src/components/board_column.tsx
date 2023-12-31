import React, {useEffect, useState} from "react";
import useCards, {getCardsInColumn} from "@store/cards";
import BoardColumnHeader from "@components/board_column_header";
import BoardCard from "@components/board_card";
import AddItem from "@components/add_item";
import BoardCardModal from "@components/modals/board_card_modal";
import type {Column, Card, Tag} from "@typing/store";

type Props = {
    column: Column;
};

const BoardColumn: React.FC<Props> = ({column}) => {
    const {cards, fetchCards, createCard} = useCards();
    const [openedCard, setOpenedCard] = useState<Card|null>(null);
    const [filterTagId, setFilterTagId] = useState<Tag["id"]|null>(null);

    useEffect(() => {
        fetchCards([column.id]);
    }, [column]);

    const handleNewCard = async (): Promise<void> => {
        setOpenedCard(await createCard({
            columnId: column.id,
        }));
    };

    const handleCloseModal = (): void => setOpenedCard(null);

    const cardsInColumn = getCardsInColumn(cards, column.id)
        .filter((card) => filterTagId === null || card.tagIds.includes(filterTagId));

    return (
        <div className="min-w-board-column max-w-board-column background-3 rounded-lg flex flex-col items-center gap-2 p-3 color-2">
            <BoardColumnHeader
                column={column}
                filterTagId={filterTagId}
                setFilterTagId={setFilterTagId}
                handleNewCard={handleNewCard}
            />
            {cardsInColumn.map((card) => (
                <BoardCard
                    key={`card-${card.id}`}
                    card={card}
                />
            ))}
            {!cardsInColumn.length && (
                <AddItem
                    className="w-full rounded color-1 background-5 hover"
                    onAdd={handleNewCard}
                />
            )}
            {openedCard && (
                <BoardCardModal
                    card={openedCard}
                    isOpen={Boolean(openedCard)}
                    setIsOpen={handleCloseModal}
                />
            )}
        </div>
    );
};

export default BoardColumn;
