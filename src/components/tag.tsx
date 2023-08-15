import React from "react";
import type {Tag} from "@store/columns";

type Props = {
    tag: Tag;
}

const BoardTag: React.FC<Props> = ({tag}) => (
    <span className={`rounded px-2 py-1 uppercase text-xs border-gray-300 border-[1px] bg-${tag.color}`}>
        {tag.name}
    </span>
);

export default BoardTag;
