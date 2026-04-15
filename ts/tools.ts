type ToolsMassVolumeUnit = "grams" | "pounds" | "milliliters" | "cups";
type ToolsMassUnit = "grams" | "pounds";
type ToolsFileFamily = "text" | "data" | "vector-image" | "image";
type ToolsUsernameTheme =
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
type ToolsUsernameStyle = "compact" | "underscore" | "dot";
type ToolsPasswordScore = "empty" | "very-weak" | "weak" | "fair" | "strong" | "excellent";
type ToolsFileFormat =
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

type ToolsConvertedFile = {
  blob: Blob;
  summary: string;
};

type ToolsTable = {
  headers: string[];
  rows: string[][];
};

type ToolsFileFormatDefinition = {
  label: string;
  shortLabel: string;
  family: ToolsFileFamily;
  mime: string;
};

type ToolsPasswordAnalysis = {
  adjustedEntropyBits: number;
  rawEntropyBits: number;
  score: ToolsPasswordScore;
  scoreLabel: string;
  scorePercent: number;
  summary: string;
  findings: string[];
};

console.log("Tools");

const massVolumeUnitConversions: Record<ToolsMassVolumeUnit, number> = {
  grams: 1,
  pounds: 453.592,
  milliliters: 1,
  cups: 240
};

const fileFormatCatalog: Record<ToolsFileFormat, ToolsFileFormatDefinition> = {
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

const fileCompatibilityMatrix: Record<ToolsFileFamily, ToolsFileFormat[]> = {
  text: ["txt", "md", "html", "css", "js", "xml"],
  data: ["json", "csv", "tsv"],
  "vector-image": ["svg", "png", "jpg", "webp"],
  image: ["png", "jpg", "webp"]
};

const fileFamilyLabels: Record<ToolsFileFamily, string> = {
  text: "Text files",
  data: "Structured data",
  "vector-image": "SVG artwork",
  image: "Raster images"
};

const fileFamilyDescriptions: Record<ToolsFileFamily, string> = {
  text: "Text formats are copied as UTF-8 content and saved with the selected extension.",
  data: "JSON, CSV, and TSV are converted through a shared table structure.",
  "vector-image": "SVG files can remain SVG or be rendered into raster image formats.",
  image: "Raster images keep their pixel dimensions and are re-encoded in the browser."
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

function initializeToolsPage(): void {
  initializeMassVolumeConverter();
  initializeRandomNumberGenerator();
  initializeUsernameGenerator();
  initializePasswordGenerator();
  initializeFileConverter();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeToolsPage);
} else {
  initializeToolsPage();
}

function initializeMassVolumeConverter(): void {
  const converterForm = document.getElementById("converterForm") as HTMLFormElement | null;
  const resultElement = document.getElementById("massVolumeResult");
  const inputTypeElement = document.getElementById("inputType") as HTMLSelectElement | null;
  const inputValueElement = document.getElementById("inputValue") as HTMLInputElement | null;
  const outputTypeElement = document.getElementById("outputType") as HTMLSelectElement | null;
  const substanceElement = document.getElementById("substance") as HTMLSelectElement | null;

  if (!converterForm || !resultElement || !inputTypeElement || !inputValueElement || !outputTypeElement || !substanceElement) {
    return;
  }

  converterForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const inputType = inputTypeElement.value as ToolsMassVolumeUnit;
    const inputValue = parseFloat(inputValueElement.value);
    const outputType = outputTypeElement.value as ToolsMassVolumeUnit;
    const substanceDensity = parseFloat(substanceElement.value);
    const inputIsMass = isMassUnit(inputType);
    const outputIsMass = isMassUnit(outputType);

    if (Number.isNaN(inputValue)) {
      resultElement.textContent = "Please enter a valid numeric value.";
      return;
    }

    if (inputIsMass !== outputIsMass && Number.isNaN(substanceDensity)) {
      resultElement.textContent = "Please select a substance density for mass and volume conversions.";
      return;
    }

    const inputInBaseUnits = inputValue * massVolumeUnitConversions[inputType];
    const convertedBaseValue =
      inputIsMass === outputIsMass
        ? inputInBaseUnits
        : inputIsMass
          ? inputInBaseUnits / substanceDensity
          : inputInBaseUnits * substanceDensity;
    const resultValue = convertedBaseValue / massVolumeUnitConversions[outputType];

    resultElement.textContent = `Converted value: ${resultValue.toFixed(2)} ${outputType}.`;
  });
}

function isMassUnit(unit: ToolsMassVolumeUnit | string): unit is ToolsMassUnit {
  return unit === "grams" || unit === "pounds";
}

function initializeRandomNumberGenerator(): void {
  const generateButton = document.getElementById("generateBtn") as HTMLButtonElement | null;
  const minInput = document.getElementById("min") as HTMLInputElement | null;
  const maxInput = document.getElementById("max") as HTMLInputElement | null;
  const resultElement = document.getElementById("randomResult");

  if (!generateButton || !minInput || !maxInput || !resultElement) {
    return;
  }

  generateButton.addEventListener("click", () => {
    const min = parseInt(minInput.value, 10);
    const max = parseInt(maxInput.value, 10);

    if (Number.isNaN(min) || Number.isNaN(max)) {
      resultElement.textContent = "Please enter valid numbers for both minimum and maximum values.";
      return;
    }

    if (min >= max) {
      resultElement.textContent = "Minimum value must be less than the maximum value.";
      return;
    }

    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    resultElement.textContent = `Random Number: ${randomNumber}`;
  });
}

function initializeUsernameGenerator(): void {
  const generateButton = document.getElementById("generateUsernameBtn") as HTMLButtonElement | null;
  const copyButton = document.getElementById("copyUsernameBtn") as HTMLButtonElement | null;
  const themeSelect = document.getElementById("usernameTheme") as HTMLSelectElement | null;
  const styleSelect = document.getElementById("usernameStyle") as HTMLSelectElement | null;
  const addColorsInput = document.getElementById("usernameAddColors") as HTMLInputElement | null;
  const addAdjectivesInput = document.getElementById("usernameAddAdjectives") as HTMLInputElement | null;
  const addNumbersInput = document.getElementById("usernameAddNumbers") as HTMLInputElement | null;

  if (
    !generateButton ||
    !copyButton ||
    !themeSelect ||
    !styleSelect ||
    !addColorsInput ||
    !addAdjectivesInput ||
    !addNumbersInput
  ) {
    return;
  }

  generateButton.addEventListener("click", generateUsername);
  copyButton.addEventListener("click", copyUsername);

  [themeSelect, styleSelect, addColorsInput, addAdjectivesInput, addNumbersInput].forEach((control) => {
    control.addEventListener("change", generateUsername);
  });

  generateUsername();
}

function generateUsername(): void {
  const themeSelect = document.getElementById("usernameTheme") as HTMLSelectElement | null;
  const styleSelect = document.getElementById("usernameStyle") as HTMLSelectElement | null;
  const addColorsInput = document.getElementById("usernameAddColors") as HTMLInputElement | null;
  const addAdjectivesInput = document.getElementById("usernameAddAdjectives") as HTMLInputElement | null;
  const addNumbersInput = document.getElementById("usernameAddNumbers") as HTMLInputElement | null;
  const resultElement = document.getElementById("usernameResult");
  const hintElement = document.getElementById("usernameHint");

  if (
    !themeSelect ||
    !styleSelect ||
    !addColorsInput ||
    !addAdjectivesInput ||
    !addNumbersInput ||
    !resultElement ||
    !hintElement
  ) {
    return;
  }

  const theme = isToolsUsernameTheme(themeSelect.value) ? themeSelect.value : "animals";
  const style = isToolsUsernameStyle(styleSelect.value) ? styleSelect.value : "compact";
  const includeColors = addColorsInput.checked;
  const includeAdjectives = addAdjectivesInput.checked;
  const includeNumbers = addNumbersInput.checked;
  const parts: string[] = [];

  if (includeAdjectives) {
    parts.push(pickRandomItem(usernameAdjectivePool));
  }
  if (includeColors) {
    parts.push(pickRandomItem(usernameThemePools.colors));
  }
  parts.push(pickRandomItem(usernameThemePools[theme]));
  if (includeNumbers) {
    parts.push(String(randomInteger(10, 9999)));
  }

  resultElement.textContent = formatUsernameParts(parts, style);
  hintElement.textContent = buildUsernameHint(theme, style, {
    includeColors,
    includeAdjectives,
    includeNumbers
  });
}

function copyUsername(): void {
  const resultElement = document.getElementById("usernameResult");
  const copyButton = document.getElementById("copyUsernameBtn") as HTMLButtonElement | null;

  if (!resultElement || !copyButton) {
    return;
  }

  void copyTextWithFeedback(resultElement.textContent?.trim() || "", copyButton);
}

function initializePasswordGenerator(): void {
  const generateButton = document.getElementById("generatePasswordBtn") as HTMLButtonElement | null;
  const copyButton = document.getElementById("copyPasswordBtn") as HTMLButtonElement | null;
  const passwordStrengthInput = document.getElementById("passwordStrengthInput") as HTMLInputElement | null;

  if (!generateButton || !copyButton || !passwordStrengthInput) {
    return;
  }

  generateButton.addEventListener("click", generatePassword);
  copyButton.addEventListener("click", copyPassword);
  passwordStrengthInput.addEventListener("input", () => {
    updatePasswordStrength(passwordStrengthInput.value);
  });

  generatePassword();
}

function initializeFileConverter(): void {
  const fileInput = document.getElementById("fileInput") as HTMLInputElement | null;
  const sourceFormatSelect = document.getElementById("sourceFormat") as HTMLSelectElement | null;
  const targetFormatSelect = document.getElementById("targetFormat") as HTMLSelectElement | null;
  const convertButton = document.getElementById("convertFileBtn") as HTMLButtonElement | null;
  const statusElement = document.getElementById("fileConversionStatus");
  const metadataElement = document.getElementById("fileMeta");
  const compatibilityList = document.getElementById("compatibleFormatsList") as HTMLUListElement | null;
  const detailsElement = document.getElementById("fileConversionDetails");

  if (
    !fileInput ||
    !sourceFormatSelect ||
    !targetFormatSelect ||
    !convertButton ||
    !statusElement ||
    !metadataElement ||
    !compatibilityList ||
    !detailsElement
  ) {
    return;
  }

  convertButton.dataset.defaultLabel = convertButton.textContent?.trim() || "Convert and Download";
  populateSourceFormatOptions(sourceFormatSelect);
  updateTargetFormatOptions("", targetFormatSelect);
  renderCompatibilitySummary("", compatibilityList, detailsElement);

  fileInput.addEventListener("change", () => {
    const selectedFile = fileInput.files?.[0] || null;
    const inferredFormat = selectedFile ? inferFileFormat(selectedFile) : "";

    sourceFormatSelect.value = inferredFormat || "";

    updateTargetFormatOptions(sourceFormatSelect.value, targetFormatSelect, targetFormatSelect.value);
    updateFileMetadata(selectedFile, sourceFormatSelect.value, metadataElement);
    renderCompatibilitySummary(sourceFormatSelect.value, compatibilityList, detailsElement);

    if (!selectedFile) {
      setConverterStatus(statusElement, "Choose a file to begin.", "idle");
    } else if (sourceFormatSelect.value && isToolsFileFormat(sourceFormatSelect.value)) {
      setConverterStatus(
        statusElement,
        `Detected ${fileFormatCatalog[sourceFormatSelect.value].label}. Choose an output format and convert.`,
        "idle"
      );
    } else {
      setConverterStatus(
        statusElement,
        "Choose the source format so compatible output formats can be enabled.",
        "idle"
      );
    }

    updateFileConverterState(fileInput, sourceFormatSelect, targetFormatSelect, convertButton);
  });

  sourceFormatSelect.addEventListener("change", () => {
    const selectedFile = fileInput.files?.[0] || null;

    updateTargetFormatOptions(sourceFormatSelect.value, targetFormatSelect, targetFormatSelect.value);
    updateFileMetadata(selectedFile, sourceFormatSelect.value, metadataElement);
    renderCompatibilitySummary(sourceFormatSelect.value, compatibilityList, detailsElement);

    if (!selectedFile) {
      setConverterStatus(statusElement, "Choose a file to begin.", "idle");
    } else if (sourceFormatSelect.value && isToolsFileFormat(sourceFormatSelect.value)) {
      setConverterStatus(
        statusElement,
        `Ready to convert ${selectedFile.name} from ${fileFormatCatalog[sourceFormatSelect.value].shortLabel}.`,
        "idle"
      );
    } else {
      setConverterStatus(
        statusElement,
        "Choose the source format so compatible output formats can be enabled.",
        "idle"
      );
    }

    updateFileConverterState(fileInput, sourceFormatSelect, targetFormatSelect, convertButton);
  });

  targetFormatSelect.addEventListener("change", () => {
    const selectedFile = fileInput.files?.[0] || null;
    const targetFormat = targetFormatSelect.value;

    if (selectedFile && isToolsFileFormat(targetFormat)) {
      setConverterStatus(
        statusElement,
        `Ready to convert ${selectedFile.name} to ${fileFormatCatalog[targetFormat].shortLabel}.`,
        "idle"
      );
    }

    updateFileConverterState(fileInput, sourceFormatSelect, targetFormatSelect, convertButton);
  });

  convertButton.addEventListener("click", async () => {
    const selectedFile = fileInput.files?.[0] || null;
    const sourceFormat = sourceFormatSelect.value;
    const targetFormat = targetFormatSelect.value;

    if (!selectedFile || !isToolsFileFormat(sourceFormat) || !isToolsFileFormat(targetFormat)) {
      setConverterStatus(statusElement, "Choose a file and both formats before converting.", "error");
      updateFileConverterState(fileInput, sourceFormatSelect, targetFormatSelect, convertButton);
      return;
    }

    const downloadName = buildDownloadFilename(selectedFile.name, targetFormat);

    convertButton.disabled = true;
    convertButton.textContent = "Converting...";
    setConverterStatus(
      statusElement,
      `Converting ${selectedFile.name} to ${fileFormatCatalog[targetFormat].label}...`,
      "working"
    );

    try {
      const convertedFile = await convertCompatibleFile(selectedFile, sourceFormat, targetFormat);
      downloadBlob(convertedFile.blob, downloadName);
      setConverterStatus(statusElement, `Downloaded ${downloadName}.`, "success");
      detailsElement.textContent = convertedFile.summary;
    } catch (error) {
      setConverterStatus(
        statusElement,
        error instanceof Error ? error.message : "Unable to convert the selected file.",
        "error"
      );
    } finally {
      convertButton.textContent = convertButton.dataset.defaultLabel || "Convert and Download";
      updateFileConverterState(fileInput, sourceFormatSelect, targetFormatSelect, convertButton);
    }
  });
}

function populateSourceFormatOptions(selectElement: HTMLSelectElement): void {
  const formatGroups: Array<{ label: string; formats: ToolsFileFormat[] }> = [
    {
      label: "Text files",
      formats: ["txt", "md", "html", "css", "js", "xml"]
    },
    {
      label: "Structured data",
      formats: ["json", "csv", "tsv"]
    },
    {
      label: "Images",
      formats: ["svg", "png", "jpg", "webp"]
    }
  ];

  selectElement.innerHTML = "";
  appendPlaceholderOption(selectElement, "Select the uploaded file type");

  formatGroups.forEach((group) => {
    const optionGroup = document.createElement("optgroup");
    optionGroup.label = group.label;

    group.formats.forEach((format) => {
      const option = document.createElement("option");
      option.value = format;
      option.textContent = fileFormatCatalog[format].label;
      optionGroup.appendChild(option);
    });

    selectElement.appendChild(optionGroup);
  });
}

function updateTargetFormatOptions(sourceFormat: string, targetSelect: HTMLSelectElement, currentValue = ""): void {
  const compatibleFormats = getCompatibleFormats(sourceFormat);

  targetSelect.innerHTML = "";

  if (!compatibleFormats.length) {
    appendPlaceholderOption(targetSelect, "Select an input format first");
    targetSelect.disabled = true;
    return;
  }

  compatibleFormats.forEach((format) => {
    const option = document.createElement("option");
    option.value = format;
    option.textContent = fileFormatCatalog[format].label;
    targetSelect.appendChild(option);
  });

  const preferredValue =
    compatibleFormats.includes(currentValue as ToolsFileFormat)
      ? currentValue
      : compatibleFormats.find((format) => format !== sourceFormat) || compatibleFormats[0];

  targetSelect.value = preferredValue;
  targetSelect.disabled = false;
}

function appendPlaceholderOption(selectElement: HTMLSelectElement, label: string): void {
  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = label;
  selectElement.appendChild(placeholder);
}

function getCompatibleFormats(sourceFormat: string): ToolsFileFormat[] {
  const normalizedSource = normalizeFormat(sourceFormat);
  if (!isToolsFileFormat(normalizedSource)) {
    return [];
  }

  return fileCompatibilityMatrix[fileFormatCatalog[normalizedSource].family] || [];
}

function renderCompatibilitySummary(sourceFormat: string, listElement: HTMLUListElement, detailsElement: HTMLElement): void {
  const normalizedSource = normalizeFormat(sourceFormat);
  const items: string[] = [];

  if (!isToolsFileFormat(normalizedSource)) {
    items.push("Supported families: text files, structured data, and common web images.");
    items.push("Text formats are re-saved as UTF-8 content with the chosen extension.");
    items.push("Structured data supports JSON, CSV, and TSV conversions.");
    items.push("Images support PNG, JPG, WEBP, and SVG to raster conversion.");
    detailsElement.textContent =
      "CSV and TSV use the first row as column headers. JPEG output flattens transparency onto a white background.";
  } else {
    const sourceDefinition = fileFormatCatalog[normalizedSource];
    const compatibleFormats = getCompatibleFormats(normalizedSource)
      .map((format) => fileFormatCatalog[format].shortLabel)
      .join(", ");

    items.push(`Detected family: ${fileFamilyLabels[sourceDefinition.family]}.`);
    items.push(`Available outputs: ${compatibleFormats}.`);
    items.push(fileFamilyDescriptions[sourceDefinition.family]);

    if (sourceDefinition.family === "data") {
      detailsElement.textContent =
        "Nested JSON values are stringified when exported to CSV or TSV. CSV and TSV use the first row as column headers.";
    } else if (sourceDefinition.family === "text") {
      detailsElement.textContent =
        "Text conversions preserve the file content as-is. They change the saved format shell rather than rewriting the document structure.";
    } else if (sourceDefinition.family === "vector-image") {
      detailsElement.textContent =
        "SVG can stay as SVG or be rasterized. Raster exports keep the current pixel dimensions after rendering.";
    } else {
      detailsElement.textContent =
        "Raster image conversions keep the current width and height. JPEG output removes transparency by filling it with white.";
    }
  }

  listElement.innerHTML = "";
  items.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    listElement.appendChild(listItem);
  });
}

function updateFileMetadata(file: File | null, sourceFormat: string, metadataElement: HTMLElement): void {
  if (!file) {
    metadataElement.textContent = "No file selected yet.";
    return;
  }

  const normalizedSource = normalizeFormat(sourceFormat);
  const detectedLabel = isToolsFileFormat(normalizedSource)
    ? fileFormatCatalog[normalizedSource].label
    : "Unknown format";

  metadataElement.textContent = `${file.name} | ${formatBytes(file.size)} | ${detectedLabel}`;
}

function updateFileConverterState(
  fileInput: HTMLInputElement,
  sourceSelect: HTMLSelectElement,
  targetSelect: HTMLSelectElement,
  convertButton: HTMLButtonElement
): void {
  const hasFile = Boolean(fileInput.files?.[0]);
  const hasSource = Boolean(sourceSelect.value);
  const hasTarget = Boolean(targetSelect.value);

  convertButton.disabled = !(hasFile && hasSource && hasTarget);
}

function setConverterStatus(statusElement: HTMLElement, message: string, state: string): void {
  statusElement.textContent = message;
  statusElement.dataset.state = state;
}

function inferFileFormat(file: File): ToolsFileFormat | "" {
  const fileName = file.name.toLowerCase();
  const extension = fileName.includes(".") ? fileName.split(".").pop() || "" : "";
  const normalizedExtension = normalizeFormat(extension);

  if (isToolsFileFormat(normalizedExtension)) {
    return normalizedExtension;
  }

  const mimeMap: Record<string, ToolsFileFormat> = {
    "text/plain": "txt",
    "text/markdown": "md",
    "text/html": "html",
    "text/css": "css",
    "application/javascript": "js",
    "text/javascript": "js",
    "application/xml": "xml",
    "text/xml": "xml",
    "application/json": "json",
    "text/csv": "csv",
    "text/tab-separated-values": "tsv",
    "image/svg+xml": "svg",
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/webp": "webp"
  };

  return mimeMap[file.type] || "";
}

function normalizeFormat(format: string): string {
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

function isToolsFileFormat(format: string): format is ToolsFileFormat {
  return Object.prototype.hasOwnProperty.call(fileFormatCatalog, format);
}

function formatBytes(size: number): string {
  if (!Number.isFinite(size) || size <= 0) {
    return "0 bytes";
  }

  const units = ["bytes", "KB", "MB", "GB"];
  const exponent = Math.min(Math.floor(Math.log(size) / Math.log(1024)), units.length - 1);
  const value = size / Math.pow(1024, exponent);

  return `${value.toFixed(value >= 10 || exponent === 0 ? 0 : 1)} ${units[exponent]}`;
}

function buildDownloadFilename(originalName: string, targetFormat: ToolsFileFormat): string {
  const dotIndex = originalName.lastIndexOf(".");
  const baseName = dotIndex > 0 ? originalName.slice(0, dotIndex) : originalName;
  const safeBaseName = baseName || "converted-file";
  return `${safeBaseName}.${targetFormat}`;
}

async function convertCompatibleFile(
  file: File,
  sourceFormat: ToolsFileFormat,
  targetFormat: ToolsFileFormat
): Promise<ToolsConvertedFile> {
  const normalizedSource = normalizeFormat(sourceFormat);
  const normalizedTarget = normalizeFormat(targetFormat);

  if (!isToolsFileFormat(normalizedSource) || !isToolsFileFormat(normalizedTarget)) {
    throw new Error("Unsupported source or target format.");
  }

  const compatibleFormats = getCompatibleFormats(normalizedSource);
  if (!compatibleFormats.includes(normalizedTarget)) {
    throw new Error("Those formats are not compatible in this browser-side converter.");
  }

  const sourceDefinition = fileFormatCatalog[normalizedSource];

  if (sourceDefinition.family === "data") {
    return convertStructuredDataFile(file, normalizedSource, normalizedTarget);
  }

  if (sourceDefinition.family === "text") {
    return convertTextFile(file, normalizedTarget);
  }

  if (sourceDefinition.family === "vector-image" && normalizedTarget === "svg") {
    return convertTextFile(file, normalizedTarget);
  }

  return convertImageFile(file, normalizedTarget);
}

async function convertTextFile(file: File, targetFormat: ToolsFileFormat): Promise<ToolsConvertedFile> {
  const content = await file.text();
  const blob = new Blob([content], {
    type: `${fileFormatCatalog[targetFormat].mime};charset=utf-8`
  });

  return {
    blob,
    summary: `Saved ${content.length.toLocaleString()} characters as ${fileFormatCatalog[targetFormat].label}.`
  };
}

async function convertStructuredDataFile(
  file: File,
  sourceFormat: ToolsFileFormat,
  targetFormat: ToolsFileFormat
): Promise<ToolsConvertedFile> {
  const rawContent = await file.text();

  if (!rawContent.trim()) {
    return {
      blob: new Blob([""], {
        type: `${fileFormatCatalog[targetFormat].mime};charset=utf-8`
      }),
      summary: `Created an empty ${fileFormatCatalog[targetFormat].shortLabel} file because the source file was empty.`
    };
  }

  if (sourceFormat === "json" && targetFormat === "json") {
    const parsedJson = parseJsonContent(rawContent);
    return {
      blob: new Blob([JSON.stringify(parsedJson, null, 2)], {
        type: `${fileFormatCatalog[targetFormat].mime};charset=utf-8`
      }),
      summary: "Normalized JSON formatting with two-space indentation."
    };
  }

  const table =
    sourceFormat === "json"
      ? jsonToTable(parseJsonContent(rawContent))
      : parseDelimitedText(rawContent, sourceFormat === "csv" ? "," : "\t");

  if (targetFormat === "json") {
    const records = tableToJsonRecords(table);
    return {
      blob: new Blob([JSON.stringify(records, null, 2)], {
        type: `${fileFormatCatalog[targetFormat].mime};charset=utf-8`
      }),
      summary: `Converted ${records.length.toLocaleString()} rows into JSON records.`
    };
  }

  const delimiter = targetFormat === "csv" ? "," : "\t";
  const serializedTable = serializeDelimitedTable(table, delimiter);

  return {
    blob: new Blob([serializedTable], {
      type: `${fileFormatCatalog[targetFormat].mime};charset=utf-8`
    }),
    summary: `Converted ${table.rows.length.toLocaleString()} rows and ${table.headers.length.toLocaleString()} columns to ${fileFormatCatalog[targetFormat].shortLabel}.`
  };
}

function parseJsonContent(content: string): unknown {
  try {
    return JSON.parse(content);
  } catch {
    throw new Error("The uploaded JSON file is not valid JSON.");
  }
}

function jsonToTable(jsonValue: unknown): ToolsTable {
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

function uniqueValuesInOrder(items: string[]): string[] {
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

function stringifyDataValue(value: unknown): string {
  if (value === null || value === undefined) {
    return "";
  }

  if (typeof value === "object") {
    return JSON.stringify(value);
  }

  return String(value);
}

function parseDelimitedText(content: string, delimiter: string): ToolsTable {
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

function makeUniqueHeaders(rawHeaders: string[]): string[] {
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

function tableToJsonRecords(table: ToolsTable): Array<Record<string, string>> {
  return table.rows.map((row) => {
    const record: Record<string, string> = {};
    table.headers.forEach((header, index) => {
      record[header] = row[index] ?? "";
    });
    return record;
  });
}

function serializeDelimitedTable(table: ToolsTable, delimiter: string): string {
  if (!table.headers.length && !table.rows.length) {
    return "";
  }

  const rows = [table.headers, ...table.rows];
  return rows
    .map((row) => row.map((value) => escapeDelimitedValue(value, delimiter)).join(delimiter))
    .join("\n");
}

function escapeDelimitedValue(value: unknown, delimiter: string): string {
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

function convertImageFile(file: File, targetFormat: ToolsFileFormat): Promise<ToolsConvertedFile> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const objectUrl = URL.createObjectURL(file);

    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth || image.width;
      canvas.height = image.naturalHeight || image.height;

      const context = canvas.getContext("2d");
      if (!context) {
        URL.revokeObjectURL(objectUrl);
        reject(new Error("Canvas rendering is not available in this browser."));
        return;
      }

      if (targetFormat === "jpg") {
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.width, canvas.height);
      }

      context.drawImage(image, 0, 0);

      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(objectUrl);
          if (!blob) {
            reject(new Error("The browser could not encode that image format."));
            return;
          }

          resolve({
            blob,
            summary: `Converted image at ${canvas.width} x ${canvas.height} pixels to ${fileFormatCatalog[targetFormat].shortLabel}.`
          });
        },
        fileFormatCatalog[targetFormat].mime,
        targetFormat === "jpg" || targetFormat === "webp" ? 0.92 : undefined
      );
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("The uploaded file could not be decoded as an image."));
    };

    image.src = objectUrl;
  });
}

function downloadBlob(blob: Blob, fileName: string): void {
  const objectUrl = URL.createObjectURL(blob);
  const downloadLink = document.createElement("a");

  downloadLink.href = objectUrl;
  downloadLink.download = fileName;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  downloadLink.remove();

  window.setTimeout(() => {
    URL.revokeObjectURL(objectUrl);
  }, 1000);
}

function isToolsUsernameTheme(value: string): value is ToolsUsernameTheme {
  return Object.prototype.hasOwnProperty.call(usernameThemePools, value);
}

function isToolsUsernameStyle(value: string): value is ToolsUsernameStyle {
  return value === "compact" || value === "underscore" || value === "dot";
}

function pickRandomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function randomInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatUsernameParts(parts: string[], style: ToolsUsernameStyle): string {
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

function buildUsernameHint(
  theme: ToolsUsernameTheme,
  style: ToolsUsernameStyle,
  options: {
    includeColors: boolean;
    includeAdjectives: boolean;
    includeNumbers: boolean;
  }
): string {
  const mixins: string[] = [];

  if (options.includeAdjectives) {
    mixins.push("adjectives");
  }
  if (options.includeColors) {
    mixins.push("colors");
  }
  if (options.includeNumbers) {
    mixins.push("numbers");
  }

  const styleLabel = style === "compact" ? "compact" : style === "underscore" ? "underscore" : "dot separated";
  const mixinsLabel = mixins.length ? mixins.join(", ") : "theme only";

  return `Theme: ${usernameThemeLabels[theme]}. Format: ${styleLabel}. Mix: ${mixinsLabel}.`;
}

function flashButtonLabel(button: HTMLButtonElement, label: string): void {
  const defaultLabel = button.dataset.defaultLabel || button.textContent || "";
  button.dataset.defaultLabel = defaultLabel;
  button.textContent = label;

  window.setTimeout(() => {
    button.textContent = button.dataset.defaultLabel || defaultLabel;
  }, 1200);
}

async function copyTextWithFeedback(text: string, button: HTMLButtonElement): Promise<void> {
  if (!text || text === "Your password") {
    flashButtonLabel(button, "Nothing yet");
    return;
  }

  try {
    const copied = await copyText(text);
    flashButtonLabel(button, copied ? "Copied" : "Press Ctrl+C");
  } catch (error) {
    console.error("Clipboard write failed:", error);
    flashButtonLabel(button, "Press Ctrl+C");
  }
}

async function copyText(text: string): Promise<boolean> {
  if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      console.error("Clipboard API copy failed:", error);
    }
  }

  return fallbackCopyText(text);
}

function fallbackCopyText(text: string): boolean {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.setAttribute("readonly", "true");
  textArea.style.position = "fixed";
  textArea.style.top = "0";
  textArea.style.left = "-9999px";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  textArea.setSelectionRange(0, text.length);

  try {
    return document.execCommand("copy");
  } catch (error) {
    console.error("execCommand copy failed:", error);
    return false;
  } finally {
    document.body.removeChild(textArea);
  }
}

function generatePassword(): void {
  const lengthInput = document.getElementById("length") as HTMLInputElement | null;
  const specialCharsInput = document.getElementById("specialChars") as HTMLInputElement | null;
  const numbersInput = document.getElementById("numbers") as HTMLInputElement | null;
  const capitalLettersInput = document.getElementById("capitalLetters") as HTMLInputElement | null;
  const passwordElement = document.getElementById("password");
  const passwordStrengthInput = document.getElementById("passwordStrengthInput") as HTMLInputElement | null;

  if (!lengthInput || !specialCharsInput || !numbersInput || !capitalLettersInput || !passwordElement || !passwordStrengthInput) {
    return;
  }

  const length = Math.max(8, Math.min(40, parseInt(lengthInput.value, 10) || 8));
  lengthInput.value = String(length);

  let chars = "abcdefghijklmnopqrstuvwxyz";
  if (specialCharsInput.checked) {
    chars += "!@#$%^&*()_+{}[]|:;<>,.?/";
  }
  if (numbersInput.checked) {
    chars += "0123456789";
  }
  if (capitalLettersInput.checked) {
    chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }

  let password = "";
  for (let index = 0; index < length; index += 1) {
    password += chars.charAt(getSecureRandomIndex(chars.length));
  }

  passwordElement.textContent = password;
  passwordStrengthInput.value = password;
  updatePasswordStrength(password);
}

function getSecureRandomIndex(maxExclusive: number): number {
  if (window.crypto && typeof window.crypto.getRandomValues === "function") {
    const randomValues = new Uint32Array(1);
    const maxGeneratedValue = 0x100000000;
    const rejectionLimit = maxGeneratedValue - (maxGeneratedValue % maxExclusive);

    do {
      window.crypto.getRandomValues(randomValues);
    } while (randomValues[0] >= rejectionLimit);

    return randomValues[0] % maxExclusive;
  }

  return Math.floor(Math.random() * maxExclusive);
}

function updatePasswordStrength(password: string): void {
  const strengthContainer = document.querySelector<HTMLElement>(".password-strength");
  const labelElement = document.getElementById("passwordStrengthLabel");
  const entropyElement = document.getElementById("passwordEntropyEstimate");
  const summaryElement = document.getElementById("passwordStrengthSummary");
  const searchSpaceElement = document.getElementById("passwordSearchSpace");
  const crackEstimateElement = document.getElementById("passwordCrackEstimate");
  const findingsElement = document.getElementById("passwordPatternFindings") as HTMLUListElement | null;
  const strengthBar = document.getElementById("passwordStrengthBar") as HTMLSpanElement | null;

  if (
    !strengthContainer ||
    !labelElement ||
    !entropyElement ||
    !summaryElement ||
    !searchSpaceElement ||
    !crackEstimateElement ||
    !findingsElement ||
    !strengthBar
  ) {
    return;
  }

  const analysis = analyzePasswordStrength(password);

  strengthContainer.dataset.score = analysis.score;
  labelElement.textContent = analysis.scoreLabel;
  entropyElement.textContent = `${analysis.adjustedEntropyBits.toFixed(0)} bits`;
  summaryElement.textContent = analysis.summary;
  searchSpaceElement.textContent = `Search space: ${formatPasswordSearchSpace(analysis.adjustedEntropyBits)}`;
  crackEstimateElement.textContent = `10B guesses/s: ${formatCrackTime(analysis.adjustedEntropyBits, 10_000_000_000)}`;
  strengthBar.style.width = `${analysis.scorePercent}%`;

  findingsElement.innerHTML = "";
  analysis.findings.forEach((finding) => {
    const listItem = document.createElement("li");
    listItem.textContent = finding;
    findingsElement.appendChild(listItem);
  });
}

function analyzePasswordStrength(password: string): ToolsPasswordAnalysis {
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

function estimatePasswordPoolSize(password: string): number {
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

function normalizePasswordLeetspeak(value: string): string {
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

function findSequentialPasswordRun(value: string): string {
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

function getPasswordScore(entropyBits: number): ToolsPasswordScore {
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

function getPasswordScoreLabel(score: ToolsPasswordScore): string {
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

function formatPasswordSearchSpace(entropyBits: number): string {
  if (entropyBits <= 0) {
    return "none";
  }

  if (entropyBits < 60) {
    return `${formatLargeNumber(Math.pow(2, entropyBits))} guesses`;
  }

  return `about 2^${entropyBits.toFixed(0)} guesses`;
}

function formatLargeNumber(value: number): string {
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

function formatCrackTime(entropyBits: number, guessesPerSecond: number): string {
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

function copyPassword(): void {
  const passwordElement = document.getElementById("password");
  const copyButton = document.getElementById("copyPasswordBtn") as HTMLButtonElement | null;
  if (!passwordElement || !copyButton) {
    return;
  }

  const passwordText = passwordElement.textContent || "";
  void copyTextWithFeedback(passwordText, copyButton);
}

window.generateUsername = generateUsername;
window.copyUsername = copyUsername;
window.generatePassword = generatePassword;
window.copyPassword = copyPassword;
