# Quickstart

## Prerequisites
- Node.js 18+
- npm or pnpm

## Setup

1.  **Clone the repository**:
    ```bash
    git clone <repo-url>
    cd <repo-name>
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Start development server**:
    ```bash
    npm run dev
    ```
    Access the app at `http://localhost:5173`.

## Architecture Overview

- **App Entry**: `src/main.tsx` mounts the React app.
- **State**: managed via `src/hooks/usePortfolio.ts` which syncs with localStorage.
- **Templates**: `src/templates/` contains the raw HTML/CSS for export.
- **Export Logic**: `src/lib/export.ts` handles the ZIP generation.

## Common Tasks

### Add a new template
1. Create a folder in `src/templates/<template-name>`.
2. Add `index.html` with mustache-like placeholders (e.g., `{{name}}`).
3. Add `style.css`.
4. Register the template in `src/lib/templates.ts`.

### Run Tests
- Unit: `npm run test`
- E2E: `npm run test:e2e`
