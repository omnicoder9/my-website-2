# my-website-2

Static-first personal site with tools, blog pages, utility pages, and assorted experiments.

## Local Development

Install a simple static server if needed:

```bash
npm install -g http-server
```

Build the browser JavaScript from the TypeScript sources:

```bash
npm run build
```

Start a local front-end server:

```bash
http-server -p 3000
```

Start the back end if a local Go server is present:

```bash
go run server.go
```

The Go server serves the static site and exposes `/api/health`. If it is down, the site still works in static-only mode and frontend features are expected to degrade gracefully instead of breaking.

```
npm run validate
```

## Blog Content Approach

Right now, each blog post is stored as its own standalone `.html` file under `blog-articles/`.

### Benefits

- Very simple deployment model: no CMS, no database, no runtime rendering.
- Each article can have completely custom markup, styling, and layout.
- Easy to host anywhere that can serve static files.
- Articles remain durable artifacts with no build dependency needed to read them.

### Downsides

- Shared page chrome is easy to drift. Navbar, footer, metadata, and scripts have to be kept in sync manually.
- Blog index metadata is duplicated. Title, summary, date, and categories live separately from the article body.
- Cross-cutting changes are expensive. Updating analytics, accessibility fixes, headers, or footer structure means editing many files.
- Validation is weaker. It is easy for one article to miss `body.blog-article-page`, the header mount, or shared scripts.
- Search, feeds, tags, related posts, and sitemap generation become manual or partially manual.
- Authoring is slower for content-heavy posts because every article requires full HTML authoring rather than just writing content.
- Reuse is poor. References, callouts, footnotes, code blocks, and article metadata patterns are repeated by hand.

### Practical Alternatives

1. Keep static HTML, but add a per-article metadata manifest.
   Store canonical metadata in `data/blog-posts.json` or similar, then use it to generate the blog index, categories, and validation checks while keeping the article bodies as HTML files.

2. Move article bodies to Markdown and generate HTML at build time.
   This is the most common static-site approach. Authors write Markdown with frontmatter for `title`, `summary`, `publishedAt`, and `categories`, and a build step outputs the final HTML files.

3. Use HTML partials or templates.
   Keep articles in HTML, but render them through a template system so navbar, footer, head metadata, and scripts are shared instead of copied into every file.

4. Use MDX or a component-friendly content format.
   This is useful if posts need richer embedded UI, diagrams, or custom components while still reducing repetitive hand-written page scaffolding.

5. Use a lightweight headless CMS only for metadata and authoring.
   This helps if non-technical editing matters, but it adds operational complexity and is probably unnecessary for a static personal site unless content volume grows a lot.

### Recommendation For This Repo

For this site, the most pragmatic next step is:

1. Keep articles as static files for now.
2. Introduce a single source of truth for blog metadata.
3. Add a lightweight article template or shared partial for navbar, footer, and scripts.
4. Move to Markdown only if article volume keeps growing or editing raw HTML becomes the bottleneck.

## Overengineered Ideas

If the goal is to add every unnecessary bell and whistle possible, this is the backlog.

### Visual Excess

- Add a theme generator that lets users mix typography, gradients, textures, border styles, and motion density, then save named presets in `localStorage`.
- Add animated page transitions with distinct personalities per page: tools feels like a control panel, memes feels chaotic, blog feels editorial.
- Add a “cinematic mode” with ambient background shapes, parallax layers, and a subtle soundscape toggle.
- Add a custom cursor system with context-aware states for links, buttons, draggable cards, and copy actions.
- DONE: Add a “wallpaper engine” background with SVG noise, orbiting shapes, and time-of-day color shifts.

### Site-Wide Features

- Add a command palette opened with `/` or `Ctrl+K` for navigation, tool launching, theme switching, and hidden actions.
- Add universal search across blog posts, cheatsheets, tools, and static page content with fuzzy matching and result previews.
- Add account-free personalization that remembers favorite tools, recent pages, saved themes, and pinned sections.
- Add a global notification center for tool results, copy confirmations, fake achievements, and release notes.
- Add keyboard shortcuts for nearly everything, plus a visible shortcut cheatsheet overlay.

### Tools Page Escalation

- Add “tool pipelines” so users can chain actions like text cleanup -> format conversion -> slug generation -> copy/export.
- Add drag-and-drop upload zones everywhere they make sense, not just in the converter.
- Add persistent tool history with restore/replay functionality for every generator and converter.
- Add presets, sharable deep links, and exported config files for generator settings.
- Add comparison mode for converters so users can see side-by-side before/after output, metadata, and warnings.
- Add a “lab mode” where experimental tools live behind a toggle with unstable or ridiculous utilities.

### Username and Password Madness

- DONE: Add many more username themes: mythology, cyberpunk, fantasy tavern, biotech, ocean, medieval, retro arcade, astronomy catalog.
- Add username composition rules: alliteration, syllable balancing, pronounceable mode, no repeated letters, brandable mode.
- DONE: Add password strength visualization with entropy estimates, pattern detection, and breach-inspired heuristics.
- Add passphrase mode with wordlists, separators, emoji mode, and “memorable but not terrible” suggestions.
- Add multiple copy/export formats: plain text, QR code, print card, hidden reveal mode.

### Content Systems

- Turn blog posts into a mini CMS backed by Markdown or JSON manifests with generated indexes, tags, and related-post suggestions.
- Add reading modes: focus mode, large text mode, dyslexia-friendly mode, low-motion mode.
- Add article annotations, collapsible sidenotes, and footnote previews on hover.
- Add “series maps” that visually connect related articles, cheatsheets, and tools.
- Add an interactive timeline of site updates with screenshots and feature milestones.

### Data and Interactivity

- Add dashboards that visualize usage of local features such as most-opened tools, favorite themes, and copied outputs.
- Add playful fake telemetry panels showing page metrics, browser details, and “system status” cards.
- Add structured data explorers for any JSON files already in `data/`, with graphs, filters, and export tools.
- Add a relationship graph linking pages, topics, tags, and tools in a navigable visual map.
- Add a “what changed since your last visit” detector using local snapshots.

### Social and Sharing Gimmicks

- Add share cards generated on the client with custom colors, page titles, and decorative frames.
- Add profile cards and public mini-pages assembled from favorite tools, posts, and selected themes.
- DONE: Add easter eggs, hidden routes, unlockable themes, and intentionally silly achievements.
- Add collaborative novelty features like guestbook notes, reaction walls, or anonymous prompts if a backend exists.
- Add “send this page to future me” reminders with scheduled email or webhook integrations.

### Performance Theater

- DONE: Add a visible performance dashboard that shows load timing, animation budget, paint counts, and asset weight.
- DONE: Add progressive enhancement tiers that visibly announce whether the browser is in basic, enhanced, or absurd mode.
- Add offline/PWA support with install prompts, cached pages, and offline versions of the generators.
- Add optional preloading logic that predicts likely next pages based on current page context.
- Add “instant nav” with cached partial rendering and optimistic transitions between static pages.

### Build and Architecture Overkill

- Add a proper content/build pipeline that compiles templates, TypeScript, page metadata, and static search indexes.
- Add automated image optimization, sitemap generation, feed generation, and structured metadata validation.
- Add component-level design tokens, theme packs, and page variants generated from config files.
- Add test coverage for every generator, converter, and DOM behavior, including browser compatibility snapshots.
- Add a feature-flag system so experimental ideas can ship half-finished without touching stable pages.

### Delightfully Unnecessary Experiments

- Add a browser “desktop mode” where tools open as movable windows inside the page.
- Add an ASCII mode, terminal mode, and magazine mode that completely restyle the same content.
- Add a mascot, fake operating system boot screen, or 
    - DONE: synthetic “mission control” landing page.
- Add voice controls for generators and conversions just because it would be excessive.
- Add a procedural homepage that rearranges featured content based on time, weather, or random seeds.

## Possible Priorities

If this gets built out, the highest-return ridiculous additions are probably:

1. Command palette and universal search.
2. Saved themes, presets, and local personalization.
3. Tool history, deep links, and export/import settings.
4. A content pipeline for blog pages and metadata.
5. A visual graph or dashboard layer that makes the site feel much more complex than it needs to be.

---


• Short answer: the site does not appear to use traditional first-party cookies, but it does use cookie-like/storage and third-party embeds
  in ways that may require consent in the EU/UK. For a US-only personal site with no ads/analytics, you probably do not need a full cookie
  consent banner, but you should still disclose the third-party services. If you expect EU/UK visitors, I would add consent or change the
  implementation.

  What I found in the repo:

  - No direct document.cookie usage.
  - No Google Analytics, Tag Manager, Meta Pixel, ads, Hotjar, etc.
  - localStorage is used for game achievements/themes in ts/games.ts:201 and ts/games.ts:226.
  - The header briefly writes/removes a localStorage test key in ts/header.ts:61.
  - The homepage embeds YouTube using regular youtube.com/embed in index.html:293.
  - The homepage calls https://ipapi.co/json/ to display visitor IP/ISP in ts/performance.ts:501.
  - Several blog posts load Google Fonts from fonts.googleapis.com.

  Consent Risk By Item

  | Feature | Cookie consent needed? | Notes |
  |---|---:|---|
  | First-party cookies | No obvious use | I found no document.cookie or server Set-Cookie logic. |
  | localStorage game progress/themes | Maybe, for EU/UK | ICO says cookie rules also apply to technologies that store/access info on the
  device, including web storage. Optional game achievements are not strictly necessary. |
  | YouTube iframe | Likely yes, for EU/UK unless gated | Current standard embed loads YouTube on page load. Better to use youtube-
  nocookie.com and ideally click-to-load. |
  | Google Fonts | Usually no cookie consent | Google says Google Fonts API does not set or log cookies, but it receives IP address and
  request headers. Disclose or self-host fonts. |
  | ipapi.co lookup | Not cookie consent, but privacy disclosure/opt-in recommended | Sends visitor IP to a third party. This is personal-
  data/privacy-notice territory, not classic cookie-banner territory. |
  | Browser performance metrics | Usually no | Mostly local browser APIs, no storage by themselves. |

  My Recommendation

  If you want a low-friction compliant posture:

  1. Replace the YouTube iframe with either:
      - https://www.youtube-nocookie.com/embed/Ac7G7xOG2Ag, or
      - better: a placeholder button that only loads YouTube after the user clicks “Load YouTube video.”
  2. Stop auto-calling ipapi.co on page load. Make it opt-in, or remove the visitor IP/ISP metric. It is not essential to the site.
  3. Keep localStorage only after user interaction, or add a small “site preferences/game progress” notice. If targeting EU/UK users, ask
     consent before storing optional achievement/theme state.
  4. Add a short privacy/cookie notice page saying:
      - no advertising cookies;
      - no analytics cookies;
      - local storage is used for optional game/theme progress;
      - YouTube may receive data when videos are loaded;
      - Google Fonts receives basic request data unless fonts are self-hosted;
      - IP lookup is used only if you keep that feature.

  For US-only operation, especially without targeted ads or analytics, this is probably not a “must show cookie banner before page load”
  situation. For EU/UK visitors, the conservative answer is: yes, get consent before optional localStorage, YouTube embeds, and third-party
  visitor lookup.

  Sources used: ICO guidance on cookies and similar technologies says consent is required for non-essential cookies and similar storage/
  access technologies, including web storage; it also gives the strictly necessary exception. Google Fonts states its Fonts API does not set
  or log cookies but receives IP/request data. YouTube’s docs recommend youtube-nocookie.com for privacy-enhanced mode. California AG
  guidance focuses more on opt-out for sale/sharing of personal information, especially targeted advertising, rather than blanket opt-in
  cookie consent.
  Links: ICO cookies guidance
  (https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/cookies-and-similar-technologies/),
  ICO storage/access technologies
  (https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/what-are-storage-and-access-technologies/),
  Google Fonts privacy FAQ (https://developers.google.com/fonts/faq/privacy), YouTube privacy-enhanced embeds
  (https://support.google.com/youtube/answer/171780), California CCPA overview (https://www.oag.ca.gov/privacy/ccpa).
  
