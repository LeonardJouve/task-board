import React from "react";

type Props = {
    left: React.JSX.Element;
    right: React.JSX.Element;
    className?: string;
};

const SplitButton: React.FC<Props> = ({left, right, className = ""}) => (
    <div className={`flex flex-row color-1 ${className}`}>
        <button className="flex flex-1 overflow-hidden px-2 py-1 left rounded-s-md">
            {left}
        </button>
        <button className="px-1 py-1 flex left rounded-e-md border-s border-color-1">
            {right}
        </button>
    </div>
);

export default SplitButton;
