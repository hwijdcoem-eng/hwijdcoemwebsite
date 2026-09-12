# Task: Design Tokens

**Branch:** `feat/design-tokens`

## Scope of Work & Creative Direction
This branch is responsible for setting up the foundational design system. **Do NOT build any React components in this branch.**

### 1. Color System
Avoid generic AI-default palettes. Implement the following exact tokens in `src/styles/tokens.ts` and Tailwind config:
- `--bg-void`: `#0A0E12` (Base background — cold graphite-blue-black)
- `--bg-panel`: `#12171D` (Card/section surfaces)
- `--line`: `#22303A` (Hairlines, node connectors, dividers)
- `--ink`: `#E8EDF0` (Primary text)
- `--ink-dim`: `#8CA0AC` (Secondary text)
- `--signal`: `#4FD1C5` (Single accent — data pulse color, used *only* for live/active states)
- `--signal-warm`: `#E8A33D` (Secondary accent — used *only* for achievements/highlights)

### 2. Typography
- **Display/Headline:** Space Grotesk or General Sans. Used at large sizes as a design element.
- **Body/UI:** Inter or IBM Plex Sans.
- **Rule:** No monospace for data labels. No tracked-out all-caps eyebrows above every heading.

### 3. Layout & Border Radius
- Establish a single border-radius value system (e.g., 4px small / 12px large) applied by hierarchy. Cards, buttons, and images should not all share identical rounding.

## ⚠️ Zero Merge Conflict Rules (CRITICAL)
1. **Strict File Boundaries:** Only edit Tailwind config, global CSS, and token files.
2. **No Dependency Changes:** Do NOT run `npm install` or modify `package.json`.
3. **No Drive-by Fixes:** Do not fix code outside your scope.
4. **Stay Updated:** Run `git fetch origin` and `git merge origin/develop` frequently.
