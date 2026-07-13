(() => {
  type HomeDropdownEntry = {
    label: string;
    level: number;
  };

  type HomeIndustrySector = {
    sector?: string;
    industry_groups?: HomeIndustryGroup[];
  };

  type HomeIndustryGroup = {
    industry_group?: string;
    industries?: HomeIndustry[];
  };

  type HomeIndustry = {
    industry?: string;
    subindustries?: string[];
  };

  type HomeIndustryData = {
    taxonomy?: {
      sectors?: HomeIndustrySector[];
    };
  };

  type HomeOccupationGroup = {
    major_group?: string;
    minor_groups?: HomeOccupationMinorGroup[];
  };

  type HomeOccupationMinorGroup = {
    minor_group?: string;
    broad_occupations?: HomeBroadOccupation[];
  };

  type HomeBroadOccupation = {
    broad_occupation?: string;
    occupations?: HomeOccupation[];
  };

  type HomeOccupation = {
    title?: string;
  };

  type HomeOccupationData = {
    occupation_taxonomy?: HomeOccupationGroup[];
  };

  type HomeAcademicNode = {
    id: string;
    name?: string;
    parents?: string[];
  };

  type HomeAcademicData = {
    nodes?: HomeAcademicNode[];
  };

  const homeResourceDropdown = document.getElementById("resourceDropdown") as HTMLSelectElement | null;
  const homeResourceStatus = document.getElementById("resourceLoadStatus");
  const homeResourceRadios = document.querySelectorAll<HTMLInputElement>('input[name="resourceType"]');

  const homeResourceFiles = {
    industry: "data/industry2.json",
    occupation: "data/occupations.json",
    academic: "data/academic.json"
  } as const;

  type HomeResourceType = keyof typeof homeResourceFiles;

  function formatMissionClockValue(date: Date, timeZone?: string): string {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      hour12: false,
      minute: "2-digit",
      second: "2-digit",
      timeZone,
      timeZoneName: "short"
    }).format(date);
  }

  function formatMissionDateLine(date: Date): string {
    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(date);
  }

  function initializeMissionControl(): void {
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

  function initializeCarousel(): void {
    let currentSlide = 0;
    const slides = document.querySelectorAll<HTMLImageElement>(".carousel img");
    if (slides.length === 0) {
      return;
    }

    window.setInterval(() => {
      slides[currentSlide].classList.remove("active");
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add("active");
    }, 3000);
  }

  function mergeEntriesKeepOrder(entries: Array<HomeDropdownEntry | null | undefined>): HomeDropdownEntry[] {
    const indexByLabel = new Map<string, number>();
    const merged: HomeDropdownEntry[] = [];

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

  function extractIndustryItems(data: HomeIndustryData): HomeDropdownEntry[] {
    const entries: HomeDropdownEntry[] = [];
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

  function extractOccupationItems(data: HomeOccupationData): HomeDropdownEntry[] {
    const entries: HomeDropdownEntry[] = [];
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

  function extractAcademicItems(data: HomeAcademicData): HomeDropdownEntry[] {
    const nodes = data.nodes ?? [];
    const byId = new Map<string, HomeAcademicNode>();
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

  function getItemsForType(type: HomeResourceType, data: unknown): HomeDropdownEntry[] {
    if (type === "industry") {
      return extractIndustryItems((data as HomeIndustryData) ?? {});
    }

    if (type === "occupation") {
      return extractOccupationItems((data as HomeOccupationData) ?? {});
    }

    return extractAcademicItems((data as HomeAcademicData) ?? {});
  }

  function renderDropdownOptions(items: HomeDropdownEntry[]): void {
    if (!homeResourceDropdown) {
      return;
    }

    homeResourceDropdown.innerHTML = "";
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Choose an option...";
    homeResourceDropdown.appendChild(placeholder);

    items.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.label;
      option.textContent = `${"\u00A0\u00A0".repeat(item.level || 0)}${item.label}`;
      homeResourceDropdown.appendChild(option);
    });
  }

  async function loadResourceDropdown(type: HomeResourceType): Promise<void> {
    if (!homeResourceDropdown || !homeResourceStatus) {
      return;
    }

    homeResourceStatus.textContent = "Loading...";

    try {
      const resourcePath = homeResourceFiles[type];
      const response = await fetch(resourcePath);
      if (!response.ok) {
        throw new Error(`Failed to load ${resourcePath}`);
      }

      const data = await response.json();
      const items = getItemsForType(type, data);
      renderDropdownOptions(items);
      homeResourceStatus.textContent = `Loaded ${items.length} items for ${type}.`;
    } catch (error) {
      homeResourceDropdown.innerHTML = '<option value="">Unable to load data</option>';
      homeResourceStatus.textContent = "Error loading resource data. Use a local server (not file://).";
      console.error(error);
    }
  }

  function initializeResourceDropdown(): void {
    if (!homeResourceDropdown || !homeResourceStatus || homeResourceRadios.length === 0) {
      return;
    }

    homeResourceRadios.forEach((radio) => {
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
        ? (selectedRadio.value as HomeResourceType)
        : "industry";

    void loadResourceDropdown(selectedType);
  }

  initializeMissionControl();
  initializeCarousel();
  initializeResourceDropdown();
})();
