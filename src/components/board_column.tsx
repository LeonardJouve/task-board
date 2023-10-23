import React, {useEffect, useState} from "react";
import {FormattedMessage} from "react-intl";
import useCards, {getCards} from "@store/cards";
import type {Column} from "@store/columns";
import BoardColumnHeader from "@components/board_column_header";
import BoardCard from "@components/board_card";
import AddItem from "@components/add_item";
import AddCardModal from "@components/modals/add_card_modal";

type Props = {
    column: Column;
};

const BoardColumn: React.FC<Props> = ({column}) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const {cards, fetchCards} = useCards((state) => getCards(state, column.id));

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
            {cards.map((card) => (
                <BoardCard
                    key={`card-${card.id}`}
                    card={card}
                />
            ))}
            {!cards.length && <AddItem
                className="w-full rounded"
                description={(
                    <FormattedMessage
                        id="components.board_column.add_item.description"
                        defaultMessage="Add Column"
                    />
                )}
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
