import React, {useState} from "react";
import type {Card} from "@store/cards";
import BoardCardModal from "@components/modals/board_card_modal";
import BoardTag from "@components/tag";

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
                className="w-full bg-slate-50 rounded flex flex-col gap-1 p-2 overflow-hidden hover:bg-slate-100"
                onClick={handleOpen}
            >
                <span className="overflow-hidden text-ellipsis max-h-[2rem] px-1 py-0.5 bg-white rounded">
                    {card.name}
                </span>
                <span className="overflow-hidden text-ellipsis max-h-[4rem]">
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
            </button>
            <BoardCardModal
                open={isModalOpen}
                setOpen={setIsModalOpen}
                card={card}
            />
        </>
    );
};

export default BoardCard;
