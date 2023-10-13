import {create} from "zustand";

export type User = {
    id: number;
    name: string;
    email: string;
    username: string;
    picture: string;
};

type UserState = {
    me: User;
    users: Record<User["id"], User>;
};

const DEFAULT_USER = {
    id: -1,
    name: "",
    username: "",
    email: "",
    picture: "",
};

const useUsers = create<UserState>((set) => ({
    me: DEFAULT_USER,
    users: [],
    setMe: (me: User): void => set(() => ({
        me,
    })),
    addUser: (user: User): void => set(() => ({users: {[user.id]: user}})),
    removeUser: (userId: User["id"]): void => set((state: UserState) => removeUser(state, userId)),
    removeTags: (userIds: User["id"][]): void => set((state: UserState) => userIds.reduce((acc, current) => removeUser(acc, current), state)),
}));

const removeUser = (state: UserState, userId: User["id"]): UserState => {
    delete state.users[userId];
    return state;
};

export default useUsers;
