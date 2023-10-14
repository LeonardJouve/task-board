import {create} from "zustand";
import Rest from "@api/rest";
import type {Tag} from "@store/tags";
import type {Column} from "./columns";

export type Card = {
    id: number;
    columnId: number;
    nextId: number;
    tagIds: Tag["id"][];
    name: string;
    content: string;
};

type CardState = {
    cards: Record<Card["id"], Card>;
    addCard: (card: Card) => void;
    addCards: (cards: Card[]) => void;
    removeCard: (cardId: Card["id"]) => void;
    removeCards: (cardIds: Card["id"][]) => void;
    fetchCard: (cardId: Card["id"]) => Promise<void>;
    fetchCards: (columnIds?: Column["id"][]) => Promise<void>;
};

const useCards = create<CardState>((set) => ({
    cards: {},
    addCard: (card): void => set((state) => addCard(state, card)),
    addCards: (cards): void => set((state) => cards.reduce(addCard, state)),
    removeCard: (cardId): void => set((state) => removeCard(state, cardId)),
    removeCards: (cardIds): void => set((state) => cardIds.reduce(removeCard, state)),
    fetchCard: async (cardId): Promise<void> => {
        const {error, data} = await Rest.getCard(cardId);

        if (error) {
            return;
        }

        set((state) => addCard(state, data));
    },
    fetchCards: async (columnIds): Promise<void> => {
        const {error, data} = await Rest.getCards(columnIds);

        if (error) {
            return;
        }

        set((state) => data.reduce(addCard, state));
    },
}));

const addCard = (state: CardState, card: Card): CardState => ({
    ...state,
    cards: {
        ...state.cards,
        [card.id]: card,
    },
});

const removeCard = (state: CardState, cardId: Card["id"]): CardState => {
    delete state.cards[cardId];
    return state;
};

export const getCards = (state: CardState, columnId?: Column["id"]): CardState & {cards: Card[]} => ({
    ...state,
    cards: Object.values(state.cards).filter((card) => !columnId || card.columnId === columnId),
});

export default useCards;
