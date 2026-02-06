# Specification

## Summary
**Goal:** Add a new long-form English article template that admins can load in the Article Editor, then save/publish so it appears on the public Articles pages.

**Planned changes:**
- Add one new `ArticleTemplate` entry to `frontend/src/content/articleTemplates.ts` with a unique, URL-safe slug, title, tags, and non-empty English Markdown content.
- Verify the Admin Article Editor “Start from a Template” dropdown lists the new template and loads its title/slug/content/author/tags into the editor when selected.
- Ensure an article created from the new template can be saved and published via the existing admin workflow and then renders on `/articles` and `/articles/$slug` for anonymous visitors (including any Markdown images, if present).

**User-visible outcome:** An admin can select the new template in the Article Editor, save and publish it, and logged-out visitors can see it listed on `/articles` and read it on its detail page without errors.
