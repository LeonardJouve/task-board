import {create} from "zustand";
import Rest from "@api/rest";
import type {Board, User} from "@typing/store";
import type {ActionResult} from "@typing/rest";

type UserState = {
    me?: User;
    users: Record<User["id"], User>;
    resetMe: () => void;
    resetUsers: () => void;
    setMe: (me: User) => void;
    addUser: (user: User) => void;
    addUsers: (users: User[]) => void;
    removeUser: (userId: User["id"]) => void;
    removeUsers: (userIds: User["id"][]) => void;
    fetchMe: () => ActionResult<User>;
    fetchUser: (userId: User["id"]) => ActionResult<User>;
    fetchUsers: (boardIds?: Board["id"][]) => ActionResult<User[]>;
};

const useUsers = create<UserState>((set) => ({
    users: {},
    setMe: (me): void => set(() => ({me})),
    resetMe: (): void => set(() => ({me: undefined})),
    resetUsers: (): void => set(() => ({users: {}})),
    addUser: (user): void => set((state) => addUser(state, user)),
    addUsers: (users): void => set((state) => users.reduce(addUser, state)),
    removeUser: (userId): void => set((state: UserState) => removeUser(state, userId)),
    removeUsers: (userIds): void => set((state: UserState) => userIds.reduce(removeUser, state)),
    fetchMe: async (): ActionResult<User> => {
        const {error, data} = await Rest.getMe();

        if (error) {
            return null;
        }

        set(() => ({me: data}));
        return data;
    },
    fetchUser: async (userId): ActionResult<User> => {
        const {error, data} = await Rest.getUser(userId);

        if (error) {
            return null;
        }

        set((state) => addUser(state, data));
        return data;
    },
    fetchUsers: async (boardIds): ActionResult<User[]> => {
        const {error, data} = await Rest.getUsers(boardIds);

        if (error) {
            return null;
        }

        set((state) => data.reduce(addUser, state));
        return data;
    },
}));

const addUser = (state: UserState, user: User): UserState => ({
    ...state,
    users: {
        ...state.users,
        [user.id]: user,
    },
});

const removeUser = (state: UserState, userId: User["id"]): UserState => {
    const {[userId]: _, ...users} = state.users;
    return {
        ...state,
        users,
    };
};

export const getUser = (userId: User["id"]) => (state: UserState): User|undefined => state.users[userId];

export default useUsers;
