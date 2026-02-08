# Specification

## Summary
**Goal:** Make the animated graph canvas background fully transparent so the app’s white page background shows through while keeping only the neon nodes/lines visible.

**Planned changes:**
- Update the animated graph canvas rendering so it does not paint any opaque background each frame (remove/avoid black fill).
- Ensure the canvas element has no CSS background color so its computed background remains transparent across all routes.
- Prevent any initial-load or resize “black flash” before the first animation frame by keeping the canvas clear/transparent from the start.

**User-visible outcome:** On all pages, the animated neon graph appears over the app’s white background with no black rectangle behind it, including during initial load and resizing.
