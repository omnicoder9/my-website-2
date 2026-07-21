export function normalizeInfographicSearchTerm(value: string): string {
  return value
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .slice(0, 120);
}

export function getNormalizedInfographicSearchQuery(value: string): string {
  return normalizeInfographicSearchTerm(value).trim().toLowerCase();
}

export function normalizeInfographicCategory(value: string | null | undefined): string {
  return (value || "").trim();
}

export function infographicMatchesFilters(
  searchHaystack: string,
  searchTerm: string,
  category: string,
  activeCategory: string
): boolean {
  const normalizedSearchTerm = getNormalizedInfographicSearchQuery(searchTerm);
  const normalizedHaystack = searchHaystack.toLowerCase();
  const matchesSearch = normalizedHaystack.includes(normalizedSearchTerm);
  const matchesCategory = activeCategory === "" || category === activeCategory;

  return matchesSearch && matchesCategory;
}
