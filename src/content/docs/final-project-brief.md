---
title: "Final Project Brief — Web Design and Development"
---

# Final Project Brief — Web Design and Development

**Hình thức:** Bài tập nhóm  
**Trọng số:** 50% điểm tổng kết  
**Thời gian thực hiện:** 3 tuần  
**Giảng viên:** Nguyễn Hữu Quyền

---

## Tổng Quan

Final Project yêu cầu nhóm lên kế hoạch, xây dựng, và tối ưu một web application hoàn chỉnh. Đây là cơ hội để áp dụng toàn bộ kiến thức của khoá học vào một sản phẩm thực tế — từ thiết kế giao diện đến tích hợp database, từ tối ưu performance đến làm việc nhóm với Git.

**Nhóm được tự chọn chức năng** miễn là đáp ứng đủ tiêu chí đánh giá.

**Mục tiêu:**
- Lên kế hoạch dự án và phân công nhóm hiệu quả, có version control
- Xây giao diện responsive và interactive theo design đã thiết kế
- Tích hợp database để tạo dynamic content
- Tối ưu performance và setup monitoring

---

## Các Task và Điểm Số

| Task | Nội dung | Điểm |
|---|---|---|
| Task 1 | Project planning & teamwork | 2 |
| Task 2 | Implement User Interface | 3 |
| Task 3 | Database Integration & Dynamic Content | 2 |
| Task 4 | Optimization | 1 |
| Task 5 | UI/UX Peer Review & Evaluation | 2 |
| **Tổng** | | **10** |

---

## Task 1 — Project Planning & Teamwork *(2 điểm)*

### Yêu cầu

**(a) Phân công vai trò trong nhóm**
- Tổ chức họp nhóm, thống nhất vai trò và trách nhiệm của từng người
- Lưu lại tài liệu phân công để nộp

**(b) Wireframe** *(0.5 điểm)*
- Dùng Figma hoặc công cụ tương tự để thiết kế wireframe
- Phải bao gồm tất cả các trang chính của ứng dụng
- Review và chốt wireframe với cả nhóm trước khi code

**(c) Project plan** *(0.5 điểm)*
- Xác định scope và deliverables
- Đặt milestones và deadlines thực tế
- Phân task cụ thể cho từng thành viên

**(d) Thiết lập GitHub repository** *(0.5 điểm)*
- Tạo repository cho project
- Tạo branches cho từng feature
- Thiết lập ticket/issue tracking
- Đảm bảo tất cả thành viên commit đều đặn

**(e) GitHub Workflow & commit conventions** *(0.5 điểm)*
- Commit message rõ ràng, mô tả đúng mục đích của commit
- Reference đến GitHub issues trong commit message khi liên quan
- Mỗi commit tập trung vào một task hoặc logical change duy nhất
- Dùng Pull Requests gắn với topic branches và GitHub Issues

### Hướng dẫn

Cả nhóm họp để lên kế hoạch trước khi code. Tạo wireframe bao quát đủ các trang, sau đó phân chia công việc rõ ràng. Setup GitHub ngay từ đầu — không để đến lúc gần xong mới push code.

---

## Task 2 — Implement User Interface *(3 điểm)*

### Yêu cầu

**(a) Website nhiều trang** *(1 điểm)*
- Tối thiểu 3 trang: Homepage, ít nhất một trang nội dung, và trang Contact hoặc About
- Các trang phải đúng theo wireframe đã thiết kế
- Navigation hoạt động đúng giữa các trang

**(b) Tailwind CSS** *(0.5 điểm)*
- Tích hợp Tailwind CSS vào project
- Dùng utility classes cho layout và design

**(c) JavaScript interactivity** *(1 điểm)*
- Implement các element tương tác: sliders, modals, form validation, hoặc tương tự
- JavaScript phải thực sự cải thiện trải nghiệm người dùng
- Test kỹ tất cả các interactive element

**(d) Responsive design** *(0.5 điểm)*
- Website hoạt động đúng trên mobile, tablet, và desktop
- Test trên nhiều kích thước màn hình khác nhau
- Layout và nội dung tối ưu cho từng loại thiết bị

### Hướng dẫn

Mỗi thành viên nhận các phần UI khác nhau (header, footer, forms, navigation...), xây và style riêng, sau đó tích hợp lại thành giao diện thống nhất. Kiểm tra tổng thể sau khi tích hợp để đảm bảo nhất quán về style và UX.

---

## Task 3 — Database Integration & Dynamic Content *(2 điểm)*

### Yêu cầu

**(a) Database schema** *(0.5 điểm)*
- Thiết kế ER diagram hoặc schema mô tả cấu trúc database
- Schema đủ các bảng cần thiết và mối quan hệ giữa chúng
- Review schema với cả nhóm trước khi implement

**(b) Tích hợp database** *(0.5 điểm)*
- Setup MySQL hoặc PostgreSQL
- Kết nối ứng dụng với database
- Implement CRUD operations cơ bản

**(c) Dynamic pages** *(1 điểm)*
- Tối thiểu 2 trang lấy và hiển thị dữ liệu từ database
- Dữ liệu hiển thị dynamic theo query hoặc tương tác của user
- Test để đảm bảo data được lấy và hiển thị chính xác

### Hướng dẫn

Có thể dùng Node.js, PHP, hoặc bất kỳ server-side technology nào. Có thể serve data qua RESTful APIs hoặc dùng server-side template engines — chọn cách phù hợp nhất với stack của nhóm. Frontend phải kết nối được với backend để xử lý dynamic data.

---

## Task 4 — Optimization *(1 điểm)*

### Yêu cầu

**(a) Performance optimization với Lighthouse** *(0.5 điểm)*
- Chạy Lighthouse audit, xác định các vấn đề về performance, accessibility, SEO
- Implement cải thiện cho các vấn đề tìm thấy
- Chạy lại Lighthouse để xác nhận cải thiện

**(b) Setup tracking và logging tools** *(0.5 điểm)*
- Tích hợp Google Analytics để track hành vi người dùng
- Setup Sentry (hoặc tương tự) để monitor và log errors
- Đảm bảo logs capture đủ thông tin cho debugging và monitoring

### Hướng dẫn

Chạy Lighthouse trong Chrome DevTools (F12 → Lighthouse). Tập trung vào Performance và SEO trước. Sau đó setup Google Analytics và Sentry — cả hai đều có hướng dẫn tích hợp với Next.js trong [Topic 3](deep-dives/topic3__SEO_and_Web_Performance.md).

---

## Task 5 — UI/UX Peer Review & Evaluation *(2 điểm)*

### Yêu cầu

**(a) Review project của nhóm khác** *(1 điểm)*
- Review UI/UX của tối thiểu 2 nhóm khác
- Viết feedback chi tiết: điểm mạnh và gợi ý cải thiện cụ thể
- Trao đổi trực tiếp feedback với nhóm được review

**(b) Implement feedback nhận được** *(1 điểm)*
- Review feedback mà nhóm bạn nhận được
- Thảo luận và quyết định cái nào sẽ implement
- Thực hiện thay đổi, hoặc giải thích lý do không implement feedback nào đó

### Tiêu Chí Đánh Giá UI/UX

Review tập trung vào ba khía cạnh:

**Usability — Dễ sử dụng**
- Interface đơn giản, không gây khó hiểu cho người dùng
- Thông tin và chức năng dễ tìm, dễ hiểu
- Navigation logic, di chuyển giữa các trang dễ dàng
- System feedback phù hợp (thông báo lỗi, xác nhận thành công...)
- Hoạt động tốt trên desktop, tablet, mobile

**Aesthetics — Thẩm mỹ**
- Design nhất quán về màu sắc, font, và style
- Layout có logic, không lộn xộn
- Màu sắc và hình ảnh phù hợp với nội dung và mục đích trang

**User-Friendliness — Thân thiện với người dùng**
- Người dùng mới có thể hiểu cách dùng nhanh chóng
- Interface giúp hoàn thành task hiệu quả, không cần quá nhiều bước
- Có thể tuỳ chỉnh theo nhu cầu cá nhân (nếu phù hợp)

---

## Deliverables — Những Gì Phải Nộp

**1. Source code trên GitHub**
- Repository public hoặc shared với giảng viên
- Có organized branches và commit history rõ ràng
- Mỗi thành viên phải có commits đều đặn trong suốt project

**2. README.md trong repository** — phải bao gồm:
- Hướng dẫn cài đặt và chạy ứng dụng
- Tổng quan project và các công nghệ sử dụng
- Danh sách tính năng kèm screenshots
- Database diagram (ERD)
- Thông tin bổ sung cần thiết

**3. Video demo trên YouTube**
- Không quá 10 phút
- Chất lượng tối thiểu 720p, định dạng MP4
- Upload dạng unlisted hoặc public (không để private)
- Demo đủ tất cả các yêu cầu của từng task — không cần show code, chỉ cần show ứng dụng hoạt động

**4. Self-Report cho cả 5 sprints**
- Mỗi thành viên phải nộp riêng
- Nộp trễ hoặc thiếu → trừ 10% điểm nhóm
- Nếu đóng góp không rõ ràng hoặc không phù hợp, có thể nhận điểm thấp hơn các thành viên khác

---

## Lưu Ý Quan Trọng

> Đây là bài nhóm — điểm nhóm và điểm cá nhân đều được tính. Điểm nhóm dựa trên rubric. Điểm cá nhân dựa trên Self-Report và mức độ đóng góp thực tế.

> Mỗi sinh viên muốn thi final **phải hoàn thành các bài tập bắt buộc** trước đó.

> Các nỗ lực vượt ngoài phạm vi khoá học và có giá trị cho project có thể được điểm thưởng (bonus), theo quyết định của giảng viên.
