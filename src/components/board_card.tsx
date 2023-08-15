import React, {useState} from "react";
import BoardCardModal from "@components/modals/board_card_modal";
import Tag from "@components/tag";
import type {Card} from "@store/columns";

type Props = {
    card: Card;
};

// TODO: conversation / modal

const BoardCard: React.FC<Props> = ({card}) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const tags = Object.values(card.tags);

    const handleOpen = (): void => setIsModalOpen(true);

    return (
        <>
            <div
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
                    {tags.map((tag) => (
                        <Tag
                            key={`tag-${tag.id}`}
                            tag={tag}
                        />
                    ))}
                </div>
            </div>
            <BoardCardModal
                open={isModalOpen}
                setOpen={setIsModalOpen}
                card={card}
            />
        </>
    );
};

export default BoardCard;
