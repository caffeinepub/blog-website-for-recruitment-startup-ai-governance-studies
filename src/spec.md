# Specification

## Summary
**Goal:** Make the public Articles page reliably load and show real published articles by fixing frontend parsing/rendering, improving backend public queries, and persisting articles across canister upgrades.

**Planned changes:**
- Fix the Articles index page loading flow to avoid uncaught errors and render a user-friendly error state (with actionable details) while keeping the page layout intact.
- Correct frontend parsing and rendering of published articles from the canister (IDs, timestamps, tags, slugs) so article cards display properly and navigate via `article.slug`.
- Persist `articles`, `userProfiles`, and `nextArticleId` in stable state and restore them on canister upgrade/redeploy (single Motoko actor).
- Update backend public query methods (`listPublishedArticles`, `getPublicArticleBySlug`, `searchArticlesByTag`) to be safe for anonymous callers (no traps) and return deterministic, consistently ordered results (newest first).
- Add an admin UI action to (re)publish the built-in article templates into the canister and invalidate caches so the public Articles page updates without a hard refresh.

**User-visible outcome:** Visiting the Articles page consistently shows a list of published articles (or an empty/error state without crashing), articles display correctly and open by slug, content and profiles persist after upgrades, and admins can republish default templates from the UI to populate the public Articles page after fresh deployments.
