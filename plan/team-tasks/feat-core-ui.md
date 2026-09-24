# Task: Core UI Components

**Branch:** `feat/core-ui`

## Scope of Work & Creative Direction
This branch creates the atomic, reusable UI components that all other pages will use. **Do not build full pages.**

### 1. Component Specs
- Build `Button`, `Card`, `Badge`, `Modal`, `Avatar`, and `SectionHeading` inside `components/ui/`.
- Ensure they pull from the Design Tokens (colors, radius, typography).
- Apply the hierarchical border-radius system defined in the design tokens (don't make everything uniformly rounded).

### 2. AnimatedIcon System Integration
- Start building the `AnimatedIcon` wrapper in `components/icons/AnimatedIcon.tsx` (using Motion for React).
- Icons should be stored as raw path data in `icon-registry.ts`.
- Ensure the `AnimatedIcon` accepts a `state` prop (`idle | hover | active | loading`) to drive SVG `pathLength`, `scale`, or `stroke` color interpolation tied to the `--signal` token.

## ⚠️ Zero Merge Conflict Rules (CRITICAL)
1. **Strict File Boundaries:** Only edit files in `components/ui/` and `components/icons/`.
2. **No Dependency Changes:** Do NOT run `npm install` or modify `package.json`.
3. **No Drive-by Fixes:** Do not fix code outside your scope.
4. **Stay Updated:** Run `git fetch origin` and `git merge origin/develop` frequently.
