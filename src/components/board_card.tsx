import React, {useState} from "react";
import BoardCardModal from "@components/modals/board_card_modal";
import BoardTag from "@components/tag";
import Avatars from "@components/avatars";
import {Size} from "@components/avatar";
import type {Card} from "@typing/store";

type Props = {
    card: Card;
};

// TODO: conversation / modal

const BoardCard: React.FC<Props> = ({card}) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleOpen = (): void => setIsModalOpen(true);

    return (
        <>
            <button
                className="w-full background-5 rounded flex flex-col gap-1 p-2 overflow-hidden hover"
                onClick={handleOpen}
            >
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
                            id={tagId}
                        />
                    ))}
                </div>
                <Avatars
                    userIds={card.userIds}
                    size={Size.S}
                />
            </button>
            <BoardCardModal
                open={isModalOpen}
                setOpen={setIsModalOpen}
                cardId={card.id}
            />
        </>
    );
};

export default BoardCard;
