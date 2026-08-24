import {
  addFlashcardToDeck,
  countFlashcards,
  createDefaultFlashcardsState,
  createFlashcardDeck,
  flipCurrentFlashcard,
  getActiveFlashcardDeck,
  moveCurrentFlashcard,
  normalizeFlashcardsState,
  selectFlashcardDeck,
  shuffleActiveFlashcardDeck,
  type FlashcardDeck,
  type FlashcardsState
} from "./flashcards-core.js";

const FLASHCARDS_STORAGE_KEY = "myWebsiteFlashcardsState";

let flashcardsState: FlashcardsState = readFlashcardsState();

function readFlashcardsState(): FlashcardsState {
  try {
    const rawState = window.localStorage.getItem(FLASHCARDS_STORAGE_KEY);
    return normalizeFlashcardsState(rawState ? JSON.parse(rawState) : null);
  } catch (error) {
    console.error("Unable to read flashcards state:", error);
    return createDefaultFlashcardsState();
  }
}

function saveFlashcardsState(): void {
  try {
    window.localStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(flashcardsState));
  } catch (error) {
    console.error("Unable to save flashcards state:", error);
  }
}

function setFlashcardsState(nextState: FlashcardsState): void {
  flashcardsState = normalizeFlashcardsState(nextState);
  saveFlashcardsState();
  renderFlashcards();
}

function getRequiredElement<T extends HTMLElement>(id: string, constructor: { new (): T }): T | null {
  const element = document.getElementById(id);
  return element instanceof constructor ? element : null;
}

function formatDeckSummary(deck: FlashcardDeck): string {
  const cardCount = deck.cards.length;
  const cardLabel = cardCount === 1 ? "card" : "cards";

  return deck.description ? `${cardCount} ${cardLabel} - ${deck.description}` : `${cardCount} ${cardLabel}`;
}

function renderDeckList(deckList: HTMLElement): void {
  deckList.replaceChildren();

  flashcardsState.decks.forEach((deck) => {
    const deckButton = document.createElement("button");
    deckButton.type = "button";
    deckButton.className = "flashcards-deck-button";
    deckButton.dataset.active = String(deck.id === flashcardsState.activeDeckId);
    deckButton.setAttribute("aria-pressed", String(deck.id === flashcardsState.activeDeckId));

    const nameElement = document.createElement("span");
    nameElement.className = "flashcards-deck-button__name";
    nameElement.textContent = deck.name;

    const summaryElement = document.createElement("span");
    summaryElement.className = "flashcards-deck-button__summary";
    summaryElement.textContent = formatDeckSummary(deck);

    deckButton.append(nameElement, summaryElement);
    deckButton.addEventListener("click", () => {
      setFlashcardsState(selectFlashcardDeck(flashcardsState, deck.id));
    });
    deckList.append(deckButton);
  });
}

function renderCurrentCard(activeDeck: FlashcardDeck | null): void {
  const deckName = getRequiredElement("flashcardsActiveDeckName", HTMLHeadingElement);
  const progress = getRequiredElement("flashcardsProgress", HTMLParagraphElement);
  const cardButton = getRequiredElement("flashcardsCurrentCard", HTMLButtonElement);
  const cardSide = getRequiredElement("flashcardsCardSide", HTMLSpanElement);
  const cardText = getRequiredElement("flashcardsCardText", HTMLSpanElement);
  const previousButton = getRequiredElement("flashcardsPreviousCard", HTMLButtonElement);
  const flipButton = getRequiredElement("flashcardsFlipCard", HTMLButtonElement);
  const nextButton = getRequiredElement("flashcardsNextCard", HTMLButtonElement);
  const shuffleButton = getRequiredElement("flashcardsShuffleDeck", HTMLButtonElement);

  if (!deckName || !progress || !cardButton || !cardSide || !cardText || !previousButton || !flipButton || !nextButton || !shuffleButton) {
    return;
  }

  const activeCard = activeDeck?.cards[flashcardsState.activeCardIndex] || null;
  const hasCards = Boolean(activeCard && activeDeck);

  deckName.textContent = activeDeck ? activeDeck.name : "No deck selected";
  progress.textContent = activeDeck && activeDeck.cards.length > 0
    ? `${flashcardsState.activeCardIndex + 1} / ${activeDeck.cards.length}`
    : "0 / 0";
  cardButton.dataset.side = flashcardsState.isAnswerVisible ? "answer" : "question";
  cardSide.textContent = flashcardsState.isAnswerVisible ? "Answer" : "Question";
  cardText.textContent = activeCard
    ? flashcardsState.isAnswerVisible
      ? activeCard.answer
      : activeCard.question
    : "Add a card to this deck to begin.";

  cardButton.disabled = !hasCards;
  previousButton.disabled = !hasCards;
  flipButton.disabled = !hasCards;
  nextButton.disabled = !hasCards;
  shuffleButton.disabled = !activeDeck || activeDeck.cards.length < 2;
}

function renderSummary(activeDeck: FlashcardDeck | null): void {
  const summary = getRequiredElement("flashcardsSummary", HTMLParagraphElement);
  if (!summary) {
    return;
  }

  const deckCount = flashcardsState.decks.length;
  const cardCount = countFlashcards(flashcardsState);
  const activeDeckName = activeDeck?.name || "No deck";
  summary.textContent =
    `${deckCount} deck${deckCount === 1 ? "" : "s"}, ` +
    `${cardCount} card${cardCount === 1 ? "" : "s"}. Current deck: ${activeDeckName}.`;
}

function renderFlashcards(): void {
  const activeDeck = getActiveFlashcardDeck(flashcardsState);
  const deckList = getRequiredElement("flashcardsDeckList", HTMLDivElement);

  renderSummary(activeDeck);
  renderCurrentCard(activeDeck);
  if (deckList) {
    renderDeckList(deckList);
  }
}

function initializeFlashcardControls(): void {
  const cardButton = getRequiredElement("flashcardsCurrentCard", HTMLButtonElement);
  const previousButton = getRequiredElement("flashcardsPreviousCard", HTMLButtonElement);
  const flipButton = getRequiredElement("flashcardsFlipCard", HTMLButtonElement);
  const nextButton = getRequiredElement("flashcardsNextCard", HTMLButtonElement);
  const shuffleButton = getRequiredElement("flashcardsShuffleDeck", HTMLButtonElement);

  cardButton?.addEventListener("click", () => {
    setFlashcardsState(flipCurrentFlashcard(flashcardsState));
  });
  flipButton?.addEventListener("click", () => {
    setFlashcardsState(flipCurrentFlashcard(flashcardsState));
  });
  previousButton?.addEventListener("click", () => {
    setFlashcardsState(moveCurrentFlashcard(flashcardsState, -1));
  });
  nextButton?.addEventListener("click", () => {
    setFlashcardsState(moveCurrentFlashcard(flashcardsState, 1));
  });
  shuffleButton?.addEventListener("click", () => {
    setFlashcardsState(shuffleActiveFlashcardDeck(flashcardsState));
  });
}

function initializeDeckCreationForm(): void {
  const form = getRequiredElement("flashcardsCreateDeckForm", HTMLFormElement);
  const deckNameInput = getRequiredElement("flashcardsDeckNameInput", HTMLInputElement);
  const deckDescriptionInput = getRequiredElement("flashcardsDeckDescriptionInput", HTMLInputElement);
  const status = getRequiredElement("flashcardsDeckFormStatus", HTMLParagraphElement);

  if (!form || !deckNameInput || !deckDescriptionInput || !status) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const nextState = createFlashcardDeck(flashcardsState, deckNameInput.value, deckDescriptionInput.value);
    if (nextState === flashcardsState) {
      status.textContent = "Deck name is required.";
      return;
    }

    setFlashcardsState(nextState);
    status.textContent = `Created ${deckNameInput.value.trim()}.`;
    form.reset();
  });
}

function initializeAddCardForm(): void {
  const form = getRequiredElement("flashcardsAddCardForm", HTMLFormElement);
  const questionInput = getRequiredElement("flashcardsQuestionInput", HTMLTextAreaElement);
  const answerInput = getRequiredElement("flashcardsAnswerInput", HTMLTextAreaElement);
  const status = getRequiredElement("flashcardsCardFormStatus", HTMLParagraphElement);

  if (!form || !questionInput || !answerInput || !status) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const activeDeck = getActiveFlashcardDeck(flashcardsState);
    if (!activeDeck) {
      status.textContent = "Create a deck first.";
      return;
    }

    const nextState = addFlashcardToDeck(flashcardsState, activeDeck.id, questionInput.value, answerInput.value);
    if (nextState === flashcardsState) {
      status.textContent = "Question and answer are required.";
      return;
    }

    setFlashcardsState(nextState);
    status.textContent = `Added card to ${activeDeck.name}.`;
    form.reset();
  });
}

function initializeFlashcardsPage(): void {
  initializeFlashcardControls();
  initializeDeckCreationForm();
  initializeAddCardForm();
  setFlashcardsState(flashcardsState);
}

document.addEventListener("DOMContentLoaded", initializeFlashcardsPage);
