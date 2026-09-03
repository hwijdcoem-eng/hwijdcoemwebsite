
# Certificate Generation System Architecture & Implementation Manual

> **Scope & Confidentiality Notice**  
> This specification is an autonomous, complete technical architecture reference designed to allow an engineer or AI coding agent to independently reconstruct and deploy an enterprise-grade, client-rendered certificate generation and verification platform from scratch. All real participant records, API keys, database credentials, and proprietary secrets have been excised. All data structures, schemas, algorithms, and directory contracts documented herein reflect the actual, production-verified system.

---

## Table of Contents
1. [Part 1 — System Overview](#part-1--system-overview)
2. [Part 2 — Complete User Flow](#part-2--complete-user-flow)
3. [Part 3 — Admin / Event Creation Workflow](#part-3--admin--event-creation-workflow)
4. [Part 4 — Event Folder Structure](#part-4--event-folder-structure)
5. [Part 5 — Excel Data Format](#part-5--excel-data-format)
6. [Part 6 — Excel → JSON Pipeline](#part-6--excel--json-pipeline)
7. [Part 7 — data.json Schema](#part-7--datajson-schema)
8. [Part 8 — Event Discovery](#part-8--event-discovery)
9. [Part 9 — Lookup System](#part-9--lookup-system)
10. [Part 10 — Certificate Type System](#part-10--certificate-type-system)
11. [Part 11 — Template System](#part-11--template-system)
12. [Part 12 — Render Configuration](#part-12--render-configuration)
13. [Part 13 — Coordinate System](#part-13--coordinate-system)
14. [Part 14 — Font System](#part-14--font-system)
15. [Part 15 — Color System](#part-15--color-system)
16. [Part 16 — Long Name Handling](#part-16--long-name-handling)
17. [Part 17 — Canvas / Rendering Engine](#part-17--canvas--rendering-engine)
18. [Part 18 — PNG Generation](#part-18--png-generation)
19. [Part 19 — PDF Generation](#part-19--pdf-generation)
20. [Part 20 — Preview System](#part-20--preview-system)
21. [Part 21 — Error Handling](#part-21--error-handling)
22. [Part 22 — Performance Architecture](#part-22--performance-architecture)
23. [Part 23 — Mobile Performance](#part-23--mobile-performance)
24. [Part 24 — Security](#part-24--security)
25. [Part 25 — Scalability](#part-25--scalability)
26. [Part 26 — How to Add a New Event (Step-by-Step)](#part-26--how-to-add-a-new-event-step-by-step)
27. [Part 27 — Complete Reference Implementation](#part-27--complete-reference-implementation)
28. [Part 28 — Complete Pseudocode](#part-28--complete-pseudocode)
29. [Part 29 — Data Flow Diagrams](#part-29--data-flow-diagrams)
30. [Part 30 — Troubleshooting](#part-30--troubleshooting)
31. [Part 31 — Common Mistakes](#part-31--common-mistakes)
32. [Part 32 — Testing Checklist](#part-32--testing-checklist)
33. [Part 33 — Architectural Decisions](#part-33--architectural-decisions)
34. [Part 34 — What Another AI Needs to Know](#part-34--what-another-ai-needs-to-know)
35. [Part 35 — Recreation Guide (From Scratch)](#part-35--recreation-guide-from-scratch)

---

## Part 1 — System Overview

### The Problem It Solves
Educational institutions and technical forums run collegiate hackathons, workshops, coding challenges, and symposiums involving hundreds or thousands of attendees. Traditionally, distributing verifiable certificates requires:
- Generating thousands of static PDF/PNG files ahead of time (requiring gigabytes of storage and lengthy batch-export scripts), OR
- Expensive, slow server-side rendering pipelines (e.g., Headless Chromium/Puppeteer) that crash under high concurrent traffic when all students attempt to download certificates simultaneously after an event conclusion.

### How This System Solves It
This system shifts the computational workload entirely from the server to the client browser using a **Decoupled Configuration-Driven Static Architecture**:
1. High-resolution certificate artwork remains a single static image file (`.png`).
2. Participant data is stored in lightweight JSON files (`data.json`) generated automatically from administrative Excel spreadsheets (`.xlsx`).
3. Exact typographic parameters (coordinates, fonts, colors, baselines, max-width bounds) are decoupled into small JSON configuration files (`render-config.json`).
4. The client browser dynamically composites the participant's name onto the high-resolution template using the **HTML5 Canvas 2D API**, allowing instant live previews and instant downloads in lossless PNG or print-ready PDF formats.

### System Roles & Actors
- **Event Administrator**: Drops an attendance spreadsheet (`.xlsx`), certificate artwork template (`.png`), and typographic coordinate definition (`render-config.json`) into an event folder.
- **Student / Participant**: Visits the public portal, selects an event from a searchable/accessible dropdown, types their University Seat Number (USN) or Student ID, and clicks "Generate Certificate".
- **System Output**: Instantly returns a high-resolution, pixel-perfect visual preview and direct export buttons for **Lossless PNG** and **Vector-Scaled Vector/Canvas PDF**.

### End-to-End High-Level Flow
```
[Event Attendance Excel (.xlsx)]
             │
             ▼ (Server build/render scan)
  [autoGenerateDataJson] ──▶ [Normalized data.json]
                                   │
                                   ▼
 [User visits /certificates] ──▶ [Server scans folders & passes event list]
                                   │
                                   ▼
       [Client Dropdown UI] ──▶ User selects Event + enters USN
                                   │
                                   ▼
          [Client Fetch] ──▶ Downloads event's data.json over CDN
                                   │
                                   ▼
       [In-Browser Lookup] ──▶ Exact match on normalized uppercase USN
                                   │
                                   ├──▶ [Not Found] ──▶ Render friendly error
                                   │
                                   └──▶ [Found] ──▶ Extract Name & Certificate Type
                                                       │
                                                       ▼
      [Template & Config Fetch] ──▶ Load Type-Specific or Generic Config (.json)
                                ──▶ Load Template Asset (.png)
                                ──▶ Dynamically load custom fonts (.ttf/.otf)
                                                       │
                                                       ▼
       [HTML5 Canvas 2D Engine] ──▶ Paint template at 1:1 pixel resolution
                                ──▶ Iteratively scale font to fit maxWidth
                                ──▶ Draw text at (textX, textY) with textBaseline
                                                       │
                                                       ▼
          [Success State UI] ──▶ Display live Canvas dataURL preview
                                ──▶ User clicks "Download PNG" (<a> tag download)
                                ──▶ User clicks "Download PDF" (jsPDF client export)
```

---

## Part 2 — Complete User Flow

Below is the step-by-step lifecycle of an end-user interaction with data handling, executing components, and failure behaviors:

| Step # | User Action / Stage | What Happens Behind the Scenes | Component / Module | Failure Case & Handling |
|---|---|---|---|---|
| **1** | Open Portal | Next.js server scans `public/certificates/` for event folders, reads event metadata, and delivers initial HTML to client. | `app/certificates/page.tsx` (Server Component) | If directory is empty, falls back to a default event list. |
| **2** | View Events | Accessible custom dropdown renders available events with full keyboard navigation and light/dark theme support. | `CertificatesClient.tsx` (`visibleEvents` list) | If an event is intentionally excluded (e.g. `cyber-hunt`), it is filtered out from UI display. |
| **3** | Select Event | User chooses an event; state `selectedEvent` is updated with directory key (e.g., `HackSprint`). | Custom Combobox / Listbox in `CertificatesClient.tsx` | If user leaves it blank on submit, validation triggers: *"Please select an event and enter your USN."* |
| **4** | Enter USN / ID | User inputs their registration number (e.g., `cm24075`). | Controlled input (`setUsn`) with format hint | Empty or whitespace-only inputs trigger validation immediately. |
| **5** | Submit Request | User clicks "Generate Certificate" (or presses Enter). | `handleGenerate(e)` in `CertificatesClient.tsx` | Button immediately switches to loading state with spinner. |
| **6** | Fetch Event Data | Client fetches `/certificates/${selectedEvent}/data.json` via HTTP GET. | Browser `fetch()` API | If `data.json` returns 404 or corrupted JSON: displays *"Certificate data unavailable."* |
| **7** | Search & Normalize | Input USN is trimmed and uppercased: `targetUSN = usn.trim().toUpperCase()`. Scans `participants` array. | Array `.find()` in `CertificatesClient.tsx` | If USN is not present: displays user-facing warning *"No certificate found for this USN."* |
| **8** | Identify Certificate Type | Extracted participant object yields `participant.certificate` (e.g., `"participation"`, `"winner"`). | Extracted record string | If field missing: falls back to `"participation"`. |
| **9** | Load Template Image | Checks candidate image URLs in priority order (`[type].png`, `[type]-certificate.png`, `certificate.png`). | Native `window.Image()` async loader | If image 404s: displays *"Certificate template missing."* |
| **10** | Load Config & Fonts | Attempts fetch of `[type]-render-config.json`, then `render-config.json`. If custom font needed, loads `.ttf`/`.otf` dynamically via `FontFace`. | Browser `fetch()` + `document.fonts.add()` | If config fails, fallback defaults apply. If font fails, system fallback font renders safely. |
| **11** | Offscreen Composition | Creates offscreen HTML5 Canvas matching template's natural dimensions (`naturalWidth` × `naturalHeight`). Draws image, calculates font downscaling to fit inside `maxWidth`, and draws text. | HTML5 2D Canvas Context (`ctx.fillText`) | If canvas context cannot be acquired, displays *"Failed to initialize drawing canvas."* |
| **12** | Render Preview | Exports canvas to PNG Data URL (`canvas.toDataURL("image/png")`) and mounts animated preview card. | React state `setSuccessData(...)` | High-DPI canvas preview is displayed with responsive aspect ratio. |
| **13** | Download Action | User clicks "Download PNG" or "Download PDF". | DOM anchor click / `jspdf` dynamic import | Clean filename generated: `${Name}_${Event}_Certificate.[png|pdf]`. |

---

## Part 3 — Admin / Event Creation Workflow

The platform provides a dual workflow: **Automated Server Processing** for tabular data conversion and **Manual Placement** for high-fidelity graphic design and alignment.

```
[ADMIN WORKFLOW]
  ├── MANUAL: Create folder in public/certificates/<EventName>/
  ├── MANUAL: Place attendance spreadsheet (<EventName>.xlsx)
  ├── MANUAL: Place template image (participation.png, winner.png)
  ├── MANUAL: Place custom font if applicable (CustomFont.ttf)
  ├── MANUAL: Define typography in render-config.json
  │
  ▼
[BUILD / RUNTIME]
  ├── AUTOMATIC: Server scans folder on page load/build
  ├── AUTOMATIC: Detects missing data.json -> Parses .xlsx automatically
  ├── AUTOMATIC: Maps Name, USN, and Type columns -> Writes data.json
  └── AUTOMATIC: Registers event into portal dropdown menu
```

### Detailed Breakdown: Manual vs. Automatic

#### 1. Folder Creation (MANUAL)
The admin creates a directory under `public/certificates/`. The folder name serves as the unique identifier `id` (e.g., `HackSprint`, `TechTank`, `canva-event`).

#### 2. Spreadsheet Placement (MANUAL)
The admin drops the raw event registration/attendance spreadsheet (`.xlsx`) directly into the folder. Only one active `.xlsx` file is required. Temporary lock files created by Excel (starting with `~$`) are automatically ignored.

#### 3. Excel Processing & Validation (AUTOMATIC)
When the Next.js server renders or builds `/certificates`, `autoGenerateDataJson()` executes:
- Inspects the directory.
- If `data.json` does not exist, it parses the `.xlsx` file.
- Reads the first worksheet.
- Dynamically scans rows to locate the header row containing `usn` and `name` variants.
- Extracts, trims, normalizes, and packages participants.
- Automatically writes `data.json` to the directory.

#### 4. Template Artwork Placement (MANUAL)
The administrator exports the certificate graphic from Canva, Adobe Illustrator, or Figma as a 24-bit PNG with no participant name (leaving the recipient line blank).
- File naming: `participation.png` for general attendees, `winner.png` for awardees.

#### 5. Typography & Coordinate Configuration (MANUAL)
The admin creates `render-config.json` (or `[type]-render-config.json`) defining the exact pixel coordinates `(textX, textY)`, font size, font family, color, and `maxWidth` bounds.

#### 6. Custom Fonts (MANUAL, Optional)
If the certificate uses a non-standard font (such as calligraphy or decorative fonts like `GreatVibes`), the administrator places `GreatVibes.ttf` or `GreatVibes.otf` in the event directory.

#### 7. Event Discovery & Portal Registration (AUTOMATIC)
The server re-reads directory paths and exposes the event in the client dropdown without requiring code changes to page components.

---

## Part 4 — Event Folder Structure

The certificate subsystem resides inside the public asset directory (`public/certificates/`). This ensures all templates, fonts, configurations, and data files can be statically fetched by client browsers through CDN edge caching.

```
public/
└── certificates/
    ├── HackSprint/
    │   ├── HackSprint_Attendance_Present_Students.xlsx   # Source attendance spreadsheet
    │   ├── data.json                                      # Auto-generated participant DB
    │   ├── render-config.json                             # Typography & alignment config
    │   ├── participation-render-config.json               # (Optional) Category-specific config
    │   └── participation.png                              # High-resolution certificate artwork
    │
    ├── TechTank/
    │   ├── TechTank-List.xlsx                             # Source attendance spreadsheet
    │   ├── data.json                                      # Auto-generated participant DB
    │   ├── render-config.json                             # Typography & alignment config
    │   ├── participation-render-config.json               # Type-specific config
    │   └── participation.png                              # High-resolution certificate artwork
    │
    ├── canva-event/
    │   ├── Combined_Attendance_Report.xlsx                # Source attendance spreadsheet
    │   ├── data.json                                      # Auto-generated participant DB
    │   ├── participation-render-config.json               # Specific config with baseline: bottom
    │   └── participation.png                              # High-resolution certificate artwork
    │
    └── cyber-hunt/
        ├── data.json                                      # Participant DB
        ├── render-config.json                             # General config
        ├── winner-render-config.json                      # Winner-specific typography
        ├── participation-render-config.json               # Participant-specific typography
        ├── participation.png                              # Participant artwork
        ├── winner.png                                     # Winner artwork
        └── GreatVibes.ttf                                 # Bundled calligraphy font
```

### Purpose of Every File
- **`.xlsx`**: The source spreadsheet containing names and identification numbers collected during event registration.
- **`data.json`**: The compiled static JSON database containing normalized attendee names, USNs, and certificate types.
- **`participation.png` / `winner.png`**: High-resolution PNG certificate artwork without recipient names.
- **`render-config.json`**: Primary typography configuration for the event.
- **`[type]-render-config.json`**: Overrides `render-config.json` when specific categories (e.g., `winner` vs `participation`) require different coordinates, colors, or font sizes.
- **`.ttf` / `.otf`**: Optional custom font files loaded dynamically in the browser for this event.

---

## Part 5 — Excel Data Format

### Workbook & Sheet Specifications
- **File Format**: Standard Office Open XML Spreadsheet (`.xlsx`).
- **Sheet Index**: The parser reads **`workbook.SheetNames[0]`** (the first worksheet in the workbook).
- **Row Count**: Must contain at least two rows (one header row and at least one data row).

### Column Detection Rules (Fuzzy / Case-Insensitive)
Administrators do not need to rename spreadsheet headers to match a strict identifier. The parser applies intelligent heuristic detection:

| Logical Field | Header Matching Algorithm | Examples of Supported Headers |
|---|---|---|
| **USN / Student ID** | Scans for any cell containing `"usn"` (case-insensitive, trimmed). | `USN`, `Student USN`, `usn_number`, `University Seat No` |
| **Participant Name** | Prioritizes cells matching `("student" OR "participant") AND "name"`.<br>Fallback: matches `"name"` while explicitly excluding words: `"team"`, `"event"`, `"college"`, `"father"`, `"mother"`.<br>Second fallback: matches any cell containing `"name"`. | `Student Name`, `Participant Name`, `Full Name`, `Name` |
| **Certificate Type** | Scans for cells containing `"certificate"`, `"type"`, or `"winner"`. Optional. | `Certificate Type`, `Category`, `Winner/Participation` |

### Data Normalization & Cleaning Rules
1. **Empty Row Skipping**: Rows where both Name and USN are empty or whitespace are silently discarded.
2. **USN Formatting**: Converted to string, trimmed of leading/trailing spaces, and transformed to **UPPERCASE** (`String(val).trim().toUpperCase()`).
3. **Name Formatting**: Converted to string and trimmed of surrounding spaces (`String(val).trim()`).
4. **Certificate Type Assignment**:
   - If a certificate column is detected and has a value: trimmed and converted to **lowercase** (`String(val).trim().toLowerCase()`).
   - If no certificate column exists, or the cell is blank: defaults to `"participation"`.
5. **Duplicate Rows**: Currently, the parser appends each valid row to the participants array. Exact duplicates retain their entry; in-browser lookup uses `.find()`, which matches the first entry encountered.

### Generic Example Spreadsheet

| Student Name | University Seat Number | Certificate Category | College Email (Optional) |
|---|---|---|---|
| Student One | CM24001 | winner | student1@college.edu |
| Student Two | CM24002 | participation | student2@college.edu |
| Student Three | CM24003 | participation | student3@college.edu |
|  |  |  | *(Empty row: ignored)* |
| Student Four | cm24004 | *(blank: defaults to participation)* | student4@college.edu |

---

## Part 6 — Excel → JSON Pipeline

The translation from Excel spreadsheets into high-speed static JSON happens on the server side via the `xlsx` (SheetJS) library.

### Pipeline Execution Trigger
The pipeline runs inside `app/certificates/page.tsx` during server rendering or build-time static generation. If an event folder contains an `.xlsx` file but has no `data.json`, `autoGenerateDataJson(folderPath, folderName)` executes immediately.

### Pipeline Algorithm & Step-by-Step Logic
```
┌────────────────────────────────────────────────────────┐
│ Read directory for *.xlsx (ignoring ~$ lock files)      │
└───────────────────────────┬────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│ Parse first worksheet into Array of Arrays:            │
│ XLSX.utils.sheet_to_json(worksheet, { header: 1 })     │
└───────────────────────────┬────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│ Scan rows to identify Header Index (headerRowIdx):     │
│ - Find column with "usn"                               │
│ - Find column with "name" (filtering out team/college) │
│ - Find optional column with "certificate" / "type"     │
└───────────────────────────┬────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│ Iterate rows starting from (headerRowIdx + 1):         │
│ - Skip empty rows                                      │
│ - Extract name -> trim()                               │
│ - Extract USN -> trim().toUpperCase()                  │
│ - Extract type -> trim().toLowerCase() || "participation"│
│ - Push { name, usn, certificate } to participants      │
└───────────────────────────┬────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│ Map directory name to display name (e.g. canva-event   │
│ -> "Ctrl+Create", or format dashed strings to Title)   │
└───────────────────────────┬────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│ Write structured data.json with indentation (null, 2)  │
└────────────────────────────────────────────────────────┘
```

---

## Part 7 — data.json Schema

The `data.json` file represents the static participant database for an individual event.

### Full JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "EventCertificateDatabase",
  "type": "object",
  "required": ["eventName", "participants"],
  "properties": {
    "eventName": {
      "type": "string",
      "description": "The public display name for the event shown in headers and preview cards."
    },
    "certificateConfig": {
      "type": "object",
      "description": "Optional inline typographic configuration (fallback if render-config.json is omitted).",
      "properties": {
        "fontFamily": { "type": "string" },
        "fontSize": { "type": "number" },
        "textColor": { "type": "string" },
        "fontWeight": { "type": "string" },
        "textX": { "type": "number" },
        "textY": { "type": "number" },
        "textAlign": { "type": "string" },
        "textBaseline": { "type": "string" },
        "maxWidth": { "type": "number" },
        "shadow": { "type": "boolean" }
      }
    },
    "participants": {
      "type": "array",
      "description": "List of authorized certificate recipients.",
      "items": {
        "type": "object",
        "required": ["name", "usn", "certificate"],
        "properties": {
          "name": {
            "type": "string",
            "description": "Full student name as it will be rendered on the certificate."
          },
          "usn": {
            "type": "string",
            "description": "Normalized uppercase University Seat Number or Student ID."
          },
          "certificate": {
            "type": "string",
            "description": "Certificate category mapping directly to template filename: e.g. 'participation', 'winner'."
          }
        }
      }
    }
  }
}
```

### Generic Example `data.json`

```json
{
  "eventName": "HackSprint",
  "participants": [
    {
      "name": "Alex Mercer",
      "usn": "CM24001",
      "certificate": "winner"
    },
    {
      "name": "Jordan Lee",
      "usn": "CM24002",
      "certificate": "participation"
    },
    {
      "name": "Samira Khan",
      "usn": "CM24003",
      "certificate": "participation"
    }
  ]
}
```

---

## Part 8 — Event Discovery

The system uses an autonomous filesystem discovery pattern that eliminates the need to maintain an event registry array in source code.

### Discovery Logic (`app/certificates/page.tsx`)
1. **Directory Scanning**: Reads `public/certificates/` using Node.js `fs.readdirSync`. Filters out files to keep only subdirectories.
2. **Auto-Import Check**: For each folder, checks if `data.json` exists. If missing, attempts to trigger `autoGenerateDataJson(folderPath, folder)`.
3. **Metadata Extraction**: Reads `data.json` from the folder and extracts `data.eventName`. If missing or invalid, falls back to the folder name.
4. **Ordering & Priority**: Sorts events based on a chronological map or priority order:
   ```typescript
   const eventOrder: Record<string, number> = {
     "HackSprint": 1,
     "TechTank": 2,
     "canva-event": 3,
     "cyber-hunt": 4,
   };
   events.sort((a, b) => (eventOrder[a.id] ?? 99) - (eventOrder[b.id] ?? 99));
   ```
5. **Frontend Visibility Filtering**: In the client component (`CertificatesClient.tsx`), private or unreleased events can be excluded from the dropdown:
   ```typescript
   const visibleEvents = events.filter((e) => e.id !== "cyber-hunt");
   ```
6. **Graceful Fallback**: If `public/certificates` is missing or empty, the server returns a default fallback array (`[{ id: "default-event", name: "Default Event" }]`) to prevent SSR page crashes.

### Edge Case Matrix

| Scenario | System Behavior |
|---|---|
| Folder exists, `data.json` exists | Event successfully added to dropdown with `data.eventName`. |
| Folder exists, `data.json` missing, `.xlsx` present | Server runs `autoGenerateDataJson`, writes `data.json`, and loads event. |
| Folder exists, both `data.json` and `.xlsx` missing | Error logged to console; folder skipped from active events list. |
| Corrupted / Malformed `data.json` | Syntax error caught by `try/catch`; folder skipped cleanly without crashing the server. |
| `render-config.json` missing | System proceeds; client renderer uses internal default typography coordinates. |
| Template `.png` missing | Event loads in dropdown; when student submits USN, UI displays: *"Certificate template missing."* |

---

## Part 9 — Lookup System

Participant lookup is performed **client-side** against the downloaded event `data.json`. This removes database queries and API routes completely.

### Lookup Algorithm
1. **Form Input**: User enters USN into the text field.
2. **Sanitization**: Input is stripped of leading and trailing whitespace.
3. **Normalization**: Input is converted to standard uppercase (`targetUSN = usn.trim().toUpperCase()`).
4. **Array Evaluation**: Uses JavaScript's native `Array.prototype.find()`:
   ```typescript
   const participant = data.participants.find(
     (p) => p.usn.toUpperCase() === targetUSN
   );
   ```
5. **Branching**:
   - **Matched**: Extracts `participant.name` and `participant.certificate`. Advances to image composition.
   - **Unmatched**: Stops generation, resets loading state, and surfaces: `"No certificate found for this USN."`

### Key Security & Robustness Characteristics
- Case-insensitivity guarantees that `cm24075`, `Cm24075`, and `CM24075` resolve to the identical record.
- Submitting empty or space-filled strings is intercepted before network calls are dispatched.

---

## Part 10 — Certificate Type System

Different students earn different honors in the same event (e.g., General Participation vs. 1st Place Winner). The system dynamically supports multi-tier certificate rendering without duplicate code.

### Mapping Mechanism
1. **Data Assignment**: Each participant record contains `"certificate": "type_name"` (e.g., `"participation"` or `"winner"`).
2. **Template Mapping**: Maps directly to image filenames in the event folder:
   - Category `"participation"` ──▶ `/certificates/${selectedEvent}/participation.png`
   - Category `"winner"` ──▶ `/certificates/${selectedEvent}/winner.png`
3. **Configuration Inheritance**:
   The engine loads configuration with specific-to-generic inheritance:
   - **Step 1**: Attempt to fetch `/certificates/${selectedEvent}/${certType}-render-config.json`.
   - **Step 2**: If HTTP status is not 200 (404), fall back to generic `/certificates/${selectedEvent}/render-config.json`.
   - **Step 3**: If neither exists, fall back to built-in system defaults.

### Why This Matters
Winners often require distinctive visual treatments:
- A golden calligraphy font (e.g., `GreatVibes`) at font size 110px with bronze/gold text color (`#8B5A2B`).
- General participants require a formal serif font (e.g., `Cinzel`) at font size 64px with deep navy text color (`#3B1B94`).
Type-specific configuration files achieve this with zero code changes.

---

## Part 11 — Template System

### The Fundamental Architectural Concept
```
┌────────────────────────────────────────────────────────┐
│                 STATIC BASE TEMPLATE                   │
│  - Full resolution PNG artwork (e.g., 2000 × 1414 px)   │
│  - Borders, badges, signatures, college crest, titles   │
│  - Recipient name area intentionally left blank        │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│             DYNAMIC PARTICIPANT INJECTION              │
│  - Participant Name from data.json                     │
│  - Render Configuration (X, Y, Font, Color, Baseline) │
│  - In-Browser HTML5 Canvas composition                 │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│                 FINAL CERTIFICATE                      │
│  - Lossless composite ready for PNG/PDF download       │
└────────────────────────────────────────────────────────┘
```

### Why HTML/CSS Re-creation is NOT Used
Many web developers attempt to build certificates using HTML `<div>`s, CSS absolute positioning, and web fonts. This causes serious production issues:
- **Print & Viewport Discrepancies**: CSS points and percentages scale unpredictably across mobile viewports, high-DPI Mac Retina displays, and Windows screens.
- **Export Artifacts**: HTML-to-image converters (like `html2canvas`) suffer from blurry anti-aliasing, shifted text baselines, broken SVG borders, and dropped fonts.
- **Graphic Fidelity**: Designers create certificates in tools like Photoshop, Illustrator, or Canva with complex vector flourishes, metallic gradients, and security seals that cannot be cleanly replicated in CSS.

By treating the certificate as an immutable high-resolution raster asset and using Canvas only for recipient typography, visual fidelity is 100% identical on every device.

### Template Specifications
- **Format**: Lossless 24-bit PNG (`.png`).
- **Color Space**: sRGB.
- **Typical Dimensions**:
  - A4 Landscape at 150 DPI: `1754 × 1240 px`
  - A4 Landscape at 300 DPI: `3508 × 2480 px`
  - Custom Canvas standard: `2000 × 1414 px` (Aspect Ratio ~ `1.414:1`)
- **Naming Conventions Supported by Candidate Loader**:
  1. `${certType}.png` (e.g., `participation.png`)
  2. `${certType}-certificate.png`
  3. `Particiaption certificate.png` (supports common admin spelling variants)
  4. `participation certificate.png`
  5. `certificate.png`

---

## Part 12 — Render Configuration

The rendering configuration (`render-config.json` or `[type]-render-config.json`) defines all typographic layout variables in pure JSON.

### Complete Field Reference Table

| Field Name | Type | Required | Default Value | Description & Coordinate Impact |
|---|---|---|---|---|
| `textX` | `number` | Optional | `canvas.width / 2` | Horizontal coordinate on the canvas (in raw pixels) where text anchor is placed. |
| `textY` | `number` | Optional | `canvas.height * 0.52` | Vertical coordinate on the canvas (in raw pixels) where text anchor is placed. |
| `fontFamily` | `string` | Optional | `"Cinzel"` | Font name. Can be a system font or custom font bundled in the event folder. |
| `fontSize` | `number` | Optional | `72` | Initial target font size in pixels (`px`) before dynamic downscaling. |
| `fontWeight` | `string` | Optional | `"bold"` | CSS font weight: `"normal"`, `"500"`, `"600"`, `"bold"`. |
| `textColor` | `string` | Optional | `"#0d47a1"` | Fill color in Hex (`#3B1B94`), RGB, or CSS color string. |
| `textAlign` | `string` | Optional | `"center"` | Horizontal alignment anchor: `"center"`, `"left"`, `"right"`. |
| `textBaseline` | `string` | Optional | `"middle"` | Vertical alignment anchor: `"middle"`, `"bottom"`, `"top"`, `"alphabetic"`. |
| `maxWidth` | `number` | Optional | `canvas.width * 0.7` | Maximum horizontal bounding width in pixels before downscaling kicks in. |
| `shadow` | `boolean` | Optional | `false` | Whether drop-shadowing is active for the text. |

### Production Configuration Examples

#### Example A: Standard Serif Participation Certificate
```json
{
  "fontFamily": "Cinzel",
  "fontSize": 64,
  "fontWeight": "bold",
  "textColor": "#3B1B94",
  "textAlign": "center",
  "textBaseline": "middle",
  "textX": 746,
  "textY": 655,
  "maxWidth": 700,
  "shadow": false
}
```

#### Example B: Calligraphic Winner Certificate (With Custom Font)
```json
{
  "fontFamily": "GreatVibes",
  "fontSize": 110,
  "fontWeight": "normal",
  "textColor": "#8B5A2B",
  "textAlign": "center",
  "textBaseline": "middle",
  "textX": 1000,
  "textY": 750,
  "maxWidth": 1400,
  "shadow": false
}
```

#### Example C: Underline-Aligned Participation Certificate
```json
{
  "fontFamily": "Cinzel",
  "fontSize": 80,
  "fontWeight": "500",
  "textColor": "#7B1213",
  "textAlign": "center",
  "textBaseline": "bottom",
  "textX": 1000,
  "textY": 840,
  "maxWidth": 1400,
  "shadow": false
}
```

---

## Part 13 — Coordinate System

### Coordinate Origin & Dimensions
The Canvas coordinate space operates on a **top-left origin `(0, 0)`** in raw pixel units matching the template image's natural dimensions (`img.naturalWidth` × `img.naturalHeight`).

```
(0,0) ──────────────────────────────────────────────▶ +X (Width)
  │
  │                     Canvas Center
  │                    (width/2, height/2)
  │                            +
  │
  │                  (textX, textY)
  │                        ▼
  │               [  STUDENT NAME  ]  ◄─── maxWidth ───►
  │             ══════════════════════ (Printed line on template)
  ▼
 +Y (Height)
```

### Understanding `textAlign` and `textBaseline`

#### `textAlign = "center"`
`textX` represents the horizontal midpoint of the student's name. As the name grows or shrinks, it expands symmetrically to the left and right. This guarantees that names remain centered relative to the certificate layout.

#### `textBaseline = "middle"` vs `"bottom"`
- When certificates feature an open blank area with no pre-printed line, `"middle"` centers the name vertically inside that area.
- When certificates feature a printed line (e.g., `This is to certify that __________________`), using `"middle"` can cause descending letters (`g`, `y`, `p`, `j`, `q`) to strike through the line. Setting `"textBaseline": "bottom"` with `textY` placed 10–25 pixels above the graphic line ensures letters sit cleanly on top of the line.

### How to Calculate Coordinates for a New Template
1. Open the certificate template image in an image viewer or editor (Photoshop, GIMP, Figma, or Preview).
2. Note the total canvas dimensions (e.g., `2000 × 1414`).
3. Place a cursor at the exact horizontal center of where the name should sit. Read the X coordinate (usually `width / 2`, e.g., `1000`).
4. Read the Y coordinate at the desired vertical position.
5. Measure the distance between left and right visual boundaries (e.g., borders or crests) to establish `maxWidth`.

---

## Part 14 — Font System

### Font Sources
The platform supports two font categories:
1. **System & Web Fonts**: Fonts like `"Cinzel"`, `"Times New Roman"`, `"Georgia"`, `"Arial"` imported in the website's CSS.
2. **Bundled Certificate Fonts**: Custom TrueType (`.ttf`) or OpenType (`.otf`) files placed directly inside the specific event folder (e.g., `public/certificates/cyber-hunt/GreatVibes.ttf`).

### Dynamic Font Face Loading Mechanism
Before painting text onto the canvas, the client component dynamically checks and registers the font using the browser's CSS Font Loading API:

```typescript
// 1. Check if the font is already registered
const isLoaded = document.fonts.check(`12px "${fontFamily}"`);

if (!isLoaded) {
  try {
    // 2. Attempt TrueType (.ttf) download from event folder
    const fontUrlTtf = `/certificates/${selectedEvent}/${fontFamily}.ttf`;
    const fontTtf = new FontFace(fontFamily, `url(${fontUrlTtf})`);
    const loadedFont = await fontTtf.load();
    document.fonts.add(loadedFont);
    await document.fonts.ready;
  } catch (errTtf) {
    // 3. Fallback to OpenType (.otf) if TTF fails
    const fontUrlOtf = `/certificates/${selectedEvent}/${fontFamily}.otf`;
    const fontOtf = new FontFace(fontFamily, `url(${fontUrlOtf})`);
    const loadedFont = await fontOtf.load();
    document.fonts.add(loadedFont);
    await document.fonts.ready;
  }
}
```

### Font Selection Guidelines
- **Academic / Technical Hackathons**: Traditional serif typefaces with sharp serifs (e.g., `Cinzel`, `Trajan`, `EB Garamond`) convey formal accreditation.
- **Cultural / Design Events / Winner Honors**: Flourished calligraphic scripts (e.g., `GreatVibes`, `Pinyon Script`) elevate ceremonial value.
- **Font Weight Considerations**: Heavy bold fonts can look cramped on long names; `500` or `normal` weights often scale down more cleanly.

---

## Part 15 — Color System

### Configuration & Parsing
Text colors are defined in `render-config.json` via the `textColor` property using standard CSS color notations:
- **Hexadecimal**: `"#3B1B94"` (Deep Indigo), `"#7B1213"` (Burgundy), `"#8B5A2B"` (Bronze Gold).
- **RGB / RGBA**: `"rgba(13, 71, 161, 1)"`.

### Contrast & Aesthetics
1. **Never use pure black (`#000000`)**: Pure black text on a formal certificate can look harsh and utilitarian. Use rich deep tones that match the template's accent palette (e.g., navy blue `#0d47a1`, deep violet `#3B1B94`, or warm dark bronze `#4A3525`).
2. **Harmonize with Certificate Accents**: Sample the dominant decorative color from the certificate border or college logo.
3. **Contrast Ratio**: Ensure a contrast ratio of at least 4.5:1 against the template's background paper texture to guarantee legibility when printed.

---

## Part 16 — Long Name Handling

A common point of failure in certificate generators is text overflowing borders or wrapping onto multiple lines.

### Implemented Strategy: Iterative Width Measurement & Font Downscaling
The system enforces **single-line rendering** within a bounded `maxWidth` safety envelope using an iterative measurement loop:

```typescript
let finalFontSize = fontSize;
const maxTextWidth = renderConfig.maxWidth !== undefined 
  ? renderConfig.maxWidth 
  : canvas.width * 0.7;

ctx.font = `${fontWeight} ${finalFontSize}px ${fontFamily}`;
let textWidth = ctx.measureText(participant.name).width;

// Iteratively step down font size by 2px until string fits inside maxTextWidth
while (textWidth > maxTextWidth && finalFontSize > 24) {
  finalFontSize -= 2;
  ctx.font = `${fontWeight} ${finalFontSize}px ${fontFamily}`;
  textWidth = ctx.measureText(participant.name).width;
}
```

### Behavior Across Name Lengths
- **Short Name** (e.g., *"Eva Roe"*): Renders at full target size (e.g., `64px`).
- **Standard Name** (e.g., *"Alexander Montgomery"*): May downscale slightly (e.g., `58px`) to stay within `maxWidth`.
- **Very Long Name** (e.g., *"Dr. Mohammed Venkata Krishna Subramaniam"*): Scales down iteratively until it fits the width, bottoming out at the hard floor of `24px`.
- **Multi-line Text Wrapping**: *Not currently implemented.* All recipient names are constrained to a single horizontal line.

---

## Part 17 — Canvas / Rendering Engine

The certificate compositor executes entirely in the client browser using an offscreen `<canvas>` element.

```
┌────────────────────────────────────────────────────────┐
│ 1. Create offscreen canvas: document.createElement()   │
└───────────────────────────┬────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│ 2. Set canvas dimensions to match template:            │
│    canvas.width  = img.naturalWidth                    │
│    canvas.height = img.naturalHeight                   │
└───────────────────────────┬────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│ 3. Paint base artwork: ctx.drawImage(img, 0, 0)        │
└───────────────────────────┬────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│ 4. Configure context styles:                           │
│    ctx.fillStyle    = textColor                        │
│    ctx.textAlign    = textAlign                        │
│    ctx.textBaseline = textBaseline                     │
└───────────────────────────┬────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│ 5. Calculate dynamic font size and paint text:         │
│    ctx.fillText(participant.name, textX, textY)        │
└───────────────────────────┬────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│ 6. Export to base64 Data URL:                          │
│    canvas.toDataURL("image/png")                       │
└────────────────────────────────────────────────────────┘
```

### Resolution & Scaling
By setting `canvas.width = img.naturalWidth` and `canvas.height = img.naturalHeight`, the canvas operates at the **exact native resolution of the source artwork** (e.g., `2000 × 1414`), completely decoupled from screen CSS pixel scaling. When drawn on a high-DPI display or printed, there is zero pixelation or blurring.

---

## Part 18 — PNG Generation

### Export Pipeline
1. The canvas is serialized into a standard base64-encoded PNG Data URL:
   ```typescript
   const dataUrl = canvas.toDataURL("image/png");
   ```
2. The data URL is saved to component state (`successData.dataUrl`).
3. When the user clicks **Download PNG**, an invisible DOM anchor element is generated:
   ```typescript
   const link = document.createElement("a");
   const safeName = successData.studentName.replace(/\s+/g, "_");
   const safeEvent = successData.eventName.replace(/\s+/g, "_");
   link.download = `${safeName}_${safeEvent}_Certificate.png`;
   link.href = successData.dataUrl;
   link.click();
   ```
4. The browser triggers a direct file download. No server interaction or cloud storage upload is required.

---

## Part 19 — PDF Generation

PDF generation runs entirely client-side using `jspdf` via dynamic import, avoiding Node.js SSR build errors (since `jspdf` references `window`).

### Export Pipeline
```typescript
const downloadPDF = async () => {
  if (!successData) return;
  setLoading(true);
  try {
    // Dynamic import to prevent Next.js SSR build failures
    const { jsPDF } = await import("jspdf");

    const width = successData.naturalWidth;
    const height = successData.naturalHeight;

    // Initialize PDF with orientation matching template dimensions
    const pdf = new jsPDF({
      orientation: width > height ? "landscape" : "portrait",
      unit: "px",
      format: [width, height],
    });

    // Embed rendered PNG canvas frame into the PDF page at 1:1 scale
    pdf.addImage(successData.dataUrl, "PNG", 0, 0, width, height);

    const safeName = successData.studentName.replace(/\s+/g, "_");
    const safeEvent = successData.eventName.replace(/\s+/g, "_");
    pdf.save(`${safeName}_${safeEvent}_Certificate.pdf`);
  } catch (error) {
    console.error("Failure occurred while exporting PDF", error);
    setErrorMsg("Failed to export certificate PDF document.");
  } finally {
    setLoading(false);
  }
};
```

### Dimensional Fidelity
Because the PDF format dimensions are specified in pixels matching `[naturalWidth, naturalHeight]`, the resulting PDF preserves exact vector proportions and 1:1 raster scaling when printed on standard A4 or US Letter paper.

---

## Part 20 — Preview System

### When Preview Appears
- Before submission: The preview card is completely hidden.
- After successful lookup and canvas composition: The `successData` state is populated, mounting the preview card with an animated fade-and-slide entry (`animation: fadeInUp 0.6s ease forwards`).

### Mobile vs. Desktop Responsiveness
The rendered preview uses an `<img>` tag populated with the canvas Data URL:
```jsx
<img
  src={successData.dataUrl}
  alt="Certificate Preview"
  width={successData.naturalWidth}
  height={successData.naturalHeight}
  style={{
    width: "100%",
    height: "auto",
    aspectRatio: `${successData.naturalWidth} / ${successData.naturalHeight}`,
    borderRadius: "var(--radius-sm)",
    boxShadow: "var(--shadow-md)",
    display: "block",
  }}
/>
```
- **Desktop**: Previews inside a centered glassmorphism card (max width 680px).
- **Mobile**: Shrinks responsively to fit 100% of the screen width without horizontal overflow. The CSS `aspect-ratio` property reserves the exact layout height before the image renders, eliminating **Cumulative Layout Shift (CLS)**.

---

## Part 21 — Error Handling

The system implements defensive error boundaries across network, parsing, and rendering stages:

```
[User Action]
     │
     ├── Invalid USN / Blank Event ──▶ Validation Guard ──▶ "Please select an event and enter your USN."
     │
     ├── Network 404 on data.json ──▶ Fetch Catch ──▶ "Certificate data unavailable. Details: HTTP 404"
     │
     ├── USN Missing in Array ──▶ Lookup Guard ──▶ "No certificate found for this USN."
     │
     ├── Template 404 ──▶ Candidate URL Loop Exhausted ──▶ "Certificate template missing."
     │
     ├── Canvas Init Failure ──▶ Context Guard ──▶ "Failed to initialize drawing canvas."
     │
     ├── Font Loading Failure ──▶ Dynamic Font Catch ──▶ Silently falls back to serif/sans-serif
     │
     └── PDF Generation Failure ──▶ jsPDF Catch ──▶ "Failed to export certificate PDF document."
```

### Error State Matrix

| Error Scenario | Detection Point | User-Facing Notification | Console Diagnostic | Recovery Action |
|---|---|---|---|---|
| **Empty Input** | Form submit validation | *"Please select an event and enter your USN."* | Logged in debug flow | User enters valid input; form re-submits. |
| **Invalid USN** | Array `.find()` returns `undefined` | *"No certificate found for this USN."* | `Target USN CM... not found in participants list.` | Student checks registration spelling or contacts admin. |
| **Missing `data.json`** | `fetch('/certificates/ID/data.json')` returns `!res.ok` | *"Certificate data unavailable. Details: HTTP status: 404"* | `Failure occurred while: Loading JSON` | Admin checks that event folder contains `.xlsx` or `data.json`. |
| **Missing Image Template** | All candidate URLs fail in `img.onerror` loop | *"Certificate template missing. Details: Failed to load image resource..."* | `Failure occurred while: Loading certificate template` | Admin drops `participation.png` into event folder. |
| **Font File Missing** | `FontFace.load()` throws exception | *None (Silent degradation)* | `Failed to load TTF, trying OTF format...` | Renderer proceeds using standard system font fallback. |
| **Canvas Init Failure** | `canvas.getContext("2d")` returns `null` | *"Failed to initialize drawing canvas."* | `Could not acquire 2D canvas context.` | User checks hardware acceleration or updates browser. |
| **PDF Export Crash** | Dynamic import or `pdf.addImage()` throws | *"Failed to export certificate PDF document."* | `Failure occurred while: Exporting PDF` | User downloads lossless PNG instead. |

---

## Part 22 — Performance Architecture

### Zero-Server-Load Architecture
Because certificate rendering happens in the client browser, server CPU utilization is nearly zero:

```
TRADITIONAL SERVER-SIDE RENDERING (Puppeteer / Node Canvas)
Client ──▶ Server (Spawns Headless Chrome, allocates 150MB RAM, renders 2s) ──▶ Client
*Result: 500 concurrent students crash the server.*

THIS SYSTEM (Client-Side HTML5 Canvas + Static JSON)
Client ──▶ CDN Edge (Returns 5KB static JSON + cached PNG template) ──▶ Client Canvas Renders
*Result: 10,000 concurrent students download certificates with 0% server CPU spike.*
```

### Optimization Techniques
1. **INP (Interaction to Next Paint) Protection**: On form submission, the handler calls `await new Promise(resolve => setTimeout(resolve, 0))`. This yields execution back to the browser main thread so the loading spinner paints immediately before data fetching and canvas drawing begin.
2. **CDN Asset Caching**: Static templates (`.png`), fonts (`.ttf`), and databases (`data.json`) are immutable static assets served with aggressive cache headers from edge CDNs (Vercel Edge Network / Cloudflare).
3. **On-Demand PDF Loading**: The `jspdf` library (~300KB) is not included in the main application bundle. It is dynamically imported only when the user clicks "Download PDF".

---

## Part 23 — Mobile Performance

### Mobile-Specific Optimizations
- **Particle Animation Deactivation**: Interactive background canvas particles are disabled on mobile devices (`window.innerWidth <= 768 || window.matchMedia("(pointer: coarse)").matches`) to prevent battery drain and CPU throttling.
- **3D Card Tilting Bypass**: Mousemove 3D card perspective tilting is disabled on touch screens to eliminate touch-action layout reflows.
- **Responsive Dropdown**: The custom event dropdown features a maximum scrollable height (`max-height: 260px`) with touch scrolling and auto-scroll adjustment for focused options.
- **Zero CLS (Cumulative Layout Shift)**: The certificate preview image specifies both `width` and `height` attributes along with CSS `aspect-ratio` to reserve vertical space before the image loads.

---

## Part 24 — Security

### Public vs. Private Data Boundaries
- **Public Data**: Participant names, USNs, event names, and certificate awards are bundled into static `data.json` files.
- **Exclusion of Sensitive Data**: The Excel importer strictly extracts only three fields: `name`, `usn`, and `certificate`. Personal phone numbers, home addresses, CGPA/marks, and email addresses present in registration spreadsheets are **completely discarded** and never written to `data.json`.
- **API Keys & Secrets**: The certificate system requires **zero API keys, zero authentication tokens, and zero database connection strings**.
- **XSS Prevention**: Participant names are drawn using Canvas `ctx.fillText()`, which treats input strictly as raw text primitives, eliminating HTML injection and Cross-Site Scripting (XSS) vectors.

---

## Part 25 — Scalability

The architecture scales linearly across traffic tiers:

| Traffic Tier | Network Demand | Server CPU Impact | Client Device Impact |
|---|---|---|---|
| **10 Students** | ~1 MB total bandwidth | 0% (Static file serve) | Instant (<100ms render) |
| **100 Students** | ~10 MB cached at edge | 0% (Static file serve) | Instant (<100ms render) |
| **1,000 Students** | Served entirely from CDN cache | 0% (Static file serve) | Instant (<100ms render) |
| **10,000 Students** | Edge CDN absorbs all requests | 0% (Static file serve) | Instant (<100ms render) |

---

## Part 26 — How to Add a New Event (Step-by-Step)

Follow this 20-step guide to add a new event to the certificate portal:

### Step 1: Create Event Folder
Navigate to `public/certificates/` and create a directory named after your event using camelCase or dashes:
```bash
mkdir public/certificates/WebCraft
```

### Step 2: Prepare Attendance Spreadsheet
Collect your event's attendee spreadsheet in Excel format (`.xlsx`). Ensure it contains at least one column for the attendee's name and one for their USN/ID.

### Step 3: Validate Excel Columns
Confirm that the spreadsheet has clear headers (e.g., `Student Name` and `USN`). If you have different award categories, include a `Certificate Type` column with values like `winner` or `participation`.

### Step 4: Drop Spreadsheet into Event Folder
Copy the file into the directory:
```bash
cp attendance.xlsx public/certificates/WebCraft/WebCraft_Attendance.xlsx
```

### Step 5: Prepare Certificate Artwork
Export your certificate design from Figma, Canva, or Illustrator as a high-resolution PNG (e.g., `2000 × 1414` px). Ensure the recipient name field is left completely blank.

### Step 6: Save Artwork Templates
Save the exported image into the folder:
```
public/certificates/WebCraft/participation.png
public/certificates/WebCraft/winner.png   (optional, if winners have distinct artwork)
```

### Step 7: Inspect Artwork Dimensions
Open the PNG in an image viewer and record its native pixel width and height (e.g., Width: `2000`, Height: `1414`).

### Step 8: Calculate Text Coordinates
Identify where the recipient's name should appear:
- Horizontal center: `textX = width / 2` (e.g., `1000`).
- Vertical center: `textY` (e.g., `720`).
- Maximum width: `maxWidth` (e.g., `1300`).

### Step 9: Create `render-config.json`
Inside `public/certificates/WebCraft/`, create `render-config.json`:
```json
{
  "fontFamily": "Cinzel",
  "fontSize": 72,
  "fontWeight": "bold",
  "textColor": "#1A237E",
  "textAlign": "center",
  "textBaseline": "middle",
  "textX": 1000,
  "textY": 720,
  "maxWidth": 1300,
  "shadow": false
}
```

### Step 10: (Optional) Add Custom Font
If using a custom font like `GreatVibes.ttf`, copy it into `public/certificates/WebCraft/GreatVibes.ttf` and set `"fontFamily": "GreatVibes"` in your config.

### Step 11: (Optional) Add Category-Specific Config
If winners need different coordinates or colors, create `winner-render-config.json` alongside `render-config.json`.

### Step 12: Trigger Auto-Importer
Start your development server or run a build:
```bash
npm run dev
```
Navigate to `http://localhost:3000/certificates`. The server will detect the `.xlsx` file and automatically generate `data.json`.

### Step 13: Verify Generated `data.json`
Open `public/certificates/WebCraft/data.json` and confirm that all attendees and USNs were extracted properly.

### Step 14: Test Short Name Lookup
In the portal UI, select `WebCraft`, enter a USN with a short name (e.g., `CM24001`), and click "Generate Certificate". Check alignment.

### Step 15: Test Long Name Downscaling
Look up an attendee with a long name (e.g., 25+ characters). Confirm that the text downscales automatically and stays within the margins.

### Step 16: Test Invalid USN Error Handling
Enter a non-existent USN like `FAKE99999`. Verify that the portal displays: `"No certificate found for this USN."`

### Step 17: Test PNG Download
Click **Download PNG**. Open the downloaded file and check that the image resolution matches the original template.

### Step 18: Test PDF Download
Click **Download PDF**. Open the document in a PDF viewer and check print scaling and margins.

### Step 19: Test Mobile Responsiveness
Open browser DevTools, switch to a mobile viewport (e.g., iPhone 14, 390px width), and verify that the dropdown, preview image, and download buttons fit without horizontal overflow.

### Step 20: Commit & Deploy
Commit the new folder and deploy:
```bash
git add public/certificates/WebCraft
git commit -m "feat(certificates): add WebCraft event data and templates"
git push origin main
```

---

## Part 27 — Complete Reference Implementation

### Current Repository Architecture vs. Generic Recommended Recreation

| Architectural Layer | Current AURON Implementation | Generic Standalone Framework (Any Stack) |
|---|---|---|
| **Framework** | Next.js App Router (React 19 + TypeScript) | Any framework (Next.js, Remix, Astro, SvelteKit, or static HTML/Vite) |
| **Server Scanner** | `app/certificates/page.tsx` (Node.js `fs` readdir) | Build-time Node.js script or serverless function scanning `/certificates` |
| **Excel Parser** | `xlsx` (SheetJS) running during SSR/Build | `xlsx` or `exceljs` running in a pre-build CLI script |
| **Rendering Engine** | Browser HTML5 Canvas 2D API | Same (Universal web standard across all browsers) |
| **PDF Engine** | `jspdf` via dynamic browser import | `jspdf` or `pdf-lib` client-side |
| **Asset Location** | `public/certificates/[event]/` | Any public static folder or S3/Cloud Storage bucket |

---

## Part 28 — Complete Pseudocode

### 1. Server-Side Auto-Importer Pseudocode
```python
function autoGenerateDataJson(folderPath, folderName):
    files = list_directory(folderPath)
    xlsxFile = find file in files ending with ".xlsx" and not starting with "~$"
    if not xlsxFile:
        return False

    workbook = read_excel_file(folderPath + "/" + xlsxFile)
    firstSheet = workbook.sheets[0]
    rows = convert_sheet_to_rows_array(firstSheet)

    if length(rows) < 2:
        return False

    headerRowIndex = -1
    usnColIndex = -1
    nameColIndex = -1
    certColIndex = -1

    for r from 0 to length(rows) - 1:
        row = rows[r]
        sanitized = [lowercase(trim(string(cell))) for cell in row]
        uIdx = find index of cell containing "usn" in sanitized
        if uIdx != -1:
            nIdx = find index matching ("student" or "participant") and "name"
            if nIdx == -1:
                nIdx = find index matching "name" (excluding "team", "college", "event")
            if nIdx == -1:
                nIdx = find index containing "name"
            
            if nIdx != -1:
                headerRowIndex = r
                usnColIndex = uIdx
                nameColIndex = nIdx
                certColIndex = find index containing "certificate", "type", or "winner"
                break

    if headerRowIndex == -1:
        return False

    participants = []
    for r from (headerRowIndex + 1) to length(rows) - 1:
        row = rows[r]
        if row is empty: continue
        nameVal = row[nameColIndex]
        usnVal = row[usnColIndex]
        if not nameVal or not usnVal: continue

        name = trim(string(nameVal))
        usn = uppercase(trim(string(usnVal)))
        certType = "participation"
        if certColIndex != -1 and row[certColIndex]:
            certType = lowercase(trim(string(row[certColIndex])))

        participants.append({
            "name": name,
            "usn": usn,
            "certificate": certType
        })

    displayName = format_folder_name_to_title(folderName)
    outputData = {
        "eventName": displayName,
        "participants": participants
    }
    write_file(folderPath + "/data.json", json_serialize(outputData, indent=2))
    return True
```

### 2. Client-Side Lookup & Canvas Rendering Pseudocode
```javascript
async function generateCertificate(selectedEvent, rawUsn):
    if not selectedEvent or trim(rawUsn) is empty:
        showError("Please select an event and enter your USN.")
        return

    setLoading(true)
    // Yield to browser main thread for immediate UI paint
    await sleep(0)

    // 1. Fetch Event Database
    try:
        response = await fetch(`/certificates/${selectedEvent}/data.json`)
        eventData = await response.json()
    catch error:
        showError("Certificate data unavailable.")
        setLoading(false)
        return

    // 2. Lookup Participant
    targetUSN = uppercase(trim(rawUsn))
    participant = eventData.participants.find(p => uppercase(p.usn) == targetUSN)
    if not participant:
        showError("No certificate found for this USN.")
        setLoading(false)
        return

    certType = participant.certificate // e.g. "participation" or "winner"

    // 3. Load Template Image
    candidateUrls = [
        `/certificates/${selectedEvent}/${certType}.png`,
        `/certificates/${selectedEvent}/${certType}-certificate.png`,
        `/certificates/${selectedEvent}/participation.png`,
        `/certificates/${selectedEvent}/certificate.png`
    ]
    img = await loadFirstAvailableImage(candidateUrls)
    if not img:
        showError("Certificate template missing.")
        setLoading(false)
        return

    // 4. Load Render Configuration
    config = await fetchOptionalJson(`/certificates/${selectedEvent}/${certType}-render-config.json`)
    if not config:
        config = await fetchOptionalJson(`/certificates/${selectedEvent}/render-config.json`)
    if not config:
        config = DEFAULT_SYSTEM_CONFIG

    // 5. Load Custom Fonts if Defined
    if config.fontFamily is custom:
        await loadDynamicFont(selectedEvent, config.fontFamily)

    // 6. Canvas Composition
    canvas = document.createElement("canvas")
    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight
    ctx = canvas.getContext("2d")

    // Draw base certificate artwork
    ctx.drawImage(img, 0, 0)

    // Calculate dynamic font downscaling
    fontSize = config.fontSize || 72
    maxWidth = config.maxWidth || (canvas.width * 0.7)
    ctx.font = `${config.fontWeight} ${fontSize}px ${config.fontFamily}`

    while (ctx.measureText(participant.name).width > maxWidth and fontSize > 24):
        fontSize -= 2
        ctx.font = `${config.fontWeight} ${fontSize}px ${config.fontFamily}`

    // Draw text
    ctx.fillStyle = config.textColor || "#0d47a1"
    ctx.textAlign = config.textAlign || "center"
    ctx.textBaseline = config.textBaseline || "middle"
    
    textX = config.textX || (canvas.width / 2)
    textY = config.textY || (canvas.height * 0.52)
    ctx.fillText(participant.name, textX, textY)

    // 7. Output Result
    dataUrl = canvas.toDataURL("image/png")
    setSuccessData({
        studentName: participant.name,
        eventName: eventData.eventName,
        certificateType: certType,
        dataUrl: dataUrl,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight
    })
    setLoading(false)
```

---

## Part 29 — Data Flow Diagrams

### Diagram 1: Administrative Event Ingestion
```
[Event Spreadsheet (.xlsx)] ──▶ [public/certificates/<EventName>/]
                                            │
                                            ▼
                             [Next.js Server: page.tsx]
                                            │
                                  (Checks if data.json exists)
                                   ├── YES ──▶ Use existing data.json
                                   └── NO  ──▶ Run autoGenerateDataJson()
                                                     │
                                                     ▼
                                            [Write data.json]
```

### Diagram 2: Runtime Client Lookup & Composition
```
[User Browser]
      │
      ├── 1. Selects Event from Dropdown
      ├── 2. Inputs USN: "cm24001"
      └── 3. Clicks "Generate Certificate"
                   │
                   ▼
[GET /certificates/HackSprint/data.json]
                   │
                   ▼
        [In-Memory Array Search]
          targetUSN === "CM24001"
                   │
         ┌─────────┴─────────┐
         ▼                   ▼
    [NOT FOUND]           [FOUND]
         │                   │
         ▼                   ├── Extract Name: "Student One"
   Show Error Message        └── Extract Type: "participation"
                                     │
                                     ▼
                   [GET participation-render-config.json]
                   [GET participation.png]
                   [GET CustomFont.ttf (if needed)]
                                     │
                                     ▼
                        [Offscreen HTML5 Canvas]
                        1. ctx.drawImage(template)
                        2. Dynamic font scaling loop
                        3. ctx.fillText(name, textX, textY)
                                     │
                                     ▼
                   [canvas.toDataURL("image/png")]
                                     │
                                     ▼
                         [Mount Preview Image]
                         ├── Click PNG ──▶ <a> anchor download
                         └── Click PDF ──▶ jsPDF canvas export
```

---

## Part 30 — Troubleshooting

| Problem | Potential Cause | How to Diagnose | Resolution |
|---|---|---|---|
| **Event not appearing in dropdown** | Folder missing from `public/certificates/` or filtered out. | Check console logs during server build. Check if folder name is listed in exclusion filter (`visibleEvents`). | Ensure folder contains `.xlsx` or `data.json`. Remove folder name from frontend filter list if present. |
| **"No certificate found for this USN"** | USN typo, leading/trailing space in Excel, or omitted row. | Inspect `public/certificates/<Event>/data.json`. Search for USN. | Verify student was listed in the source Excel file. Check header detection in `autoGenerateDataJson`. |
| **Recipient name not rendering** | Text coordinates placed outside canvas boundaries or color matches background. | Inspect `render-config.json`. Compare `textX` and `textY` against template image width/height. | Adjust `textX` and `textY` to sit within canvas bounds. Ensure `textColor` provides adequate contrast. |
| **Name overlaps printed line** | `textBaseline` defaults to `"middle"`. | Check baseline setting in `render-config.json`. | Change `"textBaseline"` to `"bottom"` and place `textY` 10–20px above the printed line. |
| **Name text runs off edge** | `maxWidth` not configured or set too high. | Check `maxWidth` property in `render-config.json`. | Set `"maxWidth"` to `canvas.width * 0.7` (or explicit pixel boundary, e.g., `1200`). |
| **Wrong font rendering** | Custom font file failed to load or font family name mismatched. | Check browser Network tab for 404s on `.ttf`/`.otf` files. | Verify that font file name in the event directory matches the `fontFamily` string in `render-config.json`. |
| **Certificate preview blurry** | Canvas dimensions set via CSS instead of native pixel attributes. | Inspect canvas initialization code. | Ensure `canvas.width = img.naturalWidth` and `canvas.height = img.naturalHeight`. |
| **PDF download fails** | `jspdf` build/SSR conflict or invalid image data URL. | Check browser console for `window is not defined` or canvas export errors. | Use dynamic import `const { jsPDF } = await import("jspdf")` inside the click handler. |
| **Excel auto-importer fails** | Header row lacks recognizable "name" or "usn" column strings. | Check server terminal for `Missing required 'Name' or 'USN' columns`. | Ensure spreadsheet contains headers with words "Name" and "USN". |

---

## Part 31 — Common Mistakes

1. **Copying Coordinates Across Different Templates**: Copying `textX: 746, textY: 655` from an event with a 1500×1000px template to an event with a 3508×2480px template will place text in the wrong location. Always calculate coordinates based on the specific template's native dimensions.
2. **Hardcoding Participant Names in HTML**: Never attempt to overlay participant names using CSS `position: absolute` on top of an `<img>` element. This approach breaks on mobile devices and prevents clean PNG/PDF export.
3. **Leaving the Recipient Line in Artwork When Using Center Baseline**: If the designer left a pre-printed line on the certificate, using `"textBaseline": "middle"` will cause descending letters (`g`, `y`, `p`, `q`, `j`) to collide with the line. Use `"textBaseline": "bottom"` instead.
4. **Modifying Excel Spreadsheets While Server is Running**: Excel on Windows locks files by creating hidden `~$filename.xlsx` temporary files. Always close Excel before triggering server builds.
5. **Uploading Uncompressed 50MB TIFF/PNG Files**: Certificate templates should be web-optimized 24-bit PNGs, typically between 500KB and 2MB. Excessively large images cause mobile devices to run out of memory during canvas operations.

---

## Part 32 — Testing Checklist

Before deploying a new event, run through this verification checklist:

### Data Verification
- [ ] Source Excel file contains valid `Name` and `USN` columns.
- [ ] Header row is properly detected by the importer.
- [ ] Generated `data.json` contains the expected participant count.
- [ ] Participant USNs are uppercase and trimmed.
- [ ] Sensitive columns (phone numbers, emails) are not written to `data.json`.

### Template & Configuration
- [ ] Template PNG is present in the event directory with recipient name left blank.
- [ ] `render-config.json` coordinates correspond to template dimensions.
- [ ] Custom `.ttf` or `.otf` font file is present if specified in config.
- [ ] `maxWidth` is set to prevent text from touching certificate borders.

### Interactive Functionality
- [ ] Event appears in the portal dropdown menu.
- [ ] Entering a valid USN renders the correct participant name.
- [ ] Testing with a short name looks visually balanced.
- [ ] Testing with a long name downscales cleanly without clipping.
- [ ] Testing with a lowercase USN (e.g., `cm24001`) normalizes and succeeds.
- [ ] Entering an invalid USN shows the expected error message.
- [ ] Clicking "Download PNG" downloads the full-resolution image.
- [ ] Clicking "Download PDF" generates a correctly formatted PDF document.

### Responsiveness & Browser Compatibility
- [ ] Portal layout renders cleanly on mobile screen widths (360px–420px).
- [ ] Preview card fits the viewport without horizontal overflow.
- [ ] Tested and verified in Chromium, Firefox, and Safari (WebKit).

---

## Part 33 — Architectural Decisions

| Decision | Alternative Considered | Rationale & Code Evidence |
|---|---|---|
| **Client-Side Canvas vs. Server-Side Puppeteer** | Server-side Chromium / Puppeteer microservice | Generating PDFs on the server requires high memory (100–300MB per instance) and CPU. When hundreds of students request certificates at the end of an event, server queues spike and crash. Client-side Canvas offloads 100% of rendering work to user devices, reducing server load to static file delivery. |
| **Static JSON vs. SQL Database** | PostgreSQL / MongoDB database with API routes | Event rosters are immutable once an event concludes. Querying a database introduces network latency, connection pooling limits, and maintenance overhead. Static JSON files are cached at edge CDNs with sub-millisecond response times. |
| **Single Base Template Image vs. HTML/CSS Layout** | HTML/CSS overlay with `html2canvas` | Recreating intricate certificate borders, guilloche patterns, gold foil seals, and official signatures in HTML/CSS produces rendering discrepancies across browsers. An immutable 24-bit PNG guarantees 100% visual fidelity across all devices. |
| **Separation of Config from Data** | Embedding coordinates in `data.json` | Keeps participant data clean and standardized across events. Typographic coordinates are isolated to `render-config.json` so designers can adjust layout without touching participant records. |
| **Iterative Canvas Font Downscaling** | Multi-line text wrapping | Certificates follow formal legal conventions where recipient names must appear on a single continuous line. Downscaling font size preserves this convention while preventing border clipping. |

---

## Part 34 — What Another AI Needs to Know

### Mental Model & Execution Order
If you are an AI coding model asked to implement this certificate system in another repository or project, follow this exact sequence:

1. **Phase 1: Asset & Directory Structure**  
   Create the static directory structure under `public/certificates/[eventId]/` to house artwork (`participation.png`), configuration (`render-config.json`), and the data store (`data.json`).
2. **Phase 2: Event Discovery**  
   Build the server-side directory scanner that reads `public/certificates/`, detects available events, and provides the list to the client component.
3. **Phase 3: Client Form & Dropdown**  
   Implement the UI with event selection, USN input, and validation state handling.
4. **Phase 4: Client Lookup**  
   Implement the client-side data fetcher that loads `/certificates/[eventId]/data.json` and performs exact uppercase-normalized lookup on the input USN.
5. **Phase 5: Canvas Rendering Engine**  
   Create the offscreen canvas element, set dimensions to `img.naturalWidth` × `img.naturalHeight`, paint the template image, run the dynamic font scaling loop, and draw the recipient name.
6. **Phase 6: Custom Font Loader**  
   Use the browser `FontFace` API to load custom `.ttf`/`.otf` files dynamically if specified in the configuration.
7. **Phase 7: Export Handlers**  
   Implement the PNG export via `canvas.toDataURL()` and PDF export via dynamically-imported `jspdf`.
8. **Phase 8: Excel Auto-Importer**  
   Add the server-side Excel parser using `xlsx` to convert `.xlsx` spreadsheets to `data.json` automatically when missing.

### Common Failure Modes for AI Implementations
- **DO NOT** attempt to install Puppeteer or Chromium to generate certificates. The architecture is designed to be 100% client-rendered.
- **DO NOT** use `html2canvas`. Use the native HTML5 Canvas 2D API (`canvas.getContext('2d')`) directly.
- **DO NOT** hardcode canvas pixel dimensions to fixed numbers (like 800×600). Always read and assign the native template dimensions (`img.naturalWidth` and `img.naturalHeight`).

---

## Part 35 — Recreation Guide (From Scratch)

This section provides a self-contained code template to recreate the core system in any modern JavaScript/TypeScript framework.

### 1. The Importer (`scripts/import-excel.mjs`)
```javascript
import fs from "fs";
import path from "path";
import * as XLSX from "xlsx";

export function convertExcelToJson(folderPath) {
  const files = fs.readdirSync(folderPath);
  const xlsxFile = files.find(f => f.endsWith(".xlsx") && !f.startsWith("~$"));
  if (!xlsxFile) return false;

  const workbook = XLSX.readFile(path.join(folderPath, xlsxFile));
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  let headerIdx = -1, nameIdx = -1, usnIdx = -1, certIdx = -1;

  for (let r = 0; r < rows.length; r++) {
    const row = rows[r];
    if (!Array.isArray(row)) continue;
    const sanitized = row.map(c => c ? String(c).trim().toLowerCase() : "");
    const uIdx = sanitized.findIndex(c => c.includes("usn"));
    const nIdx = sanitized.findIndex(c => c.includes("name") && !c.includes("college") && !c.includes("team"));

    if (uIdx !== -1 && nIdx !== -1) {
      headerIdx = r;
      usnIdx = uIdx;
      nameIdx = nIdx;
      certIdx = sanitized.findIndex(c => c.includes("certificate") || c.includes("winner"));
      break;
    }
  }

  if (headerIdx === -1) return false;

  const participants = [];
  for (let r = headerIdx + 1; r < rows.length; r++) {
    const row = rows[r];
    if (!row || !row[nameIdx] || !row[usnIdx]) continue;
    participants.push({
      name: String(row[nameIdx]).trim(),
      usn: String(row[usnIdx]).trim().toUpperCase(),
      certificate: (certIdx !== -1 && row[certIdx]) ? String(row[certIdx]).trim().toLowerCase() : "participation"
    });
  }

  const output = {
    eventName: path.basename(folderPath),
    participants
  };

  fs.writeFileSync(path.join(folderPath, "data.json"), JSON.stringify(output, null, 2));
  return true;
}
```

### 2. The Browser Canvas Renderer (`renderCertificate.js`)
```javascript
export async function renderCertificate({ eventId, studentName, certType }) {
  // 1. Fetch Configuration
  let config = {};
  try {
    const res = await fetch(`/certificates/${eventId}/${certType}-render-config.json`);
    config = res.ok ? await res.json() : await (await fetch(`/certificates/${eventId}/render-config.json`)).json();
  } catch (e) {
    config = { fontSize: 72, fontFamily: "Cinzel", textColor: "#000000" };
  }

  // 2. Load Template Image
  const img = new Image();
  await new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;
    img.src = `/certificates/${eventId}/${certType}.png`;
  });

  // 3. Load Custom Font if needed
  const fontName = config.fontFamily || "Cinzel";
  if (!document.fonts.check(`12px "${fontName}"`)) {
    try {
      const font = new FontFace(fontName, `url(/certificates/${eventId}/${fontName}.ttf)`);
      const loaded = await font.load();
      document.fonts.add(loaded);
      await document.fonts.ready;
    } catch (e) {
      console.warn("Font loading failed, falling back to system font.", e);
    }
  }

  // 4. Composite on Canvas
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d");

  ctx.drawImage(img, 0, 0);

  let fontSize = config.fontSize || 72;
  const maxWidth = config.maxWidth || (canvas.width * 0.7);
  ctx.font = `${config.fontWeight || "bold"} ${fontSize}px ${fontName}`;

  while (ctx.measureText(studentName).width > maxWidth && fontSize > 24) {
    fontSize -= 2;
    ctx.font = `${config.fontWeight || "bold"} ${fontSize}px ${fontName}`;
  }

  ctx.fillStyle = config.textColor || "#000000";
  ctx.textAlign = config.textAlign || "center";
  ctx.textBaseline = config.textBaseline || "middle";

  const textX = config.textX !== undefined ? config.textX : canvas.width / 2;
  const textY = config.textY !== undefined ? config.textY : canvas.height * 0.52;

  ctx.fillText(studentName, textX, textY);

  return {
    dataUrl: canvas.toDataURL("image/png"),
    width: img.naturalWidth,
    height: img.naturalHeight
  };
}
```

### 3. Direct Download Triggers (`downloads.js`)
```javascript
export function downloadPNG(dataUrl, filename) {
  const link = document.createElement("a");
  link.download = `${filename}.png`;
  link.href = dataUrl;
  link.click();
}

export async function downloadPDF(dataUrl, width, height, filename) {
  const { jsPDF } = await import("jspdf");
  const pdf = new jsPDF({
    orientation: width > height ? "landscape" : "portrait",
    unit: "px",
    format: [width, height],
  });
  pdf.addImage(dataUrl, "PNG", 0, 0, width, height);
  pdf.save(`${filename}.pdf`);
}
```

---

*End of Architecture Documentation.*
