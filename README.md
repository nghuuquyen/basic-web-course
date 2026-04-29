# Web Basic — Tài Liệu Khoá Học

Tài liệu khoá học **Web Design and Development** biên soạn bởi Nguyễn Hữu Quyền.

**Trang web:** [https://nghuuquyen.github.io/basic-web-course/](https://nghuuquyen.github.io/basic-web-course/)

---

## Nội dung

| Phần | Mô tả |
|---|---|
| **Modules** | Lý thuyết — cơ chế hoạt động của web, HTML & CSS, JavaScript, server-side programming |
| **Labs** | Thực hành — Git, CSS Processors, Tailwind CSS, Responsive Layout, Next.js |
| **Exercises** | Bài tập HTML/CSS tự làm |
| **Deep Dives** | Chuyên sâu — Async JS, vòng đời một web app, SEO & performance |
| **Final Project** | Đề tài kết thúc khoá học |

## Tác giả

**Nguyễn Hữu Quyền**
- GitHub: [@nghuuquyen](https://github.com/nghuuquyen)
- Repo: [nghuuquyen/basic-web-course](https://github.com/nghuuquyen/basic-web-course)

## Tech stack

Tài liệu được build bằng [Astro Starlight](https://starlight.astro.build/) và deploy tự động lên GitHub Pages mỗi khi push lên nhánh `main`.

```
src/content/docs/   ← toàn bộ nội dung Markdown
astro.config.mjs    ← cấu hình sidebar và site
.github/workflows/  ← CI/CD deploy lên GitHub Pages
```

## Chạy local

```bash
npm install
npm run dev
# http://localhost:4321/basic-web-course
```
