import React from "react";

type Props = {
    className?: string;
    header?: string | React.JSX.Element;
    description?: string | React.JSX.Element;
    onAdd: () => void;
};

const AddItem: React.FC<Props> = ({header, description, className = "", onAdd}) => (
    <button
        className={`flex bg-slate-50 flex-col items-center justify-center gap-1 p-2 hover:bg-slate-100 ${className}`}
        onClick={onAdd}
    >
        <span className="text-5xl">
            <i className="icon-plus"/>
        </span>
        {header && (
            <span className="font-bold">
                {header}
            </span>
        )}
        {description && (
            <span>
                {description}
            </span>
        )}
    </button>
);

export default AddItem;
