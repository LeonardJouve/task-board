import {create} from "zustand";

enum Color {
    WHITE = "white",
}

export type Tag = {
    id: number;
    boardId: number;
    name: string;
    color: Color;
};

type TagState = {
    tags: Record<Tag["id"], Tag>;
    addTag: (tag: Tag) => void;
    removeTag: (tagId: Tag["id"]) => void;
    removeTags: (tagIds: Tag["id"][]) => void;
};

const useTags = create<TagState>((set) => ({
    tags: {
        1: {
            id: 1,
            boardId: 1,
            name: "tag1",
            color: Color.WHITE,
        },
        2: {
            id: 2,
            boardId: 1,
            name: "tag2",
            color: Color.WHITE,
        },
    },
    addTag: (tag: Tag): void => set((state: TagState) => ({
        ...state.tags,
        [tag.id]: tag,
    })),
    removeTag: (tagId: Tag["id"]): void => set((state: TagState) => removeTag(state, tagId)),
    removeTags: (tagIds: Tag["id"][]): void => set((state: TagState) => tagIds.reduce((acc, current) => removeTag(acc, current), state)),
}));

const removeTag = (state: TagState, tagId: Tag["id"]): TagState => {
    delete state.tags[tagId];
    return state;
};

export const getTagById = (state: TagState, tagId: Tag["id"]): Tag|undefined => state.tags[tagId];

export default useTags;
