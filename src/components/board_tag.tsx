import React from "react";
import useTags from "@store/tags";
import type {Card, Tag} from "@typing/store";
import useCards from "@store/cards";

type Props = ({
    tag: Pick<Tag, "color" | "name">;
    tagId?: undefined;
} | {
    tag?: undefined;
    tagId: Tag["id"];
}) & ({
    isRemovable: true;
    cardId: Card["id"];
} | {
    isRemovable?: false;
    cardId?: undefined;
});

const BoardTag: React.FC<Props> = ({tag: partialTag, tagId, isRemovable, cardId}) => {
    const {tags} = useTags();
    const {removeCardTag} = useCards();
    const tag = partialTag ?? tags[tagId];

    const handleRemoveCardTag = (): void => {
        if (!cardId || !tagId) {
            return;
        }

        removeCardTag(cardId, tagId);
    };

    if (!tag) {
        return null;
    }

    return (
        <span
            className="group rounded px-2 py-1 uppercase text-xs relative border-[1px] border-color-1"
            style={{background: tag.color}}
        >
            {tag.name}
            {isRemovable && (
                <i
                    className="icon-close text-xs background-dangerous-1 color-dangerous cursor-pointer aspect-square color-transparent group-hover:block hidden absolute right-1 top-[50%] -translate-y-1/2 rounded-[50%]"
                    onClick={handleRemoveCardTag}
                />
            )}
        </span>
    );
};

export default BoardTag;
