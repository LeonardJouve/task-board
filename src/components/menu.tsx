import React, {useState} from "react";

type Item = {
    text: string;
    leftDecorator?: string;
    rightDecorator?: string;
    selected?: boolean;
    onPress?: () => void;
};

type Props = {
    name: string;
    icon: string;
    items: Item[];
    className?: string;
}

const Menu: React.FC<Props> = ({name, icon, items, className = ""}) => {
    const [hover, setHover] = useState<boolean>(false);

    const handleMouseEnter = (): void => setHover(true);
    const handleMouseLeave = (): void => setHover(false);

    return (
        <button
            className={`rounded ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <i className={`icon-${icon}`}/>
            {hover && (
                <ul className="absolute rounded py-2 border-[1px] background-4 border-color-1">
                    {items.map(({text, leftDecorator, rightDecorator, selected, onPress}, i) => (
                        <li
                            key={`menu-${name}-${i}`}
                            className="px-2 hover:background-3"
                            onClick={onPress}
                        >
                            {selected ? <i className="icon-check"/> : leftDecorator}
                            {text}
                            {rightDecorator}
                        </li>
                    ))}
                </ul>
            )}
        </button>
    );
};

export default Menu;
