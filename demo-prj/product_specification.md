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
