import {create} from "zustand";

enum Color {
    WHITE = "white",
}

export type Tag = {
    id: number;
    name: string;
    color: Color;
};

export type Card = {
    id: number;
    name: string;
    content: string;
    tags: Record<Tag["id"], Tag>;
};

export type Column = {
    id: number;
    name: string;
    cards: Record<Card["id"], Card>;
};

type ColumnState = {
    columns: Record<Column["id"], Column>;
    addColumn: (column: Column) => void;
    removeColumn: (columnId: Column["id"]) => void;
}

const useColumns = create<ColumnState>((set) => ({
    columns: {
        1: {
            id: 1,
            name: "1",
            cards: {
                1: {
                    id: 1,
                    name: "1",
                    content: "content content content content content content content content",
                    tags: {
                        1: {
                            id: 1,
                            name: "test",
                            color: Color.WHITE,
                        },
                        2: {
                            id: 2,
                            name: "test",
                            color: Color.WHITE,
                        },
                        3: {
                            id: 3,
                            name: "test",
                            color: Color.WHITE,
                        },
                        4: {
                            id: 4,
                            name: "test",
                            color: Color.WHITE,
                        },
                        5: {
                            id: 5,
                            name: "test",
                            color: Color.WHITE,
                        },
                        6: {
                            id: 6,
                            name: "test",
                            color: Color.WHITE,
                        },
                    },
                },
            },
        },
        2: {
            id: 2,
            name: "2",
            cards: {
                1: {
                    id: 1,
                    name: "1",
                    content: "content",
                    tags: {},
                },
                2: {
                    id: 2,
                    name: "2",
                    content: "content",
                    tags: {},
                },
            },
        },
    },
    addColumn: (column: Column): void => set((state: ColumnState) => ({
        columns: {
            ...state.columns,
            [column.id]: column,
        },
    })),
    removeColumn: (columnId: Column["id"]): void => set((state) => {
        const columns: ColumnState["columns"] = {...state.columns};
        delete columns[columnId];
        return {columns};
    }),
}));

export default useColumns;
