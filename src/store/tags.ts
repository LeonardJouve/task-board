import {create} from "zustand";
import Rest from "@api/rest";
import type {Board} from "@store/boards";

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
    addTags: (tags: Tag[]) => void;
    removeTag: (tagId: Tag["id"]) => void;
    removeTags: (tagIds: Tag["id"][]) => void;
    fetchTag: (tagId: Tag["id"]) => Promise<void>;
    fetchTags: (boardIds?: Board["id"][]) => Promise<void>;
};

const useTags = create<TagState>((set) => ({
    tags: {},
    addTag: (tag): void => set((state) => addTag(state, tag)),
    addTags: (tags): void => set((state) => tags.reduce(addTag, state)),
    removeTag: (tagId): void => set((state) => removeTag(state, tagId)),
    removeTags: (tagIds): void => set((state) => tagIds.reduce(removeTag, state)),
    fetchTag: async (tagId): Promise<void> => {
        const {error, data} = await Rest.getTag(tagId);

        if (error) {
            return;
        }

        set((state) => addTag(state, data));
    },
    fetchTags: async (boardIds): Promise<void> => {
        const {error, data} = await Rest.getTags(boardIds);

        if (error) {
            return;
        }

        set((state) => data.reduce(addTag, state));
    },
}));

const addTag = (state: TagState, tag: Tag): TagState => ({
    ...state,
    tags: {
        ...state.tags,
        [tag.id]: tag,
    },
});

const removeTag = (state: TagState, tagId: Tag["id"]): TagState => {
    delete state.tags[tagId];
    return state;
};

export default useTags;
