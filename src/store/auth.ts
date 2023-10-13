import {create} from "zustand";

type AuthState = {
    isLoggedIn: boolean;
};

const useAuth = create<AuthState>((set) => ({
    isLoggedIn: false,
    setIsLoggedIn: (isLoggedIn: boolean): void => set(() => ({isLoggedIn})),
}));

export default useAuth;
