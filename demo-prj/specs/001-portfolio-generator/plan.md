# Implementation Plan: Digital CV / Portfolio Generator

**Branch**: `001-portfolio-generator` | **Date**: 2025-12-06 | **Spec**: [specs/001-portfolio-generator/spec.md](spec.md)
**Input**: Feature specification from `specs/001-portfolio-generator/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Build a client-side only, static web application that generates portfolio sites. Users verify their profile via a real-time preview and export the result as a downloadable ZIP file containing a standalone static site. The system uses React/Vite for the generator and standard HTML/CSS templates for the output.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 18+ (for dev tooling)
**Primary Dependencies**: React 18, Vite (bundler), JSZip (export), TailwindCSS (styling), AJV (JSON validation)
**Storage**: localStorage (for session persistence), no backend database
**Testing**: Vitest (unit), Playwright (E2E)
**Target Platform**: Modern Web Browsers (Chrome, Firefox, Safari, Edge)
**Project Type**: Web Application (Static SPA)
**Performance Goals**: Time-to-Interactive < 1.5s, Export time < 5s for typical profile
**Constraints**: Zero backend dependency, Client-side only processing, Mobile-first design
**Scale/Scope**: Single user session, local data only

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

*   **Static-first delivery**: PASSED. The core output is a static HTML/CSS/JS bundle.
*   **Separation of Spec vs Implementation**: PASSED. Plan details HOW, Spec detailed WHAT.
*   **Accessibility & SEO baseline**: PASSED. Designs will use semantic HTML and include meta tags.
*   **Privacy & No PII storage by default**: PASSED. Data stays in browser/localStorage.
*   **Minimal dependencies**: PASSED. Using Vite/React for dev, vanilla/minimal libs for output.
*   **Mock data first**: PASSED. Will use `example-data.json` for initial dev.
*   **Responsive & Mobile-first**: PASSED. Tailwind usage ensures responsive design.
*   **Testable Acceptance Criteria**: PASSED. E2E tests will cover user flows.
*   **Performance baseline**: PASSED. Static assets and lazy loading planned.
*   **Simple theming & export**: PASSED. Two templates and ZIP export planned.

## Project Structure

### Documentation (this feature)

```text
specs/001-portfolio-generator/
├── plan.md              # This file
├── research.md          # Strategy and decisions
├── data-model.md        # Schema definitions
├── quickstart.md        # Dev guide
├── contracts/           # API contracts (N/A for purely client-side)
└── tasks.md             # Execution tasks
```

### Source Code

```text
src/
├── assets/               # Static assets (images, icons)
├── components/           # React components (Editor, Preview, etc.)
│   ├── preview/          # Live preview components
│   └── editor/           # Form input components
├── data/                 # JSON schema, mock data
├── hooks/                # Custom React hooks (usePortfolio, useExport)
├── lib/                  # Utilities (zip, storage, validation)
├── styles/               # Global styles, Tailwind config
├── templates/            # HTML/CSS templates for export
│   ├── basic/
│   └── creative/
├── App.tsx               # Main entry point
└── main.tsx              # React root

tests/
├── unit/                 # Vitest tests for lib/ and hooks/
└── e2e/                  # Playwright tests for full user flows
```

**Structure Decision**: Standard React/Vite SPA structure with a dedicated `templates/` directory to isolate the downloadable static site assets from the generator application code.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| React Framework | Complex state management for live preview and form data | Vanilla JS would require reinventing state sync and DOM updates, increasing bug risk |
| JSZip | Client-side ZIP creation | No backend to handle file compression |
