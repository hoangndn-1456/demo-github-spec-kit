# Constitution (Hiến pháp) — Digital CV / Portfolio Generator

**Mục tiêu:** Thiết lập các nguyên tắc bất khả kháng cho dự án static Digital CV/Portfolio Generator. Mọi kế hoạch kỹ thuật và thiết kế sau này phải tuân theo các nguyên tắc này.

## Nguyên tắc tối thiểu (Bare-minimum requirements)

1. **Static-first delivery**

   * Ứng dụng phải có khả năng xuất bản tĩnh (static export). Mọi nội dung có thể được render thành HTML/CSS/JS tĩnh.
2. **Separation of Spec vs Implementation**

   * Đặc tả (spec) chỉ mô tả *what* & *why* — không nêu framework, kỹ thuật hay thư viện cụ thể.
3. **Accessibility & SEO baseline**

   * Tất cả trang phải tuân thủ các tiêu chí cơ bản về a11y (semantic HTML, alt text, keyboard navigation) và SEO meta cơ bản (title, description, canonical).
4. **Privacy & No PII storage by default**

   * Không lưu trữ PII trên server. Nếu có tính năng xuất/nhập dữ liệu, dữ liệu mặc định chỉ tồn tại client-side (file JSON export/import hoặc localStorage).
5. **Minimal dependencies & Deterministic build**

   * Ưu tiên minimal dependency set để dễ audit. Build phải deterministic (same inputs => same outputs).
6. **Mock data first**

   * Dữ liệu demo (portfolio items, experience) được cung cấp dưới dạng mock JSON (20 items mẫu). Không cần kết nối tới API thật.
7. **Responsive & Mobile-first**

   * Thiết kế ưu tiên mobile, sau đó scale lên tablet/desktop.
8. **Testable Acceptance Criteria**

   * Mỗi tính năng phải có ít nhất 1 acceptance scenario có thể kiểm thử (manual hoặc automated).
9. **Performance baseline**

   * Time-to-first-byte và First Contentful Paint phải được tối ưu hóa cho static sites; ảnh có thể dùng lazy-loading và kích thước tối ưu.
10. **Simple theming & export**

    * Cung cấp ít nhất 2 template/theme, khả năng preview và export (download HTML hoặc ZIP) mà không cần backend.

---

# Specification (Đặc tả sản phẩm) — Digital CV / Portfolio Generator

## Mục tiêu sản phẩm (What & Why)

* **What:** Một ứng dụng web tĩnh cho phép người dùng nhập hoặc upload dữ liệu hồ sơ (JSON form), chọn template, xem preview và xuất ra static portfolio site (HTML/CSS/JS) để deploy lên GitHub Pages / Vercel / bất kỳ static host nào.
* **Why:** Giúp người dùng (developer, designer, freelancer) nhanh chóng tạo portfolio tĩnh, dễ customize và dễ deploy, mà không cần backend.

## Người dùng chính (Personas)

1. **Freelancer/Developer**: Muốn site portfolio nhanh, có thể export và host.
2. **Sinh viên/Ứng viên**: Cần CV đẹp, in-friendly, dễ chỉnh.
3. **Designer**: Muốn preview visual nhanh, có 2 template tối giản và sáng tạo.

## Tính năng chính (Functional Requirements)

1. **Import / Edit Profile Data**

   * Cho phép nhập tay qua form hoặc tải file JSON (mock schema).
2. **Templates / Themes**

   * Ít nhất 2 template responsive.
3. **Preview**

   * Xem trực tiếp (live preview) trên client.
4. **Export**

   * Export ra ZIP chứa static HTML/CSS/JS và assets.
5. **Print-friendly view**

   * Một chế độ in ra PDF tốt (print CSS).
6. **Local persistence (optional)**

   * Lưu tạm vào localStorage để phục hồi phiên làm việc.
7. **Accessibility features**

   * Semantic HTML, keyboard navigation, alt text cho ảnh.

## Non-functional Requirements

* Tốc độ tải nhanh (static)
* Responsive (mobile-first)
* Không cần backend
* Dễ audit-dependencies
* Kích thước bundle tối thiểu

## Data schema (Mock JSON) — ví dụ

```json
{
  "profile": {
    "fullname": "Nguyen Van A",
    "role": "Frontend Developer",
    "summary": "I build modern web apps...",
    "contact": { "email": "a@example.com", "website": "https://...", "linkedin": "..." }
  },
  "experience": [
    { "company": "XCorp", "role": "Senior Dev", "from": "2020-01", "to": "2023-06", "description": "..." }
  ],
  "projects": [
    { "title": "Project A", "description": "...", "link": "...", "image": "assets/p1.png" }
  ],
  "skills": ["JavaScript", "React", "TypeScript"],
  "education": [{ "school": "ABC University", "degree": "BSc", "year": 2019 }]
}
```

## User scenarios & Acceptance criteria (ví dụ)

### Scenario 1 — Tạo portfolio từ form

**Given** user truy cập app
**When** user điền form profile + thêm 3 projects + chọn template A
**Then** user thấy preview tương ứng và có thể bấm Export ZIP chứa static site

**Acceptance tests:**

* Preview hiển thị chính xác fullname, role, first project title.
* ZIP download chứa `index.html`, `assets/`, `styles.css`.

### Scenario 2 — Import JSON

**Given** user có file JSON đúng schema
**When** user upload file
**Then** tất cả trường được map vào form và preview cập nhật

**Acceptance tests:**

* Upload JSON hợp lệ cập nhật preview.
* Upload JSON sai schema hiển thị lỗi rõ ràng.

### Scenario 3 — Print-friendly

**Given** user đang ở chế độ preview
**When** user bấm Print
**Then** phiên bản in của trang rời bỏ các phần không cần thiết và format rõ ràng

## Edge cases

* Upload JSON thiếu trường bắt buộc -> show validation UI
* Project ảnh bị missing -> hiển thị placeholder image
* Quá nhiều projects (>=100) -> giới hạn warn hoặc pagination
* Long strings trong headline -> overflow handling

## Acceptance checklist (Để CI / Manual QA)

* [ ] Static export (ZIP) hoạt động và deployable
* [ ] Live preview cập nhật tức thời khi chỉnh form
* [ ] 2 templates responsive hoàn chỉnh
* [ ] Dùng semantic HTML & pass basic a11y checks
* [ ] Print CSS chuẩn (A4 friendly)
* [ ] LocalStorage restore hoạt động
* [ ] JSON import/export hoạt động với schema mẫu
* [ ] Images lazy-load và có placeholder
* [ ] Kích thước bundle <= defined budget (tbd)

---

# Ghi chú triển khai ban đầu (lưu ý: phần này không phải kỹ thuật bắt buộc trong spec)

* Dùng mock data để demo. Không yêu cầu backend.
* Có thể cung cấp `example-data.json` gồm 20 projects/entries để demo.

---

---

# Technical Plan (/plan)

**Goal:** Define the "how"—concrete, implementable technical decisions that respect the Constitution (static-first, minimal deps, privacy-first) and enable deterministic builds and easy export.

## 1) High-level architecture

* **Static Single-Page Generator + Static Export:** Build a client-side generator app that outputs a static site bundle (index.html + assets). The app itself is a small SPA used for authoring + preview; the exported bundle is plain static HTML/CSS/JS and can be deployed to GitHub Pages, Vercel, Netlify, or any static host.
* **No backend required.** All data operations (import/export, preview, ZIP creation) occur client-side.

## 2) Recommended tech choices (implementation suggestions; still compatible with Constitution)

* **Runtime / Tooling:** Node.js 18+ for local dev and build tooling.
* **Framework:** Next.js (app/router optional) configured for **static export** (prefer `next export`) or a Vite + React setup for a minimal footprint. *Both are acceptable; default recommendation: Vite + React for smaller bundle and faster dev feedback.*
* **Language:** TypeScript for better DX and deterministic types.
* **Bundler:** Vite (if chosen) for fast dev server. If Next.js chosen, use its static export pipeline.
* **Styling:** Tailwind CSS (utility-first) or vanilla CSS with CSS variables for easy theming. Keep CSS isolated and minimal.
* **Zipping / Export:** Use client-side ZIP generation (JSZip or native `CompressionStream` fallback). Export should produce a ZIP containing `index.html`, `assets/`, `styles.css`, and a small manifest.

## 3) Project structure (suggested)

```
podsite/
├─ public/                # static assets, placeholder images
├─ src/
│  ├─ app/ or pages/      # SPA entry, routes for editor + preview
│  ├─ components/         # UI components (Editor, Preview, TemplateRenderer)
│  ├─ templates/          # Template HTML/CSS for export (templateA/, templateB/)
│  ├─ lib/                # utils: zip-export, json-validate, schema
│  ├─ data/               # example-data.json, mock assets
│  └─ styles/             # global styles, print.css
├─ scripts/
│  └─ build-export.js     # helper for building export bundles locally (optional)
├─ tests/
│  ├─ unit/
│  └─ e2e/
├─ package.json
└─ README.md
```

## 4) Data & schema handling

* **Use a strict JSON Schema** (Draft-07 or newer) for validation of import/export. Provide `example-data.json` (20 items) in `src/data/`.
* **Validation:** Client-side validation library (ajv) to check user uploads and show friendly errors.
* **Local persistence:** Save working document to `localStorage` under a namespaced key; include explicit "Clear workspace" control.

## 5) Templates & Rendering

* **Templates as static HTML + placeholders**: Each template consists of a minimal `index.html` partial with placeholder tokens (`{{fullname}}`, `{{projects}}`), plus CSS and optional JS for interactivity.
* **During preview:** Render templates in an iframe sandbox (isolates styles/scripts). Live preview updates by re-generating HTML from the current data and template.
* **Export process:** Replace tokens with user data to produce final static `index.html`. Copy used assets into `assets/` folder.

## 6) Export / ZIP generation

* Use JSZip to assemble files client-side.
* Include a `manifest.json` describing template, generation date (client timestamp), and schema version.
* Sanitize filenames and restrict total asset size (e.g., warn if assets > 5MB total).

## 7) Dev & CI

* **Local dev:** `npm run dev` (Vite) or `next dev` for Next.js.
* **Build:** `npm run build` → produces production SPA.
* **CI pipeline (GitHub Actions):**

  * Lint (ESLint + TypeScript), format (Prettier)
  * Unit tests (vitest / jest)
  * Build validation: run `npm run build` and ensure no TypeScript errors
  * Accessibility checks: axe-ci or Pa11y snapshot test
  * Bundle size check: compare against baseline (e.g., `rollup-plugin-filesize` or `bundlesize`)

## 8) Testing strategy

* **Unit tests:** Core utils (JSON validation, token replacement, ZIP generation). Aim for high coverage on transform functions.
* **Integration / E2E:** Playwright to automate flows: import JSON, live edit, preview updates, export ZIP contains expected files.
* **Accessibility tests:** Automated (axe) + at least one manual keyboard navigation acceptance.

## 9) Performance & accessibility

* **Image handling:** Provide client-side resizing or warn on large images. Lazy-load images in preview and exported site via `loading="lazy"`.
* **Print CSS:** Provide a dedicated `print.css` to strip navigation and show printable layout.
* **A11y:** Semantic headings, `lang` attribute on `html`, `aria` attributes where necessary, color contrast checks.

## 10) Security & Privacy

* **No server-side storage.** All user data stays in the browser or in the exported ZIP.
* **Sanitize HTML outputs:** If allowing user-supplied HTML fields, sanitize them (DOMPurify) before including in export.
* **Third-party libs:** Keep dependency list minimal and pinned to specific versions to ensure determinism.

## 11) Developer experience & docs

* Provide `CONTRIBUTING.md` with setup steps and a `memory/constitution` entry describing the project constraints.
* Provide `example-data.json` with 20 mocked items and `demo-assets/` images.
* Provide `make` or npm scripts for common tasks: `dev`, `build`, `test`, `lint`, `export-demo`.

## 12) Deliverables for the demo

* Working SPA authoring app with live preview
* Two exportable templates with distinct visual styles
* `example-data.json` (20 items) + demo assets
* GitHub Actions configured to run lint, tests, and build
* E2E Playwright tests for main user scenarios

---

*End of document.*
