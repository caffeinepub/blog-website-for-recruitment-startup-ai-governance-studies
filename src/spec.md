# Specification

## Summary
**Goal:** Build a public-facing blog for a recruitment startup and AI governance (constraint geometry) studies, with an admin-only Markdown publishing workflow backed by a single Motoko actor.

**Planned changes:**
- Create public pages: Home, Articles index (with search, tag filter, and pagination/incremental loading), Article detail, and About (with placeholders for startup and research focus).
- Add Internet Identity authentication and restrict all write/admin actions to the authenticated owner/admin.
- Build an admin dashboard to list all articles and an editor to create/edit articles in Markdown with preview and metadata editing (title, slug, excerpt, tags, publish status, timestamps), including slug uniqueness and URL-safety validation.
- Implement a Motoko backend (single actor) that persists articles with stable storage and exposes public queries (list published, fetch by slug/id) plus admin-only CRUD and publish/unpublish methods.
- Apply a coherent research/editorial visual theme across the site, avoiding blue/purple as primary accent colors, with long-form reading typography.
- Add generated static brand assets under `frontend/public/assets/generated`, wire the logo into the header, set the favicon, and use a hero banner on the homepage.

**User-visible outcome:** Visitors can browse a styled blog (home, articles, article pages, about) and search/filter published posts; the authenticated admin can sign in with Internet Identity to draft, edit, preview (Markdown), publish/unpublish, and delete articles that persist across upgrades.
