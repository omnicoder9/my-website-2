export type Flashcard = {
  answer: string;
  id: string;
  question: string;
};

export type FlashcardDeck = {
  cards: Flashcard[];
  createdAt: string;
  description: string;
  id: string;
  name: string;
  updatedAt: string;
};

export type FlashcardsState = {
  activeCardIndex: number;
  activeDeckId: string;
  decks: FlashcardDeck[];
  isAnswerVisible: boolean;
};

const MAX_DECK_NAME_LENGTH = 80;
const MAX_DECK_DESCRIPTION_LENGTH = 220;
const MAX_CARD_TEXT_LENGTH = 900;
const JAVA_TRIVIA_DECK_DATE = "2026-08-24T00:00:00.000Z";

export const JAVA_TRIVIA_DECK_ID = "basic-java-programming-trivia";

export const defaultJavaTriviaDeck: FlashcardDeck = {
  cards: [
    {
      id: "java-card-class-keyword",
      question: "Which keyword declares a class in Java?",
      answer: "The class keyword declares a class."
    },
    {
      id: "java-card-main-method",
      question: "What method signature is the usual entry point for a Java console program?",
      answer: "public static void main(String[] args)"
    },
    {
      id: "java-card-boolean",
      question: "Which primitive type stores true or false values?",
      answer: "boolean"
    },
    {
      id: "java-card-int",
      question: "Which primitive type is commonly used for whole numbers?",
      answer: "int"
    },
    {
      id: "java-card-string-type",
      question: "Is String a primitive type in Java?",
      answer: "No. String is a class, so String values are reference values."
    },
    {
      id: "java-card-final-variable",
      question: "What does final mean when applied to a local variable?",
      answer: "The variable can be assigned only once."
    },
    {
      id: "java-card-equals",
      question: "What is the basic difference between == and equals for objects?",
      answer: "== compares references. equals can compare logical object equality when a class defines it."
    },
    {
      id: "java-card-new",
      question: "Which keyword creates a new object instance?",
      answer: "new"
    },
    {
      id: "java-card-public",
      question: "What does the public access modifier allow?",
      answer: "A public member or type can be accessed from other classes, subject to normal package and module visibility."
    },
    {
      id: "java-card-private",
      question: "What does the private access modifier restrict?",
      answer: "A private member is accessible only inside the class that declares it."
    },
    {
      id: "java-card-package",
      question: "What is a Java package used for?",
      answer: "A package groups related classes and helps organize names."
    },
    {
      id: "java-card-extends",
      question: "Which keyword is used when one class inherits from another class?",
      answer: "extends"
    },
    {
      id: "java-card-implements",
      question: "Which keyword is used when a class agrees to provide an interface's methods?",
      answer: "implements"
    },
    {
      id: "java-card-array-length",
      question: "How do you read the number of elements in a Java array?",
      answer: "Use the length field, such as numbers.length."
    },
    {
      id: "java-card-arraylist-size",
      question: "How do you read the number of elements in an ArrayList?",
      answer: "Call the size() method."
    },
    {
      id: "java-card-exceptions",
      question: "Which keywords are central to Java exception handling?",
      answer: "try, catch, finally, throw, and throws."
    },
    {
      id: "java-card-jvm",
      question: "What does the JVM do?",
      answer: "The Java Virtual Machine runs Java bytecode and manages runtime behavior such as memory and class loading."
    },
    {
      id: "java-card-jdk-jre",
      question: "What is the difference between the JDK and the JRE?",
      answer: "The JDK includes development tools such as javac plus the runtime. The JRE is the runtime environment."
    },
    {
      id: "java-card-null",
      question: "What does null mean in Java?",
      answer: "null means a reference variable does not currently refer to an object."
    },
    {
      id: "java-card-garbage-collector",
      question: "What is the garbage collector responsible for?",
      answer: "It reclaims memory from objects that are no longer reachable by the program."
    }
  ],
  createdAt: JAVA_TRIVIA_DECK_DATE,
  description: "Basic Java programming language trivia.",
  id: JAVA_TRIVIA_DECK_ID,
  name: "Basic Java Programming Trivia",
  updatedAt: JAVA_TRIVIA_DECK_DATE
};

export function cloneFlashcardDeck(deck: FlashcardDeck): FlashcardDeck {
  return {
    ...deck,
    cards: deck.cards.map((card) => ({ ...card }))
  };
}

export function createDefaultFlashcardsState(): FlashcardsState {
  return {
    activeCardIndex: 0,
    activeDeckId: JAVA_TRIVIA_DECK_ID,
    decks: [cloneFlashcardDeck(defaultJavaTriviaDeck)],
    isAnswerVisible: false
  };
}

export function normalizeFlashcardMultilineText(value: unknown, maxLength = MAX_CARD_TEXT_LENGTH): string {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, " ")
    .trim()
    .slice(0, maxLength);
}

export function normalizeFlashcardSingleLineText(value: unknown, maxLength: number): string {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

export function createFlashcardId(prefix: string): string {
  const safePrefix = normalizeFlashcardSingleLineText(prefix, 24)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "flashcard";
  const randomPart = Math.floor(Math.random() * 1_000_000_000).toString(36);

  return `${safePrefix}-${Date.now().toString(36)}-${randomPart}`;
}

function normalizeDeckIndex(index: unknown, deck: FlashcardDeck | null): number {
  if (!deck || deck.cards.length === 0 || typeof index !== "number" || !Number.isFinite(index)) {
    return 0;
  }

  const normalizedIndex = Math.floor(index);
  if (normalizedIndex < 0) {
    return 0;
  }

  return Math.min(normalizedIndex, deck.cards.length - 1);
}

function sanitizeFlashcard(value: unknown): Flashcard | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const record = value as Record<string, unknown>;
  const id = normalizeFlashcardSingleLineText(record.id, 96);
  const question = normalizeFlashcardMultilineText(record.question);
  const answer = normalizeFlashcardMultilineText(record.answer);

  if (!id || !question || !answer) {
    return null;
  }

  return { answer, id, question };
}

function sanitizeFlashcardDeck(value: unknown): FlashcardDeck | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const record = value as Record<string, unknown>;
  const id = normalizeFlashcardSingleLineText(record.id, 96);
  const name = normalizeFlashcardSingleLineText(record.name, MAX_DECK_NAME_LENGTH);
  const description = normalizeFlashcardSingleLineText(record.description, MAX_DECK_DESCRIPTION_LENGTH);
  const cards = Array.isArray(record.cards)
    ? record.cards.map(sanitizeFlashcard).filter((card): card is Flashcard => card !== null)
    : [];
  const createdAt = normalizeFlashcardSingleLineText(record.createdAt, 64) || new Date().toISOString();
  const updatedAt = normalizeFlashcardSingleLineText(record.updatedAt, 64) || createdAt;

  if (!id || !name) {
    return null;
  }

  return {
    cards,
    createdAt,
    description,
    id,
    name,
    updatedAt
  };
}

function ensureDefaultJavaTriviaDeck(decks: FlashcardDeck[]): FlashcardDeck[] {
  if (decks.some((deck) => deck.id === JAVA_TRIVIA_DECK_ID)) {
    return decks;
  }

  return [cloneFlashcardDeck(defaultJavaTriviaDeck), ...decks];
}

export function normalizeFlashcardsState(value: unknown): FlashcardsState {
  if (!value || typeof value !== "object") {
    return createDefaultFlashcardsState();
  }

  const record = value as Record<string, unknown>;
  const sanitizedDecks = Array.isArray(record.decks)
    ? record.decks.map(sanitizeFlashcardDeck).filter((deck): deck is FlashcardDeck => deck !== null)
    : [];
  const decks = ensureDefaultJavaTriviaDeck(sanitizedDecks);
  const requestedActiveDeckId = normalizeFlashcardSingleLineText(record.activeDeckId, 96);
  const activeDeck =
    decks.find((deck) => deck.id === requestedActiveDeckId) ||
    decks[0] ||
    cloneFlashcardDeck(defaultJavaTriviaDeck);

  return {
    activeCardIndex: normalizeDeckIndex(record.activeCardIndex, activeDeck),
    activeDeckId: activeDeck.id,
    decks,
    isAnswerVisible: typeof record.isAnswerVisible === "boolean" ? record.isAnswerVisible : false
  };
}

export function getActiveFlashcardDeck(state: FlashcardsState): FlashcardDeck | null {
  return state.decks.find((deck) => deck.id === state.activeDeckId) || null;
}

export function countFlashcards(state: FlashcardsState): number {
  return state.decks.reduce((count, deck) => count + deck.cards.length, 0);
}

export function createFlashcardDeck(
  state: FlashcardsState,
  name: string,
  description = "",
  deckId = createFlashcardId("deck"),
  now = new Date().toISOString()
): FlashcardsState {
  const normalizedName = normalizeFlashcardSingleLineText(name, MAX_DECK_NAME_LENGTH);
  if (!normalizedName) {
    return state;
  }

  const deck: FlashcardDeck = {
    cards: [],
    createdAt: now,
    description: normalizeFlashcardSingleLineText(description, MAX_DECK_DESCRIPTION_LENGTH),
    id: deckId,
    name: normalizedName,
    updatedAt: now
  };

  return {
    activeCardIndex: 0,
    activeDeckId: deck.id,
    decks: [...state.decks, deck],
    isAnswerVisible: false
  };
}

export function addFlashcardToDeck(
  state: FlashcardsState,
  deckId: string,
  question: string,
  answer: string,
  cardId = createFlashcardId("card"),
  now = new Date().toISOString()
): FlashcardsState {
  const normalizedQuestion = normalizeFlashcardMultilineText(question);
  const normalizedAnswer = normalizeFlashcardMultilineText(answer);

  if (!normalizedQuestion || !normalizedAnswer) {
    return state;
  }

  let insertedCardIndex = 0;
  const decks = state.decks.map((deck) => {
    if (deck.id !== deckId) {
      return deck;
    }

    insertedCardIndex = deck.cards.length;
    return {
      ...deck,
      cards: [
        ...deck.cards,
        {
          answer: normalizedAnswer,
          id: cardId,
          question: normalizedQuestion
        }
      ],
      updatedAt: now
    };
  });

  if (decks === state.decks || !state.decks.some((deck) => deck.id === deckId)) {
    return state;
  }

  return {
    activeCardIndex: insertedCardIndex,
    activeDeckId: deckId,
    decks,
    isAnswerVisible: false
  };
}

export function selectFlashcardDeck(state: FlashcardsState, deckId: string): FlashcardsState {
  const deck = state.decks.find((candidate) => candidate.id === deckId);
  if (!deck) {
    return state;
  }

  return {
    ...state,
    activeCardIndex: 0,
    activeDeckId: deck.id,
    isAnswerVisible: false
  };
}

export function flipCurrentFlashcard(state: FlashcardsState): FlashcardsState {
  const activeDeck = getActiveFlashcardDeck(state);
  if (!activeDeck || activeDeck.cards.length === 0) {
    return state;
  }

  return {
    ...state,
    isAnswerVisible: !state.isAnswerVisible
  };
}

export function moveCurrentFlashcard(state: FlashcardsState, direction: -1 | 1): FlashcardsState {
  const activeDeck = getActiveFlashcardDeck(state);
  if (!activeDeck || activeDeck.cards.length === 0) {
    return state;
  }

  const nextIndex = (state.activeCardIndex + direction + activeDeck.cards.length) % activeDeck.cards.length;
  return {
    ...state,
    activeCardIndex: nextIndex,
    isAnswerVisible: false
  };
}

export function shuffleActiveFlashcardDeck(
  state: FlashcardsState,
  rng: () => number = Math.random,
  now = new Date().toISOString()
): FlashcardsState {
  const activeDeck = getActiveFlashcardDeck(state);
  if (!activeDeck || activeDeck.cards.length < 2) {
    return {
      ...state,
      activeCardIndex: 0,
      isAnswerVisible: false
    };
  }

  const shuffledCards = activeDeck.cards.map((card) => ({ ...card }));
  for (let index = shuffledCards.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(rng() * (index + 1));
    [shuffledCards[index], shuffledCards[randomIndex]] = [shuffledCards[randomIndex], shuffledCards[index]];
  }

  return {
    activeCardIndex: 0,
    activeDeckId: state.activeDeckId,
    decks: state.decks.map((deck) =>
      deck.id === activeDeck.id
        ? {
            ...deck,
            cards: shuffledCards,
            updatedAt: now
          }
        : deck
    ),
    isAnswerVisible: false
  };
}
