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
    color: Color;
};

export enum Color {
    WHITE = "white",
}

export enum Locales {
    EN = "en",
    FR = "fr",
}
