import React from "react";
import type {Column} from "@store/columns";

type Props = {
    name: Column["name"];
}

// TODO: filter / rename / new card

const BoardColumnHeader: React.FC<Props> = ({name}) => (
    <div className="w-full px-2 py-1 bg-white rounded">
        {name}
    </div>
);

export default BoardColumnHeader;
