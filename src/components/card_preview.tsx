import React from "react";
import type {Card} from "@store/cards";

type Props = {
    card: Card;
};

const CardPreview: React.FC<Props> = ({card}) => (
    <span className="w-full px-2 py-1 background-5 hover rounded font-bold overflow-hidden text-ellipsis whitespace-nowrap text-center flex-shrink-0">
        {card.name}
    </span>
);

export default CardPreview;
