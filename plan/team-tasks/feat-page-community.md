# Task: Community Page

**Branch:** `feat/page-community`

## Scope of Work & Creative Direction
This branch visualizes the scale of the community ("ONE COMMUNITY. MANY CITIES.").

### 1. Data-Driven Map / Node Graph
- Build a map or node graph showing active chapters using data strictly from `src/data/community.ts`.
- The visualization must be generated at runtime from the `AnimatedIcon`/path-data system.
- **No placeholders:** Only render cities/nodes you actually have in the data. No dot exists without a real chapter.
- **Empty State:** If there are only 1-2 real chapters right now, pair it with an honest empty state. A single confident chapter card reads more credible than a sparse fake-looking map.

## ⚠️ Zero Merge Conflict Rules (CRITICAL)
1. **Strict File Boundaries:** Only edit `app/community/page.tsx`, `components/community/*`, and `data/community.ts`.
2. **No Dependency Changes:** Do NOT run `npm install` or modify `package.json`.
3. **No Drive-by Fixes:** Do not fix code outside your scope.
4. **Stay Updated:** Run `git fetch origin` and `git merge origin/develop` frequently.
