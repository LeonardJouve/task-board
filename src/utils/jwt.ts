type JWT = {
    iss?: string;
    sub?: string;
    aud?: string[] | string;
    exp?: number;
    nbf?: number;
    iat?: number;
    jti?: string;
};

export const decodeJWT = (token: string): JWT|null => {
    const [, data] = token.split(".");

    if (!data) {
        return null;
    }

    let payload: string;
    try {
        payload = atob(data);

        return JSON.parse(payload) as JWT;
    } catch (e) {
        return null;
    }
};

export const getTokenExpiration = (token: string): number => decodeJWT(token)?.exp ?? 0;

export const isTimestampExpired = (timestamp: number): boolean => Date.now() / 1000 > timestamp;

export const willTimestampExpire = (timestamp: number, minutesBeforeExpiration = 5): boolean => {
    const now = Date.now() / 1000;
    return timestamp > now && timestamp - now < minutesBeforeExpiration * 60;
};
