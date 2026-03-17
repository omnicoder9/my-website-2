const blogPosts = [
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
function formatBlogDate(dateString) {
    return new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric"
    }).format(new Date(`${dateString}T00:00:00`));
}
function getSortedBlogPosts() {
    return [...blogPosts].sort((left, right) => {
        return new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime();
    });
}
function renderBlogArticles(searchTerm) {
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
function initializeBlogDirectory() {
    const searchInput = document.getElementById("blogSearchInput");
    if (!searchInput) {
        return;
    }
    renderBlogArticles("");
    searchInput.addEventListener("input", () => {
        renderBlogArticles(searchInput.value);
    });
}
document.addEventListener("DOMContentLoaded", initializeBlogDirectory);
