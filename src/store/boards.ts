import {create} from "zustand";
import Rest from "@api/rest";

export type Board = {
    id: number;
    ownerId: number;
    name: string;
};

type BoardState = {
    boards: Record<Board["id"], Board>;
    addBoard: (board: Board) => void;
    addBoards: (boards: Board[]) => void;
    removeBoard: (boardId: Board["id"]) => void;
    removeBoards: (boardIds: Board["id"][]) => void;
    fetchBoard: (boardId: Board["id"]) => Promise<void>;
    fetchBoards: () => Promise<void>;
}

const useBoards = create<BoardState>((set) => ({
    boards: {},
    addBoard: (board): void => set((state) => addBoard(state, board)),
    addBoards: (boards): void => set((state) => boards.reduce(addBoard, state)),
    removeBoard: (boardId): void => set((state) => removeBoard(state, boardId)),
    removeBoards: (boardIds): void => set((state) => boardIds.reduce(removeBoard, state)),
    fetchBoard: async (boardId): Promise<void> => {
        const {error, data} = await Rest.getBoard(boardId);

        if (error) {
            return;
        }

        set((state) => addBoard(state, data));
    },
    fetchBoards: async (): Promise<void> => {
        const {error, data} = await Rest.getBoards();

        if (error) {
            return;
        }

        set((state) => data.reduce(addBoard, state));
    },

}));

const addBoard = (state: BoardState, board: Board): BoardState => ({
    ...state,
    boards: {
        ...state.boards,
        [board.id]: board,
    },
});

const removeBoard = (state: BoardState, boardId: Board["id"]): BoardState => {
    delete state.boards[boardId];
    return state;
};

export default useBoards;
