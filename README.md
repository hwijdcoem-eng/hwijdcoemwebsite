# HackWithIndia (HWI) JDCOEM - Official Web Platform

Welcome to the official codebase for the **HackWithIndia (HWI) JDCOEM** web platform. This repository contains the source code for the command-center themed, highly interactive web application built to represent the HWI JDCOEM club, its events, and its community.

> **AGENT NOTICE**: This README is specifically designed to provide context to future AI agents and web developers maintaining this codebase. Please read the **Architecture**, **HUD Design System**, and **Certificate System** sections carefully before making modifications.

---

## 🏗 Architecture & Stack

The platform is built using a modern, highly optimized tech stack:
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router paradigm)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with a custom configuration.
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: `react-icons` (specifically the `Fi` feather icons suite)
- **PDF Generation**: `jspdf`

**Folder Structure Context:**
- `app/`: Contains all the Next.js routes (`/about`, `/team`, `/events`, `/certificates`, etc.).
- `components/ui/`: Reusable, heavily styled UI elements (Cards, Buttons, SectionHeadings).
- `components/layout/`: Global layout wrappers (Navbar, Footer).
- `data/`: Static data files (`team.ts`, `gallery.ts`) that populate the site without a database.
- `public/certificates/`: The localized file-based database for the Certificate Generation Portal.
- `utils/`: Helper functions (e.g., `cn` for Tailwind class merging, `certificateParser.ts` for CSV handling).

---

## 🎨 The HUD Design System

The most critical aspect of this codebase is its aesthetic. The user strictly requires a **"Cyberpunk / HUD / Command-Center"** theme. 

If you are modifying the UI, you **MUST** adhere to these principles:
1. **Colors**: Defined in `tailwind.config.ts`.
   - `void` (Deep Space Black) and `obsidian` (Dark Charcoal) for backgrounds.
   - `crimson` (`#FF1053`) and `signal` (`#00FF80`) for primary and secondary glowing accents.
   - `steel` and `chrome-dark` for borders and secondary text.
2. **Typography**: 
   - `font-display` (Orbitron) for main headers.
   - `font-ui` (Rajdhani) for interactive elements and subtext.
   - `font-glitch` (Share Tech Mono) for raw data or error states.
3. **The `Card` Component**: Almost all major UI blocks are wrapped in `<Card withGlow={true}>`. This component applies a complex `clip-path: polygon(...)` to create angled, futuristic corners. **Do not use standard rounded corners (`rounded-lg`) for major containers.**
4. **Interactions**: Inputs, buttons, and links should always have a hover/focus state that features a glowing drop shadow (`shadow-[0_0_15px_rgba(255,16,83,0.2)]`) and slow transition times (`duration-500` or `duration-700`).

---

## 🏆 Core Feature: The Certificate Portal

The most complex system in this repository is the **Certificate Generation Portal** (`/certificates`). The client requested a completely database-free architecture. 

### How It Works:
1. **No Database**: Instead of a traditional DB, the system relies entirely on static folders inside `public/certificates/<event-id>/`.
2. **Event Configuration**: An event folder requires a `data.json` file containing an array of participants (`name`, `usn`, `certificate`).
3. **CSV Support**: The system includes a Node script (`utils/certificateParser.ts`) that can convert Google Sheet CSV exports directly into the `data.json` format. 
   - *Feature*: If the CSV lacks a "USN" column, the parser automatically generates sequential USNs (e.g., `HWI001`, `HWI002`).
4. **Dynamic Canvas Rendering**: In `CertificatesClient.tsx`, the system fetches a blank `.png` template from the event folder, draws it onto an HTML5 `<canvas>`, and precisely overlays the participant's name on top.
5. **Dynamic Styling (`render-config.json`)**: If the default purple serif font doesn't match an event's template, a `render-config.json` file can be placed in the event folder to dynamically override the `fontFamily`, `fontSize`, `textColor`, and `fontWeight`.
   - *Note*: `textY` is intentionally omitted from the config so the system dynamically calculates the exact vertical center (`canvas.height * 0.52`).

### Adding a New Certificate Event:
1. Create a folder: `public/certificates/new-event/`
2. Add the blank template: `public/certificates/new-event/participation.png`
3. Export your Google Sheet as `.csv` and place it in the folder as `participants.csv`.
4. Run the parser: `npx ts-node utils/certificateParser.ts`
5. *(Optional)* Add a `render-config.json` to change the font color.
6. Open `app/certificates/page.tsx` and add `{ id: "new-event", name: "New Event 2026" }` to the `events` array.

---

## 🌐 Other Core Features

### 1. Dynamic Gallery System (`/gallery`)
Features a toggleable view between a standard masonry grid and a highly immersive 3D-perspective Carousel (`EventCarousel.tsx`). Images are populated via `data/gallery.ts`.

### 2. Secure Comms (`/contact`)
A fully styled, animated contact form. The success state features cinematic slide-up animations. The form currently posts to `/api/contact`.

### 3. Team & Community (`/team`, `/community`)
Static directories. To add a new team member or update a bio, edit the `data/team.ts` file. Do not hardcode new members into the page components directly.

---

## 🚀 Local Development

1. **Install Dependencies**: 
   ```bash
   npm install
   ```
2. **Run the Development Server**:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3000` with your browser.

## 🤝 Deployment
The repository is fully optimized for **Vercel** or **Netlify**. Simply connect the `main` branch to your deployment provider of choice. The `npm run build` command has been rigorously tested and passes with 0 static generation errors.

---
*Built for the HackWithIndia JDCOEM Chapter.*
