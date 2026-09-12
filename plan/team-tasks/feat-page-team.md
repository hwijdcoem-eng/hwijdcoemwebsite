# Task: Team Page

**Branch:** `feat/page-team`

## Scope of Work & Creative Direction
This is the signature page of the site. It must be an interactive experience, not just a static grid of headshots.

### 1. Live Filtering Org Tree
- Default view: The tree acts as a real hierarchy from `data/team.ts` (President → VP → Domain leads → members).
- **Interaction:** Clicking a domain (e.g., Web, Events) should **re-render the connector lines** with a draw-on animation.
- **Visuals:** Dim non-selected branches instead of hiding them completely. This preserves the feeling of exploring a subset of a larger real org.
- **Card Reveal:** Member cards must reveal on click, not hover-only (to support touch/mobile).

### 2. Animated Icons
- Domain icons on this page must use the `AnimatedIcon` system to visibly draw themselves in when a domain is selected.

## ⚠️ Zero Merge Conflict Rules (CRITICAL)
1. **Strict File Boundaries:** Only edit `app/team/page.tsx`, `components/team/*`, and `data/team.ts`.
2. **No Dependency Changes:** Do NOT run `npm install` or modify `package.json`.
3. **No Drive-by Fixes:** Do not fix code outside your scope.
4. **Stay Updated:** Run `git fetch origin` and `git merge origin/develop` frequently.
