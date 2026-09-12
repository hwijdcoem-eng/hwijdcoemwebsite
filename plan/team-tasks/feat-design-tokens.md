# Task: Design Tokens

**Branch:** `feat/design-tokens`

## Scope of Work
- Setup Tailwind CSS config (`tailwind.config.js` or `.ts`).
- Define color palette (`--bg-void`, `--signal`, `--ink`, etc.) in global CSS.
- Setup typography scales (Space Grotesk / Inter).
- Create `src/styles/tokens.ts` or equivalent.
- **Note:** Do NOT build any React components in this branch. Just CSS and config.

## ⚠️ Zero Merge Conflict Rules (CRITICAL)
1. **Strict File Boundaries:** Only edit the files explicitly listed in your scope. Do not touch `Navbar`, `Footer`, or other shared UI components if they are not in your scope.
2. **No Dependency Changes:** Do NOT run `npm install` or modify `package.json`. If you need a library (like `lucide-react` or `framer-motion`), ask the Team Lead.
3. **No Drive-by Fixes:** If you see a typo in someone else's code, ignore it or tell them. Do not fix it in your branch.
4. **Stay Updated:** Run `git fetch origin` and `git merge origin/develop` frequently to pull in shared components.
