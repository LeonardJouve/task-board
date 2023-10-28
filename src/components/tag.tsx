import React from "react";
import useTags from "@store/tags";
import type {Tag} from "@typing/store";

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
        <span
            className="rounded px-2 py-1 uppercase text-xs"
            style={{background: tag.color}}
        >
            {tag.name}
        </span>
    );
};

export default BoardTag;
