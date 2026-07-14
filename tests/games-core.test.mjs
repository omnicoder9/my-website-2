import assert from "node:assert/strict";
import test from "node:test";

import {
  GAME_STATE_STORAGE_KEY,
  calculateGameCompletionStats,
  normalizeGameState,
  resolveCourierMove,
  serializeGameState
} from "../dist/js/test-core/games-core.js";

test("GAME_STATE_STORAGE_KEY stays stable for localStorage consumers", () => {
  assert.equal(GAME_STATE_STORAGE_KEY, "myWebsiteMissionArcadeState");
});

test("normalizeGameState returns defaults for missing or malformed storage", () => {
  assert.deepEqual(normalizeGameState(null), {
    activeTheme: "default",
    unlockedAchievements: [],
    unlockedThemes: []
  });
  assert.deepEqual(normalizeGameState("{not-json"), {
    activeTheme: "default",
    unlockedAchievements: [],
    unlockedThemes: []
  });
});

test("normalizeGameState filters invalid theme and achievement ids", () => {
  assert.deepEqual(
    normalizeGameState(
      JSON.stringify({
        activeTheme: "bogus",
        unlockedAchievements: ["games_page", "fake"],
        unlockedThemes: ["arcade", "bad"]
      })
    ),
    {
      activeTheme: "default",
      unlockedAchievements: ["games_page"],
      unlockedThemes: ["arcade"]
    }
  );
});

test("serializeGameState preserves only valid unlocks", () => {
  const serialized = serializeGameState({
    activeTheme: "default",
    unlockedAchievements: ["games_page", "field_reader", "fake"],
    unlockedThemes: ["arcade", "bad"]
  });

  assert.deepEqual(JSON.parse(serialized), {
    activeTheme: "default",
    unlockedAchievements: ["games_page", "field_reader"],
    unlockedThemes: ["arcade"]
  });
});

test("calculateGameCompletionStats reports counts and percentages", () => {
  assert.deepEqual(
    calculateGameCompletionStats({
      activeTheme: "arcade",
      unlockedAchievements: ["games_page", "toolsmith"],
      unlockedThemes: ["arcade"]
    }),
    {
      achievementPercent: 20,
      themePercent: 33,
      unlockedAchievementCount: 2,
      unlockedThemeCount: 1
    }
  );
});

test("resolveCourierMove handles edges, obstacles, and the goal tile", () => {
  assert.deepEqual(resolveCourierMove(0, "left"), {
    nextPosition: 0,
    reachedGoal: false,
    status: "The cloud reached the edge of the map."
  });

  assert.deepEqual(resolveCourierMove(4, "right"), {
    nextPosition: 4,
    reachedGoal: false,
    status: "A friendly mountain blocks that route."
  });

  assert.deepEqual(resolveCourierMove(14, "right"), {
    nextPosition: 15,
    reachedGoal: true,
    status: "Delivery complete."
  });
});
