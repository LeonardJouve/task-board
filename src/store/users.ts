import {create} from "zustand";
import Rest from "@api/rest";
import type {Board, User} from "@typing/store";

type UserState = {
    me?: User;
    users: Record<User["id"], User>;
    setMe: (me: User) => void;
    addUser: (user: User) => void;
    addUsers: (users: User[]) => void;
    removeUser: (userId: User["id"]) => void;
    removeUsers: (userIds: User["id"][]) => void;
    fetchMe: () => Promise<void>;
    fetchUser: (userId: User["id"]) => Promise<void>;
    fetchUsers: (boardIds?: Board["id"][]) => Promise<void>;
};

const useUsers = create<UserState>((set) => ({
    users: {},
    setMe: (me): void => set(() => ({me})),
    addUser: (user): void => set((state) => addUser(state, user)),
    addUsers: (users): void => set((state) => users.reduce(addUser, state)),
    removeUser: (userId): void => set((state: UserState) => removeUser(state, userId)),
    removeUsers: (userIds): void => set((state: UserState) => userIds.reduce(removeUser, state)),
    fetchMe: async (): Promise<void> => {
        const {error, data} = await Rest.getMe();

        if (error) {
            return;
        }

        set(() => ({me: data}));
    },
    fetchUser: async (userId): Promise<void> => {
        const {error, data} = await Rest.getUser(userId);

        if (error) {
            return;
        }

        set((state) => addUser(state, data));
    },
    fetchUsers: async (boardIds): Promise<void> => {
        const {error, data} = await Rest.getUsers(boardIds);

        if (error) {
            return;
        }

        set((state) => data.reduce(addUser, state));
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

export default useUsers;
