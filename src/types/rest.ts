import type {MessageDescriptor} from "react-intl";
import type {Board, Column} from "@typing/store";

type RestResult<T> = {
    error: false;
    data: T;
    url: string;
    status: number;
};

type RestError = {
    error: true;
    data: MessageDescriptor;
    url: string;
};

export type RestResponse<T> = Promise<RestResult<T> | RestError>;

export type Status = {
    status: "ok";
};

export type Tokens = {
    accessToken: string;
    refreshToken: string;
};

export type CsrfToken = {
    csrfToken: string;
};

export type CreateBoard = {
    name?: string;
    description?: string;
};

export type UpdateBoard = {
    name?: string;
    description?: string;
};

export type CreateColumn = {
    boardId: Board["id"];
    name?: string;
};

export type UpdateColumn = {
    name?: string;
};

export type CreateCard = {
    columnId: Column["id"];
    name?: string;
    content?: string;
};

export type UpdateCard = {
    name?: string;
    content?: string;
};

export type CreateTag = {
    boardId: Board["id"];
    name?: string;
    color?: string;
};

export type UpdateTag = {
    name?: string;
    color?: string;
};

export type ActionResult<T> = Promise<T|null>;
