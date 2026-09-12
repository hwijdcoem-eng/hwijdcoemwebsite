# HWI JDCOEM — Website Build Plan
**Role:** Lead Architect / Design Lead review of the master prompt, with concrete creative direction added.

---

## 0. Architect's Read on Your Brief (push-back, not just agreement)

Your original doc is unusually disciplined for a "hackathon-brain" college website spec — the no-DB, no-auth, data-driven-JSON-first stance is exactly right for a V1, and I'm keeping it. A few places I'm pushing back or tightening, since you asked me not to just nod along:

1. **"Animated network of nodes" hero is now a cliché, not a differentiator.** Every dev-community/tech-fest site in 2024–2026 has tried a particle/node network hero. If you build it as decoration, it reads as generated-template. I'm keeping the *concept* but changing the *execution*: the nodes must be **real HWI data** (actual member count, actual domains, actual event count) rendered as a network — not ambient decoration. Section 3 below spells this out.
2. **India map with pulsing dots** has the same problem — it's the default "we're pan-India" visual. I'm keeping it but making it content-driven (only render cities you actually have, no dot exists without a real chapter) and visually restrained rather than glowing/neon.
3. **Masonry gallery + lightbox** is fine — it's a solved UX pattern for photo grids, not a generic-AI tell. No change needed there.
4. **Dynamic icons** (your ask): static SVG icon packs (lucide, heroicons) are the single most common source of "this looks like every other site" in student-community projects, because everyone uses the same icons in the same style. Section 5 is a full system for this — it's the part of your brief that needed the most new thinking, so I spent the most effort there.
5. One structural addition you didn't ask for but should have: a **design tokens layer** (`src/styles/tokens.ts` or CSS custom properties) defined *before* any component work starts. Skipping this is why most React rebuilds end up with inconsistent spacing/color creep by page 4. This becomes Phase 2, non-negotiable.

Everything else (routes, no-auth, no-DB, phased build order, git strategy) is solid and I've kept it close to your original, just reorganized around the design system.

---

## 1. Design Token System (do this before any UI code)

Pin these down first so "non-generic" isn't a vibe, it's a spec every component inherits from.

### Color (name it, don't default to it)
Avoid the two AI-default palettes: warm-cream-with-terracotta, and near-black-with-one-neon-accent used decoratively everywhere. HWI's identity is **network/systems**, not "startup landing page." Suggested base:

| Token | Hex | Role |
|---|---|---|
| `--bg-void` | `#0A0E12` | Base background — a cold graphite-blue-black, not pure `#000`/`#0B0B0B` |
| `--bg-panel` | `#12171D` | Card/section surfaces |
| `--line` | `#22303A` | Hairlines, node connectors, dividers |
| `--ink` | `#E8EDF0` | Primary text |
| `--ink-dim` | `#8CA0AC` | Secondary text |
| `--signal` | `#4FD1C5` | Single accent — a signal/teal, "data pulse" color, used *only* for live/active states (not decoration) |
| `--signal-warm` | `#E8A33D` | Secondary accent — used only for achievements/highlights, never alongside `--signal` in the same component |

Two accents, each with one job, is deliberate — most generic builds use one accent for everything (links, buttons, badges, glows) until it means nothing.

### Type
- Display/headline: one distinctive geometric-technical sans (e.g. **Space Grotesk** or **General Sans**) — used at large sizes as an actual design element on Home/Team/Community, not just bigger body text.
- Body/UI: a neutral, highly legible sans (**Inter** or **IBM Plex Sans**) — clearly distinct weight/width from the display face.
- No monospace-for-data-labels tell, no tracked-out all-caps eyebrows above every heading — if you label a section, do it with a rule or numeral only where content is genuinely sequential (the About timeline, the certificate flow — not the Team or Gallery grids).

### Layout
- Left-aligned, not center-stacked-hero (center-stacked-hero-with-two-buttons is the single most default layout there is). Home hero: headline left, live network visualization right, asymmetric.
- Line length under ~75ch for body copy.
- Border-radius: pick **one** value system (e.g. 4px small / 12px large) and apply by hierarchy, not uniformly — cards, buttons, and images should not all share identical rounding like a SaaS kit.

### Principles (what makes this specific to HWI, not swappable to any other club)
- Every animated visual must be driven by real data (member count, event count, domain count) — nothing purely decorative.
- One orchestrated motion moment per page (not fade-slide-up on every section).
- Motion communicates state change (expand, filter, generate) more often than "content arrived on screen."

---

## 2. Non-Generic, Page-by-Page Creative Direction

### Home
Skip "Welcome to HWI." Skip the generic hero-with-two-CTAs-and-particle-background too, unless it's earning its place with real content. Structure:
- **Hero**: Headline (`BUILD. CONNECT. CREATE.` or better — write 3 options and pick the one most specific to HWI's actual domains, not to "tech communities" in general) on the left; on the right, a **live system diagram** — not ambient nodes, but an actual small render of HWI's structure: N members, N domains, N events this year, connected as a real (small) graph. It should look like a systems diagram, not stock hero art.
- One orchestrated load sequence (headline + diagram assemble together), then everything else is static until scroll/hover.
- Stats section: don't use the generic "big number, small label, gradient card" pattern for all four stats identically — vary emphasis, e.g. one large hero stat (total members) with the rest smaller and inline.

### Team — the signature page
Org tree is right, but the generic version is a static flowchart. Make it a **live filtering system**:
- Default view: the tree as a real hierarchy from data (President → VP → Domain leads → members).
- Clicking a domain (Web / Events / Marketing) doesn't just expand — it **re-renders the connector lines** with a draw-on animation (see icon/motion system §5), and dims non-selected branches instead of hiding them, so the "you are looking at a subset of a real org" feeling is preserved.
- Card reveal on click, not hover-only (hover-only breaks touch/mobile, and you already spec responsive collapse).

### Community
"ONE COMMUNITY. MANY CITIES." is a fine line, but pair it with an honest empty state if HWI only has 1–2 real chapters right now — don't inflate the map with placeholder pins. A single confident chapter card reads more credible than a sparse fake-looking map.

### Gallery
Masonry + filter + lightbox as specced. Differentiator: filter transitions should **reflow the grid with a shared-layout animation** (Motion's `layout` prop) rather than fade-out/fade-in the whole grid — this is the one place heavier motion is justified because it directly shows what changed.

### Certificates
This is a genuine functional differentiator most college club sites don't have — lean into it as a real "product moment," not just a form. Live preview updates on every keystroke; the QR/ID appears with a distinct reveal (not the same fade-up as everything else) since it's the payoff of the flow.

### About / Timeline
Vertical timeline as specced is fine and appropriate here — it's actually sequential content, so a numbered/stepped treatment is earned (unlike using numbers as generic decoration elsewhere).

---

## 3. Dynamic Icon & Motion System (your explicit ask)

Static SVG icon packs (lucide-react, heroicons) are fine as a *base*, but if every icon just sits there or does a generic hover-scale, it reads templated. Build a small internal system instead of hand-authoring every icon:

### 3.1 Architecture: `AnimatedIcon` wrapper, not one-off SVGs
```
components/icons/
    AnimatedIcon.tsx     // the shared behavior layer
    icon-registry.ts     // maps name -> path data + animation profile
    NodeIcon.tsx          // hero/network specific
```
- Store icons as **raw path data + viewBox** in a typed registry (`icon-registry.ts`), not as individual static `.svg` files. This lets every icon share one animation engine instead of each being a dead asset.
- `AnimatedIcon` accepts a `state` prop (`idle | hover | active | loading`) and drives the SVG via Motion for React: `pathLength` draw-on for outline icons, `scale`/`rotate` spring for state changes, `stroke` color interpolation tied to your `--signal` token — never a static color swap.
- This is genuinely lightweight (no WebGL, no Lottie files to ship) and satisfies your "looks heavy, isn't heavy" performance rule from the original brief.

### 3.2 Where icons should be "alive" vs. quiet
Be selective — animating every icon everywhere is the same mistake as animating every section. Reserve real motion for:
- **Nav icons**: active-route indicator morphs (not just color change) between routes.
- **Domain icons on Team page**: draw themselves in when a domain is selected — ties directly to the tree interaction in §2.
- **Certificate flow icons**: the generate/download icons should visibly *do something* (draw, check, pulse) since they represent a real state change.
- Everywhere else (footer links, generic UI chrome): keep icons static. Motion means nothing if it's everywhere.

### 3.3 The "network visual" as a generative icon, not an image
Your hero and Community-page node graphs should be built from the same `AnimatedIcon`/path-data system, generated at runtime from real counts in `src/data/community.ts` and `src/data/team.ts` — e.g., number of nodes = number of real chapters, connector count = real relationships. This is what makes it "dynamic" rather than a static decorative SVG, and it directly answers your ask.

### 3.4 Libraries
- **Motion for React** (already in your stack) — sufficient for everything above; no Lottie, no GSAP, no WebGL needed for icon-level motion.
- If you want a genuine "wow" icon moment later (e.g., a fully generative particle logo on the splash), that's the one place `Three.js`/`OGL` could be justified — evaluate only after V1 ships, per your own performance-first rule.

---

## 4. Technology Stack (unchanged from your brief, confirmed correct)

- React + Vite + TypeScript (strict)
- Tailwind CSS
- React Router
- Motion for React
- No state library needed for V1 (static/local data — Context is enough if anything is needed at all)
- Certificate PDF: `@react-pdf/renderer` (better typographic control for a certificate layout than `jsPDF + html2canvas`, which rasterizes and looks blurry on print) — trade-off: slightly heavier bundle, mitigate with route-level code splitting on `/certificates` only.
- QR code: `qrcode.react` (lightweight, SVG-based, fits the "no raster assets" principle above)
- Contact form: Vercel serverless function + a transactional email provider (Resend recommended over raw SMTP) — no Express, per your brief.

---

## 5. Data Architecture

```
src/data/
    team.ts            // id, name, role, parentId, department, image, github, linkedin
    events.ts           // title, slug, date, venue, category, gallery[], registrationUrl
    gallery.ts
    achievements.ts     // real, verified numbers only — no placeholders shipped to prod
    timeline.ts
    community.ts         // country, state, city, institution, chapter — empty array if no real chapters yet
    opportunities.ts     // built, route hidden from nav until launch
```
Every UI component takes this data via props/hooks — never imports a data file directly inside a leaf component — so swapping `src/data/*.ts` for Supabase queries later is a data-layer swap, not a UI rewrite.

---

## 6. Component Architecture

```
components/
    ui/            Button, Card, Badge, Modal, Avatar, SectionHeading
    layout/        Navbar, Footer, PageContainer
    animations/    FadeIn, Stagger, TextReveal, PageTransition
    icons/         AnimatedIcon, icon-registry, NodeIcon   ← new, from §3
    events/        EventCard, EventGrid, EventFilter
    team/          TeamTree, TeamNode, MemberCard
    gallery/       GalleryGrid, GalleryItem, Lightbox
    certificates/  CertificateForm, CertificatePreview
```

## 7. Routes

**Live in nav:** `/` `/about` `/team` `/events` `/events/:slug` `/community` `/gallery` `/certificates` `/contact`
**Built, hidden from nav:** `/opportunities` `/updates` `/collaborate`

## 8. Phased Build Order

| Phase | Scope |
|---|---|
| 1 | Project setup (Vite + TS + Tailwind + Router + Motion) |
| 2 | **Design tokens** (§1) — colors, type scale, spacing, radius system |
| 3 | Global layout (Navbar, Footer, PageContainer) |
| 4 | Splash screen (1–2s, sessionStorage gated, reduced-motion safe) |
| 5 | Home |
| 6 | About + timeline |
| 7 | Team tree + `AnimatedIcon` system (build the icon system here — Team is where it's proven out) |
| 8 | Events |
| 9 | Gallery |
| 10 | Achievements |
| 11 | Community |
| 12 | Certificate generator |
| 13 | Opportunities (hidden from nav) |
| 14 | Contact |
| 15 | Animation polish pass |
| 16 | Responsive optimization (320/375/425/768/1024/1440/1920) |
| 17 | Accessibility (focus states, ARIA, reduced motion, contrast) |
| 18 | SEO (titles, OG, sitemap, robots.txt) |
| 19 | Performance pass (lazy loading, code splitting, image formats) |
| 20 | Production deploy (Vercel) |

## 9. Git & Commits
- Branches: `main`, `develop`, `feat/<phase-name>` — never build directly on `main`.
- Conventional commits: `feat(team): add interactive team tree with animated icon draw-in`, `perf(gallery): optimize image loading`, etc.

## 10. Definition of Done (per phase)
Functionality works · TypeScript passes · lint passes · production build passes · desktop + mobile layout verified · reduced-motion behavior verified · accessibility acceptable · no unnecessary dependencies added · no unrelated feature broken.

## 11. Guardrails carried over from your brief (still correct, unchanged)
No login/auth/admin panel · no database for V1 · no fabricated stats, members, events, or social links · no private API keys in frontend code · no Express server unless a real requirement emerges.

---

## 12. Next Step

Before Phase 1 starts, I need you to hand me (or confirm placeholders for):
1. Real or provisional counts for members/domains/events (drives the Home hero diagram and Community map — see §0.1–0.2).
2. Actual chapter cities, if any exist yet, or confirmation the Community page ships with zero pins for now.
3. Confirmed brand type choices, or "pick for me" if you want me to lock Space Grotesk/Inter and move on.

Once I have those, Phase 1 (project setup) starts, following your original "inspect repo → report structure → explain plan → implement → verify" workflow exactly as specced.
