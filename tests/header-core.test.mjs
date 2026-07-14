import assert from "node:assert/strict";
import test from "node:test";

import {
  classifyEnhancementTier,
  getSitePrefixFromPathname,
  getWallpaperTime
} from "../dist/js/test-core/header-core.js";

test("getSitePrefixFromPathname returns ../ for article pages only", () => {
  assert.equal(getSitePrefixFromPathname("/"), "");
  assert.equal(getSitePrefixFromPathname("/blog-articles/privacy.html"), "../");
  assert.equal(getSitePrefixFromPathname("/tutorial-articles/github-git-fundamentals.html"), "../");
});

test("classifyEnhancementTier follows the documented thresholds", () => {
  assert.equal(classifyEnhancementTier(3, 5, 0), "basic");
  assert.equal(classifyEnhancementTier(4, 5, 2), "enhanced");
  assert.equal(classifyEnhancementTier(5, 5, 5), "absurd");
});

test("getWallpaperTime buckets the full day correctly", () => {
  assert.equal(getWallpaperTime(new Date("2026-07-13T05:00:00")), "dawn");
  assert.equal(getWallpaperTime(new Date("2026-07-13T09:00:00")), "day");
  assert.equal(getWallpaperTime(new Date("2026-07-13T17:00:00")), "dusk");
  assert.equal(getWallpaperTime(new Date("2026-07-13T21:00:00")), "night");
});
