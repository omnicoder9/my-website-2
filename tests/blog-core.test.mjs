import assert from "node:assert/strict";
import test from "node:test";

import {
  blogMatchesSearch,
  formatBlogDate,
  getBlogFilenameLabel,
  normalizeBlogDirectoryViewState,
  normalizeBlogDirectoryVisibleCount,
  normalizeBlogSearchTerm,
  sortBlogPostsNewestFirst
} from "../dist/js/test-core/blog-core.js";

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
  assert.equal(getBlogFilenameLabel({ path: "blog-articles/python.html" }), "python.html");
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

test("normalizeBlogDirectoryViewState keeps valid categories and sanitizes invalid state", () => {
  const allowedCategories = ["Docker", "Security"];
  const restored = normalizeBlogDirectoryViewState("dock\u0000er", "Docker", 48, allowedCategories);
  const invalid = normalizeBlogDirectoryViewState("query", "Unknown", 3, allowedCategories);

  assert.deepEqual(restored, {
    categoryValue: "Docker",
    searchTerm: "dock er",
    visibleCount: 48
  });
  assert.deepEqual(invalid, {
    categoryValue: "",
    searchTerm: "query",
    visibleCount: 24
  });
});

test("blogMatchesSearch checks both titles and filenames", () => {
  const post = {
    path: "blog-articles/the-path-to-production.html",
    title: "The Path to Production"
  };

  assert.equal(blogMatchesSearch(post, "production"), true);
  assert.equal(blogMatchesSearch(post, "path-to-production"), true);
  assert.equal(blogMatchesSearch(post, "  path to production  "), true);
  assert.equal(blogMatchesSearch(post, "container security"), false);
});
