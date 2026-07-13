type ThemeId = "arcade" | "blueprint" | "nightshift";
type AchievementId =
  | "brand_tapper"
  | "konami_override"
  | "vault_walker"
  | "anomaly_hunter"
  | "toolsmith"
  | "field_reader";

type ThemeDefinition = {
  id: ThemeId;
  name: string;
};

type AchievementDefinition = {
  id: AchievementId;
  name: string;
};

type ThemeState = {
  activeTheme: ThemeId | "default";
  unlockedAchievements: AchievementId[];
  unlockedThemes: ThemeId[];
};

const THEME_STATE_STORAGE_KEY = "myWebsiteMissionArcadeState";

const themeDefinitions: ThemeDefinition[] = [
  { id: "blueprint", name: "Blueprint" },
  { id: "arcade", name: "Arcade" },
  { id: "nightshift", name: "Night Shift" }
];

const achievementDefinitions: AchievementDefinition[] = [
  { id: "brand_tapper", name: "Brand Tapper" },
  { id: "konami_override", name: "Override Accepted" },
  { id: "vault_walker", name: "Vault Walker" },
  { id: "anomaly_hunter", name: "Anomaly Hunter" },
  { id: "toolsmith", name: "Toolsmith" },
  { id: "field_reader", name: "Field Reader" }
];

const defaultThemeState: ThemeState = {
  activeTheme: "default",
  unlockedAchievements: [],
  unlockedThemes: []
};

let brandTapCount = 0;
let brandTapTimeout = 0;
let themeToastHost: HTMLElement | null = null;
const konamiSequence = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a"
];
let konamiIndex = 0;

function readThemeState(): ThemeState {
  try {
    const raw = window.localStorage.getItem(THEME_STATE_STORAGE_KEY);
    if (!raw) {
      return { ...defaultThemeState };
    }

    const parsed = JSON.parse(raw) as Partial<ThemeState>;
    return {
      activeTheme: parsed.activeTheme === "arcade" || parsed.activeTheme === "blueprint" || parsed.activeTheme === "nightshift"
        ? parsed.activeTheme
        : "default",
      unlockedAchievements: Array.isArray(parsed.unlockedAchievements)
        ? parsed.unlockedAchievements.filter(isAchievementId)
        : [],
      unlockedThemes: Array.isArray(parsed.unlockedThemes)
        ? parsed.unlockedThemes.filter(isThemeId)
        : []
    };
  } catch (error) {
    console.error("Unable to read theme state:", error);
    return { ...defaultThemeState };
  }
}

function saveThemeState(state: ThemeState): void {
  try {
    window.localStorage.setItem(THEME_STATE_STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Unable to save theme state:", error);
  }
}

function isThemeId(value: unknown): value is ThemeId {
  return value === "arcade" || value === "blueprint" || value === "nightshift";
}

function isAchievementId(value: unknown): value is AchievementId {
  return (
    value === "brand_tapper" ||
    value === "konami_override" ||
    value === "vault_walker" ||
    value === "anomaly_hunter" ||
    value === "toolsmith" ||
    value === "field_reader"
  );
}

function applyTheme(themeId: ThemeId | "default"): void {
  if (!document.body) {
    return;
  }

  if (themeId === "default") {
    document.body.removeAttribute("data-theme");
    return;
  }

  document.body.setAttribute("data-theme", themeId);
}

function showThemeToast(message: string): void {
  if (!document.body) {
    return;
  }

  if (!themeToastHost) {
    themeToastHost = document.createElement("div");
    themeToastHost.className = "game-toast-host";
    document.body.appendChild(themeToastHost);
  }

  const toast = document.createElement("div");
  toast.className = "game-toast";
  toast.textContent = message;
  themeToastHost.appendChild(toast);

  window.setTimeout(() => {
    toast.classList.add("game-toast--visible");
  }, 20);

  window.setTimeout(() => {
    toast.classList.remove("game-toast--visible");
    window.setTimeout(() => {
      toast.parentNode?.removeChild(toast);
    }, 220);
  }, 2600);
}

function unlockAchievement(achievementId: AchievementId): void {
  const state = readThemeState();
  if (state.unlockedAchievements.indexOf(achievementId) !== -1) {
    return;
  }

  const definition = achievementDefinitions.find((achievement) => achievement.id === achievementId);
  state.unlockedAchievements = [...state.unlockedAchievements, achievementId];
  saveThemeState(state);
  showThemeToast(`Achievement unlocked: ${definition ? definition.name : achievementId}`);
}

function unlockTheme(themeId: ThemeId): void {
  const state = readThemeState();
  if (state.unlockedThemes.indexOf(themeId) !== -1) {
    return;
  }

  const definition = themeDefinitions.find((theme) => theme.id === themeId);
  state.unlockedThemes = [...state.unlockedThemes, themeId];
  saveThemeState(state);
  showThemeToast(`Theme unlocked: ${definition ? definition.name : themeId}`);
}

function setActiveTheme(themeId: ThemeId | "default"): void {
  const state = readThemeState();
  if (themeId !== "default" && state.unlockedThemes.indexOf(themeId) === -1) {
    showThemeToast("Theme locked. Unlock it first.");
    return;
  }

  state.activeTheme = themeId;
  saveThemeState(state);
  applyTheme(themeId);
}

function handleKonamiInput(event: KeyboardEvent): void {
  const pressedKey = event.key.length === 1 ? event.key.toLowerCase() : event.key;
  const expectedKey = konamiSequence[konamiIndex];

  if (pressedKey === expectedKey) {
    konamiIndex += 1;
    if (konamiIndex === konamiSequence.length) {
      konamiIndex = 0;
      unlockAchievement("konami_override");
      unlockTheme("arcade");
      setActiveTheme("arcade");
    }
    return;
  }

  konamiIndex = pressedKey === konamiSequence[0] ? 1 : 0;
}

function initializeBrandTapper(): void {
  const brandMark = document.querySelector<HTMLElement>(".site-brand__mark");
  if (!brandMark) {
    return;
  }

  if (brandMark.dataset.tapGameReady === "true") {
    return;
  }

  brandMark.dataset.tapGameReady = "true";
  brandMark.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    brandTapCount += 1;
    if (brandTapTimeout) {
      window.clearTimeout(brandTapTimeout);
    }

    brandTapTimeout = window.setTimeout(() => {
      brandTapCount = 0;
    }, 5000);

    if (brandTapCount >= 5) {
      brandTapCount = 0;
      unlockAchievement("brand_tapper");
      unlockTheme("blueprint");
      setActiveTheme("blueprint");
    }
  });
}

function trackPageAchievements(): void {
  const path = window.location.pathname;

  if (path.indexOf("/tools.html") !== -1) {
    unlockAchievement("toolsmith");
  }

  if (path.indexOf("/blog-articles/") !== -1) {
    unlockAchievement("field_reader");
  }

  if (path.indexOf("/vault.html") !== -1) {
    unlockAchievement("vault_walker");
  }

  if (path.indexOf("/anomaly.html") !== -1) {
    unlockAchievement("anomaly_hunter");
    unlockTheme("nightshift");
  }
}

function bootThemeLayer(): void {
  const state = readThemeState();
  applyTheme(state.activeTheme);
  trackPageAchievements();

  document.addEventListener("keydown", handleKonamiInput);
  document.addEventListener("header:loaded", initializeBrandTapper);
  initializeBrandTapper();
}

bootThemeLayer();
