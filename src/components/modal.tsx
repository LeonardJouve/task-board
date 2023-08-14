import React, {forwardRef} from "react";

type Props = {};

const Modal = forwardRef<HTMLDialogElement, Props>((_, ref) => {
    const handleClose = (e: React.MouseEvent): void => {
        if (typeof ref === "function" || !ref?.current) {
            return;
        }
        e.stopPropagation();
        ref.current.close();
    };

    return (
        <dialog
            ref={ref}
            className=""
        >
            <button onClick={handleClose}>
                close
            </button>
        </dialog>
    );
});

export default Modal;
