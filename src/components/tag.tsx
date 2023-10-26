import React from "react";
import type {Tag} from "@store/tags";
import useTags from "@store/tags";

type Props = {
    id: Tag["id"];
}

const BoardTag: React.FC<Props> = ({id}) => {
    const {tags} = useTags();
    const tag = tags[id];

    if (!tag) {
        return null;
    }

    return (
        <span className={`rounded px-2 py-1 uppercase text-xs border-color-1 border-[1px] bg-${tag.color}`}>
            {tag.name}
        </span>
    );
};

export default BoardTag;
