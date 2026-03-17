const fallbackHeaderMarkup = `
<header class="site-header">
  <a class="site-brand" href="index.html">
    <span class="site-brand__mark">NK</span>
    <span class="site-brand__text">
      <span class="site-brand__title">Nicholas Knapp</span>
      <span class="site-brand__tagline">Engineering notes, tools, experiments, and reference material</span>
    </span>
  </a>
  <nav class="site-nav" aria-label="Primary">
    <ul>
      <li><a href="cheatsheets.html">Cheat Sheets</a></li>
      <li><a href="stylingpg.html">Styling</a></li>
      <li><a href="index.html#home">Home</a></li>
      <li><a href="index.html#about">About</a></li>
      <li><a href="index.html#services">Services</a></li>
      <li><a href="index.html#opensource">Open-Source Contributions</a></li>
      <li><a href="index.html#resources">Resources</a></li>
      <li><a href="index.html#contact">Contact</a></li>
      <li><a href="memes.html">Tech Memes</a></li>
      <li><a href="tools.html">Tools</a></li>
      <li><a href="games.html">Games</a></li>
      <li><a href="privacy.html">Privacy</a></li>
      <li><a href="blog.html">Blog</a></li>
      <li><a href="other.html">Other</a></li>
    </ul>
  </nav>
</header>
`;
function getSitePrefix() {
    return window.location.pathname.includes("/blog-articles/") ? "../" : "";
}
function rewriteHeaderLinks(mountNode) {
    const sitePrefix = getSitePrefix();
    if (!sitePrefix) {
        return;
    }
    mountNode.querySelectorAll("a[href]").forEach((link) => {
        const href = link.getAttribute("href");
        if (!href ||
            href.startsWith("http") ||
            href.startsWith("#") ||
            href.startsWith("mailto:") ||
            href.startsWith("tel:") ||
            href.startsWith("../")) {
            return;
        }
        link.setAttribute("href", `${sitePrefix}${href}`);
    });
}
function normalizeHeaderLinks(mountNode) {
    rewriteHeaderLinks(mountNode);
    const isIndexPage = window.location.pathname.endsWith("/index.html") ||
        window.location.pathname === "/" ||
        window.location.pathname === "";
    if (!isIndexPage) {
        return;
    }
    mountNode.querySelectorAll('a[href^="index.html#"]').forEach((link) => {
        const href = link.getAttribute("href");
        if (href) {
            link.setAttribute("href", href.replace("index.html", ""));
        }
    });
}
(async function loadSharedHeader() {
    const mountNode = document.getElementById("site-header");
    if (!mountNode) {
        return;
    }
    try {
        const response = await fetch(`${getSitePrefix()}partials/header.html`, { cache: "no-store" });
        if (!response.ok) {
            throw new Error("Header partial request failed");
        }
        mountNode.innerHTML = await response.text();
        normalizeHeaderLinks(mountNode);
        document.dispatchEvent(new Event("header:loaded"));
    }
    catch (error) {
        console.error("Unable to load shared header:", error);
        mountNode.innerHTML = fallbackHeaderMarkup;
        normalizeHeaderLinks(mountNode);
        document.dispatchEvent(new Event("header:loaded"));
    }
})();
