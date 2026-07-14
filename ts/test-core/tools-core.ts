export type ToolsMassVolumeUnit = "grams" | "pounds" | "milliliters" | "cups";
export type ToolsMassUnit = "grams" | "pounds";
export type ToolsFileFamily = "text" | "data" | "vector-image" | "image";
export type ToolsUsernameTheme =
  | "animals"
  | "colors"
  | "space"
  | "nature"
  | "mythic"
  | "mythology"
  | "cyberpunk"
  | "fantasy-tavern"
  | "biotech"
  | "ocean"
  | "medieval"
  | "retro-arcade"
  | "astronomy-catalog";
export type ToolsUsernameStyle = "compact" | "underscore" | "dot";
export type ToolsUsernameCompositionOptions = {
  alliteration: boolean;
  brandable: boolean;
  noRepeatedLetters: boolean;
  pronounceable: boolean;
  syllableBalance: boolean;
};
export type ToolsPasswordScore = "empty" | "very-weak" | "weak" | "fair" | "strong" | "excellent";
export type ToolsFileFormat =
  | "txt"
  | "md"
  | "html"
  | "css"
  | "js"
  | "xml"
  | "json"
  | "csv"
  | "tsv"
  | "svg"
  | "png"
  | "jpg"
  | "webp";

export type ToolsTable = {
  headers: string[];
  rows: string[][];
};

export type ToolsFileFormatDefinition = {
  label: string;
  shortLabel: string;
  family: ToolsFileFamily;
  mime: string;
};

export type ToolsPasswordAnalysis = {
  adjustedEntropyBits: number;
  rawEntropyBits: number;
  score: ToolsPasswordScore;
  scoreLabel: string;
  scorePercent: number;
  summary: string;
  findings: string[];
};

export const massVolumeUnitConversions: Record<ToolsMassVolumeUnit, number> = {
  grams: 1,
  pounds: 453.592,
  milliliters: 1,
  cups: 240
};

export const fileFormatCatalog: Record<ToolsFileFormat, ToolsFileFormatDefinition> = {
  txt: {
    label: "Plain text (.txt)",
    shortLabel: "TXT",
    family: "text",
    mime: "text/plain"
  },
  md: {
    label: "Markdown (.md)",
    shortLabel: "MD",
    family: "text",
    mime: "text/markdown"
  },
  html: {
    label: "HTML (.html)",
    shortLabel: "HTML",
    family: "text",
    mime: "text/html"
  },
  css: {
    label: "CSS (.css)",
    shortLabel: "CSS",
    family: "text",
    mime: "text/css"
  },
  js: {
    label: "JavaScript (.js)",
    shortLabel: "JS",
    family: "text",
    mime: "application/javascript"
  },
  xml: {
    label: "XML (.xml)",
    shortLabel: "XML",
    family: "text",
    mime: "application/xml"
  },
  json: {
    label: "JSON (.json)",
    shortLabel: "JSON",
    family: "data",
    mime: "application/json"
  },
  csv: {
    label: "CSV (.csv)",
    shortLabel: "CSV",
    family: "data",
    mime: "text/csv"
  },
  tsv: {
    label: "TSV (.tsv)",
    shortLabel: "TSV",
    family: "data",
    mime: "text/tab-separated-values"
  },
  svg: {
    label: "SVG (.svg)",
    shortLabel: "SVG",
    family: "vector-image",
    mime: "image/svg+xml"
  },
  png: {
    label: "PNG (.png)",
    shortLabel: "PNG",
    family: "image",
    mime: "image/png"
  },
  jpg: {
    label: "JPEG (.jpg)",
    shortLabel: "JPG",
    family: "image",
    mime: "image/jpeg"
  },
  webp: {
    label: "WEBP (.webp)",
    shortLabel: "WEBP",
    family: "image",
    mime: "image/webp"
  }
};

export const fileCompatibilityMatrix: Record<ToolsFileFamily, ToolsFileFormat[]> = {
  text: ["txt", "md", "html", "css", "js", "xml"],
  data: ["json", "csv", "tsv"],
  "vector-image": ["svg", "png", "jpg", "webp"],
  image: ["png", "jpg", "webp"]
};

const usernameThemePools: Record<ToolsUsernameTheme, string[]> = {
  animals: ["otter", "lynx", "falcon", "wombat", "badger", "orca", "gecko", "panther", "heron", "tiger"],
  colors: ["amber", "indigo", "scarlet", "teal", "ivory", "cobalt", "sage", "coral", "umber", "silver"],
  space: ["nova", "quasar", "comet", "orbit", "zenith", "nebula", "eclipse", "cosmos", "pulsar", "asteroid"],
  nature: ["cedar", "river", "summit", "canyon", "fern", "stone", "meadow", "harbor", "thunder", "grove"],
  mythic: ["phoenix", "griffin", "hydra", "atlas", "oracle", "pegasus", "sphinx", "titan", "drakon", "selene"],
  mythology: [
    "athena",
    "apollo",
    "artemis",
    "odin",
    "freya",
    "loki",
    "anansi",
    "isis",
    "osiris",
    "quetzal",
    "morrigan",
    "perseus",
    "eirene",
    "raijin"
  ],
  cyberpunk: [
    "netrunner",
    "chrome",
    "neon",
    "cipher",
    "datavault",
    "gridlock",
    "nanoshade",
    "pulsejack",
    "ghostware",
    "bitrunner",
    "synapse",
    "holofox",
    "mechbyte",
    "voltdeck"
  ],
  "fantasy-tavern": [
    "mugwarden",
    "aleleaf",
    "emberstew",
    "questkeeper",
    "bardstool",
    "caskdragon",
    "riddlemug",
    "oakbarrel",
    "moonmead",
    "toastmage",
    "pipebard",
    "copperkeg",
    "innsprite",
    "supperquest"
  ],
  biotech: [
    "codon",
    "helix",
    "plasmid",
    "crispr",
    "ribosome",
    "biolume",
    "sporelab",
    "genekit",
    "enzyme",
    "chromatin",
    "cellforge",
    "mycelium",
    "proteome",
    "vectorcell"
  ],
  ocean: [
    "kelp",
    "reef",
    "tidepool",
    "narwhal",
    "marlin",
    "seaglass",
    "maelstrom",
    "coralfin",
    "wavecrest",
    "abyss",
    "moonjelly",
    "saltwind",
    "bluewhale",
    "trench"
  ],
  medieval: [
    "squire",
    "longbow",
    "rampart",
    "falchion",
    "keep",
    "lancer",
    "banneret",
    "quill",
    "blacksmith",
    "halberd",
    "gildedstag",
    "stonegate",
    "ironhelm",
    "woolcloak"
  ],
  "retro-arcade": [
    "pixel",
    "joystick",
    "highscore",
    "coinop",
    "bosswave",
    "glitch",
    "bitblast",
    "powerup",
    "lasertag",
    "bonusround",
    "sprite",
    "combo",
    "scanline",
    "warpzone"
  ],
  "astronomy-catalog": [
    "messier31",
    "ngc7000",
    "ic434",
    "barnard33",
    "caldwell49",
    "hipparcos",
    "gaiadr3",
    "kepler452b",
    "trappist1",
    "hd189733b",
    "luyten7268",
    "eso137001",
    "psrb1919",
    "wolf359"
  ]
};

const usernameThemeLabels: Record<ToolsUsernameTheme, string> = {
  animals: "animals",
  colors: "colors",
  space: "space",
  nature: "nature",
  mythic: "mythic",
  mythology: "mythology",
  cyberpunk: "cyberpunk",
  "fantasy-tavern": "fantasy tavern",
  biotech: "biotech",
  ocean: "ocean",
  medieval: "medieval",
  "retro-arcade": "retro arcade",
  "astronomy-catalog": "astronomy catalog"
};

const usernameAdjectivePool = [
  "swift",
  "quiet",
  "brave",
  "lucky",
  "hidden",
  "steady",
  "clever",
  "electric",
  "crisp",
  "glowing"
];

const usernameBrandablePrefixes = [
  "aero",
  "alto",
  "brio",
  "coda",
  "dyna",
  "elara",
  "kivo",
  "luma",
  "mira",
  "nexa",
  "orbi",
  "pavo",
  "quali",
  "rivo",
  "sola",
  "tova",
  "vanta",
  "zuno"
];

const usernameBrandableSuffixes = [
  "bit",
  "craft",
  "deck",
  "forge",
  "grid",
  "haus",
  "kit",
  "lab",
  "loop",
  "ly",
  "nest",
  "nova",
  "pilot",
  "press",
  "scope",
  "works"
];

const usernamePronounceableSyllables = [
  "ba",
  "be",
  "bi",
  "bo",
  "ca",
  "co",
  "da",
  "de",
  "di",
  "do",
  "fa",
  "fi",
  "ka",
  "ki",
  "la",
  "lo",
  "mi",
  "mo",
  "na",
  "no",
  "pa",
  "po",
  "ra",
  "ri",
  "sa",
  "si",
  "ta",
  "to",
  "va",
  "vi",
  "za",
  "zo"
];

const commonBreachedPasswordTerms = [
  "123456",
  "123456789",
  "password",
  "qwerty",
  "abc123",
  "letmein",
  "welcome",
  "admin",
  "login",
  "iloveyou",
  "monkey",
  "dragon",
  "football",
  "baseball",
  "sunshine",
  "princess",
  "trustno1",
  "starwars",
  "superman",
  "master",
  "shadow",
  "whatever",
  "freedom",
  "secret",
  "pokemon"
];

const keyboardSequenceRows = [
  "abcdefghijklmnopqrstuvwxyz",
  "qwertyuiop",
  "asdfghjkl",
  "zxcvbnm",
  "1234567890"
];

export function isMassUnit(unit: ToolsMassVolumeUnit | string): unit is ToolsMassUnit {
  return unit === "grams" || unit === "pounds";
}

export function convertMassVolumeValue(
  inputValue: number,
  inputType: ToolsMassVolumeUnit,
  outputType: ToolsMassVolumeUnit,
  substanceDensity?: number
): number {
  if (!Number.isFinite(inputValue)) {
    throw new Error("Please enter a valid numeric value.");
  }

  const inputIsMass = isMassUnit(inputType);
  const outputIsMass = isMassUnit(outputType);

  if (inputIsMass !== outputIsMass && !Number.isFinite(substanceDensity)) {
    throw new Error("Please select a substance density for mass and volume conversions.");
  }

  const inputInBaseUnits = inputValue * massVolumeUnitConversions[inputType];
  const convertedBaseValue =
    inputIsMass === outputIsMass
      ? inputInBaseUnits
      : inputIsMass
        ? inputInBaseUnits / (substanceDensity as number)
        : inputInBaseUnits * (substanceDensity as number);

  return convertedBaseValue / massVolumeUnitConversions[outputType];
}

export function normalizeFormat(format: string): string {
  if (format === "jpeg") {
    return "jpg";
  }
  if (format === "htm") {
    return "html";
  }
  if (format === "mjs") {
    return "js";
  }
  return format;
}

export function isToolsFileFormat(format: string): format is ToolsFileFormat {
  return Object.prototype.hasOwnProperty.call(fileFormatCatalog, format);
}

export function getCompatibleFormats(sourceFormat: string): ToolsFileFormat[] {
  const normalizedSource = normalizeFormat(sourceFormat);
  if (!isToolsFileFormat(normalizedSource)) {
    return [];
  }

  return fileCompatibilityMatrix[fileFormatCatalog[normalizedSource].family] || [];
}

export function parseJsonContent(content: string): unknown {
  try {
    return JSON.parse(content);
  } catch {
    throw new Error("The uploaded JSON file is not valid JSON.");
  }
}

export function jsonToTable(jsonValue: unknown): ToolsTable {
  if (Array.isArray(jsonValue)) {
    if (jsonValue.length === 0) {
      return { headers: [], rows: [] };
    }

    const everyItemIsObject = jsonValue.every((item) => item && typeof item === "object" && !Array.isArray(item));

    if (everyItemIsObject) {
      const flattenedKeys = jsonValue.reduce<string[]>((keys, item) => {
        Object.keys(item as Record<string, unknown>).forEach((key) => {
          keys.push(key);
        });
        return keys;
      }, []);
      const headers = uniqueValuesInOrder(flattenedKeys);

      return {
        headers,
        rows: jsonValue.map((item) =>
          headers.map((header) => stringifyDataValue((item as Record<string, unknown>)[header]))
        )
      };
    }

    const everyItemIsArray = jsonValue.every((item) => Array.isArray(item));
    if (everyItemIsArray) {
      const rows = jsonValue as unknown[][];
      const maxColumns = rows.reduce((max, row) => Math.max(max, row.length), 0);
      const headers = Array.from({ length: maxColumns }, (_, index) => `column_${index + 1}`);

      return {
        headers,
        rows: rows.map((row) => headers.map((_, index) => stringifyDataValue(row[index])))
      };
    }

    return {
      headers: ["value"],
      rows: jsonValue.map((item) => [stringifyDataValue(item)])
    };
  }

  if (jsonValue && typeof jsonValue === "object") {
    const record = jsonValue as Record<string, unknown>;
    const headers = Object.keys(record);
    return {
      headers,
      rows: [headers.map((header) => stringifyDataValue(record[header]))]
    };
  }

  return {
    headers: ["value"],
    rows: [[stringifyDataValue(jsonValue)]]
  };
}

export function uniqueValuesInOrder(items: string[]): string[] {
  const seen = new Set<string>();
  const uniqueItems: string[] = [];

  items.forEach((item) => {
    if (seen.has(item)) {
      return;
    }
    seen.add(item);
    uniqueItems.push(item);
  });

  return uniqueItems;
}

export function stringifyDataValue(value: unknown): string {
  if (value === null || value === undefined) {
    return "";
  }

  if (typeof value === "object") {
    return JSON.stringify(value);
  }

  return String(value);
}

export function parseDelimitedText(content: string, delimiter: string): ToolsTable {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentValue = "";
  let insideQuotes = false;

  for (let index = 0; index < content.length; index += 1) {
    const character = content[index];

    if (character === "\"") {
      if (insideQuotes && content[index + 1] === "\"") {
        currentValue += "\"";
        index += 1;
      } else {
        insideQuotes = !insideQuotes;
      }
      continue;
    }

    if (!insideQuotes && character === delimiter) {
      currentRow.push(currentValue);
      currentValue = "";
      continue;
    }

    if (!insideQuotes && (character === "\n" || character === "\r")) {
      if (character === "\r" && content[index + 1] === "\n") {
        index += 1;
      }

      currentRow.push(currentValue);
      rows.push(currentRow);
      currentRow = [];
      currentValue = "";
      continue;
    }

    currentValue += character;
  }

  if (currentValue !== "" || currentRow.length > 0) {
    currentRow.push(currentValue);
    rows.push(currentRow);
  }

  const normalizedRows = rows.filter((row) => row.some((cell) => cell !== ""));
  if (!normalizedRows.length) {
    return { headers: [], rows: [] };
  }

  const maxColumns = normalizedRows.reduce((max, row) => Math.max(max, row.length), 0);
  const rawHeaders = Array.from(
    { length: maxColumns },
    (_, index) => normalizedRows[0][index] || `column_${index + 1}`
  );
  const headers = makeUniqueHeaders(rawHeaders);
  const bodyRows = normalizedRows.slice(1).map((row) =>
    Array.from({ length: maxColumns }, (_, index) => row[index] || "")
  );

  return { headers, rows: bodyRows };
}

export function makeUniqueHeaders(rawHeaders: string[]): string[] {
  const countsByHeader = new Map<string, number>();

  return rawHeaders.map((header, index) => {
    const normalizedHeader = String(header || "").trim() || `column_${index + 1}`;
    const duplicateCount = countsByHeader.get(normalizedHeader) || 0;
    countsByHeader.set(normalizedHeader, duplicateCount + 1);

    if (duplicateCount === 0) {
      return normalizedHeader;
    }

    return `${normalizedHeader}_${duplicateCount + 1}`;
  });
}

export function tableToJsonRecords(table: ToolsTable): Array<Record<string, string>> {
  return table.rows.map((row) => {
    const record: Record<string, string> = {};
    table.headers.forEach((header, index) => {
      record[header] = row[index] ?? "";
    });
    return record;
  });
}

export function serializeDelimitedTable(table: ToolsTable, delimiter: string): string {
  if (!table.headers.length && !table.rows.length) {
    return "";
  }

  const rows = [table.headers, ...table.rows];
  return rows
    .map((row) => row.map((value) => escapeDelimitedValue(value, delimiter)).join(delimiter))
    .join("\n");
}

export function escapeDelimitedValue(value: unknown, delimiter: string): string {
  const normalizedValue = value === null || value === undefined ? "" : String(value);
  const needsQuotes =
    normalizedValue.includes(delimiter) ||
    normalizedValue.includes("\"") ||
    normalizedValue.includes("\n") ||
    normalizedValue.includes("\r") ||
    /^\s|\s$/.test(normalizedValue);

  if (!needsQuotes) {
    return normalizedValue;
  }

  return `"${normalizedValue.replace(/"/g, "\"\"")}"`;
}

export function isToolsUsernameTheme(value: string): value is ToolsUsernameTheme {
  return Object.prototype.hasOwnProperty.call(usernameThemePools, value);
}

export function isToolsUsernameStyle(value: string): value is ToolsUsernameStyle {
  return value === "compact" || value === "underscore" || value === "dot";
}

export function createUsernameParts(
  theme: ToolsUsernameTheme,
  mixins: {
    includeAdjectives: boolean;
    includeColors: boolean;
    includeNumbers: boolean;
  },
  compositionOptions: ToolsUsernameCompositionOptions
): string[] {
  if (compositionOptions.brandable) {
    return createBrandableUsernameParts(mixins.includeNumbers, compositionOptions);
  }

  const attempts = compositionOptions.noRepeatedLetters || compositionOptions.alliteration || compositionOptions.syllableBalance ? 40 : 1;
  let bestParts: string[] = [];
  let bestScore = -Infinity;

  for (let attempt = 0; attempt < attempts; attempt += 1) {
    const parts = createStandardUsernameParts(theme, mixins, compositionOptions);
    const score = scoreUsernameParts(parts, compositionOptions);

    if (score > bestScore) {
      bestParts = parts;
      bestScore = score;
    }

    if (score >= 100) {
      return parts;
    }
  }

  return bestParts.length ? bestParts : createStandardUsernameParts(theme, mixins, compositionOptions);
}

export function createStandardUsernameParts(
  theme: ToolsUsernameTheme,
  mixins: {
    includeAdjectives: boolean;
    includeColors: boolean;
    includeNumbers: boolean;
  },
  compositionOptions: ToolsUsernameCompositionOptions
): string[] {
  const targetLetter = compositionOptions.alliteration ? pickRandomItem(getAvailableInitials(theme, mixins)) : "";
  const parts: string[] = [];

  if (mixins.includeAdjectives) {
    parts.push(pickUsernameWord(usernameAdjectivePool, targetLetter, compositionOptions));
  }
  if (mixins.includeColors) {
    parts.push(pickUsernameWord(usernameThemePools.colors, targetLetter, compositionOptions));
  }

  const baseWord = compositionOptions.pronounceable
    ? createPronounceableWord(randomInteger(2, 3), targetLetter)
    : pickUsernameWord(usernameThemePools[theme], targetLetter, compositionOptions);
  parts.push(baseWord);

  if (mixins.includeNumbers) {
    parts.push(String(randomInteger(10, 9999)));
  }

  return parts;
}

export function createBrandableUsernameParts(
  includeNumbers: boolean,
  compositionOptions: ToolsUsernameCompositionOptions
): string[] {
  const targetLetter = compositionOptions.alliteration ? pickRandomItem(getInitials(usernameBrandablePrefixes)) : "";
  const attempts = compositionOptions.noRepeatedLetters ? 40 : 1;
  let bestParts: string[] = [];
  let bestScore = -Infinity;

  for (let attempt = 0; attempt < attempts; attempt += 1) {
    const prefix = pickUsernameWord(usernameBrandablePrefixes, targetLetter, compositionOptions);
    const suffixPool = compositionOptions.alliteration
      ? usernameBrandableSuffixes.filter((suffix) => suffix.charAt(0) === prefix.charAt(0))
      : usernameBrandableSuffixes;
    const suffix = pickUsernameWord(suffixPool.length ? suffixPool : usernameBrandableSuffixes, "", compositionOptions);
    const parts = [compositionOptions.pronounceable ? createPronounceableWord(3, targetLetter || prefix.charAt(0)) : `${prefix}${suffix}`];

    if (includeNumbers) {
      parts.push(String(randomInteger(10, 99)));
    }

    const score = scoreUsernameParts(parts, compositionOptions);
    if (score > bestScore) {
      bestParts = parts;
      bestScore = score;
    }
  }

  return bestParts;
}

export function pickUsernameWord(
  pool: string[],
  initial: string,
  compositionOptions: ToolsUsernameCompositionOptions
): string {
  const alliterativePool = initial ? pool.filter((word) => word.charAt(0).toLowerCase() === initial) : pool;
  const balancedPool = compositionOptions.syllableBalance ? getSyllableBalancedPool(alliterativePool.length ? alliterativePool : pool) : [];
  const candidatePool = balancedPool.length ? balancedPool : alliterativePool.length ? alliterativePool : pool;
  return pickRandomItem(candidatePool);
}

export function getAvailableInitials(
  theme: ToolsUsernameTheme,
  mixins: {
    includeAdjectives: boolean;
    includeColors: boolean;
  }
): string[] {
  const pools = [usernameThemePools[theme]];
  if (mixins.includeAdjectives) {
    pools.push(usernameAdjectivePool);
  }
  if (mixins.includeColors) {
    pools.push(usernameThemePools.colors);
  }

  const sharedInitials = pools
    .map(getInitials)
    .reduce((left, right) => left.filter((initial) => right.indexOf(initial) !== -1));

  return sharedInitials.length ? sharedInitials : getInitials(usernameThemePools[theme]);
}

export function getInitials(words: string[]): string[] {
  return Array.from(new Set(words.map((word) => word.charAt(0).toLowerCase()).filter(Boolean)));
}

export function getSyllableBalancedPool(words: string[]): string[] {
  if (words.length <= 1) {
    return words;
  }

  const scoredWords = words.map((word) => ({ count: countApproximateSyllables(word), word }));
  const target = Math.round(scoredWords.reduce((sum, item) => sum + item.count, 0) / scoredWords.length);
  return scoredWords.filter((item) => Math.abs(item.count - target) <= 1).map((item) => item.word);
}

export function createPronounceableWord(syllableCount: number, initial = ""): string {
  const syllables: string[] = [];
  const firstPool = initial ? usernamePronounceableSyllables.filter((syllable) => syllable.charAt(0) === initial) : [];

  syllables.push(pickRandomItem(firstPool.length ? firstPool : usernamePronounceableSyllables));
  while (syllables.length < syllableCount) {
    syllables.push(pickRandomItem(usernamePronounceableSyllables));
  }

  return syllables.join("");
}

export function countApproximateSyllables(word: string): number {
  const matches = word.toLowerCase().match(/[aeiouy]+/g);
  return Math.max(1, matches ? matches.length : 1);
}

export function scoreUsernameParts(parts: string[], compositionOptions: ToolsUsernameCompositionOptions): number {
  const wordParts = parts.filter((part) => !/^\d+$/.test(part));
  let score = 100;

  if (compositionOptions.alliteration && wordParts.length > 1) {
    const initial = wordParts[0].charAt(0).toLowerCase();
    if (!wordParts.every((part) => part.charAt(0).toLowerCase() === initial)) {
      score -= 35;
    }
  }

  if (compositionOptions.noRepeatedLetters && hasRepeatedLetters(wordParts.join(""))) {
    score -= 35;
  }

  if (compositionOptions.syllableBalance && wordParts.length > 1) {
    const syllableCounts = wordParts.map(countApproximateSyllables);
    if (Math.max(...syllableCounts) - Math.min(...syllableCounts) > 1) {
      score -= 20;
    }
  }

  return score;
}

export function hasRepeatedLetters(value: string): boolean {
  return /([a-z])\1/i.test(value);
}

export function pickRandomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export function randomInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function formatUsernameParts(parts: string[], style: ToolsUsernameStyle): string {
  const normalizedParts = parts
    .map((part) => part.toLowerCase().replace(/[^a-z0-9]+/g, ""))
    .filter(Boolean);

  if (style === "underscore") {
    return normalizedParts.join("_");
  }

  if (style === "dot") {
    return normalizedParts.join(".");
  }

  return normalizedParts
    .map((part, index) => {
      if (index === 0 || /^\d+$/.test(part)) {
        return part;
      }

      return `${part.charAt(0).toUpperCase()}${part.slice(1)}`;
    })
    .join("");
}

export function buildUsernameHint(
  theme: ToolsUsernameTheme,
  style: ToolsUsernameStyle,
  options: {
    includeColors: boolean;
    includeAdjectives: boolean;
    includeNumbers: boolean;
  },
  compositionOptions: ToolsUsernameCompositionOptions
): string {
  const mixins: string[] = [];
  const rules: string[] = [];

  if (options.includeAdjectives) {
    mixins.push("adjectives");
  }
  if (options.includeColors) {
    mixins.push("colors");
  }
  if (options.includeNumbers) {
    mixins.push("numbers");
  }
  if (compositionOptions.alliteration) {
    rules.push("alliteration");
  }
  if (compositionOptions.syllableBalance) {
    rules.push("syllable balance");
  }
  if (compositionOptions.pronounceable) {
    rules.push("pronounceable");
  }
  if (compositionOptions.noRepeatedLetters) {
    rules.push("no repeated letters");
  }
  if (compositionOptions.brandable) {
    rules.push("brandable");
  }

  const styleLabel = style === "compact" ? "compact" : style === "underscore" ? "underscore" : "dot separated";
  const mixinsLabel = mixins.length ? mixins.join(", ") : "theme only";
  const rulesLabel = rules.length ? rules.join(", ") : "standard composition";

  return `Theme: ${usernameThemeLabels[theme]}. Format: ${styleLabel}. Mix: ${mixinsLabel}. Rules: ${rulesLabel}.`;
}

export function analyzePasswordStrength(password: string): ToolsPasswordAnalysis {
  if (!password) {
    return {
      adjustedEntropyBits: 0,
      rawEntropyBits: 0,
      score: "empty",
      scoreLabel: "No password yet",
      scorePercent: 0,
      summary: "Generate a password or enter one to estimate strength.",
      findings: ["Pattern checks will appear here."]
    };
  }

  const rawEntropyBits = password.length * Math.log2(estimatePasswordPoolSize(password));
  const findings: string[] = [];
  let penaltyBits = 0;
  let entropyCap = rawEntropyBits;

  const addFinding = (message: string, penalty = 0, cap = rawEntropyBits): void => {
    findings.push(message);
    penaltyBits += penalty;
    entropyCap = Math.min(entropyCap, cap);
  };

  const lowerPassword = password.toLowerCase();
  const compactPassword = lowerPassword.replace(/[^a-z0-9]/g, "");
  const leetNormalized = normalizePasswordLeetspeak(lowerPassword).replace(/[^a-z0-9]/g, "");

  if (password.length < 8) {
    addFinding("Very short passwords are usually cracked quickly.", 28, 18);
  } else if (password.length < 12) {
    addFinding("Length is below the usual 12-character minimum for general account passwords.", 14, 40);
  } else if (password.length >= 16) {
    findings.push("Length is doing useful work; 16+ characters raises brute-force cost.");
  }

  const exactCommonTerm = commonBreachedPasswordTerms.find((term) => compactPassword === term || leetNormalized === term);
  if (exactCommonTerm) {
    addFinding(`Matches a common breached-password pattern: "${exactCommonTerm}".`, 80, 12);
  } else {
    const containedCommonTerm = commonBreachedPasswordTerms.find((term) => {
      return term.length >= 5 && (compactPassword.includes(term) || leetNormalized.includes(term));
    });

    if (containedCommonTerm) {
      addFinding(`Contains a common password term: "${containedCommonTerm}".`, 24, 45);
    }
  }

  if (leetNormalized !== compactPassword && commonBreachedPasswordTerms.some((term) => leetNormalized.includes(term))) {
    addFinding("Common leetspeak substitutions are visible; attackers try those early.", 16, 42);
  }

  if (/^[A-Z]?[a-z]{4,}\d{1,4}[!?.@#$%&*]?$/.test(password)) {
    addFinding("Looks like a word with a number or symbol suffix, a common breached-password shape.", 18, 44);
  }

  if (/(?:19|20)\d{2}/.test(password)) {
    addFinding("Contains a year-like number; dates are common in leaked password patterns.", 10, 58);
  }

  if (/(?:0?[1-9]|1[0-2])[-/.]?(?:0?[1-9]|[12]\d|3[01])[-/.]?(?:\d{2}|\d{4})/.test(password)) {
    addFinding("Contains a date-like pattern.", 12, 52);
  }

  const sequentialRun = findSequentialPasswordRun(compactPassword);
  if (sequentialRun) {
    addFinding(`Contains an obvious sequence: "${sequentialRun}".`, 18, 46);
  }

  if (/(.)\1{2,}/.test(password)) {
    addFinding("Repeats the same character several times in a row.", 12, 45);
  }

  const repeatedChunk = password.match(/(.{2,5})\1{1,}/);
  if (repeatedChunk) {
    addFinding(`Repeats the chunk "${repeatedChunk[1]}".`, 14, 48);
  }

  if (/^[a-z]+$/i.test(password) || /^\d+$/.test(password)) {
    addFinding("Uses only one character family.", 12, 42);
  }

  const uniqueCharacterCount = new Set(Array.from(password)).size;
  if (uniqueCharacterCount <= 2) {
    addFinding("Uses very few unique characters.", 22, 24);
  } else if (password.length >= 10 && uniqueCharacterCount <= Math.ceil(password.length / 3)) {
    addFinding("Character variety is low for this length.", 8, 55);
  }

  const adjustedEntropyBits = Math.max(0, Math.min(rawEntropyBits - penaltyBits, entropyCap));
  const score = getPasswordScore(adjustedEntropyBits);
  const scoreLabel = getPasswordScoreLabel(score);
  const scorePercent = score === "empty" ? 0 : Math.max(8, Math.min(100, Math.round((adjustedEntropyBits / 95) * 100)));

  if (findings.length === 0) {
    findings.push("No obvious dictionary, sequence, date, or repetition patterns detected.");
  }

  return {
    adjustedEntropyBits,
    rawEntropyBits,
    score,
    scoreLabel,
    scorePercent,
    summary: `Estimated adjusted entropy: ${adjustedEntropyBits.toFixed(1)} bits. Raw character-space estimate: ${rawEntropyBits.toFixed(1)} bits.`,
    findings
  };
}

export function estimatePasswordPoolSize(password: string): number {
  let poolSize = 0;

  if (/[a-z]/.test(password)) {
    poolSize += 26;
  }
  if (/[A-Z]/.test(password)) {
    poolSize += 26;
  }
  if (/\d/.test(password)) {
    poolSize += 10;
  }
  if (/[^A-Za-z0-9\s]/.test(password)) {
    poolSize += 33;
  }
  if (/\s/.test(password)) {
    poolSize += 1;
  }
  if (/[^\x00-\x7F]/.test(password)) {
    poolSize += 80;
  }

  return Math.max(poolSize, new Set(Array.from(password)).size, 1);
}

export function normalizePasswordLeetspeak(value: string): string {
  const substitutions: Record<string, string> = {
    "0": "o",
    "1": "l",
    "3": "e",
    "4": "a",
    "5": "s",
    "7": "t",
    "8": "b",
    "@": "a",
    "$": "s",
    "!": "i"
  };

  return Array.from(value)
    .map((character) => substitutions[character] || character)
    .join("");
}

export function findSequentialPasswordRun(value: string): string {
  if (value.length < 4) {
    return "";
  }

  const rows: string[] = [];
  keyboardSequenceRows.forEach((row) => {
    rows.push(row, Array.from(row).reverse().join(""));
  });

  for (const row of rows) {
    for (let length = Math.min(value.length, row.length); length >= 4; length -= 1) {
      for (let start = 0; start <= row.length - length; start += 1) {
        const sequence = row.slice(start, start + length);
        if (value.includes(sequence)) {
          return sequence;
        }
      }
    }
  }

  return "";
}

export function getPasswordScore(entropyBits: number): ToolsPasswordScore {
  if (entropyBits <= 0) {
    return "empty";
  }
  if (entropyBits < 28) {
    return "very-weak";
  }
  if (entropyBits < 45) {
    return "weak";
  }
  if (entropyBits < 65) {
    return "fair";
  }
  if (entropyBits < 85) {
    return "strong";
  }
  return "excellent";
}

export function getPasswordScoreLabel(score: ToolsPasswordScore): string {
  const labels: Record<ToolsPasswordScore, string> = {
    empty: "No password yet",
    "very-weak": "Very weak",
    weak: "Weak",
    fair: "Fair",
    strong: "Strong",
    excellent: "Excellent"
  };

  return labels[score];
}

export function formatPasswordSearchSpace(entropyBits: number): string {
  if (entropyBits <= 0) {
    return "none";
  }

  if (entropyBits < 60) {
    return `${formatLargeNumber(Math.pow(2, entropyBits))} guesses`;
  }

  return `about 2^${entropyBits.toFixed(0)} guesses`;
}

export function formatLargeNumber(value: number): string {
  if (value < 1_000_000) {
    return Math.round(value).toLocaleString("en-US");
  }

  const suffixes = [
    { value: 1e18, suffix: "quintillion" },
    { value: 1e15, suffix: "quadrillion" },
    { value: 1e12, suffix: "trillion" },
    { value: 1e9, suffix: "billion" },
    { value: 1e6, suffix: "million" }
  ];

  const match = suffixes.find((item) => value >= item.value);
  if (!match) {
    return Math.round(value).toLocaleString("en-US");
  }

  return `${(value / match.value).toFixed(value / match.value >= 10 ? 1 : 2)} ${match.suffix}`;
}

export function formatCrackTime(entropyBits: number, guessesPerSecond: number): string {
  if (entropyBits <= 0) {
    return "none";
  }

  const log2Seconds = entropyBits - Math.log2(guessesPerSecond);

  if (log2Seconds < 0) {
    return "less than a second";
  }

  const units = [
    { label: "year", seconds: 31_536_000 },
    { label: "day", seconds: 86_400 },
    { label: "hour", seconds: 3_600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 }
  ];

  const unit = units.find((item) => log2Seconds >= Math.log2(item.seconds)) || units[units.length - 1];
  const log2Value = log2Seconds - Math.log2(unit.seconds);

  if (log2Value > 20) {
    return `about 2^${log2Value.toFixed(0)} ${unit.label}s`;
  }

  const value = Math.pow(2, log2Value);
  return `${value.toFixed(value >= 10 ? 0 : 1)} ${unit.label}${value === 1 ? "" : "s"}`;
}
