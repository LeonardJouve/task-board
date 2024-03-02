import {create} from "zustand";
import {persist} from "zustand/middleware";
import {useShallow} from "zustand/react/shallow";
import Rest from "@api/rest";
import useBoards from "@store/boards";
import useUsers from "@store/users";
import useColumns from "@store/columns";
import useTags from "@store/tags";
import type {ActionResult, Login, Register, Status, Tokens} from "@typing/rest";
import useCards from "@store/cards";
import {getTokenExpiration, isTimestampExpired, willTimestampExpire} from "@utils/jwt";

type AuthState = {
    isLoggedIn: boolean;
    accessTokenExpiration: number;
    refreshTokenExpiration: number;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    setTokensExpiration: (accessTokenExpiration: number, refreshTokenExpiration: number) => void;
    login: (credentials: Login) => ActionResult<Tokens>;
    register: (credentials: Register) => ActionResult<Tokens>;
    refresh: () => ActionResult<Tokens>;
    logout: () => ActionResult<Status>;
};

const useAuth = create<AuthState>()(persist((set) => ({
    isLoggedIn: false,
    accessTokenExpiration: 0,
    refreshTokenExpiration: 0,
    setIsLoggedIn: (isLoggedIn: boolean): void => set(() => ({isLoggedIn})),
    setTokensExpiration: (accessTokenExpiration, refreshTokenExpiration): void => {
        Rest.setTokensExpiration(accessTokenExpiration, refreshTokenExpiration);

        set(() => ({
            accessTokenExpiration,
            refreshTokenExpiration,
        }));
    },
    login: async (credentials): ActionResult<Tokens> => {
        const {error, data} = await Rest.login(credentials);

        if (error) {
            return null;
        }

        set(({setTokensExpiration}) => {
            const {accessToken, refreshToken} = data;
            setTokensExpiration(getTokenExpiration(accessToken), getTokenExpiration(refreshToken));

            return {isLoggedIn: true};
        });

        return data;
    },
    register: async (credentials): ActionResult<Tokens> => {
        const {error, data} = await Rest.register(credentials);

        if (error) {
            return null;
        }

        set(() => ({isLoggedIn: true}));
        return data;
    },
    refresh: async (): ActionResult<Tokens> => {
        const {error, data} = await Rest.refresh();

        if (error) {
            return null;
        }

        set(({setTokensExpiration}) => {
            const {accessToken, refreshToken} = data;
            setTokensExpiration(getTokenExpiration(accessToken), getTokenExpiration(refreshToken));
            return {};
        });

        return data;
    },
    logout: async (): ActionResult<Status> => {
        const {error, data} = await Rest.logout();

        if (error) {
            return null;
        }

        set(({setTokensExpiration}) => {
            setTokensExpiration(0, 0);

            return {isLoggedIn: false};
        });

        return data;
    },
}), {
    name: "auth",
    partialize: (state) => Object.fromEntries(Object.entries(state).filter(([key]) => ["accessTokenExpiration", "refreshTokenExpiration"].includes(key))),
    onRehydrateStorage: ({setIsLoggedIn, refresh}): ((state?: AuthState) => Promise<void>) => async (state) => {
        if (!state?.accessTokenExpiration || !state.refreshTokenExpiration) {
            return;
        }

        const {accessTokenExpiration, refreshTokenExpiration} = state;
        Rest.setTokensExpiration(accessTokenExpiration, refreshTokenExpiration);

        if (willTimestampExpire(accessTokenExpiration)) {
            if (isTimestampExpired(refreshTokenExpiration)) {
                setIsLoggedIn(false);
            } else {
                const result = await refresh();
                setIsLoggedIn(Boolean(result));
            }
        } else {
            setIsLoggedIn(true);
        }
    },
}));

export const useDisconnect = (): () => void => {
    const logout = useAuth(({logout}) => logout);
    const resetBoards = useBoards(({resetBoards}) => resetBoards);
    const resetColumns = useColumns(({resetColumns}) => resetColumns);
    const resetTags = useTags(({resetTags}) => resetTags);
    const resetCards = useCards(({resetCards}) => resetCards);
    const {resetMe, resetUsers} = useUsers(useShallow(({resetMe, resetUsers}) => ({resetMe, resetUsers})));

    return () => {
        logout();
        resetBoards();
        resetColumns();
        resetTags();
        resetCards();
        resetMe();
        resetUsers();
    };
};

export default useAuth;
