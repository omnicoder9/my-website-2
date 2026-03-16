const blogArticleFiles = [
    "blog-articles/information-security-for-everyone.html",
    "blog-articles/why-digital-privacy-is-important.html",
    "blog-articles/levels-of-digital-privacy.html"
];
function renderBlogFallback() {
    return `
    <section class="privacy-section">
      <h2>Article index</h2>
      <p>The live article loader is unavailable, but the individual article files are still linked below.</p>
      <ul>
        ${blogArticleFiles
        .map((filePath) => {
        const fileName = filePath.split("/").pop() || filePath;
        const label = fileName
            .replace(".html", "")
            .split("-")
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
            .join(" ");
        return `<li><a href="${filePath}">${label}</a></li>`;
    })
        .join("")}
      </ul>
    </section>
  `;
}
async function loadBlogArticles() {
    const target = document.getElementById("blog-articles");
    if (!target) {
        return;
    }
    try {
        const chunks = await Promise.all(blogArticleFiles.map(async (filePath) => {
            const response = await fetch(filePath, { cache: "no-store" });
            if (!response.ok) {
                throw new Error(`Failed to load ${filePath}`);
            }
            return response.text();
        }));
        target.innerHTML = chunks.join("\n");
    }
    catch (error) {
        console.error("Unable to load blog articles:", error);
        target.innerHTML = renderBlogFallback();
    }
}
document.addEventListener("DOMContentLoaded", loadBlogArticles);
