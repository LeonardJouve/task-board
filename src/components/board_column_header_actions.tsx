import React from "react";
import type {Column} from "@store/columns";
import Menu from "@components/menu";

type Props = {
    column: Column;
};

const BoardColumnHeaderActions: React.FC<Props> = ({column}) => (
    <div className="flex flex-row gap-2">
        <button className="rounded bg-white hover:bg-slate-100">
            <i className="icon-plus"/>
        </button>
        <Menu icon="list" items={[{text: "text1"}, {text: "text2"}]}/>
    </div>
);

export default BoardColumnHeaderActions;
