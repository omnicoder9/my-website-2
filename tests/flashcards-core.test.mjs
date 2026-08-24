import assert from "node:assert/strict";
import test from "node:test";

import {
  JAVA_TRIVIA_DECK_ID,
  addFlashcardToDeck,
  createDefaultFlashcardsState,
  createFlashcardDeck,
  defaultJavaTriviaDeck,
  flipCurrentFlashcard,
  getActiveFlashcardDeck,
  moveCurrentFlashcard,
  normalizeFlashcardsState,
  shuffleActiveFlashcardDeck
} from "../dist/js/flashcards-core.js";

test("default flashcards state includes the seeded Java trivia deck", () => {
  const state = createDefaultFlashcardsState();

  assert.equal(state.activeDeckId, JAVA_TRIVIA_DECK_ID);
  assert.equal(state.decks.length, 1);
  assert.equal(state.decks[0].name, "Basic Java Programming Trivia");
  assert.equal(state.decks[0].cards.length, 20);
  assert.equal(defaultJavaTriviaDeck.cards.length, 20);
});

test("normalizeFlashcardsState preserves valid custom decks and inserts the seeded deck", () => {
  const state = normalizeFlashcardsState({
    activeCardIndex: 9,
    activeDeckId: "custom",
    decks: [
      {
        cards: [
          {
            answer: "A",
            id: "a",
            question: "Q"
          }
        ],
        createdAt: "2026-08-24T00:00:00.000Z",
        description: "Practice",
        id: "custom",
        name: "Custom",
        updatedAt: "2026-08-24T00:00:00.000Z"
      }
    ],
    isAnswerVisible: true
  });

  assert.equal(state.decks.length, 2);
  assert.equal(state.decks[0].id, JAVA_TRIVIA_DECK_ID);
  assert.equal(state.activeDeckId, "custom");
  assert.equal(state.activeCardIndex, 0);
  assert.equal(state.isAnswerVisible, true);
});

test("createFlashcardDeck and addFlashcardToDeck sanitize input and select the new items", () => {
  const state = createDefaultFlashcardsState();
  const withDeck = createFlashcardDeck(state, "  Networking \u0000 Basics  ", "  Core prompts  ", "deck-1", "now");
  const withCard = addFlashcardToDeck(withDeck, "deck-1", "  What is TCP?\n", " Reliable transport. ", "card-1", "later");
  const activeDeck = getActiveFlashcardDeck(withCard);

  assert.equal(activeDeck?.name, "Networking Basics");
  assert.equal(activeDeck?.description, "Core prompts");
  assert.equal(activeDeck?.cards.length, 1);
  assert.deepEqual(activeDeck?.cards[0], {
    answer: "Reliable transport.",
    id: "card-1",
    question: "What is TCP?"
  });
  assert.equal(withCard.activeCardIndex, 0);
  assert.equal(withCard.isAnswerVisible, false);
});

test("flip and move operate on the active deck", () => {
  const state = createDefaultFlashcardsState();
  const flipped = flipCurrentFlashcard(state);
  const next = moveCurrentFlashcard(flipped, 1);
  const previous = moveCurrentFlashcard(next, -1);

  assert.equal(flipped.isAnswerVisible, true);
  assert.equal(next.activeCardIndex, 1);
  assert.equal(next.isAnswerVisible, false);
  assert.equal(previous.activeCardIndex, 0);
});

test("shuffleActiveFlashcardDeck reorders cards and resets to the question side", () => {
  const state = {
    ...createDefaultFlashcardsState(),
    activeCardIndex: 5,
    isAnswerVisible: true
  };
  const shuffled = shuffleActiveFlashcardDeck(state, () => 0, "later");
  const activeDeck = getActiveFlashcardDeck(shuffled);

  assert.equal(shuffled.activeCardIndex, 0);
  assert.equal(shuffled.isAnswerVisible, false);
  assert.equal(activeDeck?.cards.length, 20);
  assert.notEqual(activeDeck?.cards[0].id, state.decks[0].cards[0].id);
  assert.equal(activeDeck?.updatedAt, "later");
});
