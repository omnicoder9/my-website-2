console.log("Tools");
const massVolumeUnitConversions = {
    grams: 1,
    pounds: 453.592,
    milliliters: 1,
    cups: 240
};
const fileFormatCatalog = {
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
const fileCompatibilityMatrix = {
    text: ["txt", "md", "html", "css", "js", "xml"],
    data: ["json", "csv", "tsv"],
    "vector-image": ["svg", "png", "jpg", "webp"],
    image: ["png", "jpg", "webp"]
};
const fileFamilyLabels = {
    text: "Text files",
    data: "Structured data",
    "vector-image": "SVG artwork",
    image: "Raster images"
};
const fileFamilyDescriptions = {
    text: "Text formats are copied as UTF-8 content and saved with the selected extension.",
    data: "JSON, CSV, and TSV are converted through a shared table structure.",
    "vector-image": "SVG files can remain SVG or be rendered into raster image formats.",
    image: "Raster images keep their pixel dimensions and are re-encoded in the browser."
};
const usernameThemePools = {
    animals: ["otter", "lynx", "falcon", "wombat", "badger", "orca", "gecko", "panther", "heron", "tiger"],
    colors: ["amber", "indigo", "scarlet", "teal", "ivory", "cobalt", "sage", "coral", "umber", "silver"],
    space: ["nova", "quasar", "comet", "orbit", "zenith", "nebula", "eclipse", "cosmos", "pulsar", "asteroid"],
    nature: ["cedar", "river", "summit", "canyon", "fern", "stone", "meadow", "harbor", "thunder", "grove"],
    mythic: ["phoenix", "griffin", "hydra", "atlas", "oracle", "pegasus", "sphinx", "titan", "drakon", "selene"]
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
function initializeToolsPage() {
    initializeMassVolumeConverter();
    initializeRandomNumberGenerator();
    initializeUsernameGenerator();
    initializePasswordGenerator();
    initializeFileConverter();
}
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeToolsPage);
}
else {
    initializeToolsPage();
}
function initializeMassVolumeConverter() {
    const converterForm = document.getElementById("converterForm");
    const resultElement = document.getElementById("massVolumeResult");
    const inputTypeElement = document.getElementById("inputType");
    const inputValueElement = document.getElementById("inputValue");
    const outputTypeElement = document.getElementById("outputType");
    const substanceElement = document.getElementById("substance");
    if (!converterForm || !resultElement || !inputTypeElement || !inputValueElement || !outputTypeElement || !substanceElement) {
        return;
    }
    converterForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const inputType = inputTypeElement.value;
        const inputValue = parseFloat(inputValueElement.value);
        const outputType = outputTypeElement.value;
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
        const convertedBaseValue = inputIsMass === outputIsMass
            ? inputInBaseUnits
            : inputIsMass
                ? inputInBaseUnits / substanceDensity
                : inputInBaseUnits * substanceDensity;
        const resultValue = convertedBaseValue / massVolumeUnitConversions[outputType];
        resultElement.textContent = `Converted value: ${resultValue.toFixed(2)} ${outputType}.`;
    });
}
function isMassUnit(unit) {
    return unit === "grams" || unit === "pounds";
}
function initializeRandomNumberGenerator() {
    const generateButton = document.getElementById("generateBtn");
    const minInput = document.getElementById("min");
    const maxInput = document.getElementById("max");
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
function initializeUsernameGenerator() {
    const generateButton = document.getElementById("generateUsernameBtn");
    const copyButton = document.getElementById("copyUsernameBtn");
    const themeSelect = document.getElementById("usernameTheme");
    const styleSelect = document.getElementById("usernameStyle");
    const addColorsInput = document.getElementById("usernameAddColors");
    const addAdjectivesInput = document.getElementById("usernameAddAdjectives");
    const addNumbersInput = document.getElementById("usernameAddNumbers");
    if (!generateButton ||
        !copyButton ||
        !themeSelect ||
        !styleSelect ||
        !addColorsInput ||
        !addAdjectivesInput ||
        !addNumbersInput) {
        return;
    }
    generateButton.addEventListener("click", generateUsername);
    copyButton.addEventListener("click", copyUsername);
    [themeSelect, styleSelect, addColorsInput, addAdjectivesInput, addNumbersInput].forEach((control) => {
        control.addEventListener("change", generateUsername);
    });
    generateUsername();
}
function generateUsername() {
    const themeSelect = document.getElementById("usernameTheme");
    const styleSelect = document.getElementById("usernameStyle");
    const addColorsInput = document.getElementById("usernameAddColors");
    const addAdjectivesInput = document.getElementById("usernameAddAdjectives");
    const addNumbersInput = document.getElementById("usernameAddNumbers");
    const resultElement = document.getElementById("usernameResult");
    const hintElement = document.getElementById("usernameHint");
    if (!themeSelect ||
        !styleSelect ||
        !addColorsInput ||
        !addAdjectivesInput ||
        !addNumbersInput ||
        !resultElement ||
        !hintElement) {
        return;
    }
    const theme = isToolsUsernameTheme(themeSelect.value) ? themeSelect.value : "animals";
    const style = isToolsUsernameStyle(styleSelect.value) ? styleSelect.value : "compact";
    const includeColors = addColorsInput.checked;
    const includeAdjectives = addAdjectivesInput.checked;
    const includeNumbers = addNumbersInput.checked;
    const parts = [];
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
function copyUsername() {
    var _a;
    const resultElement = document.getElementById("usernameResult");
    const copyButton = document.getElementById("copyUsernameBtn");
    if (!resultElement || !copyButton) {
        return;
    }
    void copyTextWithFeedback(((_a = resultElement.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || "", copyButton);
}
function initializePasswordGenerator() {
    const generateButton = document.getElementById("generatePasswordBtn");
    const copyButton = document.getElementById("copyPasswordBtn");
    if (!generateButton || !copyButton) {
        return;
    }
    generateButton.addEventListener("click", generatePassword);
    copyButton.addEventListener("click", copyPassword);
    generatePassword();
}
function initializeFileConverter() {
    var _a;
    const fileInput = document.getElementById("fileInput");
    const sourceFormatSelect = document.getElementById("sourceFormat");
    const targetFormatSelect = document.getElementById("targetFormat");
    const convertButton = document.getElementById("convertFileBtn");
    const statusElement = document.getElementById("fileConversionStatus");
    const metadataElement = document.getElementById("fileMeta");
    const compatibilityList = document.getElementById("compatibleFormatsList");
    const detailsElement = document.getElementById("fileConversionDetails");
    if (!fileInput ||
        !sourceFormatSelect ||
        !targetFormatSelect ||
        !convertButton ||
        !statusElement ||
        !metadataElement ||
        !compatibilityList ||
        !detailsElement) {
        return;
    }
    convertButton.dataset.defaultLabel = ((_a = convertButton.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || "Convert and Download";
    populateSourceFormatOptions(sourceFormatSelect);
    updateTargetFormatOptions("", targetFormatSelect);
    renderCompatibilitySummary("", compatibilityList, detailsElement);
    fileInput.addEventListener("change", () => {
        var _a;
        const selectedFile = ((_a = fileInput.files) === null || _a === void 0 ? void 0 : _a[0]) || null;
        const inferredFormat = selectedFile ? inferFileFormat(selectedFile) : "";
        sourceFormatSelect.value = inferredFormat || "";
        updateTargetFormatOptions(sourceFormatSelect.value, targetFormatSelect, targetFormatSelect.value);
        updateFileMetadata(selectedFile, sourceFormatSelect.value, metadataElement);
        renderCompatibilitySummary(sourceFormatSelect.value, compatibilityList, detailsElement);
        if (!selectedFile) {
            setConverterStatus(statusElement, "Choose a file to begin.", "idle");
        }
        else if (sourceFormatSelect.value && isToolsFileFormat(sourceFormatSelect.value)) {
            setConverterStatus(statusElement, `Detected ${fileFormatCatalog[sourceFormatSelect.value].label}. Choose an output format and convert.`, "idle");
        }
        else {
            setConverterStatus(statusElement, "Choose the source format so compatible output formats can be enabled.", "idle");
        }
        updateFileConverterState(fileInput, sourceFormatSelect, targetFormatSelect, convertButton);
    });
    sourceFormatSelect.addEventListener("change", () => {
        var _a;
        const selectedFile = ((_a = fileInput.files) === null || _a === void 0 ? void 0 : _a[0]) || null;
        updateTargetFormatOptions(sourceFormatSelect.value, targetFormatSelect, targetFormatSelect.value);
        updateFileMetadata(selectedFile, sourceFormatSelect.value, metadataElement);
        renderCompatibilitySummary(sourceFormatSelect.value, compatibilityList, detailsElement);
        if (!selectedFile) {
            setConverterStatus(statusElement, "Choose a file to begin.", "idle");
        }
        else if (sourceFormatSelect.value && isToolsFileFormat(sourceFormatSelect.value)) {
            setConverterStatus(statusElement, `Ready to convert ${selectedFile.name} from ${fileFormatCatalog[sourceFormatSelect.value].shortLabel}.`, "idle");
        }
        else {
            setConverterStatus(statusElement, "Choose the source format so compatible output formats can be enabled.", "idle");
        }
        updateFileConverterState(fileInput, sourceFormatSelect, targetFormatSelect, convertButton);
    });
    targetFormatSelect.addEventListener("change", () => {
        var _a;
        const selectedFile = ((_a = fileInput.files) === null || _a === void 0 ? void 0 : _a[0]) || null;
        const targetFormat = targetFormatSelect.value;
        if (selectedFile && isToolsFileFormat(targetFormat)) {
            setConverterStatus(statusElement, `Ready to convert ${selectedFile.name} to ${fileFormatCatalog[targetFormat].shortLabel}.`, "idle");
        }
        updateFileConverterState(fileInput, sourceFormatSelect, targetFormatSelect, convertButton);
    });
    convertButton.addEventListener("click", async () => {
        var _a;
        const selectedFile = ((_a = fileInput.files) === null || _a === void 0 ? void 0 : _a[0]) || null;
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
        setConverterStatus(statusElement, `Converting ${selectedFile.name} to ${fileFormatCatalog[targetFormat].label}...`, "working");
        try {
            const convertedFile = await convertCompatibleFile(selectedFile, sourceFormat, targetFormat);
            downloadBlob(convertedFile.blob, downloadName);
            setConverterStatus(statusElement, `Downloaded ${downloadName}.`, "success");
            detailsElement.textContent = convertedFile.summary;
        }
        catch (error) {
            setConverterStatus(statusElement, error instanceof Error ? error.message : "Unable to convert the selected file.", "error");
        }
        finally {
            convertButton.textContent = convertButton.dataset.defaultLabel || "Convert and Download";
            updateFileConverterState(fileInput, sourceFormatSelect, targetFormatSelect, convertButton);
        }
    });
}
function populateSourceFormatOptions(selectElement) {
    const formatGroups = [
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
function updateTargetFormatOptions(sourceFormat, targetSelect, currentValue = "") {
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
    const preferredValue = compatibleFormats.includes(currentValue)
        ? currentValue
        : compatibleFormats.find((format) => format !== sourceFormat) || compatibleFormats[0];
    targetSelect.value = preferredValue;
    targetSelect.disabled = false;
}
function appendPlaceholderOption(selectElement, label) {
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = label;
    selectElement.appendChild(placeholder);
}
function getCompatibleFormats(sourceFormat) {
    const normalizedSource = normalizeFormat(sourceFormat);
    if (!isToolsFileFormat(normalizedSource)) {
        return [];
    }
    return fileCompatibilityMatrix[fileFormatCatalog[normalizedSource].family] || [];
}
function renderCompatibilitySummary(sourceFormat, listElement, detailsElement) {
    const normalizedSource = normalizeFormat(sourceFormat);
    const items = [];
    if (!isToolsFileFormat(normalizedSource)) {
        items.push("Supported families: text files, structured data, and common web images.");
        items.push("Text formats are re-saved as UTF-8 content with the chosen extension.");
        items.push("Structured data supports JSON, CSV, and TSV conversions.");
        items.push("Images support PNG, JPG, WEBP, and SVG to raster conversion.");
        detailsElement.textContent =
            "CSV and TSV use the first row as column headers. JPEG output flattens transparency onto a white background.";
    }
    else {
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
        }
        else if (sourceDefinition.family === "text") {
            detailsElement.textContent =
                "Text conversions preserve the file content as-is. They change the saved format shell rather than rewriting the document structure.";
        }
        else if (sourceDefinition.family === "vector-image") {
            detailsElement.textContent =
                "SVG can stay as SVG or be rasterized. Raster exports keep the current pixel dimensions after rendering.";
        }
        else {
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
function updateFileMetadata(file, sourceFormat, metadataElement) {
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
function updateFileConverterState(fileInput, sourceSelect, targetSelect, convertButton) {
    var _a;
    const hasFile = Boolean((_a = fileInput.files) === null || _a === void 0 ? void 0 : _a[0]);
    const hasSource = Boolean(sourceSelect.value);
    const hasTarget = Boolean(targetSelect.value);
    convertButton.disabled = !(hasFile && hasSource && hasTarget);
}
function setConverterStatus(statusElement, message, state) {
    statusElement.textContent = message;
    statusElement.dataset.state = state;
}
function inferFileFormat(file) {
    const fileName = file.name.toLowerCase();
    const extension = fileName.includes(".") ? fileName.split(".").pop() || "" : "";
    const normalizedExtension = normalizeFormat(extension);
    if (isToolsFileFormat(normalizedExtension)) {
        return normalizedExtension;
    }
    const mimeMap = {
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
function normalizeFormat(format) {
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
function isToolsFileFormat(format) {
    return Object.prototype.hasOwnProperty.call(fileFormatCatalog, format);
}
function formatBytes(size) {
    if (!Number.isFinite(size) || size <= 0) {
        return "0 bytes";
    }
    const units = ["bytes", "KB", "MB", "GB"];
    const exponent = Math.min(Math.floor(Math.log(size) / Math.log(1024)), units.length - 1);
    const value = size / Math.pow(1024, exponent);
    return `${value.toFixed(value >= 10 || exponent === 0 ? 0 : 1)} ${units[exponent]}`;
}
function buildDownloadFilename(originalName, targetFormat) {
    const dotIndex = originalName.lastIndexOf(".");
    const baseName = dotIndex > 0 ? originalName.slice(0, dotIndex) : originalName;
    const safeBaseName = baseName || "converted-file";
    return `${safeBaseName}.${targetFormat}`;
}
async function convertCompatibleFile(file, sourceFormat, targetFormat) {
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
async function convertTextFile(file, targetFormat) {
    const content = await file.text();
    const blob = new Blob([content], {
        type: `${fileFormatCatalog[targetFormat].mime};charset=utf-8`
    });
    return {
        blob,
        summary: `Saved ${content.length.toLocaleString()} characters as ${fileFormatCatalog[targetFormat].label}.`
    };
}
async function convertStructuredDataFile(file, sourceFormat, targetFormat) {
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
    const table = sourceFormat === "json"
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
function parseJsonContent(content) {
    try {
        return JSON.parse(content);
    }
    catch (_a) {
        throw new Error("The uploaded JSON file is not valid JSON.");
    }
}
function jsonToTable(jsonValue) {
    if (Array.isArray(jsonValue)) {
        if (jsonValue.length === 0) {
            return { headers: [], rows: [] };
        }
        const everyItemIsObject = jsonValue.every((item) => item && typeof item === "object" && !Array.isArray(item));
        if (everyItemIsObject) {
            const flattenedKeys = jsonValue.reduce((keys, item) => {
                Object.keys(item).forEach((key) => {
                    keys.push(key);
                });
                return keys;
            }, []);
            const headers = uniqueValuesInOrder(flattenedKeys);
            return {
                headers,
                rows: jsonValue.map((item) => headers.map((header) => stringifyDataValue(item[header])))
            };
        }
        const everyItemIsArray = jsonValue.every((item) => Array.isArray(item));
        if (everyItemIsArray) {
            const rows = jsonValue;
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
        const record = jsonValue;
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
function uniqueValuesInOrder(items) {
    const seen = new Set();
    const uniqueItems = [];
    items.forEach((item) => {
        if (seen.has(item)) {
            return;
        }
        seen.add(item);
        uniqueItems.push(item);
    });
    return uniqueItems;
}
function stringifyDataValue(value) {
    if (value === null || value === undefined) {
        return "";
    }
    if (typeof value === "object") {
        return JSON.stringify(value);
    }
    return String(value);
}
function parseDelimitedText(content, delimiter) {
    const rows = [];
    let currentRow = [];
    let currentValue = "";
    let insideQuotes = false;
    for (let index = 0; index < content.length; index += 1) {
        const character = content[index];
        if (character === "\"") {
            if (insideQuotes && content[index + 1] === "\"") {
                currentValue += "\"";
                index += 1;
            }
            else {
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
    const rawHeaders = Array.from({ length: maxColumns }, (_, index) => normalizedRows[0][index] || `column_${index + 1}`);
    const headers = makeUniqueHeaders(rawHeaders);
    const bodyRows = normalizedRows.slice(1).map((row) => Array.from({ length: maxColumns }, (_, index) => row[index] || ""));
    return { headers, rows: bodyRows };
}
function makeUniqueHeaders(rawHeaders) {
    const countsByHeader = new Map();
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
function tableToJsonRecords(table) {
    return table.rows.map((row) => {
        const record = {};
        table.headers.forEach((header, index) => {
            var _a;
            record[header] = (_a = row[index]) !== null && _a !== void 0 ? _a : "";
        });
        return record;
    });
}
function serializeDelimitedTable(table, delimiter) {
    if (!table.headers.length && !table.rows.length) {
        return "";
    }
    const rows = [table.headers, ...table.rows];
    return rows
        .map((row) => row.map((value) => escapeDelimitedValue(value, delimiter)).join(delimiter))
        .join("\n");
}
function escapeDelimitedValue(value, delimiter) {
    const normalizedValue = value === null || value === undefined ? "" : String(value);
    const needsQuotes = normalizedValue.includes(delimiter) ||
        normalizedValue.includes("\"") ||
        normalizedValue.includes("\n") ||
        normalizedValue.includes("\r") ||
        /^\s|\s$/.test(normalizedValue);
    if (!needsQuotes) {
        return normalizedValue;
    }
    return `"${normalizedValue.replace(/"/g, "\"\"")}"`;
}
function convertImageFile(file, targetFormat) {
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
            canvas.toBlob((blob) => {
                URL.revokeObjectURL(objectUrl);
                if (!blob) {
                    reject(new Error("The browser could not encode that image format."));
                    return;
                }
                resolve({
                    blob,
                    summary: `Converted image at ${canvas.width} x ${canvas.height} pixels to ${fileFormatCatalog[targetFormat].shortLabel}.`
                });
            }, fileFormatCatalog[targetFormat].mime, targetFormat === "jpg" || targetFormat === "webp" ? 0.92 : undefined);
        };
        image.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            reject(new Error("The uploaded file could not be decoded as an image."));
        };
        image.src = objectUrl;
    });
}
function downloadBlob(blob, fileName) {
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
function isToolsUsernameTheme(value) {
    return Object.prototype.hasOwnProperty.call(usernameThemePools, value);
}
function isToolsUsernameStyle(value) {
    return value === "compact" || value === "underscore" || value === "dot";
}
function pickRandomItem(items) {
    return items[Math.floor(Math.random() * items.length)];
}
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function formatUsernameParts(parts, style) {
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
function buildUsernameHint(theme, style, options) {
    const mixins = [];
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
    return `Theme: ${theme}. Format: ${styleLabel}. Mix: ${mixinsLabel}.`;
}
function flashButtonLabel(button, label) {
    const defaultLabel = button.dataset.defaultLabel || button.textContent || "";
    button.dataset.defaultLabel = defaultLabel;
    button.textContent = label;
    window.setTimeout(() => {
        button.textContent = button.dataset.defaultLabel || defaultLabel;
    }, 1200);
}
async function copyTextWithFeedback(text, button) {
    if (!text || text === "Your password") {
        flashButtonLabel(button, "Nothing yet");
        return;
    }
    try {
        const copied = await copyText(text);
        flashButtonLabel(button, copied ? "Copied" : "Press Ctrl+C");
    }
    catch (error) {
        console.error("Clipboard write failed:", error);
        flashButtonLabel(button, "Press Ctrl+C");
    }
}
async function copyText(text) {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        }
        catch (error) {
            console.error("Clipboard API copy failed:", error);
        }
    }
    return fallbackCopyText(text);
}
function fallbackCopyText(text) {
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
    }
    catch (error) {
        console.error("execCommand copy failed:", error);
        return false;
    }
    finally {
        document.body.removeChild(textArea);
    }
}
function generatePassword() {
    const lengthInput = document.getElementById("length");
    const specialCharsInput = document.getElementById("specialChars");
    const numbersInput = document.getElementById("numbers");
    const capitalLettersInput = document.getElementById("capitalLetters");
    const passwordElement = document.getElementById("password");
    if (!lengthInput || !specialCharsInput || !numbersInput || !capitalLettersInput || !passwordElement) {
        return;
    }
    let length = Math.max(8, Math.min(40, parseInt(lengthInput.value, 10) || 8));
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
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    passwordElement.textContent = password;
}
function copyPassword() {
    const passwordElement = document.getElementById("password");
    const copyButton = document.getElementById("copyPasswordBtn");
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
