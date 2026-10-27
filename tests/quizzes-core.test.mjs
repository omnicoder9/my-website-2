import assert from "node:assert/strict";
import test from "node:test";

import {
  normalizeQuizDifficulty,
  normalizeQuizQuestionCount,
  selectQuestionsNearestDifficulty
} from "../dist/js/test-core/quizzes-core.js";

test("quiz setup values are normalized to the supported ranges", () => {
  assert.equal(normalizeQuizQuestionCount(0), 1);
  assert.equal(normalizeQuizQuestionCount(12.9), 12);
  assert.equal(normalizeQuizQuestionCount(50), 20);
  assert.equal(normalizeQuizQuestionCount("invalid"), 10);

  assert.equal(normalizeQuizDifficulty(0), 1);
  assert.equal(normalizeQuizDifficulty(3.4), 3);
  assert.equal(normalizeQuizDifficulty(9), 5);
  assert.equal(normalizeQuizDifficulty("invalid"), 3);
});

test("question selection prioritizes the chosen difficulty and returns unique questions", () => {
  const bank = [];
  for (let difficulty = 1; difficulty <= 5; difficulty += 1) {
    for (let index = 1; index <= 3; index += 1) {
      bank.push({ difficulty, id: `${difficulty}-${index}` });
    }
  }

  const selected = selectQuestionsNearestDifficulty(bank, 8, 3, () => 0.5);
  assert.equal(selected.length, 8);
  assert.deepEqual(selected.slice(0, 3).map((question) => question.difficulty), [3, 3, 3]);
  assert.equal(new Set(selected.map((question) => question.id)).size, 8);
  assert.equal(selected.every((question) => Math.abs(question.difficulty - 3) <= 1), true);
});
