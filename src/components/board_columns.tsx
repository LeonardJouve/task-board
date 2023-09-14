import React from "react";
import useColumns from "@store/columns";
import Column from "@components/board_column";
import AddItem from "@components/add_item";

const Columns: React.FC = () => {
    const columns = useColumns((state) => Object.values(state.columns));
    return (
        <div className="flex flex-1 flex-row gap-7 p-5">
            {columns.map((column) => (
                <Column
                    key={`column-${column.id}`}
                    column={column}
                />
            ))}
            <AddItem
                className="w-board-column h-full rounded-lg"
                description="New column"
                onAdd={console.log}
            />
        </div>
    );
};

export default Columns;
