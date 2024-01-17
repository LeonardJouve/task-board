import {create} from "zustand";
import type {AppError} from "@typing/store";

type ErrorState = {
    error: AppError;
    setError: (error: AppError) => void;
};

const useErrors = create<ErrorState>((set) => ({
    error: null,
    setError: (error): void => set(() => ({error})),
}));

export default useErrors;
