import React, {useEffect, useState} from "react";
import useCards, {getCardsInColumn} from "@store/cards";
import BoardColumnHeader from "@components/board_column_header";
import BoardCard from "@components/board_card";
import AddItem from "@components/add_item";
import BoardCardModal from "@components/modals/board_card_modal";
import type {Column, Card} from "@typing/store";

type Props = {
    column: Column;
};

const BoardColumn: React.FC<Props> = ({column}) => {
    const {cards, fetchCards, createCard} = useCards();
    const cardsInColumn = getCardsInColumn(cards, column.id);
    const [cardId, setCardId] = useState<Card["id"]>(0);

    useEffect(() => {
        fetchCards([column.id]);
    }, [column]);

    const handleNewCard = async (): Promise<void> => {
        const card = await createCard({
            columnId: column.id,
        });

        setCardId(card?.id ?? 0);
    };

    const handleCloseModal = (): void => setCardId(0);

    return (
        <div className="min-w-board-column max-w-board-column background-3 rounded-lg flex flex-col items-center gap-2 p-3 color-2">
            <BoardColumnHeader
                column={column}
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
            <BoardCardModal
                isOpen={Boolean(cardId)}
                setIsOpen={handleCloseModal}
                cardId={cardId}
            />
        </div>
    );
};

export default BoardColumn;
