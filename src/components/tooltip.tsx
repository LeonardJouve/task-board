import React, {useState} from "react";

type Props = {
    content: React.JSX.Element | string;
} & React.PropsWithChildren & Pick<React.HtmlHTMLAttributes<HTMLDivElement>, "style">;

const Tooltip: React.FC<Props> = ({content, children, style}) => {
    const [isHover, setIsHover] = useState<boolean>(false);

    const handleMouseEnter = (): void => setIsHover(true);

    const handleMouseLeave = (): void => setIsHover(false);

    return (
        <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={style}
        >
            {children}
            <span className={`background-1 after:border-t-light-1 after:dark:border-t-dark-1 text-1 absolute whitespace-nowrap bottom-[125%] left-[50%] -translate-x-[50%] z-1 text-center rounded px-1 after:content-[""] after:absolute after:top-[100%] after:left-[50%] after:-translate-x-[50%] after:border-solid after:border-4 after:border-x-transparent after:border-b-transparent ${isHover ? "visible" : "hidden"}`}>
                {content}
            </span>
        </div>
    );
};

export default Tooltip;
