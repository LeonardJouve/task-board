import React from "react";

type Item = {
    text: string;
    leftDecorator?: string;
    rightDecorator?: string;
    isSelected?: boolean;
    isDangerous?: boolean;
    onPress?: () => void;
};

type Props = {
    name: string;
    icon: string;
    items: Item[];
    className?: string;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
};

const Menu: React.FC<Props> = ({isOpen, setIsOpen, name, icon, items, className = ""}) => {
    const handleMouseEnter = (): void => setIsOpen(true);
    const handleMouseLeave = (): void => setIsOpen(false);

    return (
        <button
            className={`rounded relative ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <i className={`icon-${icon}`}/>
            {isOpen && (
                <ul className="absolute rounded py-2 border-[1px] background-4 border-color-1 whitespace-nowrap">
                    {items.map(({text, leftDecorator, rightDecorator, isSelected, isDangerous, onPress}, i) => (
                        <li
                            key={`menu-${name}-${i}`}
                            className={`px-2 hover:background-3 ${isDangerous ? "color-dangerous" : ""}`}
                            onClick={onPress}
                        >
                            {(isSelected ?? leftDecorator) && <i className={`icon-${isSelected ? "check" : leftDecorator}`}/>}
                            {text}
                            {rightDecorator && <i className={`icon-${leftDecorator}`}/>}
                        </li>
                    ))}
                </ul>
            )}
        </button>
    );
};

export default Menu;
