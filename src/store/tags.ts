import {create} from "zustand";
import Rest from "@api/rest";
import type {CreateTag, UpdateTag} from "@typing/rest";
import type {ActionResult, Board, Card, Tag} from "@typing/store";

type TagState = {
    defaultColor: string;
    tags: Record<Tag["id"], Tag>;
    addTag: (tag: Tag) => void;
    addTags: (tags: Tag[]) => void;
    removeTag: (tagId: Tag["id"]) => void;
    removeTags: (tagIds: Tag["id"][]) => void;
    fetchTag: (tagId: Tag["id"]) => Promise<void>;
    fetchTags: (boardIds?: Board["id"][]) => Promise<void>;
    createTag: (tag: CreateTag) => ActionResult<Tag>;
    updateTag: (tagId: Tag["id"], tag: UpdateTag) => Promise<void>;
    deleteTag: (tagId: Tag["id"]) => Promise<void>;
};

const useTags = create<TagState>((set) => ({
    defaultColor: "FFFFFF",
    tags: {},
    addTag: (tag): void => set((state) => setTag(state, tag)),
    addTags: (tags): void => set((state) => tags.reduce(setTag, state)),
    removeTag: (tagId): void => set((state) => removeTag(state, tagId)),
    removeTags: (tagIds): void => set((state) => tagIds.reduce(removeTag, state)),
    fetchTag: async (tagId): Promise<void> => {
        const {error, data} = await Rest.getTag(tagId);

        if (error) {
            return;
        }

        set((state) => setTag(state, data));
    },
    fetchTags: async (boardIds): Promise<void> => {
        const {error, data} = await Rest.getTags(boardIds);

        if (error) {
            return;
        }

        set((state) => data.reduce(setTag, state));
    },
    createTag: async (tag): ActionResult<Tag> => {
        const {error, data} = await Rest.createTag(tag);

        if (error) {
            return null;
        }

        set((state) => setTag(state, data));

        return data;
    },
    updateTag: async (tagId, tag): Promise<void> => {
        const {error, data} = await Rest.updateTag(tagId, tag);

        if (error) {
            return;
        }

        set((state) => setTag(state, data));
    },
    deleteTag: async (tagId): Promise<void> => {
        const {error} = await Rest.deleteTag(tagId);

        if (error) {
            return;
        }

        set((state) => removeTag(state, tagId));
    },
}));

const setTag = (state: TagState, tag: Tag): TagState => ({
    ...state,
    tags: {
        ...state.tags,
        [tag.id]: tag,
    },
});

const removeTag = (state: TagState, tagId: Tag["id"]): TagState => {
    const {[tagId]: _, ...tags} = state.tags;
    return {
        ...state,
        tags,
    };
};

export const getTagsInBoard = (tags: TagState["tags"], boardId: Board["id"]): Tag[] => Object.values(tags)
    .filter((tag) => tag.boardId === boardId);

export const getTagsInCards = (tags: TagState["tags"], cards: Card[]): Tag[] => Object.values(tags)
    .filter((tag) => cards.some((card) => card.tagIds.includes(tag.id)));

export const getTagsColors = (tags: TagState["tags"]): string[] => Object.values(tags)
    .map(({color}) => color)
    .filter((hex, i, self) => self.indexOf(hex) === i);

export default useTags;
