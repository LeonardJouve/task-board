import React from "react";

type Props = {
    className?: string;
} & ({
    left: React.JSX.Element;
    right?: React.JSX.Element;
} | {
    left?: React.JSX.Element;
    right: React.JSX.Element;
});

const SplitButton: React.FC<Props> = ({left, right, className = ""}) => (
    <div className={`flex flex-row color-1 ${className}`}>
        {left && (
            <button className="flex flex-1 overflow-hidden left rounded-s-md">
                {left}
            </button>
        )}
        {right && (
            <button className="flex left rounded-e-md border-s border-color-1">
                {right}
            </button>
        )}
    </div>
);

export default SplitButton;
