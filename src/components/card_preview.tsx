import React from "react";
import type {Card} from "@typing/store";
import useCards, {getCard} from "@store/cards";

type Props = {
    cardId: Card["id"];
};

const CardPreview: React.FC<Props> = ({cardId}) => {
    const card = useCards(getCard(cardId));

    if (!card) {
        return null;
    }

    return (
        <span className="w-full px-2 py-1 background-5 hover rounded font-bold overflow-hidden text-ellipsis whitespace-nowrap text-center flex-shrink-0">
            {card.name}
        </span>
    );
};

export default CardPreview;
