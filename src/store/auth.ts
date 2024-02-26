import {create} from "zustand";
import {useShallow} from "zustand/react/shallow";
import Rest from "@api/rest";
import useBoards from "@store/boards";
import useUsers from "@store/users";
import useColumns from "@store/columns";
import useTags from "@store/tags";
import type {ActionResult, Login, Register, Status, Tokens} from "@typing/rest";
import useCards from "@store/cards";

type AuthState = {
    isLoggedIn: boolean;
    login: (credentials: Login) => ActionResult<Tokens>;
    register: (credentials: Register) => ActionResult<Tokens>;
    logout: () => ActionResult<Status>;
};

const useAuth = create<AuthState>((set) => ({
    isLoggedIn: false, // TODO: infer from cookie + unexpired / also restore Rest accessToken + refreshToken
    login: async (credentials): ActionResult<Tokens> => {
        const {error, data} = await Rest.login(credentials);

        if (error) {
            return null;
        }

        set(() => ({isLoggedIn: true}));
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
    logout: async (): ActionResult<Status> => {
        const {error, data} = await Rest.logout();

        if (error) {
            return null;
        }

        set(() => ({isLoggedIn: false}));
        return data;
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
