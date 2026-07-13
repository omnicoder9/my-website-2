const tutorialCategoryLabels = [
  "Collaboration",
  "Git",
  "GitHub",
  "Terminal",
  "Version Control"
] as const;

type TutorialCategory = typeof tutorialCategoryLabels[number];

type TutorialDirectoryEntry = {
  difficulty: string;
  duration: string;
  path: string;
  publishedAt?: string;
  publishedLabel?: string;
  summary: string;
  title: string;
};

const tutorials: TutorialDirectoryEntry[] = [
  {
    difficulty: "Beginner",
    duration: "25 minutes",
    path: "tutorial-articles/github-git-fundamentals.html",
    publishedAt: "2026-07-13",
    summary: "A GitHub-first introduction to Git fundamentals: creating repositories, cloning, staging, committing, pushing, branching, opening pull requests, and resolving simple conflicts.",
    title: "Git and GitHub Fundamentals — Repositories, Commits, Branches, and Pull Requests"
  }
];

const tutorialCategoriesByPath: Record<string, TutorialCategory[]> = {
  "tutorial-articles/github-git-fundamentals.html": ["Git", "GitHub", "Version Control", "Terminal", "Collaboration"]
};

function formatTutorialDate(dateString: string): string {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(`${dateString}T00:00:00`));
}

function getSortedTutorials(): TutorialDirectoryEntry[] {
  return tutorials
    .map((tutorial, index) => ({ index, tutorial }))
    .sort((left, right) => {
      const leftTime = left.tutorial.publishedAt
        ? new Date(`${left.tutorial.publishedAt}T00:00:00`).getTime()
        : Number.NEGATIVE_INFINITY;
      const rightTime = right.tutorial.publishedAt
        ? new Date(`${right.tutorial.publishedAt}T00:00:00`).getTime()
        : Number.NEGATIVE_INFINITY;
      const dateDelta = rightTime - leftTime;

      if (dateDelta !== 0) {
        return dateDelta;
      }

      return left.index - right.index;
    })
    .map(({ tutorial }) => tutorial);
}

function getTutorialPublishedLabel(tutorial: TutorialDirectoryEntry): string {
  if (tutorial.publishedLabel) {
    return tutorial.publishedLabel;
  }

  if (tutorial.publishedAt) {
    return formatTutorialDate(tutorial.publishedAt);
  }

  return "Undated";
}

function getTutorialFilenameLabel(tutorial: TutorialDirectoryEntry): string {
  const segments = tutorial.path.split("/");
  return segments[segments.length - 1] || tutorial.path;
}

function getTutorialCategories(tutorial: TutorialDirectoryEntry): TutorialCategory[] {
  return tutorialCategoriesByPath[tutorial.path] || [];
}

function isTutorialCategory(value: string): value is TutorialCategory {
  return tutorialCategoryLabels.indexOf(value as TutorialCategory) !== -1;
}

function escapeTutorialHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    switch (character) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "\"":
        return "&quot;";
      default:
        return "&#39;";
    }
  });
}

function getTutorialCategoryCount(category: TutorialCategory): number {
  return tutorials.filter((tutorial) => getTutorialCategories(tutorial).indexOf(category) !== -1).length;
}

function renderTutorialCategoryOptions(selectElement: HTMLSelectElement): void {
  const categoryOptions = tutorialCategoryLabels
    .map((category) => {
      const count = getTutorialCategoryCount(category);
      return `<option value="${escapeTutorialHtml(category)}">${escapeTutorialHtml(category)} (${count})</option>`;
    })
    .join("");

  selectElement.innerHTML = `<option value="">All topics</option>${categoryOptions}`;
}

function renderTutorialCategoryChips(tutorial: TutorialDirectoryEntry): string {
  const categories = getTutorialCategories(tutorial);
  if (categories.length === 0) {
    return "";
  }

  const chips = categories
    .map((category) => `<span class="blog-category-chip">${escapeTutorialHtml(category)}</span>`)
    .join("");

  return `<div class="blog-category-chips" aria-label="Topics">${chips}</div>`;
}

function renderTutorialDirectory(searchTerm: string, categoryValue: string): void {
  const target = document.getElementById("tutorial-articles");
  const statusElement = document.getElementById("tutorialResultsStatus");

  if (!target || !statusElement) {
    return;
  }

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  const activeCategory = isTutorialCategory(categoryValue) ? categoryValue : "";
  const filteredTutorials = getSortedTutorials().filter((tutorial) => {
    const searchHaystack = [
      tutorial.title,
      tutorial.summary,
      tutorial.difficulty,
      tutorial.duration,
      getTutorialFilenameLabel(tutorial)
    ]
      .join(" ")
      .toLowerCase();
    const matchesSearch = searchHaystack.includes(normalizedSearchTerm);
    const matchesCategory =
      activeCategory === "" || getTutorialCategories(tutorial).indexOf(activeCategory) !== -1;
    return matchesSearch && matchesCategory;
  });

  if (filteredTutorials.length === 0) {
    target.innerHTML = `
      <section class="privacy-section blog-empty-state">
        <h2>No matching tutorials</h2>
        <p>Try a different title search or topic filter.</p>
      </section>
    `;
    statusElement.textContent = "0 tutorials shown.";
    return;
  }

  target.innerHTML = filteredTutorials
    .map((tutorial) => {
      return `
        <article class="privacy-section blog-directory-card">
          <p class="blog-directory-card__date">${getTutorialPublishedLabel(tutorial)}</p>
          ${renderTutorialCategoryChips(tutorial)}
          <h2><a href="${escapeTutorialHtml(tutorial.path)}">${escapeTutorialHtml(tutorial.title)}</a></h2>
          <p>${escapeTutorialHtml(tutorial.summary)}</p>
          <p class="blog-directory-card__path">Level: ${escapeTutorialHtml(tutorial.difficulty)} · Duration: ${escapeTutorialHtml(tutorial.duration)}</p>
          <a class="blog-directory-card__link" href="${escapeTutorialHtml(tutorial.path)}">Open tutorial</a>
        </article>
      `;
    })
    .join("");

  const categoryStatus = activeCategory ? ` in ${activeCategory}` : "";
  statusElement.textContent = `${filteredTutorials.length} tutorial${filteredTutorials.length === 1 ? "" : "s"} shown${categoryStatus}. Sorted newest first.`;
}

function initializeTutorialDirectory(): void {
  const searchInput = document.getElementById("tutorialSearchInput") as HTMLInputElement | null;
  const categorySelect = document.getElementById("tutorialCategorySelect") as HTMLSelectElement | null;

  if (!searchInput) {
    return;
  }

  if (categorySelect) {
    renderTutorialCategoryOptions(categorySelect);
  }

  const updateTutorialDirectory = (): void => {
    renderTutorialDirectory(searchInput.value, categorySelect ? categorySelect.value : "");
  };

  updateTutorialDirectory();
  searchInput.addEventListener("input", () => {
    updateTutorialDirectory();
  });

  if (categorySelect) {
    categorySelect.addEventListener("change", () => {
      updateTutorialDirectory();
    });
  }
}

document.addEventListener("DOMContentLoaded", initializeTutorialDirectory);
