# Testing Strategy

## Purpose

This site is a static-first web application with:

- shared TypeScript-driven browser behavior in `ts/`
- multiple standalone HTML pages
- a blog directory plus many standalone article pages
- client-side tools, generators, converters, and interactive UI elements
- GitHub Pages deployment through `.github/workflows`

The main testing goal is to catch:

- broken builds
- missing or stale blog/article links
- DOM regressions in shared scripts
- tool logic errors
- accessibility failures
- mobile/responsive breakage
- production-only issues caused by static deployment assumptions

This strategy is deliberately phased. The repo currently has no test runner, so the first step should be adding high-value checks with low maintenance cost.

## Risk Areas

Highest-risk parts of the app:

- `ts/header.ts`: shared header injection, link rewriting, progressive-enhancement banner, blog article shell behavior
- `ts/blog.ts`: blog listing, sorting, search, manifest accuracy
- `ts/index.ts`: shared page behavior, sticky header behavior, resource loading, mission control UI
- `ts/tools.ts`: converters, generators, file handling, password analysis, username generation
- `ts/games.ts`: localStorage-backed behavior and interactive state
- `blog-articles/privacy.html`, `blog.html`, `tools.html`, `index.html`: key landing pages with shared UI and cross-links
- `blog-articles/*.html`: many static documents that can drift from shared conventions

## Test Pyramid

Use this mix:

- Unit tests for pure logic and formatting functions
- Integration tests for DOM behavior in shared scripts
- End-to-end tests for critical page flows
- Static content validation for manifests, links, and article conventions
- Accessibility and usability checks on high-traffic pages
- Release smoke tests before deployment

## Phase 1: Immediate Baseline

These should be implemented first.

### 1. Build Validation

Run on every PR and push:

- `npm ci`
- `npm run build`

Purpose:

- catch TypeScript errors
- catch missing types and basic compile regressions

### 2. Static Content Validation

Add a lightweight validation script to check:

- every `blog-articles/*.html` file exists and is reachable from the blog manifest in `ts/blog.ts`
- every blog manifest entry points to a real file
- every standalone article page that should use the shared shell contains:
  - `body.blog-article-page`
  - `#site-header`
  - `../dist/js/header.js`
- key pages reference compiled assets that exist in `dist/js/`
- no broken internal links among core pages

This can be a small Node script run in CI.

Suggested command:

```bash
node scripts/validate-site.mjs
```

### 3. Manual Smoke Checklist

Before release, verify:

- `index.html`
- `blog.html`
- `blog-articles/privacy.html`
- `tools.html`
- `games.html`

Checks:

- page loads without obvious layout collapse
- shared header appears
- nav links work
- blog search works
- article pages render with shared top nav
- no missing scripts or broken console-critical behavior

## Phase 2: Unit Tests

Recommended framework:

- `vitest`

Why:

- lightweight
- good TypeScript support
- works well for pure functions

### Unit Test Targets

#### `ts/blog.ts`

Test:

- date formatting output
- newest-first sort behavior
- tie behavior for equal dates
- filename extraction
- search matching against title and filename

#### `ts/header.ts`

Test pure helpers only:

- site-prefix logic for top-level pages vs `blog-articles/`
- enhancement-tier classification logic
- wallpaper time-of-day bucketing

#### `ts/index.ts`

Test:

- date/time formatting helpers
- `uniqueKeepOrder`
- `mergeEntriesKeepOrder`
- taxonomy flattening functions for industry/occupation/academic data

#### `ts/tools.ts`

This is likely the biggest unit-test surface.

Test:

- unit conversions
- password scoring and findings
- username generation rules
- file format compatibility mapping
- text/data conversion helpers
- CSV/TSV/JSON parsing and serialization helpers

#### `ts/games.ts`

Test:

- achievement/state serialization logic
- localStorage key behavior
- score/progress calculations

### Unit Test Standard

Every pure function should have:

- happy-path case
- edge case
- malformed-input case where applicable

## Phase 3: Integration Tests

Recommended framework:

- `vitest` with `jsdom`

Purpose:

- verify DOM-manipulating TS modules without a full browser

### Integration Test Targets

#### Shared Header Integration

Verify:

- `#site-header` gets populated
- relative links are rewritten correctly on article pages
- sticky header is disabled on `.blog-article-page`
- enhancement banner renders without throwing

#### Blog Directory Integration

Verify:

- blog posts render into `#blog-articles`
- search input filters correctly
- empty-state message appears when no results match
- rendered cards include title, date, summary, and link

#### Homepage/Data UI Integration

Verify:

- resource dropdown populates from mocked data
- smooth-scroll anchor logic does not break standard navigation
- carousel logic does not throw when no slides exist

#### Tools Page Integration

Verify:

- main tools initialize without JS errors
- conversions update output areas
- invalid input produces controlled failure states
- download/export buttons only enable when output exists

## Phase 4: End-to-End Tests

Recommended framework:

- `playwright`

Why:

- reliable cross-browser testing
- good GitHub Actions support
- suitable for keyboard/accessibility checks too

Run against a local static server in CI.

Suggested matrix:

- Chromium on every PR
- Firefox on main/nightly
- WebKit on scheduled runs or release candidates

### Critical E2E Flows

#### Navigation and Shared Shell

Test:

- open `index.html`
- navigate to `blog.html`
- open several article pages
- confirm shared nav is visible
- confirm blog article nav scrolls away rather than sticking

#### Blog Directory

Test:

- page loads with articles visible
- search by title works
- search by filename still works if intended
- click-through to article succeeds

#### Privacy Guide

Test:

- `blog-articles/privacy.html` loads with all major sections present
- linked blog articles open successfully

#### Tools

Pick a few representative flows, not every possible combination:

- password generator / analyzer
- username generator
- one text conversion flow
- one structured-data conversion flow

#### Games / localStorage

Test:

- page loads with empty localStorage
- state persists after user interaction
- no crash when storage is unavailable or cleared

## Phase 5: Accessibility Testing

Recommended tools:

- `playwright` + `axe-core`
- manual keyboard testing
- Lighthouse accessibility audit

### Automated Accessibility Checks

Run `axe` on at least:

- `index.html`
- `blog.html`
- `blog-articles/privacy.html`
- `tools.html`
- `games.html`
- one representative blog article

Check for:

- color contrast failures
- missing form labels
- heading order problems
- missing link names
- duplicate IDs
- button/input accessibility violations

### Manual Accessibility Checks

Verify:

- full keyboard navigation works
- focus states are visible
- dropdowns and search inputs are usable without a mouse
- nav remains understandable at 200% zoom
- article pages maintain readable line length and heading hierarchy
- screen reader labels exist for search, controls, and dynamic regions

## Phase 6: Usability and Responsive Testing

This app has a lot of static content and many interactive surfaces. Usability testing should focus on whether users can find things and complete common tasks, not just whether scripts run.

### Usability Scenarios

Have 3-5 testers attempt:

- find a specific blog post from `blog.html`
- use the privacy guide to improve browser settings
- use one tool to generate or convert content
- navigate from homepage to a specific article and back

Measure:

- time to complete task
- visible confusion points
- broken expectations
- places where page terminology is unclear

### Responsive Checks

Verify at minimum:

- 360px mobile width
- 768px tablet width
- 1280px desktop width

Focus pages:

- `index.html`
- `blog.html`
- `tools.html`
- `blog-articles/privacy.html`
- representative article pages with long text and references

## Phase 7: Content Quality Checks

Because this is content-heavy, test the content system itself.

### Automated Content Rules

Create scripts to flag:

- duplicate blog titles
- duplicate `publishedAt` formatting anomalies
- missing article bylines/dates if required
- article pages missing shared shell markers
- suspiciously broken links in references or internal navigation
- empty headings or malformed heading order

### Manual Editorial Checks

Spot-check:

- citations render correctly
- long URLs do not destroy layout
- backlink to `blog.html` exists where expected
- article title in page body matches document intent

## CI Proposal

Recommended GitHub Actions stages:

1. `build`
   - `npm ci`
   - `npm run build`

2. `validate`
   - static site validation script

3. `unit`
   - Vitest pure-function tests

4. `integration`
   - Vitest + jsdom DOM tests

5. `e2e`
   - Playwright critical flows

6. `a11y`
   - Playwright + axe on key pages

For speed, PRs can run:

- build
- validate
- unit
- one-browser e2e smoke

Main branch or scheduled runs can add:

- full browser matrix
- accessibility sweep
- deeper content validation

## Recommended Tooling Stack

Minimal, pragmatic stack:

- `typescript` for build
- `vitest` for unit and integration tests
- `jsdom` for DOM integration tests
- `playwright` for browser e2e
- `axe-core` or `@axe-core/playwright` for accessibility
- optional `lighthouse` for periodic performance/accessibility snapshots

## Suggested Directory Layout

```text
scripts/
  validate-site.mjs
tests/
  unit/
    blog.test.ts
    header.test.ts
    index.test.ts
    tools.test.ts
    games.test.ts
  integration/
    blog.dom.test.ts
    header.dom.test.ts
    tools.dom.test.ts
  e2e/
    navigation.spec.ts
    blog.spec.ts
    privacy.spec.ts
    tools.spec.ts
    games.spec.ts
```

## Rollout Order

Recommended order:

1. Add static validation script.
2. Add Vitest and cover pure helpers in `blog.ts`, `header.ts`, and `index.ts`.
3. Add tests for the most failure-prone logic in `tools.ts`.
4. Add Playwright smoke tests for navigation, blog search, and one tools flow.
5. Add accessibility checks on the main pages.
6. Expand coverage only where bugs actually occur.

## Definition of Done for Testing

A healthy baseline for this repo would be:

- TypeScript build passes in CI
- static validation script passes
- key shared helpers have unit tests
- blog directory behavior has DOM/integration coverage
- one Playwright smoke path covers core site navigation
- one Playwright smoke path covers the tools page
- automated accessibility checks run on key pages
- manual responsive and usability checks are documented for releases

## Principle

Do not aim for blanket coverage of every static page first. Prioritize the shared code, the blog directory, the navigation shell, and the tools that actually execute logic. For this app, a good testing scheme is less about chasing a coverage number and more about preventing silent regressions in shared behavior across many static pages.
