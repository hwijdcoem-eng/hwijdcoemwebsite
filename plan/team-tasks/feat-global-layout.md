# Task: Global Layout

**Branch:** `feat/global-layout`

## Scope of Work & Creative Direction
This branch builds the core shell of the application (`Navbar`, `Footer`, `PageContainer`).

### 1. Layout Principles
- **Left-Aligned Focus:** Avoid center-stacked layouts (like center-stacked-hero-with-two-buttons). We prefer asymmetric layouts.
- **Line Length:** Ensure body copy is constrained to under ~75ch for readability.
- **Motion:** Limit to one orchestrated motion moment per page. Motion communicates state change, not just "content arrived."

### 2. Components to Build
- `components/layout/Navbar.tsx`: Must support active-route indicator morphs (using Motion for React) between routes, not just simple color changes.
- `components/layout/Footer.tsx`: Keep footer icons static. Do not animate everything.
- `components/layout/PageContainer.tsx`: Wrapper for consistent padding and max-widths.

## ⚠️ Zero Merge Conflict Rules (CRITICAL)
1. **Strict File Boundaries:** Only edit files in `components/layout/` and global routing files.
2. **No Dependency Changes:** Do NOT run `npm install` or modify `package.json`.
3. **No Drive-by Fixes:** Do not fix code outside your scope.
4. **Stay Updated:** Run `git fetch origin` and `git merge origin/develop` frequently.
