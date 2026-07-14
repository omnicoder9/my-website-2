export type GameThemeId = "arcade" | "blueprint" | "nightshift";
export type GameAchievementId =
  | "games_page"
  | "brand_tapper"
  | "konami_override"
  | "vault_walker"
  | "anomaly_hunter"
  | "toolsmith"
  | "field_reader"
  | "constellation_matcher"
  | "garden_echo"
  | "cloud_courier";

export type GameState = {
  activeTheme: GameThemeId | "default";
  unlockedAchievements: GameAchievementId[];
  unlockedThemes: GameThemeId[];
};

export const GAME_STATE_STORAGE_KEY = "myWebsiteMissionArcadeState";

export const gameDefaultState: GameState = {
  activeTheme: "default",
  unlockedAchievements: [],
  unlockedThemes: []
};

export function isGameThemeId(value: unknown): value is GameThemeId {
  return value === "arcade" || value === "blueprint" || value === "nightshift";
}

export function isGameAchievementId(value: unknown): value is GameAchievementId {
  return (
    value === "games_page" ||
    value === "brand_tapper" ||
    value === "konami_override" ||
    value === "vault_walker" ||
    value === "anomaly_hunter" ||
    value === "toolsmith" ||
    value === "field_reader" ||
    value === "constellation_matcher" ||
    value === "garden_echo" ||
    value === "cloud_courier"
  );
}

export function normalizeGameState(raw: string | null): GameState {
  try {
    if (!raw) {
      return { ...gameDefaultState };
    }

    const parsed = JSON.parse(raw) as Partial<GameState>;
    return {
      activeTheme: isGameThemeId(parsed.activeTheme) ? parsed.activeTheme : "default",
      unlockedAchievements: Array.isArray(parsed.unlockedAchievements)
        ? parsed.unlockedAchievements.filter(isGameAchievementId)
        : [],
      unlockedThemes: Array.isArray(parsed.unlockedThemes)
        ? parsed.unlockedThemes.filter(isGameThemeId)
        : []
    };
  } catch {
    return { ...gameDefaultState };
  }
}

export function serializeGameState(state: GameState): string {
  return JSON.stringify({
    activeTheme: state.activeTheme,
    unlockedAchievements: state.unlockedAchievements.filter(isGameAchievementId),
    unlockedThemes: state.unlockedThemes.filter(isGameThemeId)
  });
}

export function calculateGameCompletionStats(
  state: GameState,
  totalAchievements = 10,
  totalThemes = 3
): {
  achievementPercent: number;
  themePercent: number;
  unlockedAchievementCount: number;
  unlockedThemeCount: number;
} {
  const unlockedAchievementCount = state.unlockedAchievements.length;
  const unlockedThemeCount = state.unlockedThemes.length;

  return {
    achievementPercent: totalAchievements <= 0 ? 0 : Math.round((unlockedAchievementCount / totalAchievements) * 100),
    themePercent: totalThemes <= 0 ? 0 : Math.round((unlockedThemeCount / totalThemes) * 100),
    unlockedAchievementCount,
    unlockedThemeCount
  };
}

export function resolveCourierMove(
  courierPosition: number,
  direction: string,
  obstacles: number[] = [5, 10],
  goal = 15
): {
  nextPosition: number;
  reachedGoal: boolean;
  status: string;
} {
  const row = Math.floor(courierPosition / 4);
  const column = courierPosition % 4;
  let nextPosition = courierPosition;

  if (direction === "up" && row > 0) {
    nextPosition -= 4;
  } else if (direction === "down" && row < 3) {
    nextPosition += 4;
  } else if (direction === "left" && column > 0) {
    nextPosition -= 1;
  } else if (direction === "right" && column < 3) {
    nextPosition += 1;
  }

  if (nextPosition === courierPosition) {
    return {
      nextPosition: courierPosition,
      reachedGoal: false,
      status: "The cloud reached the edge of the map."
    };
  }

  if (obstacles.indexOf(nextPosition) !== -1) {
    return {
      nextPosition: courierPosition,
      reachedGoal: false,
      status: "A friendly mountain blocks that route."
    };
  }

  return {
    nextPosition,
    reachedGoal: nextPosition === goal,
    status: nextPosition === goal ? "Delivery complete." : "Keep drifting toward the sun."
  };
}
