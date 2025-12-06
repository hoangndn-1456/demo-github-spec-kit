# Hướng dẫn Deploy Portfolio Generator lên GitHub Pages

Bạn hoàn toàn có thể sử dụng **GitHub Pages** để deploy ứng dụng Portfolio Generator này. Vì đây là ứng dụng React + Vite tĩnh (Static Single Page Application), nó hoạt động rất tốt trên GitHub Pages.

Có 2 kịch bản deploy bạn cần lưu ý:
1.  **Deploy ứng dụng Generator** (Công cụ tạo CV): Để bạn hoặc người khác truy cập vào web app và tạo CV.
2.  **Deploy kết quả CV đã xuất ra**: File ZIP bạn tải về chính là một website tĩnh hoàn chỉnh.

Dưới đây là hướng dẫn cho **Kịch bản 1: Deploy ứng dụng Generator**.

## Các bước thực hiện

### 1. Cài đặt `gh-pages`
Đây là công cụ giúp đẩy thư mục `dist` (sau khi build) lên branch `gh-pages` của repo.

```bash
cd portfolio-app
npm install gh-pages --save-dev
```

### 2. Cập nhật `vite.config.ts`
Bạn cần cấu hình đường dẫn cơ sở (base path). Nếu bạn deploy lên `https://<USERNAME>.github.io/<REPO-NAME>/`, bạn cần set `base` là `/<REPO-NAME>/`.

Ví dụ: Nếu repo của bạn tên là `cv-generator`:

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/cv-generator/', // Tên repo của bạn
})
```

### 3. Cập nhật `package.json`
Thêm script deploy vào file `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### 4. Deploy
Chạy lệnh sau để build và đẩy lên GitHub:

```bash
npm run deploy
```

Sau khi chạy xong, GitHub sẽ tạo một branch `gh-pages`. Bạn vào **Settings > Pages** của repository trên GitHub, đảm bảo "Build and deployment" source được set là **Deploy from a branch** và chọn branch **gh-pages**.

---

## Deploy kết quả CV (File Export)
Khi bạn dùng App và nhấn "Export ZIP", bạn sẽ nhận được file chứa `index.html` và `style.css`.
Để deploy CV cá nhân này:
1.  Tạo một repo mới (ví dụ: `my-cv`).
2.  Giải nén file ZIP và push `index.html`, `style.css` lên repo đó.
3.  Bật GitHub Pages trong Settings của repo đó.
4.  CV của bạn sẽ chạy tại `https://<USERNAME>.github.io/my-cv/`.
