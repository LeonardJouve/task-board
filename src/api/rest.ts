import type {MessageDescriptor} from "react-intl";
import type {User, Board, Column, Card, Tag} from "@typing/store";
import type {RestResponse, Tokens, CsrfToken, CreateBoard, UpdateBoard, CreateColumn, UpdateColumn, CreateCard, UpdateCard, CreateTag, UpdateTag, Status} from "@typing/rest";

class RestClient {
    public onError: ((message: MessageDescriptor) => void)|null = null;
    private readonly baseUrl: string;
    private readonly maxRetry: number = 5;
    private csrfToken: string|null = null;
    private accessToken: string|null = null;
    // private refreshToken: string|null = null;

    constructor() {
        this.baseUrl = import.meta.env.VITE_API_URL;
    }

    async fetch<T>(url: string, options: RequestInit, apiTokenRequired = true, retry = 0): RestResponse<T> {
        if (retry > this.maxRetry) {
            return {
                error: true,
                data: {
                    id: "api.rest.error.retry_exceeded",
                    defaultMessage: "Failed to fetch server ressources. Try again later.",
                },
                url,
            };
        }

        if (apiTokenRequired && !document.cookie.includes("access_token") && !this.accessToken) {
            return {
                error: true,
                data: {
                    id: "api.rest.error.token",
                    defaultMessage: "Unexpetceted error. Please reconnect.",
                },
                url,
            };
        }

        if (options.method !== "GET" && options.method !== "HEAD" && !this.csrfToken) {
            const {error} = await this.getCsrfToken();

            if (error) {
                return {
                    error: true,
                    data: {
                        id: "api.rest.error.cannot_retreive_csrf_token",
                        defaultMessage: "Could not retreive a csrf token. Try again later.",
                    },
                    url,
                };
            }
        }

        const headers: RequestInit["headers"] = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            ...this.csrfToken && {"X-CSRF-Token": this.csrfToken},
            ...apiTokenRequired && this.accessToken && {"Authorization": `Bearer ${this.accessToken}`},
            ...options.headers,
        };

        const result = await fetch(url, {
            ...options,
            headers,
        } as RequestInit);


        let data;
        try {
            data = await result.json() as T;
        } catch (error) {
            return {
                error: true,
                data: {
                    id: "api.rest.error.invalid_json",
                    defaultMessage: "Received invalid response from the server.",
                },
                url,
            };
        }

        const {ok, status} = result;

        if (!ok) {
            data = data as MessageDescriptor;

            if (status === 403 && data.id === "api.rest.error.invalid_csrf") {
                this.csrfToken = null;
                const {error} = await this.getCsrfToken();

                if (!error) {
                    return this.fetch(url, options, apiTokenRequired, retry + 1);
                }
            }

            // TODO: handle unauthorized

            this.onError?.(data);

            return {
                error: true,
                data,
                url,
            };
        }


        return {
            data,
            url,
            error: false,
            status,
        };
    }

    getAuthRoute(): string {
        return `${this.baseUrl}/auth`;
    }

    getApiRoute(): string {
        return `${this.baseUrl}/api`;
    }

    getAssetsRoute(asset?: string): string {
        return `${this.baseUrl}/assets${asset ? `/${asset}` : ""}`;
    }

    getBoardsRoute(boardId?: Board["id"]): string {
        return `${this.getApiRoute()}/boards${boardId ? `/${boardId}` : ""}`;
    }

    getColumnsRoute(columnId?: Column["id"]): string {
        return `${this.getApiRoute()}/columns${columnId ? `/${columnId}` : ""}`;
    }

    getCardsRoute(cardId?: Card["id"]): string {
        return `${this.getApiRoute()}/cards${cardId ? `/${cardId}` : ""}`;
    }

    getTagsRoute(tagId?: Tag["id"]): string {
        return `${this.getApiRoute()}/tags${tagId ? `/${tagId}` : ""}`;
    }

    getUsersRoute(userId?: User["id"]): string {
        return `${this.getApiRoute()}/users${userId ? `/${userId}` : ""}`;
    }

    async getCsrfToken(): RestResponse<CsrfToken> {
        const result = await this.fetch<CsrfToken>(
            `${this.getAuthRoute()}/csrf`,
            {method: "GET"},
            false,
        );

        if (!result.error) {
            this.csrfToken = result.data.csrfToken;
        }

        return result;
    }

    async login(email: string, password: string): RestResponse<Tokens> {
        const result = await this.fetch<Tokens>(
            `${this.getAuthRoute()}/login`,
            {method: "POST", body: JSON.stringify({email, password})},
            false,
        );
        const {error, data} = result;

        if (!error) {
            this.accessToken = data.accessToken;
            // this.refreshToken = data.refreshToken;
        }

        return result;
    }

    // TODO API: return JWT
    async register(name: string, email: string, username: string, password: string, passwordConfirm: string): RestResponse<Tokens> {
        return await this.fetch<Tokens>(
            `${this.getAuthRoute()}/register`,
            {method: "POST", body: JSON.stringify({name, email, username, password, passwordConfirm})},
            false,
        );
    }

    async refresh(): RestResponse<Tokens> {
        return await this.fetch<Tokens>(
            `${this.getAuthRoute()}/refresh`,
            {method: "GET"},
        );
    }

    async logout(): RestResponse<Status> {
        return await this.fetch<Status>(
            `${this.getAuthRoute()}/logout`,
            {method: "GET"},
        );
    }

    async getBoard(boardId: Board["id"]): RestResponse<Board> {
        return await this.fetch<Board>(
            this.getBoardsRoute(boardId),
            {method: "GET"},
        );
    }

    async getBoards(): RestResponse<Board[]> {
        return await this.fetch<Board[]>(
            this.getBoardsRoute(),
            {method: "GET"},
        );
    }

    async createBoard(board: CreateBoard): RestResponse<Board> {
        return await this.fetch<Board>(
            this.getBoardsRoute(),
            {method: "POST", body: JSON.stringify(board)},
        );
    }

    async updateBoard(boardId: Board["id"], board: UpdateBoard): RestResponse<Board> {
        return await this.fetch<Board>(
            this.getBoardsRoute(boardId),
            {method: "PUT", body: JSON.stringify(board)}
        );
    }

    async deleteBoard(boardId: Board["id"]): RestResponse<Status> {
        return await this.fetch<Status>(
            this.getBoardsRoute(boardId),
            {method: "DELETE"},
        );
    }

    async inviteUserToBoard(boardId: Board["id"], userId: User["id"]): RestResponse<Status> {
        return await this.fetch<Status>(
            `${this.getBoardsRoute(boardId)}/invite?userId=${userId}`,
            {method: "GET"},
        );
    }

    async leaveBoard(boardId: Board["id"]): RestResponse<Status> {
        return await this.fetch<Status>(
            `${this.getBoardsRoute(boardId)}/leave`,
            {method: "GET"},
        );
    }

    async getColumn(columnId: Column["id"]): RestResponse<Column> {
        return await this.fetch<Column>(
            this.getColumnsRoute(columnId),
            {method: "GET"},
        );
    }

    async getColumns(boardIds?: Board["id"][]): RestResponse<Column[]> {
        return await this.fetch<Column[]>(
            `${this.getColumnsRoute()}${boardIds?.length ? "?boardsIds=" + boardIds.join(",") : ""}`,
            {method: "GET"},
        );
    }

    async createColumn(column: CreateColumn): RestResponse<Column> {
        return await this.fetch<Column>(
            `${this.getColumnsRoute()}`,
            {method: "POST", body: JSON.stringify(column)},
        );
    }

    async updateColumn(columnId: Column["id"], column: UpdateColumn): RestResponse<Column> {
        return await this.fetch<Column>(
            this.getColumnsRoute(columnId),
            {method: "PUT", body: JSON.stringify(column)},
        );
    }

    async moveColumn(columnId: Column["id"], nextId: Column["id"]|null): RestResponse<Column> {
        return await this.fetch<Column>(
            `${this.getColumnsRoute(columnId)}/move${nextId ? `?nextId=${nextId}` : ""}`,
            {method: "PATCH"},
        );
    }

    async deleteColumn(columnId: Column["id"]): RestResponse<Status> {
        return await this.fetch<Status>(
            this.getColumnsRoute(columnId),
            {method: "DELETE"},
        );
    }

    async getCard(cardId: Card["id"]): RestResponse<Card> {
        return await this.fetch<Card>(
            this.getCardsRoute(cardId),
            {method: "GET"},
        );
    }

    async getCards(columnIds?: Column["id"][]): RestResponse<Card[]> {
        return await this.fetch<Card[]>(
            `${this.getCardsRoute()}${columnIds?.length ? "?columnIds=" + columnIds.join(",") : ""}`,
            {method: "GET"},
        );
    }

    async joinCard(cardId: Card["id"]): RestResponse<Card> {
        return await this.fetch<Card>(
            `${this.getCardsRoute(cardId)}/join`,
            {method: "GET"},
        );
    }

    async leaveCard(cardId: Card["id"]): RestResponse<Card> {
        return await this.fetch<Card>(
            `${this.getCardsRoute(cardId)}/leave`,
            {method: "GET"},
        );
    }

    async addCardTag(cardId: Card["id"], tagId: Tag["id"]): RestResponse<Card> {
        return await this.fetch<Card>(
            `${this.getCardsRoute(cardId)}/tags/${tagId}`,
            {method: "GET"},
        );
    }

    async removeCardTag(cardId: Card["id"], tagId: Tag["id"]): RestResponse<Card> {
        return await this.fetch<Card>(
            `${this.getCardsRoute(cardId)}/tags/${tagId}`,
            {method: "DELETE"},
        );
    }

    async createCard(card: CreateCard): RestResponse<Card> {
        return await this.fetch<Card>(
            this.getCardsRoute(),
            {method: "POST", body: JSON.stringify(card)},
        );
    }

    async updateCard(cardId: Card["id"], card: UpdateCard): RestResponse<Card> {
        return await this.fetch<Card>(
            this.getCardsRoute(cardId),
            {method: "PUT", body: JSON.stringify(card)},
        );
    }

    async moveCard(cardId: Card["id"], columnId: Column["id"], nextId: Card["id"]|null): RestResponse<Card> {
        return await this.fetch<Card>(
            `${this.getCardsRoute(cardId)}/move?columnId=${columnId}&${nextId ? `nextId=${nextId}` : ""}`,
            {method: "PATCH"},
        );
    }

    async deleteCard(cardId: Card["id"]): RestResponse<Status> {
        return await this.fetch<Status>(
            this.getCardsRoute(cardId),
            {method: "DELETE"},
        );
    }

    async getTag(tagId: Tag["id"]): RestResponse<Tag> {
        return await this.fetch<Tag>(
            this.getTagsRoute(tagId),
            {method: "GET"},
        );
    }

    async getTags(boardIds?: Board["id"][]): RestResponse<Tag[]> {
        return await this.fetch<Tag[]>(
            `${this.getTagsRoute()}${boardIds?.length ? "?boardIds=" + boardIds.join(",") : ""}`,
            {method: "GET"},
        );
    }

    async createTag(tag: CreateTag): RestResponse<Tag> {
        return await this.fetch<Tag>(
            this.getTagsRoute(),
            {method: "POST", body: JSON.stringify(tag)},
        );
    }

    async updateTag(tagId: Tag["id"], tag: UpdateTag): RestResponse<Tag> {
        return await this.fetch<Tag>(
            this.getTagsRoute(tagId),
            {method: "PUT", body: JSON.stringify(tag)},
        );
    }

    async deleteTag(tagId: Tag["id"]): RestResponse<Status> {
        return await this.fetch<Status>(
            this.getTagsRoute(tagId),
            {method: "DELETE"},
        );
    }

    async getMe(): RestResponse<User> {
        return await this.fetch<User>(
            `${this.getUsersRoute()}/me`,
            {method: "GET"},
        );
    }

    async getUser(userId: User["id"]): RestResponse<User> {
        return await this.fetch<User>(
            this.getUsersRoute(userId),
            {method: "GET"},
        );
    }

    async getUsers(boardIds?: Board["id"][]): RestResponse<User[]> {
        return await this.fetch<User[]>(
            `${this.getUsersRoute()}${boardIds?.length ? "?boardIds=" + boardIds.join(",") : ""}`,
            {method: "GET"},
        );
    }
}

const rest = new RestClient();

export default rest;
