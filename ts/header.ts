const fallbackHeaderMarkup = `
<header class="site-header">
  <a class="site-brand" href="index.html">
    <span class="site-brand__mark">NK</span>
    <span class="site-brand__text">
      <span class="site-brand__title">Nicholas Knapp</span>
      <span class="site-brand__tagline">Engineering notes, tools, experiments, and reference material</span>
    </span>
  </a>
  <button class="site-nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav-menu">
    <span class="site-nav-toggle__icon" aria-hidden="true">
      <span></span>
      <span></span>
      <span></span>
    </span>
    <span class="site-nav-toggle__text">Menu</span>
  </button>
  <nav class="site-nav" id="site-nav-menu" aria-label="Primary">
    <ul>
      <li><a href="cheatsheets.html">Cheat Sheets</a></li>
      <li><a href="stylingpg.html">Styling</a></li>
      <li><a href="index.html#home">Home</a></li>
      <li><a href="index.html#about">About</a></li>
      <li><a href="index.html#services">Services</a></li>
      <li><a href="index.html#opensource">Open-Source Contributions</a></li>
      <li><a href="index.html#resources">Resources</a></li>
      <li><a href="index.html#contact">Contact</a></li>
      <li><a href="memes.html">Tech Memes</a></li>
      <li><a href="tools.html">Tools</a></li>
      <li><a href="games.html">Games</a></li>
      <li><a href="blog.html">Blog</a></li>
      <li><a href="infographics.html">Infographics</a></li>
      <li><a href="tutorials.html">Tutorials and Walkthroughs</a></li>
      <li><a href="other.html">Other</a></li>
    </ul>
  </nav>
</header>
`;

type EnhancementTier = "basic" | "enhanced" | "absurd";
type WallpaperTime = "dawn" | "day" | "dusk" | "night";

type EnhancementSignal = {
  label: string;
  supported: boolean;
};

type EnhancementProfile = {
  advancedSupported: number;
  coreSupported: number;
  detail: string;
  tier: EnhancementTier;
};

const enhancementTierLabels: Record<EnhancementTier, string> = {
  basic: "Basic mode",
  enhanced: "Enhanced mode",
  absurd: "Absurd mode"
};

const enhancementTierSummaries: Record<EnhancementTier, string> = {
  basic: "Readable core experience. Advanced widgets stay quiet.",
  enhanced: "Interactive tools and runtime diagnostics are available.",
  absurd: "Extra browser APIs are online. The theatrical upgrades can run."
};

function getSitePrefixFromPathname(pathname: string): string {
  const articlePathMatch = pathname.match(/\/(?:blog|tutorial)-articles\/(.+)$/);
  if (!articlePathMatch) {
    return "";
  }

  const articleRelativePath = articlePathMatch[1].replace(/\/+$/, "");
  const articleDirectoryDepth = articleRelativePath.split("/").filter(Boolean).length;
  return "../".repeat(articleDirectoryDepth);
}

function getSitePrefix(): string {
  return getSitePrefixFromPathname(window.location.pathname);
}

function canUseLocalStorage(): boolean {
  try {
    const testKey = "__enhancement_tier_test__";
    window.localStorage.setItem(testKey, "1");
    window.localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
}

function supportsCssFeature(query: string): boolean {
  return typeof CSS !== "undefined" && typeof CSS.supports === "function" && CSS.supports(query);
}

function countSupportedSignals(signals: EnhancementSignal[]): number {
  return signals.filter((signal) => signal.supported).length;
}

function detectEnhancementProfile(): EnhancementProfile {
  const coreSignals: EnhancementSignal[] = [
    { label: "fetch", supported: "fetch" in window },
    { label: "CSS feature queries", supported: supportsCssFeature("display: grid") },
    { label: "observers", supported: "IntersectionObserver" in window && "ResizeObserver" in window },
    { label: "local storage", supported: canUseLocalStorage() },
    { label: "Intl formatting", supported: typeof Intl !== "undefined" && typeof Intl.DateTimeFormat === "function" }
  ];
  const advancedSignals: EnhancementSignal[] = [
    { label: "view transitions", supported: "startViewTransition" in document },
    { label: "service workers", supported: "serviceWorker" in navigator },
    { label: "clipboard", supported: "clipboard" in navigator },
    { label: "web share", supported: "share" in navigator },
    { label: "idle callbacks", supported: "requestIdleCallback" in window },
    { label: "CSS :has()", supported: supportsCssFeature("selector(:has(*))") },
    { label: "wake lock", supported: "wakeLock" in navigator },
    { label: "WebGPU", supported: "gpu" in navigator }
  ];
  const coreSupported = countSupportedSignals(coreSignals);
  const advancedSupported = countSupportedSignals(advancedSignals);
  let tier: EnhancementTier = "basic";

  if (coreSupported >= 4) {
    tier = "enhanced";
  }
  if (coreSupported === coreSignals.length && advancedSupported >= 5) {
    tier = "absurd";
  }

  return {
    advancedSupported,
    coreSupported,
    detail: `${coreSupported}/${coreSignals.length} core signals, ${advancedSupported}/${advancedSignals.length} extra signals`,
    tier
  };
}

function createEnhancementTierElement(profile: EnhancementProfile): HTMLElement {
  const banner = document.createElement("aside");
  const tooltipText =
    `Progressive enhancement status for this browser. ` +
    `Basic: readable core experience with advanced widgets mostly quiet. ` +
    `Enhanced: interactive tools and runtime diagnostics are available. ` +
    `Absurd: extra browser APIs are available for the site's more theatrical upgrades. ` +
    `Current capability scan: ${profile.detail}.`;
  banner.className = "enhancement-tier";
  banner.dataset.tier = profile.tier;
  banner.dataset.tooltip = tooltipText;
  banner.setAttribute("aria-live", "polite");
  banner.setAttribute("aria-label", tooltipText);
  banner.setAttribute("role", "status");
  banner.tabIndex = 0;

  const tiers: EnhancementTier[] = ["basic", "enhanced", "absurd"];
  const meterMarkup = tiers
    .map((tier) => {
      const isActive = tier === profile.tier;
      return `<span class="enhancement-tier__step${isActive ? " enhancement-tier__step--active" : ""}"${isActive ? ' aria-current="true"' : ""}>${tier}</span>`;
    })
    .join("");

  banner.innerHTML = `
    <div class="enhancement-tier__copy">
      <span class="enhancement-tier__eyebrow">Progressive enhancement</span>
      <strong>${enhancementTierLabels[profile.tier]}</strong>
      <span>${enhancementTierSummaries[profile.tier]}</span>
    </div>
    <div class="enhancement-tier__meter" aria-label="Progressive enhancement tiers">
      ${meterMarkup}
    </div>
    <span class="enhancement-tier__detail">${profile.detail}</span>
  `;

  return banner;
}

function renderEnhancementTier(mountNode: HTMLElement): void {
  const profile = detectEnhancementProfile();
  document.documentElement.dataset.enhancementTier = profile.tier;
  document.body.dataset.enhancementTier = profile.tier;

  mountNode.querySelector(".enhancement-tier")?.remove();
  mountNode.appendChild(createEnhancementTierElement(profile));
}

function rewriteHeaderLinks(mountNode: HTMLElement): void {
  const sitePrefix = getSitePrefix();
  if (!sitePrefix) {
    return;
  }

  mountNode.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((link) => {
    const href = link.getAttribute("href");
    if (
      !href ||
      href.startsWith("http") ||
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("../")
    ) {
      return;
    }

    link.setAttribute("href", `${sitePrefix}${href}`);
  });
}

function normalizeHeaderLinks(mountNode: HTMLElement): void {
  rewriteHeaderLinks(mountNode);

  const isIndexPage =
    window.location.pathname.endsWith("/index.html") ||
    window.location.pathname === "/" ||
    window.location.pathname === "";

  if (!isIndexPage) {
    return;
  }

  mountNode.querySelectorAll<HTMLAnchorElement>('a[href^="index.html#"]').forEach((link) => {
    const href = link.getAttribute("href");
    if (href) {
      link.setAttribute("href", href.replace("index.html", ""));
    }
  });
}

function initializeMobileNavigation(mountNode: HTMLElement): void {
  const header = mountNode.querySelector<HTMLElement>(".site-header");
  const toggle = mountNode.querySelector<HTMLButtonElement>(".site-nav-toggle");
  const nav = mountNode.querySelector<HTMLElement>(".site-nav");
  const mobileQuery = window.matchMedia("(max-width: 760px)");

  if (!header || !toggle || !nav) {
    return;
  }

  const setMenuOpen = (isOpen: boolean): void => {
    header.dataset.navOpen = isOpen ? "true" : "false";
    toggle.setAttribute("aria-expanded", String(isOpen));
  };

  header.dataset.mobileNavReady = "true";
  setMenuOpen(false);

  toggle.addEventListener("click", () => {
    setMenuOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  nav.addEventListener("click", (event) => {
    if (mobileQuery.matches && event.target instanceof Element && event.target.closest("a")) {
      setMenuOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && header.dataset.navOpen === "true") {
      setMenuOpen(false);
      toggle.focus();
    }
  });
}

function getWallpaperTime(date: Date): WallpaperTime {
  const hour = date.getHours();

  if (hour >= 5 && hour < 9) {
    return "dawn";
  }
  if (hour >= 9 && hour < 17) {
    return "day";
  }
  if (hour >= 17 && hour < 21) {
    return "dusk";
  }
  return "night";
}

function renderWallpaperEngine(): void {
  if (!document.body || document.querySelector(".wallpaper-engine")) {
    return;
  }

  const wallpaper = document.createElement("div");
  wallpaper.className = "wallpaper-engine";
  wallpaper.setAttribute("aria-hidden", "true");
  wallpaper.innerHTML = `
    <span class="wallpaper-engine__orbit wallpaper-engine__orbit--one"><span></span></span>
    <span class="wallpaper-engine__orbit wallpaper-engine__orbit--two"><span></span></span>
    <span class="wallpaper-engine__orbit wallpaper-engine__orbit--three"><span></span></span>
  `;

  document.body.prepend(wallpaper);
}

function updateWallpaperTime(): void {
  if (!document.body) {
    return;
  }

  document.body.dataset.wallpaperTime = getWallpaperTime(new Date());
}

function initializeWallpaperEngine(): void {
  updateWallpaperTime();
  renderWallpaperEngine();
  window.setInterval(updateWallpaperTime, 60 * 1000);
}

(async function loadSharedHeader(): Promise<void> {
  const mountNode = document.getElementById("site-header");
  if (!mountNode) {
    return;
  }

  initializeWallpaperEngine();

  try {
    const response = await fetch(`${getSitePrefix()}partials/header.html`);
    if (!response.ok) {
      throw new Error("Header partial request failed");
    }

    mountNode.innerHTML = await response.text();
    normalizeHeaderLinks(mountNode);
    initializeMobileNavigation(mountNode);
    renderEnhancementTier(mountNode);
    document.dispatchEvent(new Event("header:loaded"));
  } catch (error) {
    console.error("Unable to load shared header:", error);
    mountNode.innerHTML = fallbackHeaderMarkup;
    normalizeHeaderLinks(mountNode);
    initializeMobileNavigation(mountNode);
    renderEnhancementTier(mountNode);
    document.dispatchEvent(new Event("header:loaded"));
  }
})();
