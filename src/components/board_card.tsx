import React from "react";
import BoardTag from "@components/board_tag";
import Avatars from "@components/avatars";
import {Size} from "@components/avatar";
import {ModalId, type Card} from "@typing/store";
import useModals from "@store/modals";
import useCards, {getCard} from "@store/cards";

type Props = {
    cardId: Card["id"];
};

const BoardCard: React.FC<Props> = ({cardId}) => {
    const {openModal} = useModals();
    const card = useCards(getCard(cardId));

    if (!card) {
        return null;
    }

    const handleBoardCardModal = (): void => openModal({
        id: ModalId.BOARD_CARD,
        props: {cardId: card.id},
    });

    const {name, content, tagIds, userIds} = card;

    return (
        <div
            className="w-full background-5 rounded flex flex-col gap-1 p-2 overflow-hidden hover cursor-pointer"
            onClick={handleBoardCardModal}
        >
            <span className="overflow-hidden text-ellipsis whitespace-nowrap px-1 py-0.5 background-4 rounded">
                {name}
            </span>
            <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                {content}
            </span>
            <div className="flex flex-row gap-2 overflow-hidden">
                {tagIds.map((tagId) => (
                    <BoardTag
                        key={`tag-${tagId}`}
                        tagId={tagId}
                    />
                ))}
            </div>
            <Avatars
                userIds={userIds}
                size={Size.S}
            />
        </div>
    );
};

export default BoardCard;
