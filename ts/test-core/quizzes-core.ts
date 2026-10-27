export type QuizDifficulty = 1 | 2 | 3 | 4 | 5;

export type DifficultyTaggedQuestion = {
  difficulty: QuizDifficulty;
  id: string;
};

export function normalizeQuizQuestionCount(value: unknown): number {
  const parsed = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(parsed)) {
    return 10;
  }
  return Math.min(20, Math.max(1, Math.floor(parsed)));
}

export function normalizeQuizDifficulty(value: unknown): QuizDifficulty {
  const parsed = typeof value === "number" ? value : Number(value);
  const normalized = Number.isFinite(parsed) ? Math.min(5, Math.max(1, Math.round(parsed))) : 3;
  return normalized as QuizDifficulty;
}

function shuffleQuestions<T>(questions: T[], random: () => number): T[] {
  const shuffled = [...questions];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

export function selectQuestionsNearestDifficulty<T extends DifficultyTaggedQuestion>(
  bank: readonly T[],
  count: unknown,
  difficulty: unknown,
  random: () => number = Math.random
): T[] {
  const normalizedCount = normalizeQuizQuestionCount(count);
  const normalizedDifficulty = normalizeQuizDifficulty(difficulty);
  const rankedQuestions: T[] = [];

  for (let distance = 0; distance <= 4; distance += 1) {
    const questionsAtDistance = bank.filter(
      (question) => Math.abs(question.difficulty - normalizedDifficulty) === distance
    );
    rankedQuestions.push(...shuffleQuestions(questionsAtDistance, random));
  }

  return rankedQuestions.slice(0, normalizedCount);
}
