import type {MessageDescriptor} from "react-intl";
import type {Board} from "@store/boards";
import type {Column} from "@store/columns";
import type {Card} from "@store/cards";
import type {Tag} from "@store/tags";
import type {User} from "@store/users";

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

type RestResponse<T> = Promise<RestResult<T> | RestError>;

type Tokens = {
    accessToken: string;
    refreshToken: string;
};

type CsrfToken = {
    csrfToken: string;
};

class RestClient {
    private readonly baseUrl: string;
    private readonly maxRetry: number = 5;
    private csrfToken: string|null = null;
    private accessToken: string|null = null;
    private refreshToken: string|null = null;

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

    getApiRoute(): string {
        return `${this.baseUrl}/api`;
    }

    getAuthRoute(): string {
        return `${this.baseUrl}/auth`;
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
            this.refreshToken = data.refreshToken;
        }

        return result;
    }

    async register(name: string, email: string, username: string, password: string, passwordConfirm: string): RestResponse<Tokens> {
        return await this.fetch<Tokens>(
            `${this.getAuthRoute()}/register`,
            {method: "POST", body: JSON.stringify({name, email, username, password, passwordConfirm})},
            false,
        );
    }

    async getBoard(boardId: Board["id"]): RestResponse<Board> {
        return await this.fetch<Board>(
            `${this.getApiRoute()}/boards/${boardId}`,
            {method: "GET"},
        );
    }

    async getBoards(): RestResponse<Board[]> {
        return await this.fetch<Board[]>(
            `${this.getApiRoute()}/boards`,
            {method: "GET"},
        );
    }

    async getColumn(columnId: Column["id"]): RestResponse<Column> {
        return await this.fetch<Column>(
            `${this.getApiRoute()}/columns/${columnId}`,
            {method: "GET"},
        );
    }

    async getColumns(boardIds?: Board["id"][]): RestResponse<Column[]> {
        return await this.fetch<Column[]>(
            `${this.getApiRoute()}/columns${boardIds?.length ? "?boardsIds=" + boardIds.join(",") : ""}`,
            {method: "GET"},
        );
    }

    async getCard(cardId: Card["id"]): RestResponse<Card> {
        return await this.fetch<Card>(
            `${this.getApiRoute()}/cards/${cardId}`,
            {method: "GET"},
        );
    }

    async getCards(columnIds?: Column["id"][]): RestResponse<Card[]> {
        return await this.fetch<Card[]>(
            `${this.getApiRoute()}/cards${columnIds?.length ? "?columnIds=" + columnIds.join(",") : ""}`,
            {method: "GET"},
        );
    }

    async getTag(tagId: Tag["id"]): RestResponse<Tag> {
        return await this.fetch<Tag>(
            `${this.getApiRoute()}/tags/${tagId}`,
            {method: "GET"},
        );
    }

    async getTags(boardIds?: Board["id"][]): RestResponse<Tag[]> {
        return await this.fetch<Tag[]>(
            `${this.getApiRoute()}/tags${boardIds?.length ? "?boardIds=" + boardIds.join(",") : ""}`,
            {method: "GET"},
        );
    }

    async getMe(): RestResponse<User> {
        return await this.fetch<User>(
            `${this.getApiRoute()}/users/me`,
            {method: "GET"},
        );
    }

    async getUser(userId: User["id"]): RestResponse<User> {
        return await this.fetch<User>(
            `${this.getApiRoute()}/users/${userId}`,
            {method: "GET"},
        );
    }

    async getUsers(boardIds?: Board["id"][]): RestResponse<User[]> {
        return await this.fetch<User[]>(
            `${this.getApiRoute()}/users${boardIds?.length ? "?boardIds=" + boardIds.join(",") : ""}`,
            {method: "GET"},
        );
    }
}

const rest = new RestClient();

export default rest;
