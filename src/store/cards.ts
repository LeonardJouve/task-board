import {create} from "zustand";
import Rest from "@api/rest";
import type {ActionResult, Card, Column, Tag} from "@typing/store";
import type {UpdateCard, CreateCard, Status} from "@typing/rest";

type CardState = {
    cards: Record<Card["id"], Card>;
    resetCards: () => void;
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
    resetCards: (): void => set(() => ({cards: {}})),
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
        let isSameCard = false;

        const modifiedCards: Card[] = [];
        set((state) => {
            let newState = state;

            const cards = Object.values(state.cards);
            const currentCard = getCard(cardId)(state);

            if (cardId === nextId && currentCard?.columnId === columnId) {
                isSameCard = true;
                return state;
            }

            const previousCard = cards.find((card) => card.nextId === cardId);
            if (previousCard && currentCard) {
                modifiedCards.push(previousCard);
                newState = setCard(state, {
                    ...previousCard,
                    nextId: currentCard.nextId,
                });
            }


            const beforeNextCard = nextId === null ? cards.find((card) => card.columnId === columnId && card.nextId === null) : cards.find((card) => card.nextId === nextId);
            if (beforeNextCard) {
                modifiedCards.push(beforeNextCard);
                newState = setCard(newState, {
                    ...beforeNextCard,
                    nextId: cardId,
                });
            }

            if (currentCard) {
                modifiedCards.push(currentCard);
                newState = setCard(newState, {
                    ...currentCard,
                    nextId,
                    columnId,
                });
            }

            return newState;
        });

        if (isSameCard) { // eslint-disable-line @typescript-eslint/no-unnecessary-condition
            return null;
        }

        const {error, data} = await Rest.moveCard(cardId, columnId, nextId);

        if (error) {
            set((state) => {
                let newState = {...state};
                for (const oldCard of modifiedCards) {
                    newState = setCard(newState, oldCard);
                }


                return newState;
            });

            return null;
        }

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

export const getSortedCardsInColumn = (columnId: Column["id"]) => (state: CardState): Card[] => sortCards(getCardsInColumn(columnId)(state));

const sortCards = (cards: Card[]): Card[] => {
    let currentCard = cards.find((card) => !card.nextId);

    if (!currentCard) {
        return [];
    }

    const sortedCards = [currentCard];

    while ((currentCard = cards.find((card) => card.nextId === currentCard?.id))) {
        sortedCards.push(currentCard);
    }

    return sortedCards.reverse();
};

export const getCard = (cardId: Card["id"]) => (state: CardState): Card|undefined => state.cards[cardId];

export default useCards;
