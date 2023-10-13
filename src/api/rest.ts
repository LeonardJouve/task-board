import type {MessageDescriptor} from "react-intl";

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
    private csrfToken: string = "";

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

        if (apiTokenRequired && !document.cookie.includes("access_token")) {
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
            "X-CSRF-Token": this.csrfToken,
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
                const {error} = await this.getCsrfToken();

                if (!error) {
                    return this.fetch(url, options, apiTokenRequired, retry + 1);
                }
            }

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
        return await this.fetch<Tokens>(
            `${this.getAuthRoute()}/login`,
            {method: "POST", body: JSON.stringify({email, password})},
            false,
        );
    }

    async register(name: string, email: string, username: string, password: string, passwordConfirm: string): RestResponse<Tokens> {
        return await this.fetch<Tokens>(
            `${this.getAuthRoute()}/register`,
            {method: "POST", body: JSON.stringify({name, email, username, password, passwordConfirm})},
            false,
        );
    }
}

const rest = new RestClient();

export default rest;
