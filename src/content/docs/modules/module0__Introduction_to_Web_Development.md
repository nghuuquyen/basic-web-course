---
title: "Module 0 — Giới Thiệu Lập Trình Web"
---

# Module 0 — Giới Thiệu Lập Trình Web

Trước khi viết dòng code đầu tiên, bạn cần có một bức tranh toàn cảnh: web là gì, nó hoạt động theo nguyên lý nào, và bạn sẽ đứng ở vị trí nào trong cái hệ sinh thái đó. Module này không có code — nhưng nó là nền tảng để mọi thứ sau này có ý nghĩa thay vì chỉ là những thứ bạn copy-paste mà không hiểu tại sao.

---

## Internet và Web — Hai thứ khác nhau

Nhiều người dùng "Internet" và "Web" như thể chúng là một. Thực ra không phải vậy.

**Internet** là hạ tầng mạng vật lý — hàng triệu máy tính, cáp quang, router kết nối với nhau trên toàn cầu. Nó là cái đường cao tốc.

**World Wide Web (Web)** là một *dịch vụ chạy trên Internet* — cụ thể là dịch vụ cho phép bạn truy cập các tài liệu qua trình duyệt bằng URL. Nó là một trong nhiều thứ chạy trên đường cao tốc đó (email, game online, video call là những thứ khác).

Web được Tim Berners-Lee tạo ra năm 1991, và từ đó đến nay vẫn xoay quanh 5 thành phần gốc:

| Thành phần | Vai trò | Ví dụ |
|---|---|---|
| **URL** | Địa chỉ duy nhất của mỗi tài nguyên | `https://google.com/search?q=hello` |
| **HTTP** | Ngôn ngữ giao tiếp giữa browser và server | `GET /index.html` |
| **Web server** | Phần mềm lắng nghe và trả lời request | Apache, nginx |
| **HTML** | Ngôn ngữ tạo nội dung trang web | `<h1>Tiêu đề</h1>` |
| **Browser** | Chương trình hiển thị trang web | Chrome, Firefox |

> Sự phức tạp của web hiện đại — từ mạng xã hội đến ứng dụng ngân hàng — đều là những lớp xây thêm trên 5 thành phần gốc này. Khi bạn hiểu 5 thứ đó, bạn hiểu nền tảng của tất cả.

---

## Web đã thay đổi như thế nào?

Biết lịch sử giúp bạn hiểu *tại sao* công nghệ được thiết kế theo cách chúng đang là. Không cần thuộc lòng — chỉ cần có cảm nhận về xu hướng.

### Giai đoạn 1 — Web tĩnh (đầu 1990s)

Web ban đầu rất đơn giản: viết file HTML, đặt lên server, ai vào cũng thấy y chang nhau. Giống như tờ báo in — nội dung cố định, không tương tác.

Vấn đề: tưởng tượng một trang web ảnh có hàng triệu ảnh người dùng. Bạn không thể ngồi viết tay hàng triệu file HTML. Cần có cách tự động tạo nội dung → Web động ra đời.

### Giai đoạn 2 — Web động server-side (đầu 2000s)

Server bắt đầu chạy code: đọc database, xử lý logic, *tạo ra* HTML rồi gửi về browser. Mỗi người dùng có thể thấy nội dung khác nhau — trang Facebook của bạn khác trang của người khác.

Toàn bộ "trí tuệ" nằm trên server. Browser chỉ hiển thị kết quả.

### Giai đoạn 3 — Web 2.0 / Client-side dynamic (giữa 2000s)

JavaScript trở nên mạnh hơn. Logic bắt đầu chuyển xuống browser — trang web có thể cập nhật nội dung mà *không cần reload trang*. Đây là lúc Gmail, Google Maps ra đời và gây sốc vì trải nghiệm mượt mà như desktop app.

Server trở nên "mỏng" hơn — chủ yếu cung cấp data dưới dạng API, còn browser lo phần hiển thị.

### Giai đoạn 4 — Modern Static (ngày nay)

Một vòng quay thú vị: web tĩnh trở lại, nhưng theo hình thức mới. Thay vì tự quản lý server, developer dùng CDN để phục vụ file tĩnh + các cloud service của bên thứ ba cho những thứ cần dynamic (database, auth, payments...).

```
Truyền thống:           Modern:
Browser                 Browser
  ↓                       ↓           ↘
Web Server          CDN (HTML/JS)   Cloud APIs
(làm tất cả)        (phục vụ nhanh)  (Supabase, Stripe...)
```

> **Điểm mấu chốt**: "Static" và "Dynamic" không phải đối lập — ứng dụng thực tế luôn là kết hợp. Phần ít thay đổi → làm tĩnh (nhanh, rẻ). Phần cần cá nhân hoá → làm động.

---

## Mô hình Client-Server — Nền tảng của mọi thứ

Mọi tương tác trên web đều tuân theo một mô hình đơn giản: **một bên hỏi, một bên trả lời**.

```
Client (Browser)                    Server
      │                               │
      │  "Cho tôi trang /about"       │
      │────────── request ───────────►│
      │                               │  (xử lý: tìm file, query DB...)
      │◄───────── response ───────────│
      │  "Đây, đây là HTML của /about"│
```

### Client là ai?

Client là bất kỳ thứ gì *gửi request*. Thường là browser, nhưng không chỉ có browser:

- Ứng dụng mobile trên điện thoại của bạn
- Postman khi bạn test API
- Code Python/Node.js gọi đến một API
- Thậm chí một server có thể đóng vai client khi gọi server khác

### Server là ai?

Server là máy tính (hoặc nhiều máy) chạy 24/7, lắng nghe request và trả lời. Nó:
- Host ứng dụng web
- Lưu trữ và truy vấn data
- Xử lý xác thực, phân quyền
- Thực thi business logic

### Thực tế: Không chỉ có một server

Website thực tế thường không phải một server mà là nhiều loại phối hợp:

| Loại | Việc làm |
|---|---|
| Web server | Nhận HTTP request, phục vụ file tĩnh (Apache, nginx) |
| App server | Chạy code backend (Node.js, PHP, .NET) |
| Database server | Lưu trữ và truy vấn dữ liệu (PostgreSQL, MySQL) |
| Mail server | Gửi/nhận email |
| Auth server | Xác thực người dùng |
| Media server | Stream video/ảnh |

Khi site có lượng truy cập lớn, người ta dùng **server farm** — nhiều server chạy song song, với **load balancer** phân phối request đều giữa chúng. Lợi ích kép: chịu tải cao hơn và khi một server hỏng thì các server khác tiếp tục chạy.

### Cloud — Sao lại phổ biến đến vậy?

Tự quản lý server vật lý có 3 vấn đề nan giải:

1. **Tải đột biến** (flash sale, tin viral) → cần thêm server ngay → không kịp mua
2. **Quản trị hạ tầng** → cần người chuyên biệt, tốn kém
3. **Tải thấp** → tiền điện, máy chủ vẫn phải trả dù không ai dùng

Cloud (AWS, Google Cloud, Vercel, Netlify...) giải quyết cả 3 bằng **elastic provisioning**: tự động scale up khi cần, scale down khi không cần, trả tiền theo mức dùng thực tế.

---

## Web App vs Desktop App

Khi mới học, bạn sẽ thắc mắc: tại sao không làm desktop app cho đơn giản? Câu trả lời là mỗi loại có ưu nhược điểm riêng.

**Web App thắng ở:**
- Không cần cài đặt — vào URL là dùng được
- Cập nhật tức thì — deploy lên server là mọi người thấy ngay
- Chạy trên mọi OS và thiết bị
- Data tập trung, dễ backup, dễ share

**Web App thua ở:**
- Cần Internet (dù PWA đang giải quyết vấn đề này)
- Truy cập hardware hạn chế (camera, GPS... cần xin permission)
- Hiệu năng kém hơn với task nặng (video editing, 3D rendering)
- Giao diện đôi khi khác nhau giữa các browser

> Ranh giới đang mờ dần. Progressive Web Apps (PWA) và Electron cho phép web app cài lên máy tính, chạy offline, và truy cập hardware — nhiều thứ mà trước đây chỉ desktop app làm được.

### Intranet — Phần web mà bạn không thấy

Không phải mọi website đều public. **Intranet** là web nội bộ của công ty, dùng giao thức Internet nhưng chỉ nhân viên truy cập được.

Điều này quan trọng với nghề nghiệp: nếu chỉ nhìn vào public web, React/Node/PHP chiếm ưu thế. Nhưng trong doanh nghiệp lớn, ASP.NET, Oracle, SAP, SharePoint vẫn rất phổ biến — và cũng tạo ra nhiều cơ hội việc làm.

---

## Vai trò trong ngành Web Development

Ngành web ngày nay phức tạp hơn nhiều so với 15 năm trước, khi chỉ có "web developer" và "web designer".

### Các vai trò chính

| Vai trò | Làm gì | Công cụ |
|---|---|---|
| **Front-end Developer** | Xây giao diện người dùng | HTML, CSS, JavaScript, React |
| **Back-end Developer** | Xây server-side logic, API | Node.js, Python, Java, SQL |
| **Full-stack Developer** | Làm cả hai | Tất cả ở trên |
| **UX/UI Designer** | Thiết kế trải nghiệm và giao diện | Figma, user research |
| **DevOps Engineer** | Tự động hóa deployment, quản lý infra | Docker, CI/CD, cloud |
| **Database Admin** | Tối ưu và quản trị database | SQL, PostgreSQL, MongoDB |

### Full-stack là mục tiêu của khoá học này

Full-stack developer không có nghĩa là "biết tuốt nhưng không sâu". Nó có nghĩa là bạn hiểu *toàn bộ* luồng của một tính năng — từ lúc người dùng click đến lúc data được lưu vào database và hiển thị lại — và bạn có thể xây dựng nó một mình.

**DevOps** thường đi kèm: không chỉ viết code mà còn hiểu cách deploy và vận hành nó trong production.

### Bạn sẽ làm ở đâu?

| Loại công ty | Đặc điểm | Phù hợp nếu bạn... |
|---|---|---|
| **Startup** | Cần full-stack, học nhanh, đa nhiệm | Thích học nhiều thứ cùng lúc |
| **Agency / Solution** | Làm nhiều loại dự án cho khách hàng | Thích đa dạng, không nhàm |
| **Product Company** | Tập trung vào một sản phẩm, đi sâu | Thích đào sâu, cải tiến liên tục |
| **Enterprise / Intranet** | Dự án lớn, quy trình chặt, stack cũ | Thích sự ổn định |
| **Hosting / Cloud** | Thiên về infra và networking | Thích phần hạ tầng hơn code |

---

## Tổng kết — Bức tranh lớn

Trước khi học code, hãy nhớ những điều này:

```
Internet ≠ Web
Web = 5 thành phần: URL + HTTP + Web Server + HTML + Browser

Web đã qua 4 giai đoạn:
  Tĩnh → Động (server-side) → Động (client-side) → Modern Static

Mọi tương tác web = Client hỏi + Server trả lời

Mục tiêu của khoá học = Full-stack developer
```

Module tiếp theo sẽ đi sâu vào cơ chế kỹ thuật thực sự: khi bạn gõ `google.com` và nhấn Enter, *chính xác* điều gì xảy ra — từng bước một.
