import assert from "node:assert/strict";
import test from "node:test";

import {
  getNormalizedInfographicSearchQuery,
  infographicMatchesFilters,
  normalizeInfographicCategory,
  normalizeInfographicSearchTerm
} from "../dist/js/test-core/infographics-core.js";

test("normalizeInfographicSearchTerm strips control characters and enforces the length cap", () => {
  const value = normalizeInfographicSearchTerm(`dock\u0000er ${"x".repeat(200)}`);
  assert.equal(value.startsWith("dock er "), true);
  assert.equal(value.length, 120);
});

test("getNormalizedInfographicSearchQuery trims and lowercases the query", () => {
  assert.equal(getNormalizedInfographicSearchQuery("  Docker Security  "), "docker security");
});

test("normalizeInfographicCategory trims a single primary category value", () => {
  assert.equal(normalizeInfographicCategory(" Docker "), "Docker");
  assert.equal(normalizeInfographicCategory(""), "");
});

test("infographicMatchesFilters combines text search and category filtering", () => {
  const haystack = "docker security assets/infographics/docker security.png docker security";
  const category = "Docker";

  assert.equal(infographicMatchesFilters(haystack, "docker security", category, ""), true);
  assert.equal(infographicMatchesFilters(haystack, "security.png", category, "Docker"), true);
  assert.equal(infographicMatchesFilters(haystack, "compose", category, ""), false);
  assert.equal(infographicMatchesFilters(haystack, "docker", category, "Workflow"), false);
});
