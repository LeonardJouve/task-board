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
}

const Menu: React.FC<Props> = ({name, icon, items}) => {
    const [hover, setHover] = useState<boolean>(false);

    const handleMouseEnter = (): void => setHover(true);
    const handleMouseLeave = (): void => setHover(false);

    return (
        <button
            className="bg-white rounded hover:bg-slate-100"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <i className={`icon-${icon}`}/>
            {hover && (
                <ul className="absolute bg-white rounded py-2 border-gray-50 border-[1px]">
                    {items.map(({text, leftDecorator, rightDecorator, selected, onPress}, i) => (
                        <li
                            key={`menu-${name}-${i}`}
                            className="px-2 hover:bg-slate-100"
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
