import {create} from "zustand";
import Rest from "@api/rest";
import useBoards from "@store/boards";
import type {ActionResult, CreateColumn, Status, UpdateColumn} from "@typing/rest";
import type {Board, Column} from "@typing/store";


type ColumnState = {
    columns: Record<Column["id"], Column>;
    addColumn: (column: Column) => void;
    addColumns: (columns: Column[]) => void;
    removeColumn: (columnId: Column["id"]) => void;
    removeColumns: (columnIds: Column["id"][]) => void;
    fetchColumn: (columnId: Column["id"]) => ActionResult<Column>;
    fetchColumns: (boardIds?: Board["id"][]) => ActionResult<Column[]>;
    createColumn: (column: CreateColumn) => ActionResult<Column>;
    updateColumn: (columnId: Column["id"], column: UpdateColumn) => ActionResult<Column>;
    moveColumn: (columnId: Column["id"], nextId: Column["id"]|null) => ActionResult<Column>;
    deleteColumn: (columnId: Column["id"]) => ActionResult<Status>;
};

const useColumns = create<ColumnState>((set) => ({
    columns: {},
    addColumn: (column): void => set((state) => setColumn(state, column)),
    addColumns: (columns): void => set((state) => columns.reduce(setColumn, state)),
    removeColumn: (columnId): void => set((state) => removeColumn(state, columnId)),
    removeColumns: (columnIds): void => set((state) => columnIds.reduce(removeColumn, state)),
    fetchColumn: async (columnId): ActionResult<Column> => {
        const {error, data} = await Rest.getColumn(columnId);

        if (error) {
            return null;
        }

        set((state) => setColumn(state, data));
        return data;
    },
    fetchColumns: async (boardIds): ActionResult<Column[]> => {
        const {error, data} = await Rest.getColumns(boardIds);

        if (error) {
            return null;
        }

        set((state) => data.reduce(setColumn, state));
        return data;
    },
    createColumn: async (column): ActionResult<Column> => {
        const {error, data} = await Rest.createColumn(column);

        if (error) {
            return null;
        }

        set((state) => setColumn(state, data));
        return data;
    },
    updateColumn: async (columnId, column): ActionResult<Column> => {
        const {error, data} = await Rest.updateColumn(columnId, column);

        if (error) {
            return null;
        }

        set((state) => setColumn(state, data));
        return data;
    },
    moveColumn: async (columnId, nextId): ActionResult<Column> => {
        const {error, data} = await Rest.moveColumn(columnId, nextId);

        if (error) {
            return null;
        }

        // TODO: update other modified columns
        set((state) => setColumn(state, data));
        return data;
    },
    deleteColumn: async (columnId): ActionResult<Status> => {
        const {error, data} = await Rest.deleteColumn(columnId);

        if (error) {
            return null;
        }

        set((state) => removeColumn(state, columnId));
        return data;
    },
}));

const setColumn = (state: ColumnState, column: Column): ColumnState => ({
    ...state,
    columns: {
        ...state.columns,
        [column.id]: column,
    },
});

const removeColumn = (state: ColumnState, columnId: Column["id"]): ColumnState => {
    const {[columnId]: _, ...columns} = state.columns;
    return {
        ...state,
        columns,
    };
};

export const getColumnsInBoard = (boardId: Board["id"]) => (state: ColumnState): Column[] => Object.values(state.columns).filter((column) => column.boardId === boardId);

export const getColumnsInCurrentBoard = () => (state: ColumnState): Column[] => {
    const {currentBoardId} = useBoards();

    return Object.values(state.columns)
        .filter((column) => column.boardId === currentBoardId);
};

export const sortColumns = (columns: Column[]): Column[] => columns;

export const getColumn = (columnId: Column["id"]) => (state: ColumnState): Column|undefined => state.columns[columnId];

export default useColumns;
