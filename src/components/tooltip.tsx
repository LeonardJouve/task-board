import React, {useRef, useState} from "react";
import {autoUpdate, useFloating, useHover, useInteractions, arrow, flip, shift, offset, FloatingArrow, useTransitionStyles, type Placement} from "@floating-ui/react";

type Props = {
    placement?: Placement;
    tip: string | React.JSX.Element;
} & React.PropsWithChildren & Pick<React.HtmlHTMLAttributes<HTMLDivElement>, "style">;

const Tooltip: React.FC<Props> = ({placement = "top", tip, children, style}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const arrowRef = useRef(null);
    const {refs, floatingStyles, context} = useFloating({
        placement,
        open: isOpen,
        middleware: [
            offset(5),
            shift(),
            flip({fallbackPlacements: ["top", "left", "right", "bottom", placement]}),
            arrow({element: arrowRef}),
        ],
        onOpenChange: setIsOpen,
        whileElementsMounted: autoUpdate,
    });

    const {isMounted, styles} = useTransitionStyles(context, {duration: 200});

    const hover = useHover(context);

    const {getReferenceProps, getFloatingProps} = useInteractions([hover]);

    return (
        <>
            <div
                className="flex overflow-hidden"
                ref={refs.setReference}
                style={style}
                {...getReferenceProps()}
            >
                {children}
            </div>
            {isMounted && (
                <div
                    ref={refs.setFloating}
                    className="shadow-lg background-1 whitespace-nowrap rounded p-1 color-1 text-sm font-normal !z-30"
                    style={{
                        ...floatingStyles,
                        ...styles,
                    }}
                    {...getFloatingProps()}
                >
                    {tip}
                    <FloatingArrow
                        className="fill-light-1 dark:fill-dark-1"
                        ref={arrowRef}
                        context={context}
                    />
                </div>
            )}
        </>
    );
};

export default Tooltip;
