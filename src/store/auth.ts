import {create} from "zustand";

type AuthState = {
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
};

const useAuth = create<AuthState>((set) => ({
    isLoggedIn: false,
    setIsLoggedIn: (isLoggedIn): void => set(() => ({isLoggedIn})),
}));

export default useAuth;
