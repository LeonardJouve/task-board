import React from "react";
import Column from "@components/board_column";
import useColumns from "@store/columns";

// TODO: add template column (+)

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
        </div>
    );
};

export default Columns;
