import React, {useState} from "react";
import {useFloating, useTransitionStyles, useInteractions, autoUpdate, shift, flip, useHover, useClick, useDismiss, safePolygon, type Placement} from "@floating-ui/react";

export type Item = {
    text: string;
    leftDecorator?: string;
    rightDecorator?: string;
    isSelected?: boolean;
    isDangerous?: boolean;
    subItems?: Item[];
    onPress?: () => void;
};

export enum MenuTrigger {
    CLICK,
    HOVER,
    DISMISS,
}

type Props = {
    button: React.JSX.Element;
    name: string;
    items: Item[];
    triggers?: MenuTrigger[];
    placement?: Placement;
    className?: string;
};

const Menu: React.FC<Props> = ({button, name, items, triggers = [MenuTrigger.HOVER], placement = "right-start", className = ""}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const {refs, floatingStyles, context} = useFloating({
        placement,
        open: isOpen,
        middleware: [
            shift(),
            flip({fallbackPlacements: ["right-start", "left-start", "bottom-start", "top-start", placement]}),
        ],
        onOpenChange: setIsOpen,
        whileElementsMounted: autoUpdate,
    });

    const {isMounted, styles} = useTransitionStyles(context, {duration: 200});

    const hover = useHover(context, {
        enabled: triggers.includes(MenuTrigger.HOVER),
        handleClose: safePolygon(),
    });

    const click = useClick(context, {enabled: triggers.includes(MenuTrigger.CLICK)});

    const dismiss = useDismiss(context, {enabled: triggers.includes(MenuTrigger.DISMISS)});

    const {getReferenceProps, getFloatingProps} = useInteractions([
        hover,
        click,
        dismiss,
    ]);

    const handlePress = (onPress: Item["onPress"]): void => {
        setIsOpen(false);
        onPress?.();
    };

    const clonedButton = React.cloneElement(button, {
        ref: refs.setReference,
        ...getReferenceProps(),
    });

    return (
        <>
            {clonedButton}
            {isMounted && (
                <ul
                    ref={refs.setFloating}
                    className={`whitespace-nowrap color-1 z-10 font-semibold ${className}`}
                    style={{
                        ...floatingStyles,
                        ...styles,
                    }}
                    {...getFloatingProps()}
                >
                    {items.map(({text, leftDecorator, rightDecorator, isSelected, isDangerous, subItems, onPress}, i) => {
                        const item = (
                            <li
                                key={`menu-${name}-${i}`}
                                className={`first:rounded-t-md first:border-t-[1px] last:rounded-b-md last:border-b-[1px] background-4 border-x-[1px] border-b- border-color-1 flex items-center px-2 py-1 cursor-pointer ${isDangerous ? "background-dangerous-1 color-dangerous hover:background-dangerous-2" : "hover:background-3"}`}
                                onClick={(): void => handlePress(onPress)}
                            >
                                {leftDecorator && <i className={`icon-${leftDecorator}`}/>}
                                <span className="overflow-hidden text-ellipsis ">
                                    {text}
                                </span>
                                <i className={`flex mr-0 ml-auto icon-${subItems ? "chevron-right" : isSelected ? "check" : rightDecorator ?? "empty"}`}/>
                            </li>
                        );

                        return subItems ? (
                            <Menu
                                className={className}
                                button={item}
                                name={`submenu-${name}`}
                                items={subItems}
                            />
                        ) : item;
                    })}
                </ul>
            )}
        </>
    );
};

export default Menu;
