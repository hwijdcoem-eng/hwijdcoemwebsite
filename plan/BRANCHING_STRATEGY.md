# HWI JDCOEM — Team Branching & Workflow Strategy

This document outlines the Git branching strategy for the HWI JDCOEM website build. Its primary goal is to allow multiple developers to work concurrently while eliminating merge conflicts and overlapping work.

## Recommendation: Feature-Wise (Phase-Wise) Branching

**We strongly recommend Feature-Wise branching (based on the Phased Build Order) rather than strictly Page-Wise branching.**

### Why Feature-Wise is Better than Page-Wise:
1. **Shared Components:** If Dev A builds the "Home" page and Dev B builds the "About" page simultaneously, both will need shared components like `Navbar`, `Footer`, `Button`, or `Card`. If they both try to create these shared components in their separate page branches, you will get severe merge conflicts when bringing them together.
2. **Dependency:** Pages depend on design tokens, routing, and shared layouts. These foundational features must be built and merged first.
3. **Clear Boundaries:** Feature-wise branching isolates work by system layer (e.g., "UI Components", "Routing", "Home Page", "Gallery").

---

## 1. Core Branches

*   `main` — The production-ready code. No one commits directly to main.
*   `develop` — The active development branch. All feature branches merge into this.

## 2. Feature Branches (To Create & Assign)

Based on the 20-phase plan, here are the branches you should create and how to assign them to ensure zero conflicts. 

> **Important:** Foundation branches must be merged into `develop` before assigning the specific Page branches.

### Phase A: Foundation (Do these first, one developer or sequentially)
*   `feat/design-tokens` — Sets up Tailwind config, colors, typography. (No UI components).
*   `feat/global-layout` — Builds `Navbar`, `Footer`, and `PageContainer`.
*   `feat/core-ui` — Builds reusable atomic components (`Button`, `Card`, `Badge`).

### Phase B: Page & Feature Parallel Development (Can be assigned to different devs)
Once Phase A is merged into `develop`, developers can branch off `develop` and work on these concurrently without conflicts:

*   `feat/page-home` — Only touches `src/app/page.tsx` (or `pages/index.tsx`) and `components/home/`.
*   `feat/page-team` — Builds the Team Tree component and Team page.
*   `feat/page-events` — Builds Event cards and Events page.
*   `feat/page-gallery` — Builds the masonry layout and lightbox.
*   `feat/page-community` — Builds the node graph / map.
*   `feat/feature-certificate` — (Already in progress on `feature/certificate`).
*   `feat/page-about` — Builds the vertical timeline and About page.

---

## 3. The "Zero Merge Conflict" Rules

To ensure your web dev team doesn't step on each other's toes, enforce these rules:

1. **Strict File Boundaries:** A developer assigned to `feat/page-team` is **ONLY** allowed to create and edit files inside `components/team/`, `data/team.ts`, and the team route file. They must not modify the `Navbar` or `Button` components.
2. **Never Edit Shared Configs Concurrently:** If a developer needs a new library (e.g., adding `lucide-react` to `package.json`), they should communicate it to the team lead. If two people update `package.json` on different branches, it will cause a conflict.
3. **Always Branch from the Latest `develop`:** Before starting a new task, a developer must:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feat/their-new-feature
   ```
4. **Pull Before Pushing:** If a developer's branch is long-running, they should periodically merge `develop` into their branch to stay updated:
   ```bash
   git fetch origin
   git merge origin/develop
   ```
5. **No "Drive-by" Fixes:** If a developer working on the Gallery notices a typo in the Footer, they should **not** fix it in their `feat/page-gallery` branch. They should notify the team or create a separate quick-fix branch. Fixing unrelated files is the #1 cause of merge conflicts.

## 4. Git Commands to Initialize the Strategy

Run these commands from your `main` branch to set up the foundation:

```bash
# Create the main development branch
git checkout -b develop
git push -u origin develop

# Create the foundational feature branches for your team
git checkout develop
git checkout -b feat/design-tokens
git push -u origin feat/design-tokens

git checkout develop
git checkout -b feat/global-layout
git push -u origin feat/global-layout

git checkout develop
git checkout -b feat/core-ui
git push -u origin feat/core-ui
```
