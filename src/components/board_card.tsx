import React, {useState} from "react";
import BoardTag from "@components/board_tag";
import Avatars from "@components/avatars";
import {Size} from "@components/avatar";
import BoardCardModal from "@components/modals/board_card_modal";
import type {Card} from "@typing/store";

type Props = {
    card: Card;
};

const BoardCard: React.FC<Props> = ({card}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <BoardCardModal
            button={(
                <button className="w-full background-5 rounded flex flex-col gap-1 p-2 overflow-hidden hover">
                    <span className="overflow-hidden text-ellipsis whitespace-nowrap px-1 py-0.5 background-4 rounded">
                        {card.name}
                    </span>
                    <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                        {card.content}
                    </span>
                    <div className="flex flex-row gap-2">
                        {card.tagIds.map((tagId) => (
                            <BoardTag
                                key={`tag-${tagId}`}
                                tagId={tagId}
                            />
                        ))}
                    </div>
                    <Avatars
                        userIds={card.userIds}
                        size={Size.S}
                    />
                </button>
            )}
            card={card}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
        />
    );
};

export default BoardCard;
