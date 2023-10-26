import React, {useEffect, useRef} from "react";
import {FormattedMessage} from "react-intl";

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    header: string | React.JSX.Element;
    content: string | React.JSX.Element;
    isCancelable?: boolean;
    showFooter?: boolean;
    closeOnClickOutside?: boolean;
    onConfirm?: () => void;
    onCancel?: () => void;
};

const GenericModal: React.FC<Props> = ({open, setOpen, header, content, closeOnClickOutside, isCancelable = true, showFooter = true, onConfirm, onCancel}) => {
    const modalRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (open) {
            handleOpen();
        } else {
            handleClose();
        }
    }, [open]);

    const handleOpen = (): void => {
        if (!modalRef.current) {
            return;
        }
        modalRef.current.showModal();
        setOpen(true);
    };

    const handleClose = (e?: React.MouseEvent): void => {
        if (!modalRef.current) {
            return;
        }
        e?.stopPropagation();
        modalRef.current.close();
        setOpen(false);
    };

    const handleCancel = (): void => {
        onCancel?.();
        handleClose();
    };

    const handleConfirm = (): void => {
        onConfirm?.();
        handleClose();
    };

    const handleClickOutside = (e: React.MouseEvent<HTMLDialogElement>): void => {
        if (e.target !== modalRef.current || !closeOnClickOutside) {
            return;
        }
        handleClose();
    };

    if (!open) {
        return null;
    }

    return (
        <dialog
            ref={modalRef}
            className="w-1/2 h-1/3 rounded-xl flex flex-col background-3 color-2"
            onClick={handleClickOutside}
        >
            <div className="flex flex-row background-2 color-1 relative p-4 pb-2 max-h-[50px] min-h-[50px]">
                <h2 className="font-bold flex flex-1">
                    {header}
                </h2>
                <button
                    className="absolute right-1 top-1 text-2xl leading-2xl"
                    onClick={handleClose}
                >
                    <i className="icon-close"/>
                </button>
            </div>
            <div className={`px-4 py-2 flex flex-1 ${!showFooter ? "pb-4" : ""}`}>
                {content}
            </div>
            {showFooter && (
                <div className="flex flex-row items-end justify-end p-2 pb-4 gap-5">
                    {isCancelable && (
                        <button
                            className="rounded-lg background-4 hover px-2 py-1 flex items-center justify-center"
                            onClick={handleCancel}
                        >
                            <FormattedMessage
                                id="components.generic_modal.cancel"
                                defaultMessage="cancel"
                            />
                        </button>
                    )}
                    <button
                        className="rounded-lg background-5 hover px-2 py-1 flex items-center justify-center"
                        onClick={handleConfirm}
                    >
                        <FormattedMessage
                            id="components.generic_modal.confirm"
                            defaultMessage="confirm"
                        />
                    </button>
                </div>
            )}
        </dialog>
    );
};

export default GenericModal;
