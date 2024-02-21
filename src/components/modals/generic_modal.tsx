import React, {useState} from "react";
import {FloatingOverlay, FloatingPortal, autoUpdate, useDismiss, useFloating, useInteractions, useTransitionStyles} from "@floating-ui/react";
import {FormattedMessage} from "react-intl";
import type {ModalId} from "@typing/store";
import useModals from "@store/modals";

type Props = {
    id: ModalId;
    header: string | React.JSX.Element;
    content: string | React.JSX.Element;
    isCancelable?: boolean;
    showFooter?: boolean;
    closeOnClickOutside?: boolean;
    onConfirm?: () => void;
    onCancel?: () => void;
    onClose?: () => void;
    headerClassName?: string;
    bodyClassName?: string;
    isDangerous?: boolean;
};

const GenericModal: React.FC<Props> = ({id, header, content, closeOnClickOutside = true, isCancelable = true, showFooter = true, onConfirm, onCancel, onClose, headerClassName = "", bodyClassName = "", isDangerous}) => {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const closeModal = useModals(({closeModal}) => closeModal);

    const handleOpen = (newIsOpen: boolean): void => {
        if (!newIsOpen) {
            onClose?.();
            closeModal(id);
        }

        setIsOpen(newIsOpen);
    };


    const {refs, context} = useFloating({
        open: isOpen,
        onOpenChange: handleOpen,
        whileElementsMounted: autoUpdate,
    });

    // TODO: not working as component unmounts before transition
    const {isMounted, styles} = useTransitionStyles(context, {duration: 200});

    const dismiss = useDismiss(context, {enabled: closeOnClickOutside});

    const {getFloatingProps} = useInteractions([
        dismiss,
    ]);

    const handleCancel = (): void => {
        onCancel?.();
        handleOpen(false);
    };

    const handleConfirm = (): void => {
        onConfirm?.();
        handleOpen(false);
    };

    return (
        <FloatingPortal>
            {isMounted && (
                <FloatingOverlay
                    className="flex justify-center items-center"
                    lockScroll={true}
                >
                    <div
                        ref={refs.setFloating}
                        className="w-1/2 h-1/3 rounded-xl shadow-lg flex flex-col background-3 color-2"
                        style={styles}
                        {...getFloatingProps()}
                    >
                        <div className="flex flex-row background-2  rounded-t-xl color-1 relative p-4 pb-2 max-h-[50px] min-h-[50px]">
                            <h2 className={`font-bold flex flex-1 ${headerClassName}`}>
                                {header}
                            </h2>
                            <button
                                className="absolute right-1 top-1 text-2xl leading-2xl"
                                onClick={handleCancel}
                            >
                                <i className="icon-close"/>
                            </button>
                        </div>
                        <div className={`flex flex-1 flex-col ${bodyClassName}`}>
                            <div className={`px-4 py-2 flex flex-1 ${!showFooter ? "pb-4" : ""}`}>
                                {content}
                            </div>
                            {showFooter && (
                                <div className="flex flex-row items-end justify-end p-2 pb-4 gap-5">
                                    {isCancelable && (
                                        <button
                                            className="rounded-lg hover px-2 py-1 flex items-center justify-center background-4"
                                            onClick={handleCancel}
                                        >
                                            <FormattedMessage
                                                id="components.generic_modal.cancel"
                                                defaultMessage="cancel"
                                            />
                                        </button>
                                    )}
                                    <button
                                        className={`rounded-lg px-2 py-1 flex items-center justify-center ${isDangerous ? "color-dangerous background-dangerous-1 hover:background-dangerous-2" : "background-5 hover"}`}
                                        onClick={handleConfirm}
                                    >
                                        <FormattedMessage
                                            id="components.generic_modal.confirm"
                                            defaultMessage="confirm"
                                        />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </FloatingOverlay>
            )}
        </FloatingPortal>
    );
};

export default GenericModal;
