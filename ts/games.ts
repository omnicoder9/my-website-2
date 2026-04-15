type GameThemeId = "arcade" | "blueprint" | "nightshift";
type GameAchievementId =
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

type GameMiniGameId = "constellation" | "garden" | "courier";

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

type GameMiniGameDefinition = {
  description: string;
  id: GameMiniGameId;
  name: string;
  reward: string;
};

type GameState = {
  activeTheme: GameThemeId | "default";
  unlockedAchievements: GameAchievementId[];
  unlockedThemes: GameThemeId[];
};

type ConstellationCard = {
  icon: string;
  id: string;
  label: string;
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
  },
  {
    id: "constellation_matcher",
    name: "Constellation Scout",
    description: "Match every constellation card in the starlight deck."
  },
  {
    id: "garden_echo",
    name: "Garden Echo",
    description: "Repeat a four-step garden pattern without missing a beat."
  },
  {
    id: "cloud_courier",
    name: "Cloud Courier",
    description: "Guide the cloud courier to the sunny landing pad."
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

const gameMiniGames: GameMiniGameDefinition[] = [
  {
    id: "constellation",
    name: "Constellation Match",
    reward: "Constellation Scout achievement",
    description: "Flip cards and match the friendly sky symbols."
  },
  {
    id: "garden",
    name: "Pattern Garden",
    reward: "Garden Echo achievement",
    description: "Watch the garden lights, then repeat the sequence."
  },
  {
    id: "courier",
    name: "Cloud Courier",
    reward: "Cloud Courier achievement",
    description: "Use the arrow controls to drift to the sun tile."
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
let constellationCards: ConstellationCard[] = [];
let constellationFlippedIds: string[] = [];
let constellationMatchedLabels: string[] = [];
let constellationBusy = false;
let gardenPattern = [0, 2, 1, 3];
let gardenPlayerIndex = 0;
let gardenActiveTile: number | null = null;
let gardenReady = false;
let gardenStatus = "Press Start and watch the garden glow.";
let courierPosition = 0;
let courierStatus = "Help the cloud reach the sunny landing pad.";
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
    value === "field_reader" ||
    value === "constellation_matcher" ||
    value === "garden_echo" ||
    value === "cloud_courier"
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

function gameRenderMiniGames(): void {
  const miniGamesHost = document.getElementById("gamesMiniGames");
  if (!miniGamesHost) {
    return;
  }

  if (!constellationCards.length) {
    gameResetConstellation();
  }

  miniGamesHost.innerHTML = gameMiniGames
    .map((miniGame) => {
      if (miniGame.id === "constellation") {
        return gameRenderConstellation(miniGame);
      }
      if (miniGame.id === "garden") {
        return gameRenderGarden(miniGame);
      }
      return gameRenderCourier(miniGame);
    })
    .join("");
}

function gameRenderConstellation(miniGame: GameMiniGameDefinition): string {
  const completed = constellationMatchedLabels.length === 4;

  return `
    <article class="games-mini-card">
      ${gameRenderMiniGameHeader(miniGame)}
      <div class="constellation-board" aria-label="Constellation card matching game">
        ${constellationCards
          .map((card) => {
            const revealed = constellationFlippedIds.indexOf(card.id) !== -1 || constellationMatchedLabels.indexOf(card.label) !== -1;
            return `
              <button
                type="button"
                class="constellation-card ${revealed ? "constellation-card--revealed" : ""}"
                data-constellation-card="${card.id}"
                aria-label="${revealed ? card.label : "Hidden constellation card"}"
              >
                <span>${revealed ? card.icon : gameRenderSparkleIcon()}</span>
              </button>
            `;
          })
          .join("")}
      </div>
      <p class="games-mini-status">
        ${completed ? "All constellations matched." : `Matched ${constellationMatchedLabels.length}/4 pairs.`}
      </p>
      <button type="button" data-mini-game-action="reset-constellation">Shuffle sky</button>
    </article>
  `;
}

function gameRenderGarden(miniGame: GameMiniGameDefinition): string {
  const tileLabels = ["Fern", "Bloom", "Sprout", "Rain"];

  return `
    <article class="games-mini-card">
      ${gameRenderMiniGameHeader(miniGame)}
      <div class="garden-board" aria-label="Pattern Garden memory game">
        ${tileLabels
          .map((label, index) => {
            return `
              <button
                type="button"
                class="garden-tile garden-tile--${index} ${gardenActiveTile === index ? "garden-tile--active" : ""}"
                data-garden-tile="${index}"
              >
                <span class="garden-tile__icon">${gameRenderGardenIcon(index)}</span>
                <span>${label}</span>
              </button>
            `;
          })
          .join("")}
      </div>
      <p class="games-mini-status">${gardenStatus}</p>
      <button type="button" data-mini-game-action="start-garden">Start pattern</button>
    </article>
  `;
}

function gameRenderCourier(miniGame: GameMiniGameDefinition): string {
  const obstacles = [5, 10];
  const goal = 15;

  return `
    <article class="games-mini-card">
      ${gameRenderMiniGameHeader(miniGame)}
      <div class="courier-board" aria-label="Cloud Courier grid game">
        ${Array.from({ length: 16 }, (_, index) => {
          const isCloud = index === courierPosition;
          const isGoal = index === goal;
          const isObstacle = obstacles.indexOf(index) !== -1;
          return `
            <div class="courier-cell ${isGoal ? "courier-cell--goal" : ""} ${isObstacle ? "courier-cell--obstacle" : ""}">
              ${isCloud ? gameRenderCloudIcon() : isGoal ? gameRenderSunIcon() : isObstacle ? gameRenderMountainIcon() : ""}
            </div>
          `;
        }).join("")}
      </div>
      <div class="courier-controls" aria-label="Cloud Courier controls">
        <button type="button" data-courier-move="up">Up</button>
        <button type="button" data-courier-move="left">Left</button>
        <button type="button" data-courier-move="right">Right</button>
        <button type="button" data-courier-move="down">Down</button>
      </div>
      <p class="games-mini-status">${courierStatus}</p>
      <button type="button" data-mini-game-action="reset-courier">Reset route</button>
    </article>
  `;
}

function gameRenderMiniGameHeader(miniGame: GameMiniGameDefinition): string {
  return `
    <p class="games-mini-card__label">Kid-safe mini game</p>
    <h3>${miniGame.name}</h3>
    <p>${miniGame.description}</p>
    <p class="games-mini-card__reward">Reward: ${miniGame.reward}</p>
  `;
}

function gameRenderSparkleIcon(): string {
  return `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 7l4.6 12.4L41 24l-12.4 4.6L24 41l-4.6-12.4L7 24l12.4-4.6L24 7z"/></svg>`;
}

function gameRenderConstellationIcon(kind: string): string {
  const icons: Record<string, string> = {
    orbit: `<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="5"/><path d="M7 24c6-10 28-10 34 0M7 24c6 10 28 10 34 0"/></svg>`,
    kite: `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 5l12 19-12 19-12-19L24 5z"/><path d="M24 5v38M12 24h24"/></svg>`,
    ladder: `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M14 8v32M34 8v32M14 16h20M14 24h20M14 32h20"/><circle cx="14" cy="8" r="3"/><circle cx="34" cy="40" r="3"/></svg>`,
    wave: `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M6 30c7-16 15 16 22 0s8-8 14-5"/><circle cx="8" cy="29" r="3"/><circle cx="28" cy="30" r="3"/><circle cx="42" cy="25" r="3"/></svg>`
  };

  return icons[kind] || gameRenderSparkleIcon();
}

function gameRenderGardenIcon(index: number): string {
  const icons = [
    `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 39V18"/><path d="M24 26c-12-2-13-14-13-14 12 0 15 8 13 14z"/><path d="M24 29c12-2 13-14 13-14-12 0-15 8-13 14z"/></svg>`,
    `<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="6"/><circle cx="24" cy="11" r="7"/><circle cx="24" cy="37" r="7"/><circle cx="11" cy="24" r="7"/><circle cx="37" cy="24" r="7"/></svg>`,
    `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 40V18"/><path d="M24 18c-7 0-10-4-10-10 7 0 10 4 10 10z"/><path d="M24 18c7 0 10-4 10-10-7 0-10 4-10 10z"/><path d="M16 40h16"/></svg>`,
    `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M15 29c3-8 6-14 9-20 3 6 6 12 9 20"/><path d="M18 31c0 5 3 8 6 8s6-3 6-8"/></svg>`
  ];

  return icons[index] || icons[0];
}

function gameRenderCloudIcon(): string {
  return `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M15 34h21a8 8 0 0 0 0-16 12 12 0 0 0-23-3 10 10 0 0 0 2 19z"/></svg>`;
}

function gameRenderSunIcon(): string {
  return `<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="9"/><path d="M24 4v8M24 36v8M4 24h8M36 24h8M10 10l6 6M32 32l6 6M38 10l-6 6M16 32l-6 6"/></svg>`;
}

function gameRenderMountainIcon(): string {
  return `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M6 39l12-22 8 13 5-8 11 17H6z"/></svg>`;
}

function gameResetConstellation(): void {
  const baseCards: ConstellationCard[] = [
    { id: "orbit-a", label: "Orbit", icon: gameRenderConstellationIcon("orbit") },
    { id: "orbit-b", label: "Orbit", icon: gameRenderConstellationIcon("orbit") },
    { id: "kite-a", label: "Kite", icon: gameRenderConstellationIcon("kite") },
    { id: "kite-b", label: "Kite", icon: gameRenderConstellationIcon("kite") },
    { id: "ladder-a", label: "Ladder", icon: gameRenderConstellationIcon("ladder") },
    { id: "ladder-b", label: "Ladder", icon: gameRenderConstellationIcon("ladder") },
    { id: "wave-a", label: "Wave", icon: gameRenderConstellationIcon("wave") },
    { id: "wave-b", label: "Wave", icon: gameRenderConstellationIcon("wave") }
  ];

  constellationCards = gameShuffleItems(baseCards);
  constellationFlippedIds = [];
  constellationMatchedLabels = [];
  constellationBusy = false;
}

function gameShuffleItems<T>(items: T[]): T[] {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function gameHandleConstellationCard(cardId: string): void {
  if (constellationBusy || constellationFlippedIds.indexOf(cardId) !== -1) {
    return;
  }

  const card = constellationCards.find((item) => item.id === cardId);
  if (!card || constellationMatchedLabels.indexOf(card.label) !== -1) {
    return;
  }

  constellationFlippedIds = [...constellationFlippedIds, cardId];

  if (constellationFlippedIds.length < 2) {
    gameRenderMiniGames();
    return;
  }

  const [firstCardId, secondCardId] = constellationFlippedIds;
  const firstCard = constellationCards.find((item) => item.id === firstCardId);
  const secondCard = constellationCards.find((item) => item.id === secondCardId);

  if (firstCard && secondCard && firstCard.label === secondCard.label) {
    constellationMatchedLabels = [...constellationMatchedLabels, firstCard.label];
    constellationFlippedIds = [];
    if (constellationMatchedLabels.length === 4) {
      gameUnlockAchievement("constellation_matcher");
    }
    gameRenderMiniGames();
    return;
  }

  constellationBusy = true;
  gameRenderMiniGames();
  window.setTimeout(() => {
    constellationFlippedIds = [];
    constellationBusy = false;
    gameRenderMiniGames();
  }, 750);
}

function gameStartGardenPattern(): void {
  gardenPattern = gameShuffleItems([0, 1, 2, 3]);
  gardenPlayerIndex = 0;
  gardenReady = false;
  gardenStatus = "Watch the tiles light up.";
  gameAnimateGardenStep(0);
}

function gameAnimateGardenStep(stepIndex: number): void {
  if (stepIndex >= gardenPattern.length) {
    gardenActiveTile = null;
    gardenReady = true;
    gardenStatus = "Your turn. Repeat the pattern.";
    gameRenderMiniGames();
    return;
  }

  gardenActiveTile = gardenPattern[stepIndex];
  gameRenderMiniGames();
  window.setTimeout(() => {
    gardenActiveTile = null;
    gameRenderMiniGames();
    window.setTimeout(() => gameAnimateGardenStep(stepIndex + 1), 180);
  }, 520);
}

function gameHandleGardenTile(tileIndex: number): void {
  if (!gardenReady) {
    gardenStatus = "Press Start and watch first.";
    gameRenderMiniGames();
    return;
  }

  if (gardenPattern[gardenPlayerIndex] !== tileIndex) {
    gardenPlayerIndex = 0;
    gardenReady = false;
    gardenStatus = "Try again. The garden has a new pattern ready.";
    gameRenderMiniGames();
    return;
  }

  gardenPlayerIndex += 1;
  gardenStatus = `Correct. ${gardenPlayerIndex}/${gardenPattern.length} steps repeated.`;

  if (gardenPlayerIndex === gardenPattern.length) {
    gardenReady = false;
    gardenStatus = "Pattern complete.";
    gameUnlockAchievement("garden_echo");
  }

  gameRenderMiniGames();
}

function gameMoveCourier(direction: string): void {
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
    courierStatus = "The cloud reached the edge of the map.";
    gameRenderMiniGames();
    return;
  }

  if ([5, 10].indexOf(nextPosition) !== -1) {
    courierStatus = "A friendly mountain blocks that route.";
    gameRenderMiniGames();
    return;
  }

  courierPosition = nextPosition;
  courierStatus = courierPosition === 15 ? "Delivery complete." : "Keep drifting toward the sun.";

  if (courierPosition === 15) {
    gameUnlockAchievement("cloud_courier");
  }

  gameRenderMiniGames();
}

function gameResetCourier(): void {
  courierPosition = 0;
  courierStatus = "Help the cloud reach the sunny landing pad.";
  gameRenderMiniGames();
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

  gameRenderMiniGames();
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
      if (themeButton) {
        const themeId = themeButton.getAttribute("data-theme-id");
        if (themeId === "default" || gameIsThemeId(themeId)) {
          gameSetActiveTheme(themeId);
        }
        return;
      }

      const constellationButton = target.closest<HTMLElement>("[data-constellation-card]");
      if (constellationButton) {
        const cardId = constellationButton.getAttribute("data-constellation-card");
        if (cardId) {
          gameHandleConstellationCard(cardId);
        }
        return;
      }

      const gardenButton = target.closest<HTMLElement>("[data-garden-tile]");
      if (gardenButton) {
        const tileIndex = parseInt(gardenButton.getAttribute("data-garden-tile") || "", 10);
        if (!Number.isNaN(tileIndex)) {
          gameHandleGardenTile(tileIndex);
        }
        return;
      }

      const courierButton = target.closest<HTMLElement>("[data-courier-move]");
      if (courierButton) {
        const direction = courierButton.getAttribute("data-courier-move");
        if (direction) {
          gameMoveCourier(direction);
        }
        return;
      }

      const miniGameAction = target.closest<HTMLElement>("[data-mini-game-action]");
      if (miniGameAction) {
        const action = miniGameAction.getAttribute("data-mini-game-action");
        if (action === "reset-constellation") {
          gameResetConstellation();
          gameRenderMiniGames();
        } else if (action === "start-garden") {
          gameStartGardenPattern();
        } else if (action === "reset-courier") {
          gameResetCourier();
        }
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
