import React from "react";
import BoardColumns from "@components/board_columns";
import RightSidebar from "@components/right_sidebar";

const Board: React.FC = () => (
    <div className="flex flex-1">
        <BoardColumns/>
        <RightSidebar/>
    </div>
);

export default Board;
