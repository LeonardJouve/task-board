import {create} from "zustand";
import type {Modal, ModalId} from "@typing/store";

type Modals<Id extends ModalId> = Partial<Record<Modal<Id>["id"], Modal<Id>["props"]>>;

type ModalState = {
    modals: Modals<ModalId>;
    openModal: <Id extends ModalId>(modal: Modal<Id>) => void;
    closeModal: <Id extends ModalId>(id: Modal<Id>["id"]) => void;
};

const useModals = create<ModalState>((set) => ({
    modals: {},
    openModal: ({id, props}): void => set((state) => ({
        ...state,
        modals: {
            ...state.modals,
            [id]: props,
        },
    })),
    closeModal: (id): void => set((state) => {
        const {[id]: _, ...modals} = state.modals;
        return {modals};
    }),
}));

export default useModals;
