# Task: Gallery Page

**Branch:** `feat/page-gallery`

## Scope of Work & Creative Direction
This branch builds a photo gallery for past events. 

### 1. Masonry & Lightbox
- Implement a Masonry grid layout for photos.
- Implement a Lightbox for viewing images in full screen.
- Ensure all photos are pulled from `src/data/gallery.ts`.

### 2. Differentiator: Shared-Layout Animation
- When filtering images by category, **do NOT just fade-out/fade-in the whole grid.**
- Filter transitions must **reflow the grid with a shared-layout animation** (using Motion for React's `layout` prop). This is one of the few places heavier motion is justified because it directly shows what changed.

## ⚠️ Zero Merge Conflict Rules (CRITICAL)
1. **Strict File Boundaries:** Only edit `app/gallery/page.tsx`, `components/gallery/*`, and `data/gallery.ts`.
2. **No Dependency Changes:** Do NOT run `npm install` or modify `package.json`.
3. **No Drive-by Fixes:** Do not fix code outside your scope.
4. **Stay Updated:** Run `git fetch origin` and `git merge origin/develop` frequently.
