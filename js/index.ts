type IndexDropdownEntry = {
  label: string;
  level: number;
};

type IndexIndustrySector = {
  sector?: string;
  industry_groups?: IndexIndustryGroup[];
};

type IndexIndustryGroup = {
  industry_group?: string;
  industries?: IndexIndustry[];
};

type IndexIndustry = {
  industry?: string;
  subindustries?: string[];
};

type IndexIndustryData = {
  taxonomy?: {
    sectors?: IndexIndustrySector[];
  };
};

type IndexOccupationGroup = {
  major_group?: string;
  minor_groups?: IndexOccupationMinorGroup[];
};

type IndexOccupationMinorGroup = {
  minor_group?: string;
  broad_occupations?: IndexBroadOccupation[];
};

type IndexBroadOccupation = {
  broad_occupation?: string;
  occupations?: IndexOccupation[];
};

type IndexOccupation = {
  title?: string;
};

type IndexOccupationData = {
  occupation_taxonomy?: IndexOccupationGroup[];
};

type IndexAcademicNode = {
  id: string;
  name?: string;
  parents?: string[];
};

type IndexAcademicData = {
  nodes?: IndexAcademicNode[];
};

const resourceDropdown = document.getElementById("resourceDropdown") as HTMLSelectElement | null;
const resourceStatus = document.getElementById("resourceLoadStatus");
const resourceRadios = document.querySelectorAll<HTMLInputElement>('input[name="resourceType"]');

const resourceFiles = {
  industry: "data/industry2.json",
  occupation: "data/occupations.json",
  academic: "data/academic.json"
} as const;

type IndexResourceType = keyof typeof resourceFiles;

document.addEventListener("click", (event) => {
  const target = event.target instanceof Element ? event.target : null;
  const anchor = target?.closest<HTMLAnchorElement>('a[href^="#"]');
  if (!anchor) {
    return;
  }

  const href = anchor.getAttribute("href");
  if (!href) {
    return;
  }

  const sectionTarget = document.querySelector<HTMLElement>(href);
  if (!sectionTarget) {
    return;
  }

  event.preventDefault();
  sectionTarget.scrollIntoView({
    behavior: "smooth"
  });
});

function getPrimaryHeader(): HTMLElement | null {
  return document.querySelector<HTMLElement>("#site-header header") || document.querySelector<HTMLElement>("header");
}

window.addEventListener("scroll", () => {
  const header = getPrimaryHeader();
  if (!header) {
    return;
  }

  if (window.scrollY > 50) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
});

let currentSlide = 0;
const slides = document.querySelectorAll<HTMLImageElement>(".carousel img");
if (slides.length !== 0) {
  console.log("valid carousel");
  window.setInterval(() => {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
  }, 3000);
} else {
  console.log("no slides");
}

function uniqueKeepOrder(items: string[]): string[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (!item || seen.has(item)) {
      return false;
    }
    seen.add(item);
    return true;
  });
}

function mergeEntriesKeepOrder(entries: Array<IndexDropdownEntry | null | undefined>): IndexDropdownEntry[] {
  const indexByLabel = new Map<string, number>();
  const merged: IndexDropdownEntry[] = [];

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

function extractIndustryItems(data: IndexIndustryData): IndexDropdownEntry[] {
  const entries: IndexDropdownEntry[] = [];
  const sectors = data.taxonomy?.sectors ?? [];

  sectors.forEach((sectorObj) => {
    if (sectorObj.sector) {
      entries.push({ label: sectorObj.sector, level: 0 });
    }

    (sectorObj.industry_groups ?? []).forEach((groupObj) => {
      if (groupObj.industry_group) {
        entries.push({ label: groupObj.industry_group, level: 1 });
      }

      (groupObj.industries ?? []).forEach((industryObj) => {
        if (industryObj.industry) {
          entries.push({ label: industryObj.industry, level: 2 });
        }

        (industryObj.subindustries ?? []).forEach((subindustry) => {
          entries.push({ label: subindustry, level: 3 });
        });
      });
    });
  });

  return mergeEntriesKeepOrder(entries);
}

function extractOccupationItems(data: IndexOccupationData): IndexDropdownEntry[] {
  const entries: IndexDropdownEntry[] = [];
  const groups = data.occupation_taxonomy ?? [];

  groups.forEach((majorGroup) => {
    if (majorGroup.major_group) {
      entries.push({ label: majorGroup.major_group, level: 0 });
    }

    (majorGroup.minor_groups ?? []).forEach((minorGroup) => {
      if (minorGroup.minor_group) {
        entries.push({ label: minorGroup.minor_group, level: 1 });
      }

      (minorGroup.broad_occupations ?? []).forEach((broadOccupation) => {
        if (broadOccupation.broad_occupation) {
          entries.push({ label: broadOccupation.broad_occupation, level: 2 });
        }

        (broadOccupation.occupations ?? []).forEach((occupation) => {
          if (occupation.title) {
            entries.push({ label: occupation.title, level: 3 });
          }
        });
      });
    });
  });

  return mergeEntriesKeepOrder(entries);
}

function extractAcademicItems(data: IndexAcademicData): IndexDropdownEntry[] {
  const nodes = data.nodes ?? [];
  const byId = new Map<string, IndexAcademicNode>();
  const memoDepth = new Map<string, number>();
  const visiting = new Set<string>();

  nodes.forEach((node) => {
    byId.set(node.id, node);
  });

  function getDepth(nodeId: string): number {
    if (memoDepth.has(nodeId)) {
      return memoDepth.get(nodeId) ?? 0;
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

  const entries = nodes.map((node) => ({
    label: node.name ?? node.id,
    level: Math.min(getDepth(node.id), 4)
  }));

  return mergeEntriesKeepOrder(entries);
}

function getItemsForType(type: IndexResourceType, data: unknown): IndexDropdownEntry[] {
  if (type === "industry") {
    return extractIndustryItems((data as IndexIndustryData) ?? {});
  }

  if (type === "occupation") {
    return extractOccupationItems((data as IndexOccupationData) ?? {});
  }

  return extractAcademicItems((data as IndexAcademicData) ?? {});
}

function renderDropdownOptions(items: Array<IndexDropdownEntry | string>): void {
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

async function loadResourceDropdown(type: IndexResourceType): Promise<void> {
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
  } catch (error) {
    resourceDropdown.innerHTML = '<option value="">Unable to load data</option>';
    resourceStatus.textContent = "Error loading resource data. Use a local server (not file://).";
    console.error(error);
  }
}

if (resourceDropdown && resourceStatus && resourceRadios.length > 0) {
  resourceRadios.forEach((radio) => {
    radio.addEventListener("change", (event) => {
      const target = event.target as HTMLInputElement | null;
      const value = target?.value;
      if (value === "industry" || value === "occupation" || value === "academic") {
        void loadResourceDropdown(value);
      }
    });
  });

  const selectedRadio = document.querySelector<HTMLInputElement>('input[name="resourceType"]:checked');
  const selectedType =
    selectedRadio?.value === "occupation" || selectedRadio?.value === "academic"
      ? (selectedRadio.value as IndexResourceType)
      : "industry";

  void loadResourceDropdown(selectedType);
}

console.log("the js is working");
