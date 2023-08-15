import React from "react";
import BoardColumnHeader from "@components/board_column_header";
import BoardCard from "@components/board_card";
import type {Column} from "@store/columns";

type Props = {
    column: Column;
};

// TODO: (+) card

const BoardColumn: React.FC<Props> = ({column}) => {
    const cards = Object.values(column.cards);
    return (
        <div className="w-board-column bg-blue-100 rounded-lg flex flex-col items-center gap-2 p-3">
            <BoardColumnHeader name={column.name}/>
            {cards.map((card) => (
                <BoardCard
                    key={`card-${card.id}`}
                    card={card}
                />
            ))}
        </div>
    );
};

export default BoardColumn;
