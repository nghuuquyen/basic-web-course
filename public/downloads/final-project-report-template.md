
<a href="/downloads/final-project-report-template.md" download="final-project-report-template.md">Tải về template (.md)</a>

> **Hướng dẫn:** Mỗi nhóm nộp **một report chung** và mỗi thành viên nộp **một self-report riêng** (Phần 6). Xoá các dòng ghi chú `> ...` trước khi nộp.

---

## Thông Tin Nhóm

| | |
|---|---|
| **Tên nhóm** | *(điền tên nhóm)* |
| **Tên dự án** | *(điền tên ứng dụng)* |
| **GitHub Repository** | *(link repository)* |
| **Video Demo** | *(link YouTube)* |
| **Ngày nộp** | *(DD/MM/YYYY)* |

### Thành viên nhóm

| Họ tên | MSSV | Vai trò |
|---|---|---|
| *(Họ tên)* | *(MSSV)* | *(vai trò: Leader / Frontend / Backend / ...)* |
| | | |
| | | |
| | | |

---

## Tổng Quan Project và Công Nghệ Sử Dụng

**Mô tả ứng dụng:**

*(Viết 2–3 câu mô tả ứng dụng làm gì, phục vụ đối tượng nào)*

**Tech stack:**

| Layer | Công nghệ |
|---|---|
| Frontend | *(VD: HTML, Tailwind CSS, JavaScript)* |
| Backend | *(VD: Node.js / Express / PHP)* |
| Database | *(VD: MySQL / PostgreSQL)* |
| Deploy | *(VD: Vercel / Railway / VPS)* |

**Tính năng chính:**

- *(Tính năng 1)*
- *(Tính năng 2)*
- *(Tính năng 3)*

*(Chèn screenshots các tính năng chính)*

---

## Hướng Dẫn Cài Đặt và Chạy Ứng Dụng

**Yêu cầu hệ thống:**

| Công cụ | Phiên bản |
|---|---|
| *(VD: Node.js)* | *(VD: >= 18.x)* |
| *(VD: MySQL)* | *(VD: >= 8.0)* |

**Các bước cài đặt:**

```bash
# 1. Clone repository
git clone <repository-url>
cd <project-folder>

# 2. Cài đặt dependencies
# (thay bằng lệnh phù hợp với stack của nhóm)

# 3. Cấu hình môi trường
cp .env.example .env
# Điền các giá trị vào .env

# 4. Khởi tạo database
# (thêm lệnh migrate / seed nếu có)

# 5. Chạy ứng dụng
# (thêm lệnh khởi động)
```

*(Mô tả thêm nếu có bước đặc biệt)*

---

## Task 1 — Project Planning & Teamwork

### (a) Phân công vai trò

> Mô tả ngắn về vai trò và trách nhiệm của từng thành viên trong nhóm.

*(Mô tả cách nhóm phân công công việc, ai phụ trách phần nào)*

### (b) Wireframe

> Thiết kế trên Figma hoặc Stitch, sau đó export thành ảnh và đính kèm bên dưới. Không chấp nhận ảnh chụp bản vẽ tay.

- **Tool sử dụng:** *(Figma / Stitch / ...)*
- **Các trang đã thiết kế:**
  - [ ] Homepage
  - [ ] *(Tên trang 2)*
  - [ ] *(Tên trang 3)*
  - [ ] *(Thêm trang nếu có)*

*(Chèn ảnh export từ Figma / Stitch cho từng trang)*

### (c) Project Plan

> Mô tả milestones và cách phân task cho từng thành viên.

**Milestones:**

| Milestone | Deadline | Trạng thái |
|---|---|---|
| Hoàn thành wireframe | *(ngày)* | *(Đúng hạn / Trễ X ngày)* |
| Setup GitHub & database schema | *(ngày)* | |
| Hoàn thành UI cơ bản | *(ngày)* | |
| Tích hợp database xong | *(ngày)* | |
| Optimization & peer review | *(ngày)* | |
| Nộp bài | *(ngày)* | |

### (d) GitHub Repository

- **Repository link:** *(link)*

### (e) Quy trình làm việc trên GitHub

> Mô tả cách nhóm áp dụng commit conventions và Pull Request workflow.

*(Mô tả ngắn quy trình: định dạng commit message, cách dùng PR, cách reference issues)*

**Ví dụ commit messages tiêu biểu của nhóm:**

```
feat: add product listing page (#12)
fix: correct responsive layout on mobile (#15)
docs: update README with setup instructions
```

*(Chèn ảnh chụp màn hình danh sách commits hoặc một Pull Request)*

---

## Task 2 — Implement User Interface

### (a) Các trang đã xây dựng

> Liệt kê tất cả các trang của website và mô tả ngắn chức năng từng trang.

| Trang | URL / Route | Mô tả | Người thực hiện |
|---|---|---|---|
| Homepage | `/` | *(mô tả)* | *(tên)* |
| *(Tên trang)* | `*(route)*` | *(mô tả)* | *(tên)* |
| *(Tên trang)* | `*(route)*` | *(mô tả)* | *(tên)* |
| Contact / About | `*(route)*` | *(mô tả)* | *(tên)* |

*(Chèn ảnh chụp màn hình các trang chính)*

### (b) Sử dụng Tailwind CSS

> Mô tả cách nhóm tích hợp và sử dụng Tailwind CSS trong dự án.

*(Mô tả ngắn: cách cài đặt, các component và layout chính dùng Tailwind)*

**Ví dụ utility classes đặc trưng nhóm đã dùng:**

*(Ví dụ: responsive grid, custom color scheme, dark mode...)*

### (c) Các tính năng tương tác

> Liệt kê các tính năng tương tác đã xây dựng bằng JavaScript.

| Tính năng | Mô tả | File / Component | Người thực hiện |
|---|---|---|---|
| *(VD: Modal)* | *(mô tả)* | *(file)* | *(tên)* |
| *(VD: Form validation)* | *(mô tả)* | *(file)* | *(tên)* |
| *(VD: Slider)* | *(mô tả)* | *(file)* | *(tên)* |

*(Chèn ảnh chụp hoặc mô tả cách test các interactive element)*

### (d) Giao diện trên nhiều thiết bị

> Cung cấp bằng chứng website hiển thị đúng trên các kích thước màn hình khác nhau.

- [ ] Mobile (< 768px)
- [ ] Tablet (768px – 1024px)
- [ ] Desktop (> 1024px)

*(Chèn ảnh chụp màn hình hoặc screenshot từ Chrome DevTools Responsive mode cho từng breakpoint)*

---

## Task 3 — Database Integration & Dynamic Content

### (a) Thiết kế cơ sở dữ liệu

> Đính kèm ER diagram và mô tả các bảng chính.

- **Database system:** *(MySQL / PostgreSQL)*
- **Số bảng:** *(số lượng)*

**Danh sách bảng:**

| Bảng | Mô tả | Các cột chính |
|---|---|---|
| *(tên bảng)* | *(mô tả)* | `id`, `...` |
| | | |

*(Chèn ảnh ER diagram)*

### (b) Kết nối cơ sở dữ liệu

> Mô tả công nghệ server-side và cách ứng dụng kết nối với database.

- **Công nghệ server-side:** *(Node.js / PHP / ...)*
- **Cách kết nối:** *(RESTful API / Template engine / ...)*
- **Các thao tác CRUD đã implement:**
  - [ ] Create
  - [ ] Read
  - [ ] Update
  - [ ] Delete

*(Mô tả ngắn kiến trúc kết nối: frontend — backend — database)*

### (c) Các trang hiển thị dữ liệu động

> Liệt kê các trang lấy dữ liệu từ database và hiển thị cho người dùng.

| Trang | Dữ liệu hiển thị | Query / Endpoint | Người thực hiện |
|---|---|---|---|
| *(tên trang)* | *(mô tả dữ liệu)* | `*(route API / query)*` | *(tên)* |
| *(tên trang)* | *(mô tả dữ liệu)* | `*(route API / query)*` | *(tên)* |

*(Chèn ảnh chụp màn hình trang hiển thị dữ liệu động)*

---

## Task 4 — Optimization

### (a) Kiểm tra hiệu năng với Lighthouse

> Chạy Lighthouse trước và sau khi tối ưu, đính kèm kết quả cả hai lần.

**Kết quả trước khi tối ưu:**

| Metric | Điểm |
|---|---|
| Performance | *(điểm)* |
| Accessibility | *(điểm)* |
| Best Practices | *(điểm)* |
| SEO | *(điểm)* |

*(Chèn ảnh chụp màn hình Lighthouse — trước)*

**Các vấn đề đã xác định và cách khắc phục:**

| Vấn đề | Hành động khắc phục |
|---|---|
| *(VD: Images not optimized)* | *(VD: Compress images, add width/height attributes)* |
| | |

**Kết quả sau khi tối ưu:**

| Metric | Điểm |
|---|---|
| Performance | *(điểm)* |
| Accessibility | *(điểm)* |
| Best Practices | *(điểm)* |
| SEO | *(điểm)* |

*(Chèn ảnh chụp màn hình Lighthouse — sau)*

### (b) Theo dõi lỗi và hành vi người dùng

> Mô tả cách nhóm đã cài đặt và cấu hình các công cụ monitoring.

**Google Analytics:**
- [ ] Đã tích hợp
- **Tracking ID / Measurement ID:** `*(G-XXXXXXXXXX)*`
- *(Mô tả ngắn cách tích hợp)*

*(Chèn ảnh chụp màn hình Google Analytics dashboard)*

**Sentry (hoặc tương đương):**
- [ ] Đã tích hợp
- **Tool sử dụng:** *(Sentry / ...)*
- **Project DSN / Config:** *(link hoặc mô tả)*
- *(Mô tả ngắn loại errors đang được monitor)*

*(Chèn ảnh chụp màn hình Sentry dashboard hoặc error log)*

---

## Task 5 — UI/UX Peer Review & Evaluation

### (a) Feedback cho các nhóm khác

> Trình bày nội dung feedback nhóm đã gửi cho các nhóm được review.

**Nhóm được review #1:**

- **Tên nhóm / Dự án:** *(tên)*
- **Link dự án:** *(link)*

| Khía cạnh | Điểm mạnh | Gợi ý cải thiện |
|---|---|---|
| Usability | *(nhận xét)* | *(gợi ý)* |
| Aesthetics | *(nhận xét)* | *(gợi ý)* |
| User-Friendliness | *(nhận xét)* | *(gợi ý)* |

**Nhóm được review #2:**

- **Tên nhóm / Dự án:** *(tên)*
- **Link dự án:** *(link)*

| Khía cạnh | Điểm mạnh | Gợi ý cải thiện |
|---|---|---|
| Usability | *(nhận xét)* | *(gợi ý)* |
| Aesthetics | *(nhận xét)* | *(gợi ý)* |
| User-Friendliness | *(nhận xét)* | *(gợi ý)* |

### (b) Xử lý feedback từ các nhóm khác

> Tóm tắt feedback nhóm nhận được và quyết định của nhóm đối với từng ý kiến.

| Feedback | Nguồn (nhóm nào) | Quyết định | Lý do / Commit |
|---|---|---|---|
| *(mô tả feedback)* | *(tên nhóm)* | *(Đã implement / Không implement)* | *(lý do hoặc link commit)* |
| | | | |
| | | | |

*(Chèn ảnh chụp màn hình trước/sau của những thay đổi đã implement)*

---

## Deliverables Checklist

> Kiểm tra lại trước khi nộp.

- [ ] **Source code trên GitHub** — repository public hoặc đã share với giảng viên
- [ ] **README.md** bao gồm: hướng dẫn cài đặt, tổng quan project, danh sách tính năng có screenshots, ERD
- [ ] **Video demo trên YouTube** — tối đa 10 phút, tối thiểu 720p, không để private
- [ ] **Self-Report** — mỗi thành viên đã commit file vào `docs/self-reports/`

---

## Self-Reports

> Mỗi thành viên commit file self-report vào `docs/self-reports/self-report-[MSSV].md` trong repository của nhóm. Điền link tương ứng vào bảng bên dưới. Dùng [Self-Report Template](/final-project-self-report-template) để điền.

| Họ tên | MSSV | Link Self-Report |
|---|---|---|
| *(Họ tên)* | *(MSSV)* | *(link đến `docs/self-reports/self-report-[MSSV].md` trên GitHub)* |
| | | |
| | | |
| | | |

