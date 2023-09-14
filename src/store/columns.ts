import {create} from "zustand";

export type Column = {
    id: number;
    boardId: number;
    name: string;
};

type ColumnState = {
    columns: Record<Column["id"], Column>;
    addColumn: (column: Column) => void;
    removeColumn: (columnId: Column["id"]) => void;
    removeColumns: (columnIds: Column["id"][]) => void;
};

const useColumns = create<ColumnState>((set) => ({
    columns: {
        1: {
            id: 1,
            boardId: 1,
            name: "1",
        },
        2: {
            id: 2,
            boardId: 1,
            name: "2",
        },
    },
    addColumn: (column: Column): void => set((state: ColumnState) => ({
        columns: {
            ...state.columns,
            [column.id]: column,
        },
    })),
    removeColumn: (columnId: Column["id"]): void => set((state) => removeColumn(state, columnId)),
    removeColumns: (columnIds: Column["id"][]): void => set((state: ColumnState) => columnIds.reduce((acc, current) => removeColumn(acc, current), state)),
}));

const removeColumn = (state: ColumnState, columnId: Column["id"]): ColumnState => {
    delete state.columns[columnId];
    return state;
};

export const getColumnById = (state: ColumnState, columnId: Column["id"]): Column|undefined => state.columns[columnId];

export default useColumns;
