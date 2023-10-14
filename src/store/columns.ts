import {create} from "zustand";
import Rest from "@api/rest";
import type {Board} from "@store/boards";

export type Column = {
    id: number;
    boardId: number;
    nextId: number;
    name: string;
};

type ColumnState = {
    columns: Record<Column["id"], Column>;
    addColumn: (column: Column) => void;
    addColumns: (columns: Column[]) => void;
    removeColumn: (columnId: Column["id"]) => void;
    removeColumns: (columnIds: Column["id"][]) => void;
    fetchColumn: (columnId: Column["id"]) => Promise<void>;
    fetchColumns: (boardIds?: Board["id"][]) => Promise<void>;
};

const useColumns = create<ColumnState>((set) => ({
    columns: {},
    addColumn: (column): void => set((state) => addColumn(state, column)),
    addColumns: (columns): void => set((state) => columns.reduce(addColumn, state)),
    removeColumn: (columnId): void => set((state) => removeColumn(state, columnId)),
    removeColumns: (columnIds): void => set((state) => columnIds.reduce(removeColumn, state)),
    fetchColumn: async (columnId): Promise<void> => {
        const {error, data} = await Rest.getColumn(columnId);

        if (error) {
            return;
        }

        set((state) => addColumn(state, data));
    },
    fetchColumns: async (boardIds): Promise<void> => {
        const {error, data} = await Rest.getColumns(boardIds);

        if (error) {
            return;
        }

        set((state) => data.reduce(addColumn, state));
    },
}));

const addColumn = (state: ColumnState, column: Column): ColumnState => ({
    ...state,
    columns: {
        ...state.columns,
        [column.id]: column,
    },
});

const removeColumn = (state: ColumnState, columnId: Column["id"]): ColumnState => {
    delete state.columns[columnId];
    return state;
};

export const getColumns = (state: ColumnState): ColumnState & {columns: Column[]} => ({
    ...state,
    columns: Object.values(state.columns),
});

export default useColumns;
