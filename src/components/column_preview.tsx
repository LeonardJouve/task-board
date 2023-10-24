import React from "react";
import type {Column} from "@store/columns";

type Props = {
    column: Column;
};

const ColumnPreview: React.FC<Props> = ({column}) => {
    const {name} = column;

    return (
        <div>
            {name}
        </div>
    );
};

export default ColumnPreview;
