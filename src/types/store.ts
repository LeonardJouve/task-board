import type {ComponentProps} from "react";
import type {MessageDescriptor} from "react-intl";
import BoardCardModal from "@components/modals/board_card_modal";
import DeleteBoardCardModal from "@components/modals/delete_board_card_modal";
import DeleteBoardColumnModal from "@components/modals/delete_board_column";
import DeleteBoardModal from "@components/modals/delete_board_modal";
import LeaveBoardModal from "@components/modals/leave_board_modal";

export type ActionResult<T> = Promise<T|null>;

export type User = {
    id: number;
    name: string;
    email: string;
    username: string;
    picture: string;
};

export type Board = {
    id: number;
    ownerId: number;
    userIds: User["id"][];
    name: string;
    description: string;
};

export type Column = {
    id: number;
    boardId: number;
    nextId: number|null;
    name: string;
};

export type Card = {
    id: number;
    columnId: number;
    nextId: number|null;
    userIds: User["id"][];
    tagIds: Tag["id"][];
    name: string;
    content: string;
};

export type Tag = {
    id: number;
    boardId: number;
    name: string;
    color: string;
};

export enum ModalId {
    DELETE_BOARD,
    DELETE_BOARD_COLUMN,
    DELETE_BOARD_CARD,
    LEAVE_BOARD,
    BOARD_CARD,
}

export const modalComponents = {
    [ModalId.DELETE_BOARD]: DeleteBoardModal,
    [ModalId.DELETE_BOARD_COLUMN]: DeleteBoardColumnModal,
    [ModalId.DELETE_BOARD_CARD]: DeleteBoardCardModal,
    [ModalId.LEAVE_BOARD]: LeaveBoardModal,
    [ModalId.BOARD_CARD]: BoardCardModal,
};

export type Modal<Id extends ModalId> = {
    id: Id;
    props: ComponentProps<typeof modalComponents[Id]>;
};

export enum Locale {
    EN = "en",
    FR = "fr",
}

export type AppError = {
    message: MessageDescriptor;
    action?: () => void;
} | null;
