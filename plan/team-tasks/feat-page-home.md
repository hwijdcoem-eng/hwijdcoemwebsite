# Task: Home Page

**Branch:** `feat/page-home`

## Scope of Work & Creative Direction
This branch builds the landing page. **Avoid generic clichés.**

### 1. Hero Section
- **Skip "Welcome to HWI" and generic particle backgrounds.** 
- **Layout:** Asymmetric. Left side: Headline (e.g., `BUILD. CONNECT. CREATE.`).
- **Visual:** Right side must be a **live system diagram** built from real data (N members, N domains, N events), NOT ambient decoration. It should render as a real network graph using the `AnimatedIcon`/path-data system.
- **Motion:** One orchestrated load sequence (headline + diagram assemble together), then static until scroll/hover.

### 2. Stats Section
- Don't use the generic "big number, small label, gradient card" pattern identically for all stats.
- Vary emphasis: e.g., one large hero stat (total members) with the rest smaller and inline.

## ⚠️ Zero Merge Conflict Rules (CRITICAL)
1. **Strict File Boundaries:** Only edit `app/page.tsx` and `components/home/*`.
2. **No Dependency Changes:** Do NOT run `npm install` or modify `package.json`.
3. **No Drive-by Fixes:** Do not fix code outside your scope.
4. **Stay Updated:** Run `git fetch origin` and `git merge origin/develop` frequently.
