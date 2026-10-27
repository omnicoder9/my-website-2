import assert from "node:assert/strict";
import test from "node:test";

import {
  blogCategoriesMatchSelection,
  blogMatchesSearch,
  formatBlogDate,
  getBlogFilenameLabel,
  normalizeBlogDirectoryViewState,
  normalizeBlogDirectoryVisibleCount,
  normalizeBlogSearchTerm,
  sortBlogCategoriesMostSpecificFirst,
  sortBlogPostsNewestFirst
} from "../dist/js/test-core/blog-core.js";

test("blogCategoriesMatchSelection combines required and excluded labels", () => {
  const postCategories = ["Java", "Spring", "Security"];

  assert.equal(blogCategoriesMatchSelection(postCategories, ["Java"], []), true);
  assert.equal(blogCategoriesMatchSelection(postCategories, ["Java", "Security"], []), true);
  assert.equal(blogCategoriesMatchSelection(postCategories, ["Java"], ["Spring"]), false);
  assert.equal(blogCategoriesMatchSelection(postCategories, ["Java"], ["Python"]), true);
  assert.equal(blogCategoriesMatchSelection(postCategories, ["Python"], []), false);
  assert.equal(blogCategoriesMatchSelection(postCategories, [], ["Spring"]), false);
  assert.equal(blogCategoriesMatchSelection(postCategories, [], []), true);
});

test("formatBlogDate renders long-form US dates", () => {
  assert.equal(formatBlogDate("2026-07-13"), "July 13, 2026");
});

test("sortBlogPostsNewestFirst orders by newest date and preserves tie order", () => {
  const posts = [
    { path: "blog-articles/older.html", publishedAt: "2026-07-10", summary: "", title: "Older" },
    { path: "blog-articles/tie-a.html", publishedAt: "2026-07-12", summary: "", title: "Tie A" },
    { path: "blog-articles/tie-b.html", publishedAt: "2026-07-12", summary: "", title: "Tie B" },
    { path: "blog-articles/undated.html", summary: "", title: "Undated" }
  ];

  const sorted = sortBlogPostsNewestFirst(posts).map((post) => post.path);
  assert.deepEqual(sorted, [
    "blog-articles/tie-a.html",
    "blog-articles/tie-b.html",
    "blog-articles/older.html",
    "blog-articles/undated.html"
  ]);
});

test("getBlogFilenameLabel extracts the final path segment", () => {
  assert.equal(getBlogFilenameLabel({ path: "blog-articles/python/python.html" }), "python.html");
});

test("sortBlogCategoriesMostSpecificFirst moves narrow categories before catch-all categories", () => {
  assert.deepEqual(
    sortBlogCategoriesMostSpecificFirst([
      "Programming & Software",
      "Engineering",
      "Generative AI",
      "Machine Learning",
      "Data Engineering"
    ]),
    ["Generative AI", "Data Engineering", "Machine Learning", "Programming & Software", "Engineering"]
  );

  assert.deepEqual(
    sortBlogCategoriesMostSpecificFirst(["Security", "Society & Civics", "Pentesting", "Networks"]),
    ["Pentesting", "Networks", "Security", "Society & Civics"]
  );

  assert.deepEqual(
    sortBlogCategoriesMostSpecificFirst(["Biology", "Human Biology"]),
    ["Human Biology", "Biology"]
  );

  assert.deepEqual(
    sortBlogCategoriesMostSpecificFirst([
      "Finance",
      "FinTech",
      "Business",
      "Git",
      "Programming & Software",
      "Apache Kafka",
      "Redis"
    ]),
    ["FinTech", "Git", "Apache Kafka", "Redis", "Finance", "Business", "Programming & Software"]
  );
});

test("normalizeBlogSearchTerm preserves spaces, strips control characters, and enforces the length cap", () => {
  const value = normalizeBlogSearchTerm(`  prod\u0000uction ${"x".repeat(200)}  `);
  assert.equal(value.startsWith("  prod uction "), true);
  assert.equal(value.length, 120);
});

test("normalizeBlogDirectoryVisibleCount enforces a minimum page size", () => {
  assert.equal(normalizeBlogDirectoryVisibleCount(72.9), 72);
  assert.equal(normalizeBlogDirectoryVisibleCount(12), 24);
  assert.equal(normalizeBlogDirectoryVisibleCount("48"), 24);
});

test("normalizeBlogDirectoryViewState keeps valid include and exclude categories", () => {
  const allowedCategories = ["Docker", "Java", "Security", "Spring"];
  const restored = normalizeBlogDirectoryViewState(
    "java\u0000security",
    ["Java", "Security", "Unknown"],
    ["Spring"],
    48,
    allowedCategories
  );
  const overlap = normalizeBlogDirectoryViewState(
    "query",
    ["Docker", "Security"],
    ["Security", "Unknown"],
    3,
    allowedCategories
  );

  assert.deepEqual(restored, {
    excludedCategories: ["Spring"],
    includedCategories: ["Java", "Security"],
    searchTerm: "java security",
    visibleCount: 48
  });
  assert.deepEqual(overlap, {
    excludedCategories: ["Security"],
    includedCategories: ["Docker"],
    searchTerm: "query",
    visibleCount: 24
  });
});

test("blogMatchesSearch checks both titles and filenames", () => {
  const post = {
    path: "blog-articles/devops/docker/the-path-to-production.html",
    title: "The Path to Production"
  };

  assert.equal(blogMatchesSearch(post, "production"), true);
  assert.equal(blogMatchesSearch(post, "path-to-production"), true);
  assert.equal(blogMatchesSearch(post, "  path to production  "), true);
  assert.equal(blogMatchesSearch(post, "container security"), false);
});
