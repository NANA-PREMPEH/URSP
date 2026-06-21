# Ubuntu Rising Scholars Program (URSP) Portal

This repository contains the URSP web portal: a React + Vite frontend with a lightweight Node/Express backend for admissions guidance, SOP drafting support, visa interview coaching, and program discovery.

The application is designed for the Ubuntu Rising Scholars Program, a free mentorship initiative focused on helping African scholars pursue funded international study opportunities.

## What the App Does

The portal combines static program content with interactive planning and AI-assisted coaching tools:

- A branded landing experience with URSP philosophy, program distinctions, service descriptions, success stories, and FAQs
- A coordinator and founder profile directory with deep-linkable team profile views
- A configurable admissions tracker for degree and destination planning
- An SOP outline builder powered by OpenRouter when configured, with offline fallback output when it is not
- An F-1 visa interview simulator that reviews mock answers and suggests stronger alternatives
- A floating URSP AI advisor chatbot available across the app
- Shared API logic that runs locally through Express and in production through Vercel serverless functions

## Implemented Features

### 1. Portal shell and navigation

- Sticky desktop and mobile tab navigation for `home`, `team`, `tracker`, `sop`, and `visa`
- URL-driven tab state using the `?tab=` query parameter
- Cohort status banner with external LinkedIn CTA
- Responsive layout across desktop and mobile breakpoints
- Persistent floating chatbot available on every tab

### 2. Home tab experience

The `home` tab is built from several content sections:

- `HeroSection`
  - Main CTA to jump directly into the admissions tracker or SOP builder
  - URSP impact stats panel
  - Founder spotlight block
- `AboutSection`
  - Explains the Ubuntu philosophy behind the program
  - Clarifies that URSP is separate from the California-based Ubuntu Rising Scholars Academy
  - Highlights supported global study destinations
- `ProgramServices`
  - Graduate assistantship guidance
  - Strategic university mapping
  - SOP and essay coaching
  - Academic resume branding
  - Embassy visa simulations
  - English waiver navigation
- `SuccessSpotlight`
  - Search success stories by scholar name, major, university, or country
  - Filter by `Bachelors`, `Masters`, or `PhD`
  - Displays funding package details and destination universities
- FAQ accordion
  - Expand/collapse interaction for common URSP questions

### 3. Team profiles workspace

The `team` tab provides a browsable leadership directory:

- Founder spotlight card
- Full profile stage for the selected team member
- Directory of all founder/coordinator cards
- Deep-linking for profiles using `?tab=team&profile=<member-id>`
- Contact actions for email and LinkedIn
- Profile summary metrics such as total profiles, coordinator count, and represented universities

All profile data currently comes from `src/data.ts`.

### 4. Admissions tracker

The `tracker` tab is an interactive checklist planner for study-abroad preparation.

Core behavior:

- Degree selection: `Bachelors`, `Masters`, `PhD`
- Destination selection: `USA`, `Canada`, `UK`
- Automatic task customization based on the selected degree and destination
- Progress calculation with completed count and percentage bar
- Category filtering across `General`, `Academics`, `Tests`, `Essays`, `Visa`, and `Financials`
- Per-task note taking
- Reset-to-default flow with confirmation

Persistence details:

- Tracker state is saved in browser `localStorage`
- Storage keys are segmented by degree and destination, for example `ursp-tracker-Masters-USA`
- Progress is local to the user’s current browser and device

Task coverage currently includes 14 milestone steps such as:

- Passport and transcript preparation
- Program targeting and recommender planning
- SOP drafting and professor outreach
- Test preparation and fee waiver steps
- Application submission
- Visa or study permit preparation

### 5. SOP Architect

The `sop` tab helps users generate a structured SOP outline.

Inputs:

- Target degree
- Target major
- Academic background
- Motivation
- Key achievements
- Career goals

Implemented behaviors:

- Required-field validation before submission
- Demo prefill button for sample data
- POST request to `/api/sop/polish`
- Loading state while the outline is being generated
- Copy-to-clipboard support for the result
- Client-side rendering of Markdown-like headings and bullets
- Safety note warning users not to submit AI text verbatim

Output format:

- Academic branding summary
- Section-by-section SOP outline
- Tailored refinement tips

If `OPENROUTER_API_KEY` is missing, the feature still works in offline fallback mode and returns a locally generated SOP blueprint.

### 6. F-1 Visa Interview Simulator

The `visa` tab provides guided embassy interview practice.

Implemented behaviors:

- Select from a curated visa question bank
- Display a question-specific coaching tip before answering
- Validate that the answer is present and long enough for evaluation
- Demo prefill using a strong sample answer
- POST request to `/api/visa/feedback`
- Styled feedback sections for strengths, risk factors, and revised script recommendations

The current built-in question bank covers themes such as:

- Study intent
- Financial sponsorship
- Intent to return
- Academic progression
- GPA or academic gap explanations

If live AI access is unavailable, the route returns offline fallback coaching with safe default guidance.

### 7. Floating URSP AI Advisor

The chatbot is available globally from the bottom-right launcher.

Implemented behaviors:

- Opens/closes as a floating panel
- Starts with a seeded welcome message
- Accepts free-text questions
- Supports quick-start prompt buttons on a fresh conversation
- Sends the latest user input plus the last four message turns to `/api/guidance`
- Shows loading indicators and timestamped messages
- Supports full conversation reset with confirmation

The guidance assistant is tuned for:

- Graduate assistantships and funding
- English test waivers
- Target university guidance
- SOP guidance
- F-1 visa preparation

If no OpenRouter configuration is present, the chatbot returns offline topic-specific responses instead of failing completely.

## Backend and API Functions

The project has one shared server implementation in [src/server/urspApi.ts](/C:/Users/HP/Documents/GitHub/URSP/src/server/urspApi.ts) and two runtime styles:

- Local development/runtime through [server.ts](/C:/Users/HP/Documents/GitHub/URSP/server.ts)
- Production/serverless handlers under `api/`

### API routes

- `GET /api/health`
  - Returns `{ status: "ok", time: "<iso timestamp>" }`
- `POST /api/guidance`
  - Accepts a user message plus recent chat history
  - Returns advisor guidance in Markdown-style text
- `POST /api/sop/polish`
  - Accepts SOP profile details
  - Returns a structured SOP outline and branding guidance
- `POST /api/visa/feedback`
  - Accepts the selected visa question and the student’s draft answer
  - Returns coaching feedback and a revised response script

### AI integration behavior

- Environment variables are loaded from `.env.local` first, then standard environment sources
- OpenRouter is used as the LLM provider through `https://openrouter.ai/api/v1/chat/completions`
- `OPENROUTER_MODEL` controls which model/router is used and defaults to `openrouter/free`
- `APP_URL` or `VERCEL_URL` is used to set OpenRouter referer metadata when available
- The server validates that `OPENROUTER_API_KEY` looks like a real API key and not a URL-like value

### Offline fallback behavior

The app is intentionally usable without live AI credentials:

- Guidance chat returns canned help for funding, English waiver, and visa topics
- SOP builder returns a locally assembled outline blueprint
- Visa prep returns deterministic feedback and suggested script improvements
- Error messages point the user to the expected `OPENROUTER_API_KEY` setup

## Project Structure

```text
.
├─ api/
│  ├─ guidance.ts
│  ├─ health.ts
│  ├─ sop/polish.ts
│  └─ visa/feedback.ts
├─ src/
│  ├─ components/
│  ├─ server/urspApi.ts
│  ├─ App.tsx
│  ├─ data.ts
│  └─ types.ts
├─ server.ts
├─ vercel.json
└─ README.md
```

## Tech Stack

- React 19
- TypeScript
- Vite
- Express
- OpenRouter
- Tailwind CSS v4
- Lucide React icons

## Environment Variables

Create `.env.local` and set:

```env
OPENROUTER_API_KEY="YOUR_OPENROUTER_API_KEY"
OPENROUTER_MODEL="openrouter/free"
APP_URL="http://localhost:3000"
```

Notes:

- `OPENROUTER_API_KEY` is required for live AI responses
- `OPENROUTER_MODEL` is optional
- `APP_URL` is optional locally, but useful for production referer metadata

An example template is included in [.env.example](/C:/Users/HP/Documents/GitHub/URSP/.env.example).

## Run Locally

Prerequisite: Node.js

```bash
npm install
npm run dev
```

The local app runs at `http://localhost:3000`.

Other useful scripts:

```bash
npm run build
npm run preview
npm run start
npm run lint
```

## Deployment on Vercel

This repository is set up for Vercel with [vercel.json](/C:/Users/HP/Documents/GitHub/URSP/vercel.json).

Deployment notes:

- Build command: `npm run build`
- Frontend output directory: `dist`
- Production API routes are served from the `api/` directory
- SPA requests are rewritten to `index.html`

Required Vercel environment variables:

- `OPENROUTER_API_KEY`

Optional Vercel environment variables:

- `OPENROUTER_MODEL`
- `APP_URL`

## Current Scope and Limitations

The README should reflect the current implementation, not planned features. Right now:

- Most program content is hard-coded in [src/data.ts](/C:/Users/HP/Documents/GitHub/URSP/src/data.ts)
- There is no database, authentication, or admin CMS
- Tracker progress is stored only in local browser storage
- SOP drafts, visa practice, and chat history are not persisted across devices or sessions
- The application does not include a native intake/application form yet
- Destination-specific tracker support is currently limited to the USA, Canada, and UK
- Visa coaching is focused on F-1 interview preparation

## Summary

URSP is currently a polished admissions-support portal with:

- strong informational landing content
- searchable proof-of-success content
- a deep-linkable leadership directory
- a persistent admissions checklist
- AI-assisted SOP and visa prep workflows
- a floating guidance chatbot
- graceful offline fallbacks when AI credentials are missing

That makes it a practical hybrid of marketing site, mentorship hub, and admissions preparation workspace.
