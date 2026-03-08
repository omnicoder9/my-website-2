(async function loadSharedHeader() {
  const mountNode = document.getElementById('site-header');
  if (!mountNode) {
    return;
  }

  try {
    const response = await fetch('partials/header.html', { cache: 'no-store' });
    if (!response.ok) {
      throw new Error('Header partial request failed');
    }

    mountNode.innerHTML = await response.text();

    const isIndexPage =
      window.location.pathname.endsWith('/index.html') ||
      window.location.pathname === '/' ||
      window.location.pathname === '';

    if (isIndexPage) {
      mountNode.querySelectorAll('a[href^="index.html#"]').forEach((link) => {
        link.setAttribute('href', link.getAttribute('href').replace('index.html', ''));
      });
    }

    document.dispatchEvent(new Event('header:loaded'));
  } catch (error) {
    console.error('Unable to load shared header:', error);
  }
})();
