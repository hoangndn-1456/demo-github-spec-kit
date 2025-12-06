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
