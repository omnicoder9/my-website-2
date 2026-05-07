import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const errors = [];
const notes = [];

function readFile(relativePath) {
  return fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function fileExists(relativePath) {
  return fs.existsSync(path.join(repoRoot, relativePath));
}

function walkHtml(relativeDir = ".") {
  const start = path.join(repoRoot, relativeDir);
  const results = [];
  const stack = [start];

  while (stack.length > 0) {
    const current = stack.pop();
    if (!current) {
      continue;
    }

    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      if (entry.name === ".git" || entry.name === "node_modules") {
        continue;
      }

      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(fullPath);
        continue;
      }

      if (entry.isFile() && fullPath.endsWith(".html")) {
        results.push(path.relative(repoRoot, fullPath));
      }
    }
  }

  return results.sort();
}

function addError(message) {
  errors.push(message);
}

function addNote(message) {
  notes.push(message);
}

function extractHtmlReferences(html, tagName, attributeName) {
  const pattern = new RegExp(`<${tagName}[^>]+${attributeName}=["']([^"']+)["']`, "g");
  return [...html.matchAll(pattern)].map((match) => match[1]);
}

function extractBlogManifestPosts() {
  const source = readFile("ts/blog.ts");
  const manifestMatch = source.match(/const blogPosts: BlogDirectoryPost\[] = \[(?<body>[\s\S]*?)\n\];/);
  if (!manifestMatch?.groups?.body) {
    addError("Unable to parse blog post manifest from ts/blog.ts.");
    return [];
  }

  const posts = [];
  for (const blockMatch of manifestMatch.groups.body.matchAll(/\{([\s\S]*?)\n  \}/g)) {
    const block = blockMatch[1];
    const pathMatch = block.match(/path:\s*"([^"]+)"/);
    const titleMatch = block.match(/title:\s*"([^"]+)"/);
    const summaryMatch = block.match(/summary:\s*"([^"]+)"/);
    const publishedAtMatch = block.match(/publishedAt:\s*"([^"]+)"/);

    if (!pathMatch || !titleMatch || !summaryMatch) {
      addError("Encountered a malformed blog manifest entry in ts/blog.ts.");
      continue;
    }

    posts.push({
      path: pathMatch[1],
      publishedAt: publishedAtMatch?.[1],
      summary: summaryMatch[1],
      title: titleMatch[1]
    });
  }

  return posts;
}

function validateBlogManifest() {
  const posts = extractBlogManifestPosts();
  if (posts.length === 0) {
    return;
  }

  const articleFiles = walkHtml("blog-articles");
  const manifestPaths = posts.map((post) => post.path);
  const manifestPathSet = new Set(manifestPaths);
  const manifestTitleSet = new Set();

  for (const post of posts) {
    if (!post.path.startsWith("blog-articles/")) {
      addError(`Manifest entry path is not under blog-articles/: ${post.path}`);
    }

    if (!fileExists(post.path)) {
      addError(`Manifest entry points to a missing file: ${post.path}`);
    }

    if (manifestTitleSet.has(post.title)) {
      addError(`Duplicate blog title in manifest: ${post.title}`);
    }
    manifestTitleSet.add(post.title);

    if (post.publishedAt && !/^\d{4}-\d{2}-\d{2}$/.test(post.publishedAt)) {
      addError(`Invalid publishedAt format for ${post.path}: ${post.publishedAt}`);
    }
  }

  const duplicatePaths = manifestPaths.filter((entry, index) => manifestPaths.indexOf(entry) !== index);
  for (const duplicatePath of new Set(duplicatePaths)) {
    addError(`Duplicate blog path in manifest: ${duplicatePath}`);
  }

  for (const articleFile of articleFiles) {
    if (!manifestPathSet.has(articleFile)) {
      addError(`Blog article file is not represented in ts/blog.ts: ${articleFile}`);
    }
  }

  const blogHtml = readFile("blog.html");
  for (const post of posts) {
    if (!blogHtml.includes(`href="${post.path}"`)) {
      addError(`blog.html is missing a static link to manifest article: ${post.path}`);
    }
  }

  addNote(`Validated ${posts.length} manifest entries against ${articleFiles.length} blog article files.`);
}

function validateSharedArticleShell() {
  const articleFiles = walkHtml("blog-articles");

  for (const articleFile of articleFiles) {
    const html = readFile(articleFile);
    const hasBodyClass = /<body[^>]*class=["'][^"']*\bblog-article-page\b/.test(html);
    const hasSiteHeader = /id=["']site-header["']/.test(html);
    const hasHeaderScript = /<script[^>]+src=["']\.\.\/dist\/js\/header\.js["']/.test(html);

    if (!hasBodyClass) {
      addError(`Article is missing body.blog-article-page: ${articleFile}`);
    }
    if (!hasSiteHeader) {
      addError(`Article is missing #site-header mount: ${articleFile}`);
    }
    if (!hasHeaderScript) {
      addError(`Article is missing ../dist/js/header.js: ${articleFile}`);
    }
  }

  addNote(`Validated shared shell markers on ${articleFiles.length} article pages.`);
}

function validateCompiledAssetReferences() {
  const htmlFiles = walkHtml(".").filter((file) => !file.startsWith("partials/"));

  for (const htmlFile of htmlFiles) {
    const html = readFile(htmlFile);
    const scriptRefs = extractHtmlReferences(html, "script", "src").filter((ref) => ref.includes("dist/js/"));

    for (const scriptRef of scriptRefs) {
      const normalizedRef = scriptRef.split("#")[0].split("?")[0];
      const resolvedPath = path.normalize(path.join(path.dirname(htmlFile), normalizedRef));
      if (!fileExists(resolvedPath)) {
        addError(`Compiled asset reference is broken in ${htmlFile}: ${scriptRef}`);
      }
    }
  }

  addNote(`Validated compiled JS asset references across ${htmlFiles.length} HTML pages.`);
}

function validateCoreInternalLinks() {
  const corePages = [
    "index.html",
    "blog.html",
    "tools.html",
    "games.html",
    "blog-articles/privacy.html"
  ];
  const relevantTags = [
    ["a", "href"],
    ["img", "src"],
    ["link", "href"],
    ["script", "src"]
  ];

  for (const page of corePages) {
    const html = readFile(page);

    for (const [tagName, attributeName] of relevantTags) {
      const references = extractHtmlReferences(html, tagName, attributeName);
      for (const reference of references) {
        if (/^(https?:|mailto:|tel:|data:|javascript:|#)/.test(reference)) {
          continue;
        }

        const normalizedRef = reference.split("#")[0].split("?")[0];
        if (!normalizedRef) {
          continue;
        }

        const resolvedPath = path.normalize(path.join(path.dirname(page), normalizedRef));
        if (!fileExists(resolvedPath)) {
          addError(`Broken internal reference in ${page}: ${reference}`);
        }
      }
    }
  }

  addNote(`Validated local links and assets on ${corePages.length} core pages.`);
}

function main() {
  validateBlogManifest();
  validateSharedArticleShell();
  validateCompiledAssetReferences();
  validateCoreInternalLinks();

  if (errors.length > 0) {
    console.error("Static site validation failed.\n");
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log("Static site validation passed.");
  for (const note of notes) {
    console.log(`- ${note}`);
  }
}

main();
