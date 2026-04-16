type BlogDirectoryPost = {
  path: string;
  publishedAt: string;
  summary: string;
  title: string;
};

const blogPosts: BlogDirectoryPost[] = [
  {
    path: "blog-articles/suffering_humans_vs_animals.html",
    publishedAt: "2026-04-16",
    summary: "A scientific and philosophical inquiry into pain, consciousness, emotional depth, and moral scale across humans and other animals.",
    title: "Who Suffers More? Humans vs. Animals"
  },
  {
    path: "blog-articles/fraud-and-ai.html",
    publishedAt: "2026-04-15",
    summary: "A history of fraud from ancient scams to AI-enabled deception, deepfakes, synthetic identities, and the future of trust.",
    title: "The Oldest Game: Fraud in the Age of AI"
  },
  {
    path: "blog-articles/outages-are-inevitable.html",
    publishedAt: "2026-04-14",
    summary: "The physics, mathematics, and organizational science that make failure unavoidable in sufficiently complex systems.",
    title: "Outages Are Inevitable. Here's the Proof."
  },
  {
    path: "blog-articles/limits-of-knowledge.html",
    publishedAt: "2026-04-13",
    summary: "A tour of the theorems, paradoxes, and epistemic boundaries that constrain human and machine intelligence.",
    title: "The Walls of Reason: On the Limits of Knowledge and Intelligence"
  },
  {
    path: "blog-articles/biology-engineering-challenge.html",
    publishedAt: "2026-04-10",
    summary: "A comparison between human-made complexity and the microscopic machinery of living systems.",
    title: "Life's Impossible Machine: Biology as the Ultimate Engineering Challenge"
  },
  {
    path: "blog-articles/engineering_as_philosophy.html",
    publishedAt: "2026-04-08",
    summary: "An essay on design, epistemology, and the hidden assumptions built into every system.",
    title: "Engineering Is Philosophy in Disguise"
  },
  {
    path: "blog-articles/know-your-rights.html",
    publishedAt: "2026-04-07",
    summary: "A civic reference guide to constitutional protections, police encounters, and the rights Americans carry with them.",
    title: "Know Your Rights: A Citizen's Field Guide"
  },
  {
    path: "blog-articles/mental_health_blog.html",
    publishedAt: "2026-04-06",
    summary: "A long-form look at the human, economic, and moral costs of untreated mental health problems.",
    title: "The Elephant in the Room and the Trillion-Dollar Problem No One Is Trying to Solve"
  },
  {
    path: "blog-articles/information-security-for-everyone.html",
    publishedAt: "2026-03-14",
    summary: "A practical baseline for protecting your accounts, identity, money, and reputation.",
    title: "What Everyone Should Know About Information Security"
  },
  {
    path: "blog-articles/levels-of-digital-privacy.html",
    publishedAt: "2026-03-11",
    summary: "A threat-model view of privacy, from basic hygiene through high-effort operational security.",
    title: "Levels of Digital Privacy: From No Precautions to Maximum-Effort OPSEC"
  },
  {
    path: "blog-articles/why-digital-privacy-is-important.html",
    publishedAt: "2026-03-07",
    summary: "Why privacy matters in ordinary life, security, autonomy, and real-world decision-making.",
    title: "Why Digital Privacy Is Important"
  }
];

function formatBlogDate(dateString: string): string {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(`${dateString}T00:00:00`));
}

function getSortedBlogPosts(): BlogDirectoryPost[] {
  return [...blogPosts].sort((left, right) => {
    return new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime();
  });
}

function renderBlogArticles(searchTerm: string): void {
  const target = document.getElementById("blog-articles");
  const statusElement = document.getElementById("blogResultsStatus");

  if (!target || !statusElement) {
    return;
  }

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  const filteredPosts = getSortedBlogPosts().filter((post) => {
    return post.title.toLowerCase().includes(normalizedSearchTerm);
  });

  if (filteredPosts.length === 0) {
    target.innerHTML = `
      <section class="privacy-section blog-empty-state">
        <h2>No matching articles</h2>
        <p>Try a different title search.</p>
      </section>
    `;
    statusElement.textContent = "0 articles shown.";
    return;
  }

  target.innerHTML = filteredPosts
    .map((post) => {
      return `
        <article class="privacy-section blog-directory-card">
          <p class="blog-directory-card__date">${formatBlogDate(post.publishedAt)}</p>
          <h2><a href="${post.path}">${post.title}</a></h2>
          <p>${post.summary}</p>
          <a class="blog-directory-card__link" href="${post.path}">Read article</a>
        </article>
      `;
    })
    .join("");

  statusElement.textContent = `${filteredPosts.length} article${filteredPosts.length === 1 ? "" : "s"} shown. Sorted newest first.`;
}

function initializeBlogDirectory(): void {
  const searchInput = document.getElementById("blogSearchInput") as HTMLInputElement | null;
  if (!searchInput) {
    return;
  }

  renderBlogArticles("");
  searchInput.addEventListener("input", () => {
    renderBlogArticles(searchInput.value);
  });
}

document.addEventListener("DOMContentLoaded", initializeBlogDirectory);
