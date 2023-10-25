import {create} from "zustand";
import Rest, {type UpdateCard, type CreateCard} from "@api/rest";
import type {Column} from "@store/columns";
import type {Tag} from "@store/tags";

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
    addCardTag: (cardId: Card["id"], tagId: Tag["id"]) => Promise<void>;
    createCard: (card: CreateCard) => Promise<void>;
    updateCard: (cardId: Card["id"], card: UpdateCard) => Promise<void>;
    moveCard: (cardId: Card["id"], columnId: Column["id"], nextId: Card["id"]|null) => Promise<void>;
    deleteCard: (cardId: Card["id"]) => Promise<void>;
};

const useCards = create<CardState>((set) => ({
    cards: {},
    addCard: (card): void => set((state) => setCard(state, card)),
    addCards: (cards): void => set((state) => cards.reduce(setCard, state)),
    removeCard: (cardId): void => set((state) => removeCard(state, cardId)),
    removeCards: (cardIds): void => set((state) => cardIds.reduce(removeCard, state)),
    fetchCard: async (cardId): Promise<void> => {
        const {error, data} = await Rest.getCard(cardId);

        if (error) {
            return;
        }

        set((state) => setCard(state, data));
    },
    fetchCards: async (columnIds): Promise<void> => {
        const {error, data} = await Rest.getCards(columnIds);

        if (error) {
            return;
        }

        set((state) => data.reduce(setCard, state));
    },
    addCardTag: async (cardId, tagId): Promise<void> => {
        const {error, data} = await Rest.addCardTag(cardId, tagId);

        if (error) {
            return;
        }

        set((state) => setCard(state, data));
    },
    createCard: async (card): Promise<void> => {
        const {error, data} = await Rest.createCard(card);

        if (error) {
            return;
        }

        set((state) => setCard(state, data));
    },
    updateCard: async (cardId, card): Promise<void> => {
        const {error, data} = await Rest.updateCard(cardId, card);

        if (error) {
            return;
        }

        set((state) => setCard(state, data));
    },
    moveCard: async (cardId, columnId, nextId): Promise<void> => {
        const {error, data} = await Rest.moveCard(cardId, columnId, nextId);

        if (error) {
            return;
        }

        // TODO: update other modified cards
        set((state) => setCard(state, data));
    },
    deleteCard: async (cardId): Promise<void> => {
        const {error} = await Rest.deleteCard(cardId);

        if (error) {
            return;
        }

        set((state) => removeCard(state, cardId));
    },
}));

const setCard = (state: CardState, card: Card): CardState => ({
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

export const getCardsInColumn = (cards: CardState["cards"], columnId: Column["id"]): Card[] => Object.values(cards).filter((card) => card.columnId === columnId);

export default useCards;
