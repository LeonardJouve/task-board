import React from "react";
import BoardTag from "@components/board_tag";
import Avatars from "@components/avatars";
import {Size} from "@components/avatar";
import {ModalId, type Card} from "@typing/store";
import useModals from "@store/modals";

type Props = {
    card: Card;
};

const BoardCard: React.FC<Props> = ({card}) => {
    const {openModal} = useModals();

    const handleBoardCardModal = (): void => openModal({
        id: ModalId.BOARD_CARD,
        props: {card},
    });

    return (
        <button
            className="w-full background-5 rounded flex flex-col gap-1 p-2 overflow-hidden hover"
            onClick={handleBoardCardModal}
        >
            <span className="overflow-hidden text-ellipsis whitespace-nowrap px-1 py-0.5 background-4 rounded">
                {card.name}
            </span>
            <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                {card.content}
            </span>
            <div className="flex flex-row gap-2 overflow-hidden">
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
    );
};

export default BoardCard;
