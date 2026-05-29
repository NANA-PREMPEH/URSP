# URSP Feature Gap Crosscheck

This checklist captures the major advanced or enhancement features that are still missing from the current portal and are worth reviewing before implementation.

## Quick observations from the current codebase

- Content like team profiles, success stories, FAQs, tracker tasks, and visa questions is hard-coded in `src/data.ts`.
- The admissions tracker is browser-only state with `localStorage` persistence in `src/components/AdmissionsTracker.tsx`.
- The backend in `server.ts` currently exposes only three AI flows: guidance chat, SOP drafting, and visa feedback.

## Highest-impact missing features

- [ ] Build a native interest list or cohort application form
  Current gap: users are pushed to LinkedIn for inquiries, so there is no first-party lead capture or application workflow inside the portal.

- [ ] Add scholar accounts with cross-device saved workspaces
  Current gap: tracker progress is stored locally in one browser, while SOP drafts, visa feedback, and chat history do not persist across devices or sessions.

- [ ] Create one shared scholar profile across all tools
  Current gap: degree target, destination, SOP data, and visa prep answers are entered separately, so the experience is not truly personalized end to end.

- [ ] Add deadline reminders and calendar sync
  Current gap: the tracker is useful but fully manual, with no alerts, email reminders, or Google Calendar export for real admissions timelines.

## Guidance and planning upgrades

- [ ] Build a school, funding, and scholarship recommendation engine
  Current gap: there is no searchable university database, funding-fit matcher, or faculty/program discovery workflow.

- [ ] Add a professor outreach and application CRM
  Current gap: there is no place to track cold emails, fee waivers, recommenders, document submissions, or per-school application status.

- [ ] Add a CV/resume builder and document vault
  Current gap: users can only type or paste text manually; there is no upload, parsing, storage, or export flow for core admissions documents.

- [ ] Upgrade the SOP builder into a revision studio
  Current gap: the current SOP tool returns one generated result only, without version history, rubric scoring, side-by-side edits, or export-ready formats.

- [ ] Upgrade visa prep into a full mock interview system
  Current gap: the visa feature is text-only and question-by-question, with no timed simulation, score history, voice practice, or session replay.

- [ ] Ground the AI advisor in a real URSP knowledge base
  Current gap: the chatbot currently relies on prompt instructions and short chat history, not retrieval from verified URSP resources, policies, or cohort updates.

## Program operations and scale features

- [ ] Add mentor matching and session booking
  Current gap: there is no intake routing, mentor assignment, workshop registration, or appointment scheduling system.

- [ ] Build an admin dashboard or lightweight CMS
  Current gap: updating stories, FAQs, cohort notices, and team members currently requires code edits instead of non-technical content management.

- [ ] Add scholar progress analytics and outcome tracking
  Current gap: there is no visibility into which tools are used most, where students drop off, or how many scholars convert from inquiry to funded placement.

- [ ] Add privacy, consent, and AI safety controls
  Current gap: there is no visible consent layer, data handling notice, retention control, rate limiting, or sensitive-input protection for student data.

- [ ] Expand destination-specific workflows beyond the current scope
  Current gap: the brand messaging mentions many study destinations, but the tracker supports only USA, Canada, and UK, while visa prep is centered on F-1.

- [ ] Add export and reporting tools
  Current gap: there is no PDF, print, or shareable export for tracker progress, SOP outputs, or visa coaching reports.

## Quality and accessibility enhancements

- [ ] Run a full accessibility pass
  Current gap: there is no evidence of a dedicated accessibility review for keyboard-only use, screen readers, motion sensitivity, or clearer semantic feedback.

- [ ] Add multilingual support
  Current gap: the experience is English-only even though the audience is broad and international.

- [ ] Add deeper proof and trust content for success stories
  Current gap: success stories are helpful, but there is no extended case-study view, richer filtering, or stronger trust-verification layer.
