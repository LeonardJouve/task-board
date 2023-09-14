import {create} from "zustand";

export type Board = {
    id: number;
    name: string;
};

type BoardState = {
    currentBoardId?: Board["id"];
    boards: Record<Board["id"], Board>;
    addBoard: (board: Board) => void;
    removeBoard: (boardId: Board["id"]) => void;
    removeBoards: (boardIds: Board["id"][]) => void;
}

const useBoards = create<BoardState>((set) => ({
    currentBoardId: 1,
    boards: {1: {id: 1, name: "board"}},
    addBoard: (board: Board): void => set((state: BoardState) => ({
        boards: {
            ...state.boards,
            [board.id]: board,
        },
    })),
    removeBoard: (boardId: Board["id"]): void => set((state: BoardState) => removeBoard(state, boardId)),
    removeBoards: (boardIds: Board["id"][]): void => set((state: BoardState) => boardIds.reduce((acc, current) => removeBoard(acc, current), state)),
}));

const removeBoard = (state: BoardState, boardId: Board["id"]): BoardState => {
    delete state.boards[boardId];
    return state;
};

export const getBoardById = (state: BoardState, boardId: Board["id"]): Board|undefined => state.boards[boardId];

export default useBoards;
