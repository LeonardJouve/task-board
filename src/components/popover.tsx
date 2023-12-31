import React, {useState} from "react";
import {useFloating, shift, flip, autoUpdate, useTransitionStyles, useClick, useDismiss, useInteractions, offset, FloatingPortal, type Placement} from "@floating-ui/react";

type Props = React.PropsWithChildren<{
    anchor: React.JSX.Element;
    isClosable?: boolean;
    placement?: Placement;
} & ({
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
} | {
    isOpen?: undefined;
    setIsOpen?: undefined;
})>;

const Popover: React.FC<Props> = ({isOpen: isOpenProps, setIsOpen: setIsOpenProps, isClosable, anchor, children, placement = "bottom-start"}) => {
    const [isOpenState, setIsOpenState] = useState<boolean>(false);
    const isOpen = isOpenProps ?? isOpenState;
    const setIsOpen = setIsOpenProps ?? setIsOpenState;

    const {refs, floatingStyles, context} = useFloating({
        placement,
        open: isOpen,
        middleware: [
            offset(5),
            shift(),
            flip({fallbackPlacements: ["right-start", "left-start", "bottom-start", "top-start", placement]}),
        ],
        onOpenChange: setIsOpen,
        whileElementsMounted: autoUpdate,
    });

    const {isMounted, styles} = useTransitionStyles(context, {duration: 200});

    const click = useClick(context);

    const dismiss = useDismiss(context);

    const {getReferenceProps, getFloatingProps} = useInteractions([
        click,
        dismiss,
    ]);

    const handleClose = (): void => setIsOpen(false);

    console.log(getReferenceProps());

    const anchorClone = React.cloneElement(anchor, {ref: refs.setReference, ...getReferenceProps()});

    return (
        <>
            {anchorClone}
            {isMounted && (
                <FloatingPortal>
                    <div
                        ref={refs.setFloating}
                        className="background-4 rounded shadow-lg z-10 relative"
                        style={{
                            ...floatingStyles,
                            ...styles,
                        }}
                        {...getFloatingProps()}
                    >
                        {isClosable && (
                            <button
                                className="absolute right-1 top-1 text-2xl leading-2xl color-1"
                                onClick={handleClose}
                            >
                                <i className="icon-close"/>
                            </button>
                        )}
                        {children}
                    </div>
                </FloatingPortal>
            )}
        </>
    );
};

export default Popover;
