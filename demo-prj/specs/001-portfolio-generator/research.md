# Research & Strategy

## Architecture
**Decision**: Single Page Application (SPA) using React + Vite.
**Rationale**: React provides a robust component model for handling the complex state of the profile form and synchronizing it with the live preview. Vite offers excellent developer experience and optimized builds.
**Alternatives**:
- Next.js: Rejected because server-side features are unnecessary and might complicate the "static-only" requirement for the output.
- Vanilla JS: Rejected due to the complexity of managing DOM updates for a rich interactive form and preview.

## Rendering & Templates
**Decision**:
1. **Live Preview**: Rendered using React components that mirror the structure of the export templates. This ensures immediate feedback.
2. **Export**: Content is injected into pre-built HTML strings (handlebars-style or template literals) at export time. This avoids shipping the entire React runtime in the exported portfolio, keeping it lightweight.
**Rationale**: Keeps the exported site purely static and extremely performant/lightweight (HTML+CSS only) while allowing a rich editing experience.

## Export Workflow
**Decision**:
1. User clicks "Export".
2. System validates data against schema.
3. System reads `templates/{selected}/index.html` and assets.
4. System replaces placeholders in HTML with user data.
5. JSZip packages HTML, CSS, and user images into a ZIP.
6. Trigger browser download.
**Rationale**: purely client-side, secure, and fast.

## Data Persistence
**Decision**: `localStorage` with a `portfolio_draft` key.
**Rationale**: Simple, persistent across reloads, no backend required. JSON export allows moving data between devices.

## Validation
**Decision**: AJV (Another JSON Schema Validator).
**Rationale**: Fast, standard-compliant JSON Schema validation. Ensures imported data is safe and follows expected structure.

## Image Handling
**Decision**: Limit file size on upload (e.g., 2MB). Convert/resize using `Canvas` API if necessary before storing in memory/ZIP.
**Rationale**: Prevent browser memory crashes and huge export files.
