const fallbackHeaderMarkup = `
<header class="site-header">
  <a class="site-brand" href="index.html">
    <span class="site-brand__mark">NK</span>
    <span class="site-brand__text">
      <span class="site-brand__title">Nicholas Knapp</span>
      <span class="site-brand__tagline">Engineering notes, tools, experiments, and reference material</span>
    </span>
  </a>
  <nav class="site-nav" aria-label="Primary">
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

function getSitePrefix(): string {
  return window.location.pathname.includes("/blog-articles/") ? "../" : "";
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
  banner.className = "enhancement-tier";
  banner.dataset.tier = profile.tier;
  banner.setAttribute("aria-live", "polite");
  banner.setAttribute("role", "status");

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
    const response = await fetch(`${getSitePrefix()}partials/header.html`, { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Header partial request failed");
    }

    mountNode.innerHTML = await response.text();
    normalizeHeaderLinks(mountNode);
    renderEnhancementTier(mountNode);
    document.dispatchEvent(new Event("header:loaded"));
  } catch (error) {
    console.error("Unable to load shared header:", error);
    mountNode.innerHTML = fallbackHeaderMarkup;
    normalizeHeaderLinks(mountNode);
    renderEnhancementTier(mountNode);
    document.dispatchEvent(new Event("header:loaded"));
  }
})();
