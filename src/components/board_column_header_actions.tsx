import React from "react";
import type {Column} from "@store/columns";
import Menu from "@components/menu";

type Props = {
    column: Column;
    openModal: () => void;
};

const BoardColumnHeaderActions: React.FC<Props> = ({column, openModal}) => (
    <div className="flex flex-row gap-2 mr-0 ml-auto">
        <button
            className="rounded background-5 hover"
            onClick={openModal}
        >
            <i className="icon-plus"/>
        </button>
        <Menu
            className="background-5"
            name={`board-column-header-menu-${column.id}`}
            icon="list"
            items={[
                {text: "text1"},
                {text: "text2"},
            ]}
        />
    </div>
);

export default BoardColumnHeaderActions;
