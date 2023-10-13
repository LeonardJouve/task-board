type RestResult<T> = {
    error: false;
    data: T;
    url: string;
    status: number;
};

type RestError<T> = {
    error: true;
    data: {
        id: string;
        defaultMessage: string;
    } | T;
    url: string;
};

type RestResponse<T> = Promise<RestResult<T> | RestError<T>>;

type Tokens = {
    accessToken: string;
    refreshToken: string;
}

class RestClient {
    private readonly baseUrl: string;

    constructor() {
        this.baseUrl = import.meta.env.VITE_API_URL;
    }

    static async doFetch<T>(url: string, options: RequestInit): RestResponse<T> {
        if (!document.cookie.includes("access_token")) {
            return {
                error: true,
                data: {
                    id: "api.rest.error.token",
                    defaultMessage: "Unexpetceted error. Please reconnect.",
                },
                url,
            };
        }

        const headers: RequestInit["headers"] = {
            "Content-Type": "application/json",
            "Accept": "application/json",
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

        return {
            data,
            url,
            error: !ok,
            status,
        };
    }

    getApiRoute(): string {
        return `${this.baseUrl}/api`;
    }

    getAuthRoute(): string {
        return `${this.baseUrl}/auth`;
    }

    async login(email: string, password: string): RestResponse<Tokens> {
        return await RestClient.doFetch(
            `${this.getAuthRoute()}/login`,
            {method: "POST", body: JSON.stringify({email, password})},
        );
    }

    async register(name: string, email: string, username: string, password: string, passwordConfirm: string): RestResponse<Tokens> {
        return await RestClient.doFetch(
            `${this.getAuthRoute()}/register`,
            {method: "POST", body: JSON.stringify({name, email, username, password, passwordConfirm})},
        );
    }
}

const rest = new RestClient();

export default rest;
