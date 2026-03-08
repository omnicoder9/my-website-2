async function loadBlogArticles() {
  const target = document.getElementById('blog-articles');
  if (!target) {
    return;
  }

  const articleFiles = [
    'blog-articles/why-digital-privacy-is-important.html',
    'blog-articles/levels-of-digital-privacy.html'
  ];

  try {
    const chunks = await Promise.all(
      articleFiles.map(async (file) => {
        const res = await fetch(file, { cache: 'no-store' });
        if (!res.ok) {
          throw new Error(`Failed to load ${file}`);
        }
        return await res.text();
      })
    );

    target.innerHTML = chunks.join('\n');
  } catch (error) {
    console.error('Unable to load blog articles:', error);
    target.innerHTML = '<section class="privacy-section"><h2>Unable to load articles</h2><p>Start this site via a local server and refresh.</p></section>';
  }
}

document.addEventListener('DOMContentLoaded', loadBlogArticles);
