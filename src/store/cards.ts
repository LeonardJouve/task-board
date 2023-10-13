import {create} from "zustand";
import type {Tag} from "@store/tags";
import type {Column} from "./columns";

export type Card = {
    id: number;
    columnId: number;
    tagIds: Tag["id"][];
    name: string;
    content: string;
    order: number;
};

type CardState = {
    cards: Record<Card["id"], Card>;
    addCard: (card: Card) => void;
    removeCard: (cardId: Card["id"]) => void;
    removeCards: (cardIds: Card["id"][]) => void;
};

const useCards = create<CardState>((set) => ({
    cards: {
        1: {
            id: 1,
            columnId: 1,
            tagIds: [1, 2],
            name: "column",
            content: "content content content content content content content content",
            order: 1,
        },
    },
    addCard: (card: Card): void => set((state: CardState) => ({
        ...state.cards,
        [card.id]: card,
    })),
    removeCard: (cardId: Card["id"]): void => set((state: CardState) => removeCard(state, cardId)),
    removeCards: (cardIds: Card["id"][]): void => set((state: CardState) => cardIds.reduce((acc, current) => removeCard(acc, current), state)),
}));

const removeCard = (state: CardState, cardId: Card["id"]): CardState => {
    delete state.cards[cardId];
    return state;
};

export const getCardById = (state: CardState, cardId: Card["id"]): Card|undefined => state.cards[cardId];

export const getCardsInColumn = (state: CardState, columnId: Column["id"]): Card[] => Object.values(state.cards).filter((card) => card.columnId === columnId);

export default useCards;
