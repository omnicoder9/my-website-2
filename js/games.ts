type GameThemeId = "arcade" | "blueprint" | "nightshift";
type GameAchievementId =
  | "games_page"
  | "brand_tapper"
  | "konami_override"
  | "vault_walker"
  | "anomaly_hunter"
  | "toolsmith"
  | "field_reader";

type GameThemeDefinition = {
  description: string;
  id: GameThemeId;
  name: string;
  unlockHint: string;
};

type GameAchievementDefinition = {
  description: string;
  id: GameAchievementId;
  name: string;
};

type GameHiddenRouteDefinition = {
  description: string;
  path: string;
  reward: string;
  title: string;
};

type GameState = {
  activeTheme: GameThemeId | "default";
  unlockedAchievements: GameAchievementId[];
  unlockedThemes: GameThemeId[];
};

const GAME_STATE_STORAGE_KEY = "myWebsiteMissionArcadeState";

const gameThemes: GameThemeDefinition[] = [
  {
    id: "blueprint",
    name: "Blueprint",
    description: "Cool drafting-table tones with brighter panels and sharper contrast lines.",
    unlockHint: "Click the NK brand mark five times after the shared header loads."
  },
  {
    id: "arcade",
    name: "Arcade",
    description: "Neon console colors, darker chrome, and a louder retro-computing mood.",
    unlockHint: "Enter the Konami code anywhere on the site."
  },
  {
    id: "nightshift",
    name: "Night Shift",
    description: "An amber-and-cyan operations palette unlocked by wandering into the secret route network.",
    unlockHint: "Visit the hidden anomaly route."
  }
];

const gameAchievements: GameAchievementDefinition[] = [
  {
    id: "games_page",
    name: "Mission Historian",
    description: "Open the games page and inspect the site’s nonsense layer."
  },
  {
    id: "brand_tapper",
    name: "Brand Tapper",
    description: "Click the NK site mark five times to reveal the Blueprint theme."
  },
  {
    id: "konami_override",
    name: "Override Accepted",
    description: "Enter the Konami code and unlock the Arcade theme."
  },
  {
    id: "vault_walker",
    name: "Vault Walker",
    description: "Find the hidden vault route."
  },
  {
    id: "anomaly_hunter",
    name: "Anomaly Hunter",
    description: "Find the anomaly route and unlock the Night Shift theme."
  },
  {
    id: "toolsmith",
    name: "Toolsmith",
    description: "Visit the tools page and enter the lab."
  },
  {
    id: "field_reader",
    name: "Field Reader",
    description: "Open a standalone blog article page."
  }
];

const gameHiddenRoutes: GameHiddenRouteDefinition[] = [
  {
    title: "Vault Route",
    path: "vault.html",
    reward: "Vault Walker achievement",
    description: "A sealed archive wing with no header link and no practical justification."
  },
  {
    title: "Anomaly Route",
    path: "anomaly.html",
    reward: "Anomaly Hunter achievement and Night Shift theme",
    description: "A synthetic diagnostics breach that only exists because the site needed a secret corridor."
  }
];

const gameDefaultState: GameState = {
  activeTheme: "default",
  unlockedAchievements: [],
  unlockedThemes: []
};

let gameBrandTapCount = 0;
let gameBrandTapTimeout = 0;
let gameToastHost: HTMLElement | null = null;
const gameKonamiSequence = [
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
let gameKonamiIndex = 0;

function gameReadState(): GameState {
  try {
    const raw = window.localStorage.getItem(GAME_STATE_STORAGE_KEY);
    if (!raw) {
      return { ...gameDefaultState };
    }

    const parsed = JSON.parse(raw) as Partial<GameState>;
    return {
      activeTheme: parsed.activeTheme === "arcade" || parsed.activeTheme === "blueprint" || parsed.activeTheme === "nightshift"
        ? parsed.activeTheme
        : "default",
      unlockedAchievements: Array.isArray(parsed.unlockedAchievements)
        ? parsed.unlockedAchievements.filter(gameIsAchievementId)
        : [],
      unlockedThemes: Array.isArray(parsed.unlockedThemes)
        ? parsed.unlockedThemes.filter(gameIsThemeId)
        : []
    };
  } catch (error) {
    console.error("Unable to read game state:", error);
    return { ...gameDefaultState };
  }
}

function gameSaveState(state: GameState): void {
  try {
    window.localStorage.setItem(GAME_STATE_STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Unable to save game state:", error);
  }
}

function gameIsThemeId(value: unknown): value is GameThemeId {
  return value === "arcade" || value === "blueprint" || value === "nightshift";
}

function gameIsAchievementId(value: unknown): value is GameAchievementId {
  return (
    value === "games_page" ||
    value === "brand_tapper" ||
    value === "konami_override" ||
    value === "vault_walker" ||
    value === "anomaly_hunter" ||
    value === "toolsmith" ||
    value === "field_reader"
  );
}

function gameApplyTheme(themeId: GameThemeId | "default"): void {
  if (!document.body) {
    return;
  }

  if (themeId === "default") {
    document.body.removeAttribute("data-theme");
    return;
  }

  document.body.setAttribute("data-theme", themeId);
}

function gameShowToast(message: string): void {
  if (!document.body) {
    return;
  }

  if (!gameToastHost) {
    gameToastHost = document.createElement("div");
    gameToastHost.className = "game-toast-host";
    document.body.appendChild(gameToastHost);
  }

  const toast = document.createElement("div");
  toast.className = "game-toast";
  toast.textContent = message;
  gameToastHost.appendChild(toast);

  window.setTimeout(() => {
    toast.classList.add("game-toast--visible");
  }, 20);

  window.setTimeout(() => {
    toast.classList.remove("game-toast--visible");
    window.setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 220);
  }, 2600);
}

function gameUnlockAchievement(achievementId: GameAchievementId): void {
  const state = gameReadState();
  if (state.unlockedAchievements.indexOf(achievementId) !== -1) {
    return;
  }

  const definition = gameAchievements.find((achievement) => achievement.id === achievementId);
  state.unlockedAchievements = [...state.unlockedAchievements, achievementId];
  gameSaveState(state);
  gameShowToast(`Achievement unlocked: ${definition ? definition.name : achievementId}`);
  gameRenderPage();
}

function gameUnlockTheme(themeId: GameThemeId): void {
  const state = gameReadState();
  if (state.unlockedThemes.indexOf(themeId) !== -1) {
    return;
  }

  const definition = gameThemes.find((theme) => theme.id === themeId);
  state.unlockedThemes = [...state.unlockedThemes, themeId];
  gameSaveState(state);
  gameShowToast(`Theme unlocked: ${definition ? definition.name : themeId}`);
  gameRenderPage();
}

function gameSetActiveTheme(themeId: GameThemeId | "default"): void {
  const state = gameReadState();
  if (themeId !== "default" && state.unlockedThemes.indexOf(themeId) === -1) {
    gameShowToast("Theme locked. Unlock it first.");
    return;
  }

  state.activeTheme = themeId;
  gameSaveState(state);
  gameApplyTheme(themeId);
  gameRenderPage();
}

function gameHandleKonamiInput(event: KeyboardEvent): void {
  const pressedKey = event.key.length === 1 ? event.key.toLowerCase() : event.key;
  const expectedKey = gameKonamiSequence[gameKonamiIndex];

  if (pressedKey === expectedKey) {
    gameKonamiIndex += 1;
    if (gameKonamiIndex === gameKonamiSequence.length) {
      gameKonamiIndex = 0;
      gameUnlockAchievement("konami_override");
      gameUnlockTheme("arcade");
      gameSetActiveTheme("arcade");
    }
    return;
  }

  gameKonamiIndex = pressedKey === gameKonamiSequence[0] ? 1 : 0;
}

function gameInitializeBrandTapper(): void {
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

    gameBrandTapCount += 1;
    if (gameBrandTapTimeout) {
      window.clearTimeout(gameBrandTapTimeout);
    }

    gameBrandTapTimeout = window.setTimeout(() => {
      gameBrandTapCount = 0;
    }, 5000);

    if (gameBrandTapCount >= 5) {
      gameBrandTapCount = 0;
      gameUnlockAchievement("brand_tapper");
      gameUnlockTheme("blueprint");
      gameSetActiveTheme("blueprint");
    }
  });
}

function gameFormatThemeState(themeId: GameThemeId): string {
  const state = gameReadState();
  return state.unlockedThemes.indexOf(themeId) !== -1 ? "Unlocked" : "Locked";
}

function gameRenderPage(): void {
  const summary = document.getElementById("gamesSummary");
  const themesHost = document.getElementById("gamesThemes");
  const achievementsHost = document.getElementById("gamesAchievements");
  const routesHost = document.getElementById("gamesRoutes");
  const state = gameReadState();

  if (summary) {
    summary.innerHTML = `
      <div class="games-summary-card">
        <span>Achievements</span>
        <strong>${state.unlockedAchievements.length}/${gameAchievements.length}</strong>
      </div>
      <div class="games-summary-card">
        <span>Themes</span>
        <strong>${state.unlockedThemes.length}/${gameThemes.length}</strong>
      </div>
      <div class="games-summary-card">
        <span>Active theme</span>
        <strong>${state.activeTheme === "default" ? "Default Ops" : gameThemes.find((theme) => theme.id === state.activeTheme)?.name || "Default Ops"}</strong>
      </div>
    `;
  }

  if (themesHost) {
    themesHost.innerHTML = `
      <article class="games-theme-card ${state.activeTheme === "default" ? "games-theme-card--active" : ""}">
        <p class="games-theme-card__state">Always available</p>
        <h3>Default Ops</h3>
        <p>The baseline site palette.</p>
        <button type="button" data-theme-id="default">Use theme</button>
      </article>
      ${gameThemes
        .map((theme) => {
          const unlocked = state.unlockedThemes.indexOf(theme.id) !== -1;
          const active = state.activeTheme === theme.id;
          return `
            <article class="games-theme-card ${active ? "games-theme-card--active" : ""}">
              <p class="games-theme-card__state">${gameFormatThemeState(theme.id)}</p>
              <h3>${theme.name}</h3>
              <p>${theme.description}</p>
              <p class="games-theme-card__hint">${theme.unlockHint}</p>
              <button type="button" data-theme-id="${theme.id}" ${unlocked ? "" : "disabled"}>${active ? "Active" : unlocked ? "Use theme" : "Locked"}</button>
            </article>
          `;
        })
        .join("")}
    `;
  }

  if (achievementsHost) {
    achievementsHost.innerHTML = gameAchievements
      .map((achievement) => {
        const unlocked = state.unlockedAchievements.indexOf(achievement.id) !== -1;
        return `
          <article class="games-achievement-card ${unlocked ? "games-achievement-card--unlocked" : ""}">
            <p class="games-achievement-card__state">${unlocked ? "Unlocked" : "Locked"}</p>
            <h3>${achievement.name}</h3>
            <p>${achievement.description}</p>
          </article>
        `;
      })
      .join("");
  }

  if (routesHost) {
    routesHost.innerHTML = gameHiddenRoutes
      .map((route) => {
        return `
          <article class="games-route-card">
            <p class="games-route-card__path">${route.path}</p>
            <h3><a href="${route.path}">${route.title}</a></h3>
            <p>${route.description}</p>
            <p class="games-route-card__reward">Reward: ${route.reward}</p>
          </article>
        `;
      })
      .join("");
  }
}

function gameInitializePageBindings(): void {
  const gamesPage = document.body && document.body.getAttribute("data-page") === "games";
  if (gamesPage) {
    gameUnlockAchievement("games_page");
    gameRenderPage();

    document.addEventListener("click", (event) => {
      const target = event.target instanceof HTMLElement ? event.target : null;
      if (!target) {
        return;
      }

      const themeButton = target.closest<HTMLElement>("[data-theme-id]");
      if (!themeButton) {
        return;
      }

      const themeId = themeButton.getAttribute("data-theme-id");
      if (themeId === "default" || gameIsThemeId(themeId)) {
        gameSetActiveTheme(themeId);
      }
    });
  }
}

function gameTrackPageAchievements(): void {
  const path = window.location.pathname;

  if (path.indexOf("/tools.html") !== -1) {
    gameUnlockAchievement("toolsmith");
  }

  if (path.indexOf("/blog-articles/") !== -1) {
    gameUnlockAchievement("field_reader");
  }

  if (path.indexOf("/vault.html") !== -1) {
    gameUnlockAchievement("vault_walker");
  }

  if (path.indexOf("/anomaly.html") !== -1) {
    gameUnlockAchievement("anomaly_hunter");
    gameUnlockTheme("nightshift");
  }
}

function gameBoot(): void {
  const state = gameReadState();
  gameApplyTheme(state.activeTheme);
  gameTrackPageAchievements();
  gameInitializePageBindings();

  document.addEventListener("keydown", gameHandleKonamiInput);
  document.addEventListener("header:loaded", gameInitializeBrandTapper);
  gameInitializeBrandTapper();
}

gameBoot();
