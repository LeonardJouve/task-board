import {create} from "zustand";
import Rest from "@api/rest";
import type {UpdateBoard, CreateBoard, ActionResult, Status} from "@typing/rest";
import type {Board, User} from "@typing/store";

type BoardState = {
    currentBoardId: Board["id"]|null;
    boards: Record<Board["id"], Board>;
    resetBoards: () => void;
    setCurrentBoardId: (boardId: BoardState["currentBoardId"]) => void;
    addBoard: (board: Board) => void;
    addBoards: (boards: Board[]) => void;
    removeBoard: (boardId: Board["id"]) => void;
    removeBoards: (boardIds: Board["id"][]) => void;
    fetchBoard: (boardId: Board["id"]) => ActionResult<Board>;
    fetchBoards: () => ActionResult<Board[]>;
    createBoard: (board: CreateBoard) => ActionResult<Board>;
    updateBoard: (boardId: Board["id"], board: UpdateBoard) => ActionResult<Board>;
    deleteBoard: (boardId: Board["id"]) => ActionResult<Status>;
    inviteUserToBoard: (boardId: Board["id"], userId: User["id"]) => ActionResult<Status>;
    leaveBoard: (boardId: Board["id"]) => ActionResult<Status>;
}

const useBoards = create<BoardState>((set) => ({
    currentBoardId: null,
    boards: {},
    resetBoards: (): void => set(() => ({boards: {}})),
    setCurrentBoardId: (currentBoardId): void => set(() => ({currentBoardId})),
    addBoard: (board): void => set((state) => setBoard(state, board)),
    addBoards: (boards): void => set((state) => boards.reduce(setBoard, state)),
    removeBoard: (boardId): void => set((state) => removeBoard(state, boardId)),
    removeBoards: (boardIds): void => set((state) => boardIds.reduce(removeBoard, state)),
    fetchBoard: async (boardId): ActionResult<Board> => {
        const {error, data} = await Rest.getBoard(boardId);

        if (error) {
            return null;
        }

        set((state) => setBoard(state, data));
        return data;
    },
    fetchBoards: async (): ActionResult<Board[]> => {
        const {error, data} = await Rest.getBoards();

        if (error) {
            return null;
        }

        set((state) => data.reduce(setBoard, state));
        return data;
    },
    createBoard: async (board): ActionResult<Board> => {
        const {error, data} = await Rest.createBoard(board);

        if (error) {
            return null;
        }

        set((state) => setBoard(state, data));
        return data;
    },
    updateBoard: async (boardId, board): ActionResult<Board> => {
        const {error, data} = await Rest.updateBoard(boardId, board);

        if (error) {
            return null;
        }

        set((state) => setBoard(state, data));
        return data;
    },
    deleteBoard: async (boardId): ActionResult<Status> => {
        const {error, data} = await Rest.deleteBoard(boardId);

        if (error) {
            return null;
        }

        set((state) => removeBoard(state, boardId));
        return data;
    },
    inviteUserToBoard: async (boardId, userId): ActionResult<Status> => {
        const {error, data} = await Rest.inviteUserToBoard(boardId, userId);

        if (error) {
            return null;
        }

        return data;
    },
    leaveBoard: async (boardId): ActionResult<Status> => {
        const {error, data} = await Rest.leaveBoard(boardId);

        if (error) {
            return null;
        }

        return data;
    },
}));

const setBoard = (state: BoardState, board: Board): BoardState => ({
    ...state,
    boards: {
        ...state.boards,
        [board.id]: board,
    },
});

const removeBoard = (state: BoardState, boardId: Board["id"]): BoardState => {
    const {[boardId]: _, ...boards} = state.boards;
    return {
        ...state,
        boards,
    };
};

export const getBoard = (boardId: Board["id"]) => (state: BoardState): Board|undefined => state.boards[boardId];

export const getCurrentBoard = () => (state: BoardState): Board|undefined => state.boards[state.currentBoardId ?? -1];

export default useBoards;
