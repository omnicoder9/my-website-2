type PreparedInfographicCard = {
  category: string;
  element: HTMLElement;
  searchHaystack: string;
};

function normalizeInfographicSearchTerm(value: string): string {
  return value
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .slice(0, 120);
}

function getNormalizedInfographicSearchQuery(value: string): string {
  return normalizeInfographicSearchTerm(value).trim().toLowerCase();
}

function getInfographicCardCategory(cardElement: HTMLElement): string {
  return (cardElement.dataset.infographicCategory || "").trim();
}

function getPreparedInfographicCards(): PreparedInfographicCard[] {
  return Array.from(document.querySelectorAll<HTMLElement>("[data-infographic-card]")).map((cardElement) => ({
    category: getInfographicCardCategory(cardElement),
    element: cardElement,
    searchHaystack: (cardElement.textContent || "").toLowerCase()
  }));
}

function renderInfographicCategoryOptions(
  selectElement: HTMLSelectElement,
  preparedCards: PreparedInfographicCard[]
): Set<string> {
  const categoryCounts = new Map<string, number>();

  preparedCards.forEach((card) => {
    if (card.category) {
      const category = card.category;
      categoryCounts.set(category, (categoryCounts.get(category) || 0) + 1);
    }
  });

  const categories = [...categoryCounts.keys()].sort((left, right) => left.localeCompare(right));
  selectElement.innerHTML = "";
  selectElement.append(new Option("All categories", ""));

  categories.forEach((category) => {
    selectElement.append(new Option(`${category} (${categoryCounts.get(category) || 0})`, category));
  });

  return new Set(categories);
}

function infographicMatchesFilters(
  preparedCard: PreparedInfographicCard,
  searchTerm: string,
  activeCategory: string
): boolean {
  const normalizedSearchTerm = getNormalizedInfographicSearchQuery(searchTerm);
  const matchesSearch = preparedCard.searchHaystack.includes(normalizedSearchTerm);
  const matchesCategory = activeCategory === "" || preparedCard.category === activeCategory;

  return matchesSearch && matchesCategory;
}

function initializeInfographicsPage(): void {
  const searchInput = document.getElementById("infographicSearchInput") as HTMLInputElement | null;
  const categorySelect = document.getElementById("infographicCategorySelect") as HTMLSelectElement | null;
  const statusElement = document.getElementById("infographicResultsStatus");
  const emptyState = document.getElementById("infographicEmptyState");

  if (!searchInput || !statusElement) {
    return;
  }

  const preparedCards = getPreparedInfographicCards();
  if (preparedCards.length === 0) {
    return;
  }

  searchInput.maxLength = 120;

  const allowedCategories = categorySelect
    ? renderInfographicCategoryOptions(categorySelect, preparedCards)
    : new Set<string>();

  const updateInfographics = (): void => {
    const normalizedValue = normalizeInfographicSearchTerm(searchInput.value);
    if (normalizedValue !== searchInput.value) {
      searchInput.value = normalizedValue;
    }

    const selectedValue = categorySelect ? categorySelect.value : "";
    const activeCategory = allowedCategories.has(selectedValue) ? selectedValue : "";
    let visibleCount = 0;

    preparedCards.forEach((preparedCard) => {
      const matches = infographicMatchesFilters(preparedCard, searchInput.value, activeCategory);
      preparedCard.element.hidden = !matches;
      if (matches) {
        visibleCount += 1;
      }
    });

    if (emptyState) {
      emptyState.hidden = visibleCount !== 0;
    }

    const categoryStatus = activeCategory ? ` in ${activeCategory}` : "";
    statusElement.textContent =
      visibleCount === 0
        ? "0 infographics shown."
        : `${visibleCount} of ${preparedCards.length} infographics shown${categoryStatus}.`;
  };

  updateInfographics();
  searchInput.addEventListener("input", updateInfographics);

  if (categorySelect) {
    categorySelect.addEventListener("change", updateInfographics);
  }

  window.addEventListener("pageshow", updateInfographics);
}

document.addEventListener("DOMContentLoaded", initializeInfographicsPage);
