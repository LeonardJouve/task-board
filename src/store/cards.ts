import {create} from "zustand";
import Rest from "@api/rest";
import type {ActionResult, Card, Column, Tag} from "@typing/store";
import type {UpdateCard, CreateCard, Status} from "@typing/rest";

type CardState = {
    cards: Record<Card["id"], Card>;
    addCard: (card: Card) => void;
    addCards: (cards: Card[]) => void;
    removeCard: (cardId: Card["id"]) => void;
    removeCards: (cardIds: Card["id"][]) => void;
    fetchCard: (cardId: Card["id"]) => ActionResult<Card>;
    fetchCards: (columnIds?: Column["id"][]) => ActionResult<Card[]>;
    joinCard: (cardId: Card["id"]) => ActionResult<Card>;
    leaveCard: (cardId: Card["id"]) => ActionResult<Card>;
    addCardTag: (cardId: Card["id"], tagId: Tag["id"]) => ActionResult<Card>;
    removeCardTag: (cardId: Card["id"], tagId: Tag["id"]) => ActionResult<Card>;
    createCard: (card: CreateCard) => ActionResult<Card>;
    updateCard: (cardId: Card["id"], card: UpdateCard) => ActionResult<Card>;
    moveCard: (cardId: Card["id"], columnId: Column["id"], nextId: Card["id"]|null) => ActionResult<Card>;
    deleteCard: (cardId: Card["id"]) => ActionResult<Status>;
};

const useCards = create<CardState>((set) => ({
    cards: {},
    addCard: (card): void => set((state) => setCard(state, card)),
    addCards: (cards): void => set((state) => cards.reduce(setCard, state)),
    removeCard: (cardId): void => set((state) => removeCard(state, cardId)),
    removeCards: (cardIds): void => set((state) => cardIds.reduce(removeCard, state)),
    fetchCard: async (cardId): ActionResult<Card> => {
        const {error, data} = await Rest.getCard(cardId);

        if (error) {
            return null;
        }

        set((state) => setCard(state, data));
        return data;
    },
    fetchCards: async (columnIds): ActionResult<Card[]> => {
        const {error, data} = await Rest.getCards(columnIds);

        if (error) {
            return null;
        }

        set((state) => data.reduce(setCard, state));
        return data;
    },
    joinCard: async (cardId): ActionResult<Card> => {
        const {error, data} = await Rest.joinCard(cardId);

        if (error) {
            return null;
        }

        set((state) => setCard(state, data));
        return data;
    },
    leaveCard: async (cardId): ActionResult<Card> => {
        const {error, data} = await Rest.leaveCard(cardId);

        if (error) {
            return null;
        }

        set((state) => setCard(state, data));
        return data;
    },
    addCardTag: async (cardId, tagId): ActionResult<Card> => {
        const {error, data} = await Rest.addCardTag(cardId, tagId);

        if (error) {
            return null;
        }

        set((state) => setCard(state, data));
        return data;
    },
    removeCardTag: async (cardId, tagId): ActionResult<Card> => {
        const {error, data} = await Rest.removeCardTag(cardId, tagId);

        if (error) {
            return null;
        }

        set((state) => setCard(state, data));
        return data;
    },
    createCard: async (card): ActionResult<Card> => {
        const {error, data} = await Rest.createCard(card);

        if (error) {
            return null;
        }

        set((state) => setCard(state, data));
        return data;
    },
    updateCard: async (cardId, card): ActionResult<Card> => {
        const {error, data} = await Rest.updateCard(cardId, card);

        if (error) {
            return null;
        }

        set((state) => setCard(state, data));
        return data;
    },
    moveCard: async (cardId, columnId, nextId): ActionResult<Card> => {
        const {error, data} = await Rest.moveCard(cardId, columnId, nextId);

        if (error) {
            return null;
        }

        // TODO: update other modified cards
        set((state) => setCard(state, data));
        return data;
    },
    deleteCard: async (cardId): ActionResult<Status> => {
        const {error, data} = await Rest.deleteCard(cardId);

        if (error) {
            return null;
        }

        set((state) => removeCard(state, cardId));
        return data;
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
    const {[cardId]: _, ...cards} = state.cards;
    return {
        ...state,
        cards,
    };
};

export const getCardsInColumn = (columnId: Column["id"]) => (state: CardState): Card[] => Object.values(state.cards).filter((card) => card.columnId === columnId);

export const sortCards = (cards: Card[]): Card[] => cards;

export const getCard = (cardId: Card["id"]) => (state: CardState): Card|undefined => state.cards[cardId];

export default useCards;
