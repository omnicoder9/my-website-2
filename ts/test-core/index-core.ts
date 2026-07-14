export type IndexDropdownEntry = {
  label: string;
  level: number;
};

export type IndexIndustrySector = {
  sector?: string;
  industry_groups?: IndexIndustryGroup[];
};

export type IndexIndustryGroup = {
  industry_group?: string;
  industries?: IndexIndustry[];
};

export type IndexIndustry = {
  industry?: string;
  subindustries?: string[];
};

export type IndexIndustryData = {
  taxonomy?: {
    sectors?: IndexIndustrySector[];
  };
};

export type IndexOccupationGroup = {
  major_group?: string;
  minor_groups?: IndexOccupationMinorGroup[];
};

export type IndexOccupationMinorGroup = {
  minor_group?: string;
  broad_occupations?: IndexBroadOccupation[];
};

export type IndexBroadOccupation = {
  broad_occupation?: string;
  occupations?: IndexOccupation[];
};

export type IndexOccupation = {
  title?: string;
};

export type IndexOccupationData = {
  occupation_taxonomy?: IndexOccupationGroup[];
};

export type IndexAcademicNode = {
  id: string;
  name?: string;
  parents?: string[];
};

export type IndexAcademicData = {
  nodes?: IndexAcademicNode[];
};

export type IndexResourceType = "industry" | "occupation" | "academic";

export function formatMissionClockValue(date: Date, timeZone?: string): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    hour12: false,
    minute: "2-digit",
    second: "2-digit",
    timeZone,
    timeZoneName: "short"
  }).format(date);
}

export function formatMissionDateLine(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(date);
}

export function uniqueKeepOrder(items: string[]): string[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (!item || seen.has(item)) {
      return false;
    }
    seen.add(item);
    return true;
  });
}

export function mergeEntriesKeepOrder(entries: Array<IndexDropdownEntry | null | undefined>): IndexDropdownEntry[] {
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

    const index = indexByLabel.get(entry.label);
    if (index === undefined) {
      return;
    }

    merged[index].level = Math.min(merged[index].level, Math.max(0, entry.level || 0));
  });

  return merged;
}

export function extractIndustryItems(data: IndexIndustryData): IndexDropdownEntry[] {
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

export function extractOccupationItems(data: IndexOccupationData): IndexDropdownEntry[] {
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

export function extractAcademicItems(data: IndexAcademicData): IndexDropdownEntry[] {
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

export function getItemsForType(type: IndexResourceType, data: unknown): IndexDropdownEntry[] {
  if (type === "industry") {
    return extractIndustryItems((data as IndexIndustryData) ?? {});
  }

  if (type === "occupation") {
    return extractOccupationItems((data as IndexOccupationData) ?? {});
  }

  return extractAcademicItems((data as IndexAcademicData) ?? {});
}
