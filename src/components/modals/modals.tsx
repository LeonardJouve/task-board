import React from "react";
import useModals from "@store/modals";
import {modalComponents, type ModalId} from "@typing/store";

const Modals: React.FC = () => {
    const modals = useModals(({modals}) => modals);

    return Object.entries(modals).map(([id, props]) => {
        const Component = modalComponents[Number(id) as ModalId] as React.FC<typeof props>;
        return (
            <Component
                key={`modal_${id}`}
                {...props}
            />
        );
    });
};

export default Modals;
