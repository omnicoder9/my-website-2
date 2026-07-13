(() => {
  function getPrimaryHeader(): HTMLElement | null {
    return document.querySelector<HTMLElement>("#site-header header") || document.querySelector<HTMLElement>("header");
  }

  function isBlogArticlePage(): boolean {
    return document.body?.classList.contains("blog-article-page") ?? false;
  }

  function initializeSmoothAnchorScroll(): void {
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
  }

  function updateStickyHeader(): void {
    const header = getPrimaryHeader();
    if (!header) {
      return;
    }

    if (isBlogArticlePage()) {
      header.classList.remove("sticky");
      return;
    }

    header.classList.toggle("sticky", window.scrollY > 50);
  }

  let stickyHeaderFrame = 0;

  function requestStickyHeaderUpdate(): void {
    if (stickyHeaderFrame !== 0) {
      return;
    }

    stickyHeaderFrame = window.requestAnimationFrame(() => {
      stickyHeaderFrame = 0;
      updateStickyHeader();
    });
  }

  function initializeSiteCore(): void {
    initializeSmoothAnchorScroll();
    requestStickyHeaderUpdate();

    window.addEventListener("scroll", requestStickyHeaderUpdate, { passive: true });
    window.addEventListener("resize", requestStickyHeaderUpdate);
    document.addEventListener("header:loaded", requestStickyHeaderUpdate);
  }

  initializeSiteCore();
})();
