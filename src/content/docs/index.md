---
title: Web Basic — Tài Liệu Khoá Học
description: Tài liệu khoá học Web Design and Development — Nguyễn Hữu Quyền
template: splash
hero:
  tagline: Tài liệu khoá học Web Design and Development
---

# Web Basic — Tài Liệu Khoá Học

Xin chào, tôi là **Nguyễn Hữu Quyền** — giảng viên khoá học này.

Tài liệu bạn đang đọc được biên soạn từ thực tế giảng dạy môn **Web Design and Development** tại trường đại học, kết hợp với kinh nghiệm làm việc thực tiễn trong ngành. Tôi viết nó theo cách tôi muốn được học khi còn là sinh viên: đủ lý thuyết để hiểu tại sao, đủ thực hành để biết làm thế nào, và đủ bối cảnh thực tế để không bỡ ngỡ khi ra đi làm.

Khoá học này không yêu cầu kinh nghiệm lập trình trước. Nếu bạn đi đến cuối — làm xong bài tập, hoàn thành lab, và build được một Final Project — bạn sẽ có đủ nền tảng để tự phát triển tiếp hoặc bắt đầu nhận dự án thực tế.

Chúc bạn học tốt.

---

## Cấu Trúc Tài Liệu

```
docs/courses/basic/
├── README.md               ← trang này
├── schedule.md             ← lịch trình 15 buổi + hướng dẫn tự học
│
├── modules/                ← kiến thức nền tảng
│   ├── module0__Introduction_to_Web_Development.md
│   ├── module1__How_the_Web_Works.md
│   ├── module2__HTML_and_CSS.md
│   ├── module3__JavaScript.md
│   └── module4__introduction_to_server_side_programming.md
│
├── deep-dives/             ← bài đọc chuyên sâu cho 3 chủ đề quan trọng
│   ├── topic1__Asynchronous_Coding_with_Javascript.md
│   ├── topic2__Stages_to_Build_An_Web_Application.md
│   └── topic3__SEO_and_Web_Performance.md
│
├── labs/                   ← hướng dẫn thực hành từng bước
│   ├── lab1__Git_Distributed_Version_Control.md
│   ├── lab2__CSS_Processors.md
│   ├── lab3__Tailwind_CSS.md
│   ├── lab4__Layout_and_Responsive_Web.md
│   └── lab5__Build_website_with_Next.js.md
│
└── exercises/              ← bài tập HTML & CSS
    ├── ex1__online_course_registration_form.md
    ├── ex2__student_score_table.md
    └── ex3__product_introduction_page.md
```

---

## Lịch Trình Khoá Học

Xem chi tiết từng buổi, nội dung, và hướng dẫn tự học tại: [schedule.md](schedule.md)

Tóm tắt:

| Buổi | Chủ đề |
|---|---|
| 1 | Web là gì, kiến trúc web, HTTP |
| 2 | Quy trình xây dựng web application, giới thiệu HTML/CSS/AI |
| 3 | HTML & CSS cơ bản |
| 4 | HTML & CSS nâng cao — Layout, Responsive, ra bài tập |
| 5 | JavaScript cơ bản & DOM |
| 6 | JavaScript Frameworks, Vue.js, Browser APIs |
| 7 | Git & Version Control |
| 8 | Git Best Practices & Async JavaScript |
| 9 | CSS Preprocessors & Tailwind CSS |
| 10 | Layout nâng cao, Portfolio project, khởi động Final Project |
| 11 | Module 4 — Lập trình Server-Side |
| 12 | Lab 5 — Xây dựng website với Next.js (Pages Router + App Router) |
| 13 | Final Project: hỗ trợ Task 2 & 3, bắt đầu Peer Review |
| 14 | Final Project: hoàn tất Optimization & Peer Review |
| 15 | Tổng kết, chuẩn bị cho báo cáo final project |

---

## Modules — Kiến Thức Nền Tảng

Đọc theo thứ tự, mỗi module xây trên module trước:

| Module | Nội dung |
|---|---|
| [Module 0 — Introduction to Web Development](modules/module0__Introduction_to_Web_Development.md) | Web là gì, developer làm gì |
| [Module 1 — How the Web Works](modules/module1__How_the_Web_Works.md) | HTTP, DNS, Client-Server, TCP/IP |
| [Module 2 — HTML & CSS](modules/module2__HTML_and_CSS.md) | Markup, styling, layout, responsive |
| [Module 3 — JavaScript](modules/module3__JavaScript.md) | Ngôn ngữ, DOM, async, frameworks |
| [Module 4 — Server-Side Programming](modules/module4__introduction_to_server_side_programming.md) | Node.js, APIs, database |

---

## Deep-Dives — Bài Đọc Chuyên Sâu

Ba chủ đề quan trọng được viết chi tiết hơn, với ví dụ thực tế và hướng dẫn áp dụng:

| Chủ đề | Nội dung |
|---|---|
| [Topic 1 — Lập Trình Bất Đồng Bộ với JavaScript](deep-dives/topic1__Asynchronous_Coding_with_Javascript.md) | Event loop, Callbacks, Promises, Async/Await, Web Workers |
| [Topic 2 — Các Giai Đoạn Xây Dựng Ứng Dụng Web](deep-dives/topic2__Stages_to_Build_An_Web_Application.md) | 6 giai đoạn, scenario thực tế freelance, estimation, xử lý scope creep |
| [Topic 3 — SEO và Web Performance](deep-dives/topic3__SEO_and_Web_Performance.md) | Crawling/indexing, Core Web Vitals, tối ưu Next.js, monitoring |

---

## Labs — Thực Hành

Các bài lab có hướng dẫn từng bước, học xong có thể áp dụng ngay:

| Lab | Nội dung |
|---|---|
| [Lab 1 — Git & Version Control](labs/lab1__Git_Distributed_Version_Control.md) | Git cơ bản, branching, GitHub workflow |
| [Lab 2 — CSS Processors](labs/lab2__CSS_Processors.md) | SASS/SCSS, variables, nesting, mixins |
| [Lab 3 — Tailwind CSS](labs/lab3__Tailwind_CSS.md) | Utility-first CSS, responsive design với Tailwind |
| [Lab 4 — Layout & Responsive Web](labs/lab4__Layout_and_Responsive_Web.md) | Portfolio project với Tailwind + Vite + GitHub Pages |
| [Lab 5 — Build Website with Next.js](labs/lab5__Build_website_with_Next.js.md) | Static và dynamic web application với Next.js |

---

## Exercises — Bài Tập

Ba bài tập HTML & CSS, giao sau buổi 4. Mỗi bài có 3 stages (cơ bản → cải thiện → Tailwind):

| Bài tập | Kỹ năng thực hành |
|---|---|
| [Ex1 — Online Course Registration Form](exercises/ex1__online_course_registration_form.md) | HTML forms, validation, CSS layout |
| [Ex2 — Student Score Table](exercises/ex2__student_score_table.md) | HTML tables, zebra rows, responsive table |
| [Ex3 — Product Introduction Page](exercises/ex3__product_introduction_page.md) | Semantic HTML, Flexbox, page layout |

**Thời hạn:** Làm xong trước khi bắt đầu học JavaScript (buổi 5).

---

## Final Project

Chiếm **50% điểm tổng kết**. Làm nhóm 2–3 người, xây một web application hoàn chỉnh.

**5 Tasks:**

| Task | Nội dung | Điểm |
|---|---|---|
| Task 1 | Project planning & teamwork (wireframe, GitHub, phân công) | 2 |
| Task 2 | Implement User Interface (Tailwind, JavaScript, responsive) | 3 |
| Task 3 | Database Integration (schema, dynamic pages) | 2 |
| Task 4 | Optimization (Lighthouse, Google Analytics, Sentry) | 1 |
| Task 5 | UI/UX Peer Review (review nhóm khác, nhận và implement feedback) | 2 |

**Deliverables:**
- Source code trên GitHub (có organized branches và commit history)
- README.md trong repo: cách chạy app, tổng quan, features, ERD, screenshots
- Video demo trên YouTube (≤ 10 phút, tối thiểu 720p)

Chi tiết xem tại: [Final Project Brief](final-project-brief.md)

---

## Trước Khi Bắt Đầu

**Tools cần cài đặt:**

| Tool | Mục đích | Link |
|---|---|---|
| [VS Code](https://code.visualstudio.com/) | Code editor | code.visualstudio.com |
| [Node.js LTS](https://nodejs.org/) | Chạy JavaScript và npm | nodejs.org |
| [Git](https://git-scm.com/) | Version control | git-scm.com |
| [Chrome](https://www.google.com/chrome/) | Browser + DevTools | google.com/chrome |

**Kiến thức tiên quyết:** Không cần biết lập trình trước. Biết dùng máy tính cơ bản là đủ để bắt đầu.

---

## Lộ Trình Tự Học

Nếu bạn không tham gia lớp mà tự học theo tài liệu này:

**Giai đoạn 1 — Nền tảng** *(~2 tuần)*
- Đọc Module 0 và Module 1
- Đọc topic 2 (quy trình làm web — giúp bạn hình dung bức tranh lớn)

**Giai đoạn 2 — HTML & CSS** *(~3 tuần)*
- Đọc Module 2
- Làm Lab 2, Lab 3 song song
- Làm đủ 3 bài Exercises trước khi tiếp tục — đây là checkpoint quan trọng

**Giai đoạn 3 — JavaScript** *(~3 tuần)*
- Đọc Module 3
- Đọc Topic 1 (async JavaScript)
- Clone và chạy thử demo Student Management v1 và v2 để thấy sự khác biệt

**Giai đoạn 4 — Git & Tooling** *(~2 tuần)*
- Làm Lab 1 (Git)
- Làm Lab 4 (Portfolio — mục tiêu có sản phẩm deploy được lên internet)

**Giai đoạn 5 — Server-Side & Next.js** *(~3 tuần)*
- Đọc Module 4
- Làm Lab 5 Phần 1 (static blog)
- Làm Lab 5 Phần 2 (dynamic app với Supabase) — đây là phần khó nhất, dành thời gian
- Đọc Topic 3 (SEO & performance) song song

**Giai đoạn 6 — Final Project** *(~3 tuần)*
- Làm Final Project một mình hoặc với nhóm bạn
- Xem [Final Project Brief](final-project-brief.md) để biết tiêu chí rõ ràng

**Khi bị stuck:** Google trước, sau đó thử hỏi ChatGPT hoặc Claude với đoạn code và error message cụ thể. Nếu vẫn không giải quyết được sau 30 phút, ghi lại câu hỏi và tiếp tục phần khác — đừng để một điểm chặn toàn bộ tiến độ.

Xem checkpoint tự đánh giá chi tiết tại [schedule.md](schedule.md#hướng-dẫn-tự-học).

---

## Về Tác Giả

**Nguyễn Hữu Quyền**  
Giảng viên & Software Engineer

Tôi làm việc trong ngành web từ những năm đại học — từ freelance nhỏ lẻ cho đến các dự án sản phẩm thực tế. Song song với đó, tôi giảng dạy lập trình web tại trường đại học vì tin rằng khoảng cách giữa "học ở trường" và "làm được việc thực tế" là thứ có thể thu hẹp nếu tài liệu và cách dạy tiếp cận đúng hướng.

Khoá học này là nỗ lực thu hẹp khoảng cách đó.

Nếu bạn có câu hỏi, muốn thảo luận, hoặc đơn giản là muốn kết nối:

- **Website:** [nguyenhuuquyen.com](https://nguyenhuuquyen.com)
- **GitHub:** [github.com/nghuuquyen](https://github.com/nghuuquyen)

