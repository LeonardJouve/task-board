import React, {useEffect, useState} from "react";
import useCards, {getCardsInColumn} from "@store/cards";
import type {Column} from "@store/columns";
import BoardColumnHeader from "@components/board_column_header";
import BoardCard from "@components/board_card";
import AddItem from "@components/add_item";
import AddCardModal from "@components/modals/add_card_modal";

type Props = {
    column: Column;
};

const BoardColumn: React.FC<Props> = ({column}) => {
    const {cards, fetchCards} = useCards();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const cardsInColumn = getCardsInColumn(cards, column.id);

    useEffect(() => {
        fetchCards([column.id]);
    }, [column]);

    const handleOpenModal = (): void => setIsModalOpen(true);


    return (
        <div className="w-board-column bg-blue-100 rounded-lg flex flex-col items-center gap-2 p-3">
            <BoardColumnHeader
                column={column}
                openModal={handleOpenModal}
            />
            {cardsInColumn.map((card) => (
                <BoardCard
                    key={`card-${card.id}`}
                    card={card}
                />
            ))}
            {!cardsInColumn.length && <AddItem
                className="w-full rounded"
                onAdd={handleOpenModal}
            />}
            <AddCardModal
                open={isModalOpen}
                setOpen={setIsModalOpen}
                columnId={column.id}
            />
        </div>
    );
};

export default BoardColumn;
