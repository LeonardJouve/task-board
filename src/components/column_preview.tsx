import React, {useEffect} from "react";
import useCards, {getCardsInColumn} from "@store/cards";
import CardPreview from "@components/card_preview";
import type {Column} from "@typing/store";

type Props = {
    column: Column;
};

const ColumnPreview: React.FC<Props> = ({column}) => {
    const {cards, fetchCards} = useCards();

    useEffect(() => {
        fetchCards([column.id]);
    }, [column]);

    return (
        <div className="min-w-board-column max-w-board-column flex-1 background-3 rounded-lg flex flex-col items-center gap-2 p-3">
            <span className="w-full px-2 py-1 background-4 rounded font-bold overflow-hidden text-ellipsis whitespace-nowrap text-left flex-shrink-0">
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
