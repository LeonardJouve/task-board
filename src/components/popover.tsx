import React, {useEffect, useState} from "react";
import {useFloating, shift, flip, autoUpdate, useTransitionStyles, useClick, useDismiss, useInteractions, type Placement, offset} from "@floating-ui/react";

type Props = {
    anchor: React.JSX.Element;
    placement?: Placement;
} & React.PropsWithChildren & ({
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
} | {
    isOpen?: undefined;
    setIsOpen?: undefined;
});

const Popover: React.FC<Props> = ({isOpen: isOpenProps, setIsOpen: setIsOpenProps, anchor, children, placement = "bottom-start"}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleOpen = (newIsOpen: boolean): void => {
        setIsOpen(newIsOpen);
        setIsOpenProps?.(newIsOpen);
    };

    const {refs, floatingStyles, context} = useFloating({
        placement,
        open: isOpen,
        middleware: [
            offset(5),
            shift(),
            flip({fallbackPlacements: ["right-start", "left-start", "bottom-start", "top-start", placement]}),
        ],
        onOpenChange: handleOpen,
        whileElementsMounted: autoUpdate,
    });

    const {isMounted, styles} = useTransitionStyles(context, {duration: 200});

    const click = useClick(context);

    const dismiss = useDismiss(context);

    const {getReferenceProps, getFloatingProps} = useInteractions([
        click,
        dismiss,
    ]);

    useEffect(() => {
        if (isOpenProps === undefined) {
            return;
        }
        setIsOpen(isOpenProps);
    }, [isOpenProps]);

    const anchorClone = React.cloneElement(anchor, {ref: refs.setReference, ...getReferenceProps()});

    return (
        <>
            {anchorClone}
            {isMounted && (
                <div
                    ref={refs.setFloating}
                    className="background-4 rounded z-10"
                    style={{
                        ...floatingStyles,
                        ...styles,
                    }}
                    {...getFloatingProps()}
                >
                    {children}
                </div>
            )}
        </>
    );
};

export default Popover;
