---
title: "Lab 5 — Xây Dựng Website với Next.js"
---

# Lab 5 — Xây Dựng Website với Next.js

Bốn lab trước cho bạn công cụ: Git để quản lý code, Sass để viết CSS tốt hơn, Tailwind để xây giao diện nhanh, responsive design để site hoạt động trên mọi thiết bị. Lab này là nơi ghép tất cả lại — bạn sẽ xây dựng một ứng dụng web thực sự, hoàn chỉnh từ giao diện đến database.

---

## Tại sao Next.js?

Khi học React thuần, bạn xây Single Page Application (SPA): browser tải một file HTML gần như trống, sau đó JavaScript chạy và render nội dung. Cách này có giới hạn rõ rệt:

- **SEO kém** — Google crawl được HTML trống, không đọc được nội dung
- **Load chậm lần đầu** — người dùng nhìn màn hình trắng trong khi JS đang tải
- **Không có server-side** — không thể query database trực tiếp từ React component

Next.js giải quyết cả ba vấn đề này bằng cách thêm khả năng **render HTML trước khi gửi về browser** — hoặc lúc build (SSG) hoặc lúc có request (SSR). Kết quả: trang load nhanh hơn, SEO tốt hơn, và có thể kết nối database trực tiếp từ server component.

```
React thuần (CSR):
  User request → HTML trống → tải JS → chạy React → hiển thị
  ↑ người dùng thấy màn hình trắng

Next.js SSG:
  Build time → tạo HTML đầy đủ
  User request → HTML sẵn → hiển thị ngay
  ↑ nhanh hơn, SEO tốt hơn

Next.js SSR / Server Components:
  User request → server query DB → render HTML → gửi về
  ↑ data luôn mới, không cần API route riêng
```

---

## Lab 5 gồm hai phần

Lab này được chia thành hai phần độc lập, mỗi phần dạy một paradigm khác nhau của Next.js:

---

### Phần 1 — Pages Router: Static Blog với SSG

**[→ Xem hướng dẫn chi tiết](/basic-web-course/labs/lab5__part-1-nextjs-pages-router/)**

Bạn sẽ xây một blog tĩnh: bài viết lưu dưới dạng Markdown, Next.js đọc file và generate ra trang HTML lúc build. Không cần database, deploy được lên GitHub Pages miễn phí.

**Bạn sẽ học:**
- Cách Pages Router hoạt động (file trong `pages/` = route)
- `getStaticProps` — lấy dữ liệu lúc build time
- `getStaticPaths` — generate nhiều trang từ dữ liệu động
- CSS Modules để viết CSS không bị xung đột
- Chuyển Markdown sang HTML với `remark`
- Deploy static site

**Kiến thức nền cần có:**
- HTML, CSS cơ bản
- JavaScript ES6+ (arrow functions, destructuring, async/await)
- Khái niệm cơ bản về React component và props

---

### Phần 2 — App Router: Dynamic App với Supabase

**[→ Xem hướng dẫn chi tiết](/basic-web-course/labs/lab5__part-2-nextjs-app-router/)**

Bạn sẽ xây một ứng dụng dashboard quản lý hoá đơn: kết nối PostgreSQL qua Supabase, CRUD operations, authentication, search và pagination. Đây là kiến trúc của ứng dụng production thực tế.

**Bạn sẽ học:**
- App Router (thư mục `app/`) và Server Components
- Query database trực tiếp từ Server Component — không cần API route
- Server Actions để xử lý form và mutation
- Streaming với `<Suspense>` để tránh waterfall
- Authentication với NextAuth.js
- Search, pagination qua URL params
- Error handling với `error.tsx` và `not-found.tsx`
- Accessibility và metadata/SEO

**Kiến thức nền cần có:**
- Hoàn thành Phần 1 hoặc có hiểu biết cơ bản về Next.js
- Đọc qua `module4__introduction_to_server_side_programming.md` — đặc biệt phần routing, database, authentication

---

## Hai phần này khác nhau ở đâu?

| | Phần 1 — Pages Router | Phần 2 — App Router |
|---|---|---|
| **Router** | `pages/` directory | `app/` directory |
| **Rendering** | SSG (Static Site Generation) | Server Components + Streaming |
| **Data fetching** | `getStaticProps`, `getStaticPaths` | `async/await` trong Server Component |
| **Database** | Không có | PostgreSQL (Supabase) |
| **Mutations** | Không có | Server Actions |
| **Deploy target** | Static hosting (GitHub Pages, Netlify) | Vercel hoặc server có Node.js |
| **Độ phức tạp** | Thấp hơn | Cao hơn |
| **Học trước** | Nên học phần này trước | Học sau khi hiểu Phần 1 |

> Pages Router là kiến trúc cũ hơn (Next.js 9-12), App Router là kiến trúc mới từ Next.js 13+. Cả hai vẫn được support, nhưng App Router là hướng đi tương lai. Hiểu Phần 1 giúp bạn nắm vững tư duy core của Next.js trước khi chuyển sang App Router phức tạp hơn ở Phần 2.
