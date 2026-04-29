# Lịch Trình Khoá Học Web Basic

Khoá học gồm **15 buổi**, mỗi buổi 3 tiết, học một lần mỗi tuần. Tổng thời lượng khoảng 4 tháng.

Nếu bạn tự học, có thể theo lịch này hoặc điều chỉnh tốc độ tuỳ khả năng — nhưng giữ nguyên thứ tự vì các buổi sau xây trên kiến thức buổi trước.

---

## Tổng Quan Khoá Học

| Giai đoạn | Buổi | Nội dung chính |
|---|---|---|
| Nền tảng Web | 1–2 | Web là gì, kiến trúc, HTTP, quy trình làm web |
| HTML & CSS | 3–4 | Markup, styling, layout, responsive |
| JavaScript | 5–6 | Ngôn ngữ, DOM, frameworks |
| Git & Async | 7–8 | Version control, lập trình bất đồng bộ |
| CSS nâng cao | 9–10 | CSS preprocessors, Tailwind, portfolio project |
| Server-Side & Next.js | 11–12 | Module 4, Lab 5 (Pages Router + App Router) |
| Final Project | 13–15 | Hỗ trợ project, Peer Review, tổng kết |

---

## Phần 1 — Nền Tảng

---

### Buổi 1 — Web là gì và hoạt động như thế nào?

**Nội dung:**
- Giới thiệu khoá học, tài liệu, cách đánh giá
- Làm web là làm gì? Web developer làm những gì?
- Kiến trúc hệ thống web: Client → Web Server → Web Application → Database
- Giao thức HTTP và nền TCP/IP — request/response hoạt động ra sao
- Phân biệt web tĩnh và web động

**Sau buổi này bạn biết:**
- Khi gõ URL và bấm Enter, điều gì xảy ra bên dưới
- Sự khác nhau giữa frontend, backend, và database
- Web tĩnh khác web động ở điểm gì

**Tài liệu tham khảo:**
- [Module 0 — Introduction to Web Development](modules/module0__Introduction_to_Web_Development.md)
- [Module 1 — How the Web Works](modules/module1__How_the_Web_Works.md)

---

### Buổi 2 — Quy Trình Xây Dựng Web Application

**Nội dung:**
- Ôn lại kiến trúc web từ buổi 1
- Các giai đoạn xây dựng ứng dụng web thực tế: Requirements → Planning → Design → Development → Testing → Maintenance
- Giới thiệu HTML và CSS — trông nó ra sao
- Demo: dùng AI Agent (Claude, Cursor...) để tạo trang web tĩnh theo yêu cầu
- So sánh chất lượng output giữa các model AI khác nhau

**Sau buổi này bạn biết:**
- Quy trình làm dự án web từ đầu đến cuối
- HTML và CSS là gì, vai trò của chúng
- Cách dùng AI để hỗ trợ viết code — và tại sao cần hiểu code để prompt đúng

**Tài liệu tham khảo:**
- [Topic 2 — Các Giai Đoạn Xây Dựng Ứng Dụng Web](deep-dives/topic2__Stages_to_Build_An_Web_Application.md)

---

## Phần 2 — HTML & CSS

---

### Buổi 3 — HTML & CSS Cơ Bản

**Nội dung:**
- HTML: cấu trúc document, các thẻ phổ biến, semantic HTML
- CSS: selectors, box model, màu sắc, typography
- Forms, tables, danh sách
- Cách trình duyệt parse và render HTML/CSS

**Sau buổi này bạn biết:**
- Viết một trang HTML có cấu trúc đúng
- Style trang bằng CSS cơ bản
- Phân biệt semantic HTML và ảnh hưởng đến SEO/accessibility

> Buổi này chủ yếu là code tay nhiều. Hãy mở trình duyệt và thử ngay từng đoạn code trong khi học.

**Tài liệu tham khảo:**
- [Module 2 — HTML & CSS](modules/module2__HTML_and_CSS.md)

---

### Buổi 4 — HTML & CSS Nâng Cao + Bài Tập

**Nội dung:**
- Media (ảnh, video, audio trong HTML)
- CSS Frameworks — giới thiệu Bootstrap, tại sao nó tồn tại
- CSS Layout — Flexbox và Grid
- Responsive Design — media queries, mobile-first approach
- CSS Effects — transitions, hover states

**Bài tập giao cuối buổi** (hạn nộp 10 ngày):
- [Ex1 — Online Course Registration Form](exercises/ex1__online_course_registration_form.md)
- [Ex2 — Student Score Table](exercises/ex2__student_score_table.md)
- [Ex3 — Product Introduction Page](exercises/ex3__product_introduction_page.md)

**Sau buổi này bạn biết:**
- Xây layout phức tạp bằng Flexbox và Grid
- Làm trang web hoạt động đúng trên cả mobile lẫn desktop
- Sử dụng CSS transitions để thêm hiệu ứng cơ bản

**Tài liệu tham khảo:**
- [Module 2 — HTML & CSS](modules/module2__HTML_and_CSS.md) *(tiếp theo)*
- [Lab 2 — CSS Processors](labs/lab2__CSS_Processors.md) *(có thể đọc trước để chuẩn bị)*

---

## Phần 3 — JavaScript

---

### Buổi 5 — JavaScript Cơ Bản & DOM

**Nội dung:**
- JavaScript là gì, chạy ở đâu (browser và Node.js)
- Language fundamentals: variables, types, functions, loops, conditionals
- DOM manipulation — querySelector, addEventListener, thay đổi nội dung trang
- Event-driven programming

**Sau buổi này bạn biết:**
- Viết JavaScript cơ bản không cần framework
- Tương tác với HTML thông qua DOM
- Xử lý events như click, input, submit

> Còn lại cho buổi sau: Closure, Prototypes/Classes/Modules, Async, Frameworks.

**Tài liệu tham khảo:**
- [Module 3 — JavaScript](modules/module3__JavaScript.md)

---

### Buổi 6 — JavaScript Frameworks & Browser APIs

**Nội dung:**
- JavaScript Front-End Frameworks — tại sao không dùng vanilla JS mãi được
- Demo so sánh: cùng một bài Student Management làm bằng vanilla JS DOM vs Vue.js — thấy rõ sự khác biệt về code structure và maintainability
- Vue.js fundamentals: reactive data, directives, components
- Browser APIs: localStorage, fetch, geolocation...

**Demo thực hành:**
- [Student Management v1 — Vanilla JS](https://github.com/nghuuquyen/web-basic/tree/main/javascript-demo/student-management-v1)
- [Student Management v2 — Vue.js](https://github.com/nghuuquyen/web-basic/tree/main/javascript-demo/student-management-v2-vue)
- [Vue.js Essentials](https://github.com/nghuuquyen/web-basic/tree/main/javascript-demo/vuejs-essentials)

**Sau buổi này bạn biết:**
- Vì sao cần frameworks khi ứng dụng phức tạp lên
- Cách dùng Vue.js để xây component đơn giản
- Sử dụng một số Browser APIs phổ biến

**Tài liệu tham khảo:**
- [Module 3 — JavaScript](modules/module3__JavaScript.md) *(tiếp theo — phần Frameworks và Browser APIs)*

---

## Phần 4 — Git & Async JavaScript

---

### Buổi 7 — Git & Version Control

**Nội dung:**
- Git là gì và tại sao cần dùng
- Các khái niệm cơ bản: repository, commit, branch, merge
- Thực hành: tạo GitHub Account, tạo repository, thực hành các lệnh chính
- Branching strategies — khi nào tạo branch mới, merge strategy nào phù hợp
- Ba cơ chế tích hợp code: **Merge**, **Rebase**, **Squash** — khác nhau ra sao và dùng khi nào

**Lệnh thực hành:**
```bash
git add, commit, log, show, diff, checkout, branch
git pull, fetch, merge, rebase
```

**Sau buổi này bạn biết:**
- Quản lý code có lịch sử, có thể rollback khi cần
- Làm việc nhóm trên cùng codebase mà không conflict
- Sự khác biệt giữa merge, rebase, squash và khi nào dùng cái nào

> Còn lại cho buổi sau: Git Best Practices (section 3).

**Tài liệu tham khảo:**
- [Lab 1 — Git & Distributed Version Control](labs/lab1__Git_Distributed_Version_Control.md)

---

### Buổi 8 — Git Best Practices & Async JavaScript

**Nội dung:**
- Git Best Practices: commit message conventions, .gitignore, branch naming, khi nào force push và khi nào không nên
- Lập trình bất đồng bộ với JavaScript: event loop, callbacks, Promises, async/await
- Demo: gọi API để build một Dashboard đơn giản — thấy rõ async request trông như thế nào và tại sao cần xử lý bất đồng bộ

**Sau buổi này bạn biết:**
- Commit code đúng cách, message có ý nghĩa
- Hiểu tại sao JavaScript cần async và event loop hoạt động ra sao
- Gọi API bằng fetch/async-await và xử lý response

**Tài liệu tham khảo:**
- [Topic 1 — Lập Trình Bất Đồng Bộ với JavaScript](deep-dives/topic1__Asynchronous_Coding_with_Javascript.md)

---

## Phần 5 — CSS Nâng Cao & Portfolio Project

---

### Buổi 9 — CSS Preprocessors & Tailwind CSS

**Nội dung:**
- CSS Preprocessors (SASS/SCSS): variables, nesting, mixins — tại sao cần khi CSS project lớn lên
- Tailwind CSS: utility-first approach, so sánh với CSS truyền thống
- Thực hành chuyển đổi từ custom CSS sang Tailwind

**Sau buổi này bạn biết:**
- Tổ chức CSS trong dự án lớn bằng SCSS
- Viết UI nhanh hơn với Tailwind
- Hiểu ưu/nhược điểm của từng cách tiếp cận

**Tài liệu tham khảo:**
- [Lab 2 — CSS Processors](labs/lab2__CSS_Processors.md)
- [Lab 3 — Tailwind CSS](labs/lab3__Tailwind_CSS.md)

---

### Buổi 10 — Layout, Responsive & Khởi Động Final Project

**Nội dung:**
- Layout & Responsive Web nâng cao
- Thực hành: build và deploy **trang Portfolio cá nhân** bằng Tailwind CSS + Vite + GitHub Actions + GitHub Pages
- Giới thiệu SEO cơ bản: metadata, favicon, keywords, Open Graph — những gì cần thiết lập khi deploy trang lên

**Khởi động Final Project:**
- Đăng ký nhóm (2-3 người)
- Cách làm việc với client: gặp mặt hỏi gì, làm rõ scope như thế nào, estimate và báo giá ra sao
- Từ danh sách features → Wireframe → UI Design (demo dùng AI design tools)
- Tầm quan trọng của việc có UI Design trước khi code

**Giao về cuối buổi** (hạn 1 tuần):
- [ ] Idea project + danh sách chức năng chính (MVP)
- [ ] Wireframe
- [ ] UI Design

**Sau buổi này bạn biết:**
- Deploy website tĩnh lên GitHub Pages với CI/CD tự động
- Setup SEO cơ bản cho trang web
- Quy trình kickoff dự án với client từ đầu đến lúc bắt tay code

**Tài liệu tham khảo:**
- [Lab 4 — Layout & Responsive Web](labs/lab4__Layout_and_Responsive_Web.md)
- [Topic 3 — SEO và Web Performance](deep-dives/topic3__SEO_and_Web_Performance.md)

---

## Phần 6 — Server-Side, Next.js & Final Project

> Từ buổi 11 trở đi, lớp song hành giữa kiến thức mới và Final Project. Kiến thức buổi 11-12 là nền tảng trực tiếp để làm Task 2, 3, 4 của project.

---

### Buổi 11 — Module 4: Lập Trình Server-Side

Buổi này dạy toàn bộ Module 4 — bức tranh tổng thể về phía server trước khi bắt tay vào Next.js.

**Nội dung:**
- Static vs Dynamic — khi nào dùng cái nào
- Routing: file-based routing của Next.js, dynamic segments, HTTP methods và RESTful API
- Server Components vs Client Components — tư duy quan trọng nhất khi học Next.js App Router
- Database & SQL: relational database, PK/FK, các câu lệnh cơ bản, SQL injection và cách phòng
- ORM (Prisma): type-safe queries, N+1 problem
- Authentication & Authorization: JWT, password hashing với bcrypt, middleware
- Data Fetching Patterns: SSG, SSR, ISR, Streaming — chọn pattern nào cho trường hợp nào
- Form Handling & Validation: validate client-side vs server-side, Zod
- Caching & CDN: cache invalidation, `revalidatePath`
- Environment Variables: server-only vs public, `.env.local`, không commit secrets
- Error Handling: expected vs unexpected errors, error boundaries
- SEO & Metadata trong Next.js

**Sau buổi này bạn biết:**
- Cách server xử lý request từ đầu đến cuối
- Khi nào dùng Server Component, khi nào cần `'use client'`
- Cách thiết kế database schema và viết SQL an toàn
- Authentication hoạt động như thế nào trong một web app

**Tài liệu tham khảo:**
- [Module 4 — Lập Trình Server-Side và Dynamic Web](modules/module4__introduction_to_server_side_programming.md)

---

### Buổi 12 — Lab 5: Xây Dựng Website với Next.js

Buổi này đi qua Lab 5 — áp dụng trực tiếp những gì học ở buổi 11 vào một project thực.

**Phần 1 — Pages Router: Static Blog với SSG**
- File-based routing trong `pages/` directory
- `getStaticProps` và `getStaticPaths` — generate trang từ Markdown files lúc build
- CSS Modules
- Deploy static site lên GitHub Pages

**Phần 2 — App Router: Dynamic App với Supabase**
- App Router (`app/` directory), Server Components, Server Actions
- Kết nối PostgreSQL qua Supabase — query database trực tiếp từ Server Component
- CRUD operations, search, pagination qua URL params
- Authentication với NextAuth.js
- Streaming với `<Suspense>` — tránh waterfall, cải thiện perceived performance
- Error handling với `error.tsx` và `not-found.tsx`

**Sau buổi này bạn biết:**
- Sự khác nhau giữa Pages Router (cũ) và App Router (mới)
- Cách build một CRUD app hoàn chỉnh có database và authentication
- Cách deploy Next.js app lên Vercel

**Tự học sau buổi:**
- Hoàn thành Lab 5 Phần 1 và Phần 2 theo hướng dẫn
- Bắt đầu áp dụng vào Final Project

**Tài liệu tham khảo:**
- [Lab 5 — Xây Dựng Website với Next.js](labs/lab5__Build_website_with_Next.js.md)

---

### Buổi 13 — Final Project: Implement UI & Database

Không có nội dung lý thuyết mới. Buổi này dành hoàn toàn cho việc xây dựng project.

**Việc cần làm:**
- Hoàn thiện giao diện (Task 2): responsive, JavaScript interactivity, đúng theo wireframe
- Bắt đầu kết nối database (Task 3): setup Supabase hoặc PlanetScale, thiết kế schema, CRUD cơ bản
- Bắt đầu Peer Review (Task 5): nếu có nhóm bạn học cùng — review UI/UX cho nhau

**Nếu tự học:**
- Dành buổi này hoàn thiện Task 2 và bắt đầu Task 3
- Dùng Lab 5 Phần 2 làm tham khảo khi kết nối database
- Nếu bị stuck với Task 3: xem lại Module 4 phần Database & SQL trước khi tiếp tục

**Checkpoint:**
- Task 1 ✓ xong
- Task 2 ✓ xong
- Task 3: đang làm, ít nhất 70% xong

---

### Buổi 14 — Final Project: Optimization & Peer Review

**Việc cần làm:**
- Hoàn tất Task 3: các trang dynamic hiển thị đúng data từ database
- Task 4 — Optimization:
  - Chạy Lighthouse (F12 → Lighthouse), ghi lại điểm, fix những gì dễ fix trước
  - Setup Google Analytics: thêm script theo hướng dẫn trong Topic 3
  - Setup Sentry: chạy `npx @sentry/wizard@latest -i nextjs`
- Task 5 — Peer Review: nếu có nhóm bạn, viết feedback chi tiết và implement feedback nhận được

**Nếu tự học:**
- Tập trung vào Task 4: Lighthouse audit + GA + Sentry là ba việc cụ thể có thể tự làm theo hướng dẫn
- Topic 3 có đủ hướng dẫn step-by-step cho cả ba
- Task 5 tự đánh giá: xem lại UI của mình theo ba tiêu chí Usability / Aesthetics / User-Friendliness trong Final Project Brief

**Checkpoint:**
- Task 3 ✓ xong
- Task 4: Lighthouse chạy xong, GA và Sentry đã setup
- Task 5: feedback đã viết và đã implement (hoặc ghi rõ lý do không implement)

**Tài liệu tham khảo:**
- [Topic 3 — SEO và Web Performance](deep-dives/topic3__SEO_and_Web_Performance.md)

---

### Buổi 15 — Tổng Kết & Chuẩn Bị Demo

**Nội dung:**
- Tổng kết toàn bộ khoá học — nhìn lại hành trình từ buổi 1
- Lấy vấn đề thực tế các nhóm gặp phải để củng cố lại kiến thức quan trọng
- Ôn lại Topic 2 (quy trình làm web) với góc nhìn mới sau khi đã trải qua một project thật
- Nhận xét từng nhóm: điểm mạnh, điểm cần cải thiện, định hướng tiếp theo
- Chốt ngày báo cáo Final Project để chấm điểm

**Sau khoá học, bạn có thể:**
- Xây và deploy một web application hoàn chỉnh từ đầu
- Làm việc nhóm trên cùng codebase với Git
- Tiếp cận và làm việc với client freelance
- Tự tiếp tục học sâu hơn về một mảng: React/Next.js nâng cao, backend, DevOps, mobile...

---

## Hướng Dẫn Tự Học

Nếu bạn đang tự học theo khoá này mà không có lớp, một số gợi ý:

**Tốc độ phù hợp:** Buổi 1–4 (nền tảng HTML/CSS) có thể học nhanh hơn nếu đã có kinh nghiệm thiết kế. Buổi 5–8 (JavaScript + Git) thường cần nhiều thời gian thực hành hơn — đừng rush.

**Cách học hiệu quả hơn:**
- Code theo ngay khi đọc, đừng chỉ đọc — mở VS Code song song với tài liệu
- Làm đủ 3 bài tập (Ex1, Ex2, Ex3) trước khi sang JavaScript — chúng là checkpoint thực chất nhất của giai đoạn HTML/CSS
- Dùng Git từ buổi 7 trở đi, áp dụng luôn cho tất cả code từ đó về sau
- Ưu tiên làm xong lab trước khi đọc module tiếp theo — thực hành trước, lý thuyết củng cố sau

**Khi bị stuck:**
- Google error message cụ thể trước — 80% vấn đề đã có ai hỏi trên Stack Overflow
- Nếu vẫn không giải quyết được sau 30 phút, hỏi AI (ChatGPT, Claude) với đoạn code và error message đầy đủ
- Đừng để một điểm chặn cả buổi — ghi lại câu hỏi, tiếp tục phần khác, quay lại sau

**Checkpoint tự đánh giá:**
- Sau buổi 2: Bạn có mô tả được điều gì xảy ra khi gõ URL và nhấn Enter không?
- Sau buổi 4: Bạn có tự làm được 3 bài tập HTML/CSS không? Nếu không — ôn lại trước khi tiếp tục.
- Sau buổi 6: Bạn có tự viết được một trang CRUD đơn giản bằng JavaScript không?
- Sau buổi 8: Bạn có giải thích được event loop là gì và tại sao dùng async/await không?
- Sau buổi 10: Bạn đã deploy được trang Portfolio lên GitHub Pages chưa?
- Sau buổi 12: Bạn đã hoàn thành Lab 5 Phần 1 và có app chạy được với database chưa?
- Sau buổi 15: Bạn có một project hoàn chỉnh để show cho người khác không?
