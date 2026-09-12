# Task: Events Page

**Branch:** `feat/page-events`

## Scope of Work & Creative Direction
This branch builds the Events listing and filtering system.

### 1. Components
- Build `EventCard`, `EventGrid`, and `EventFilter` in `components/events/`.
- Ensure all dynamic data pulls strictly from `src/data/events.ts`.

### 2. Routing
- Setup the dynamic routing structure for individual event details (`/events/:slug`).
- Ensure layout remains left-aligned and typography adheres to the Design Tokens.

## ⚠️ Zero Merge Conflict Rules (CRITICAL)
1. **Strict File Boundaries:** Only edit `app/events/*`, `components/events/*`, and `data/events.ts`.
2. **No Dependency Changes:** Do NOT run `npm install` or modify `package.json`.
3. **No Drive-by Fixes:** Do not fix code outside your scope.
4. **Stay Updated:** Run `git fetch origin` and `git merge origin/develop` frequently.
