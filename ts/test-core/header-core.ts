export type EnhancementTier = "basic" | "enhanced" | "absurd";
export type WallpaperTime = "dawn" | "day" | "dusk" | "night";

export function getSitePrefixFromPathname(pathname: string): string {
  return /\/(?:blog|tutorial)-articles\//.test(pathname) ? "../" : "";
}

export function classifyEnhancementTier(
  coreSupported: number,
  coreSignalCount: number,
  advancedSupported: number
): EnhancementTier {
  let tier: EnhancementTier = "basic";

  if (coreSupported >= 4) {
    tier = "enhanced";
  }

  if (coreSupported === coreSignalCount && advancedSupported >= 5) {
    tier = "absurd";
  }

  return tier;
}

export function getWallpaperTime(date: Date): WallpaperTime {
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
