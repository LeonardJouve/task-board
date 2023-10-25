import React, {useEffect} from "react";
import type {Column} from "@store/columns";
import useCards, {getCardsInColumn} from "@store/cards";
import CardPreview from "@components/card_preview";

type Props = {
    column: Column;
};

const ColumnPreview: React.FC<Props> = ({column}) => {
    const {cards, fetchCards} = useCards();

    useEffect(() => {
        fetchCards([column.id]);
    }, [column]);

    return (
        <div className="min-w-board-column max-w-board-column flex-1 bg-blue-100 rounded-lg flex flex-col items-center gap-2 p-3">
            <span className="w-full px-2 py-1 bg-white rounded font-bold overflow-hidden text-ellipsis whitespace-nowrap text-left flex-shrink-0">
                {column.name}
            </span>
            {getCardsInColumn(cards, column.id).map((card) => (
                <CardPreview
                    key={`card-preview-${card.id}`}
                    card={card}
                />
            ))}
        </div>
    );
};

export default ColumnPreview;
