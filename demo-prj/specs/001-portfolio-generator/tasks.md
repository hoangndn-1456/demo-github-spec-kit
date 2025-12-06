# Tasks: Digital CV / Portfolio Generator

**Feature**: Portfolio Generator
**Status**: Draft

## Phase 1: Setup

*Goal: Initialize the project structure and development environment.*

- [x] T001 [P] Initialize React+Vite project with TypeScript in `portfolio-app/` (ensure clean slate)
- [x] T002 Configure Tailwind CSS and PostCSS in `tailwind.config.ts` and `postcss.config.js`
- [x] T003 Install project dependencies (jszip, ajv) via `package.json`
- [x] T004 [P] Setup directory structure (components, hooks, lib, templates) according to plan

## Phase 2: Foundational

*Goal: Core utilities and shared state management that facilitate user stories.*

- [x] T005 [P] Create JSON schema for profile data in `src/data/schema.json` based on data-model.md
- [x] T006 Implement validation utility using AJV in `src/lib/validation.ts`
- [x] T007 Implement localStorage hook `usePortfolio.ts` in `src/hooks/` for state persistence
- [x] T008 [P] Define TypeScript interfaces for Profile, Work, Projects in `src/types.ts`
- [x] T009 Create Basic Template HTML structure in `src/templates/basic/index.html`
- [x] T010 Create Basic Template CSS in `src/templates/basic/style.css`

## Phase 3: User Story 1 - Create Portfolio via Form (Priority: P1)

*Goal: Users can enter data and see a live preview.*

- [x] T011 [US1] Create form components for Profile Basics in `src/components/editor/BasicsForm.tsx`
- [x] T012 [US1] Create form components for Experience/Work in `src/components/editor/WorkForm.tsx`
- [x] T013 [US1] Create form components for Projects in `src/components/editor/ProjectsForm.tsx`
- [x] T014 [US1] Assemble main Editor component in `src/components/editor/Editor.tsx` using sub-forms
- [x] T015 [US1] Implement Live Preview component `src/components/preview/Preview.tsx` rendering Basic Template
- [x] T016 [US1] Wire up Editor and Preview in `src/App.tsx` with split-screen layout
- [x] T017 [US1] Implement ZIP export logic in `src/lib/export.ts` (inject data into template, bundle assets)
- [x] T018 [US1] Add "Export" button in `src/components/Header.tsx` triggering the download

## Phase 4: User Story 2 - Import Profile Data (Priority: P2)

*Goal: Users can upload existing JSON data.*

- [x] T019 [US2] Create Import button and file handler in `src/components/Header.tsx`
- [x] T020 [US2] Implement JSON parsing and validation logic in `src/lib/import.ts`
- [x] T021 [US2] Integrate import logic to update `usePortfolio` state

## Phase 5: User Story 3 - Print-Friendly View (Priority: P3)

*Goal: Users can print their portfolio as a CV.*

- [x] T022 [US3] Add print-specific styles to `src/styles/global.css` (hide editor, format preview for A4)
- [x] T023 [US3] Verify and adjust Basic Template CSS `src/templates/basic/style.css` for print media queries

## Phase 6: Polish & Cross-Cutting

- [x] T024 [P] Implement Creative Template (alternative theme) in `src/templates/creative/`
- [x] T025 Add Template Switcher UI in `src/components/Header.tsx`
- [x] T026 Implement image size validation/resizing in `src/lib/image.ts`
- [x] T027 Final E2E smoke test verifying import -> preview -> export flow

## Dependencies

- **T005-T008** (Foundation) must complete before **Phase 3** (Editor/Preview implementation).
- **T009-T010** (Basic Template) must complete before **T015** (Preview) and **T017** (Export).
- **US1** (Forms & Preview) is a prerequisite for **US2** (Import) to effectively visualize loaded data.

## Parallel Execution Opportunities

- T001 and T004 can be done in parallel.
- T005, T008, T024 can be developed alongside component scaffolding.
- T009/T010 (Templates) can be built by a designer while T011-T014 (Forms) are built by a dev.

## Implementation Strategy

1.  **MVP (Phase 1-3)**: Focus on getting the Editor, Basic Template Preview, and Export working. This delivers the core value.
2.  **Enhancement (Phase 4)**: Add Import functionality.
3.  **Refinement (Phase 5-6)**: Add print styles, second template, and polish.
