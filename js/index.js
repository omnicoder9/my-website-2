const resourceDropdown = document.getElementById("resourceDropdown");
const resourceStatus = document.getElementById("resourceLoadStatus");
const resourceRadios = document.querySelectorAll('input[name="resourceType"]');
const resourceFiles = {
    industry: "data/industry2.json",
    occupation: "data/occupations.json",
    academic: "data/academic.json"
};
function formatMissionClockValue(date, timeZone) {
    return new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        hour12: false,
        minute: "2-digit",
        second: "2-digit",
        timeZone,
        timeZoneName: "short"
    }).format(date);
}
function formatMissionDateLine(date) {
    return new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric"
    }).format(date);
}
function initializeMissionControl() {
    const utcClock = document.getElementById("missionUtcTime");
    const localClock = document.getElementById("missionLocalTime");
    const dateLine = document.getElementById("missionDateLine");
    if (!utcClock || !localClock || !dateLine) {
        return;
    }
    const updateMissionControl = () => {
        const now = new Date();
        utcClock.textContent = formatMissionClockValue(now, "UTC");
        localClock.textContent = formatMissionClockValue(now);
        dateLine.textContent = `Mission date ${formatMissionDateLine(now)}`;
    };
    updateMissionControl();
    window.setInterval(updateMissionControl, 1000);
}
initializeMissionControl();
document.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const anchor = target === null || target === void 0 ? void 0 : target.closest('a[href^="#"]');
    if (!anchor) {
        return;
    }
    const href = anchor.getAttribute("href");
    if (!href) {
        return;
    }
    const sectionTarget = document.querySelector(href);
    if (!sectionTarget) {
        return;
    }
    event.preventDefault();
    sectionTarget.scrollIntoView({
        behavior: "smooth"
    });
});
function getPrimaryHeader() {
    return document.querySelector("#site-header header") || document.querySelector("header");
}
window.addEventListener("scroll", () => {
    const header = getPrimaryHeader();
    if (!header) {
        return;
    }
    if (window.scrollY > 50) {
        header.classList.add("sticky");
    }
    else {
        header.classList.remove("sticky");
    }
});
let currentSlide = 0;
const slides = document.querySelectorAll(".carousel img");
if (slides.length !== 0) {
    console.log("valid carousel");
    window.setInterval(() => {
        slides[currentSlide].classList.remove("active");
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add("active");
    }, 3000);
}
else {
    console.log("no slides");
}
function uniqueKeepOrder(items) {
    const seen = new Set();
    return items.filter((item) => {
        if (!item || seen.has(item)) {
            return false;
        }
        seen.add(item);
        return true;
    });
}
function mergeEntriesKeepOrder(entries) {
    const indexByLabel = new Map();
    const merged = [];
    entries.forEach((entry) => {
        if (!entry || !entry.label) {
            return;
        }
        if (!indexByLabel.has(entry.label)) {
            indexByLabel.set(entry.label, merged.length);
            merged.push({ label: entry.label, level: Math.max(0, entry.level || 0) });
            return;
        }
        const idx = indexByLabel.get(entry.label);
        if (idx === undefined) {
            return;
        }
        merged[idx].level = Math.min(merged[idx].level, Math.max(0, entry.level || 0));
    });
    return merged;
}
function extractIndustryItems(data) {
    var _a, _b;
    const entries = [];
    const sectors = (_b = (_a = data.taxonomy) === null || _a === void 0 ? void 0 : _a.sectors) !== null && _b !== void 0 ? _b : [];
    sectors.forEach((sectorObj) => {
        var _a;
        if (sectorObj.sector) {
            entries.push({ label: sectorObj.sector, level: 0 });
        }
        ((_a = sectorObj.industry_groups) !== null && _a !== void 0 ? _a : []).forEach((groupObj) => {
            var _a;
            if (groupObj.industry_group) {
                entries.push({ label: groupObj.industry_group, level: 1 });
            }
            ((_a = groupObj.industries) !== null && _a !== void 0 ? _a : []).forEach((industryObj) => {
                var _a;
                if (industryObj.industry) {
                    entries.push({ label: industryObj.industry, level: 2 });
                }
                ((_a = industryObj.subindustries) !== null && _a !== void 0 ? _a : []).forEach((subindustry) => {
                    entries.push({ label: subindustry, level: 3 });
                });
            });
        });
    });
    return mergeEntriesKeepOrder(entries);
}
function extractOccupationItems(data) {
    var _a;
    const entries = [];
    const groups = (_a = data.occupation_taxonomy) !== null && _a !== void 0 ? _a : [];
    groups.forEach((majorGroup) => {
        var _a;
        if (majorGroup.major_group) {
            entries.push({ label: majorGroup.major_group, level: 0 });
        }
        ((_a = majorGroup.minor_groups) !== null && _a !== void 0 ? _a : []).forEach((minorGroup) => {
            var _a;
            if (minorGroup.minor_group) {
                entries.push({ label: minorGroup.minor_group, level: 1 });
            }
            ((_a = minorGroup.broad_occupations) !== null && _a !== void 0 ? _a : []).forEach((broadOccupation) => {
                var _a;
                if (broadOccupation.broad_occupation) {
                    entries.push({ label: broadOccupation.broad_occupation, level: 2 });
                }
                ((_a = broadOccupation.occupations) !== null && _a !== void 0 ? _a : []).forEach((occupation) => {
                    if (occupation.title) {
                        entries.push({ label: occupation.title, level: 3 });
                    }
                });
            });
        });
    });
    return mergeEntriesKeepOrder(entries);
}
function extractAcademicItems(data) {
    var _a;
    const nodes = (_a = data.nodes) !== null && _a !== void 0 ? _a : [];
    const byId = new Map();
    const memoDepth = new Map();
    const visiting = new Set();
    nodes.forEach((node) => {
        byId.set(node.id, node);
    });
    function getDepth(nodeId) {
        var _a;
        if (memoDepth.has(nodeId)) {
            return (_a = memoDepth.get(nodeId)) !== null && _a !== void 0 ? _a : 0;
        }
        if (visiting.has(nodeId)) {
            return 0;
        }
        const node = byId.get(nodeId);
        if (!node) {
            return 0;
        }
        const parents = Array.isArray(node.parents) ? node.parents : [];
        if (parents.length === 0) {
            memoDepth.set(nodeId, 0);
            return 0;
        }
        visiting.add(nodeId);
        let minParentDepth = Number.POSITIVE_INFINITY;
        parents.forEach((parentId) => {
            minParentDepth = Math.min(minParentDepth, getDepth(parentId));
        });
        visiting.delete(nodeId);
        const depth = minParentDepth === Number.POSITIVE_INFINITY ? 0 : minParentDepth + 1;
        memoDepth.set(nodeId, depth);
        return depth;
    }
    const entries = nodes.map((node) => {
        var _a;
        return ({
            label: (_a = node.name) !== null && _a !== void 0 ? _a : node.id,
            level: Math.min(getDepth(node.id), 4)
        });
    });
    return mergeEntriesKeepOrder(entries);
}
function getItemsForType(type, data) {
    var _a, _b, _c;
    if (type === "industry") {
        return extractIndustryItems((_a = data) !== null && _a !== void 0 ? _a : {});
    }
    if (type === "occupation") {
        return extractOccupationItems((_b = data) !== null && _b !== void 0 ? _b : {});
    }
    return extractAcademicItems((_c = data) !== null && _c !== void 0 ? _c : {});
}
function renderDropdownOptions(items) {
    if (!resourceDropdown) {
        return;
    }
    resourceDropdown.innerHTML = "";
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Choose an option...";
    resourceDropdown.appendChild(placeholder);
    items.forEach((item) => {
        const option = document.createElement("option");
        const label = typeof item === "string" ? item : item.label;
        const level = typeof item === "string" ? 0 : item.level || 0;
        option.value = label;
        option.textContent = `${"\u00A0\u00A0".repeat(level)}${label}`;
        resourceDropdown.appendChild(option);
    });
}
async function loadResourceDropdown(type) {
    if (!resourceDropdown || !resourceStatus) {
        return;
    }
    resourceStatus.textContent = "Loading...";
    try {
        const resourcePath = resourceFiles[type];
        const response = await fetch(resourcePath, { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`Failed to load ${resourcePath}`);
        }
        const data = await response.json();
        const items = getItemsForType(type, data);
        renderDropdownOptions(items);
        resourceStatus.textContent = `Loaded ${items.length} items for ${type}.`;
    }
    catch (error) {
        resourceDropdown.innerHTML = '<option value="">Unable to load data</option>';
        resourceStatus.textContent = "Error loading resource data. Use a local server (not file://).";
        console.error(error);
    }
}
if (resourceDropdown && resourceStatus && resourceRadios.length > 0) {
    resourceRadios.forEach((radio) => {
        radio.addEventListener("change", (event) => {
            const target = event.target;
            const value = target === null || target === void 0 ? void 0 : target.value;
            if (value === "industry" || value === "occupation" || value === "academic") {
                void loadResourceDropdown(value);
            }
        });
    });
    const selectedRadio = document.querySelector('input[name="resourceType"]:checked');
    const selectedType = (selectedRadio === null || selectedRadio === void 0 ? void 0 : selectedRadio.value) === "occupation" || (selectedRadio === null || selectedRadio === void 0 ? void 0 : selectedRadio.value) === "academic"
        ? selectedRadio.value
        : "industry";
    void loadResourceDropdown(selectedType);
}
console.log("the js is working");
