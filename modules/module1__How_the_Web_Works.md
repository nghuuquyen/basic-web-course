# Module 1 — Cơ Chế Hoạt Động Của Web

Bạn đã biết: web là Client hỏi, Server trả lời. Nhưng *thực sự* điều gì xảy ra giữa lúc bạn nhấn Enter và lúc trang web hiện ra? Module này giải thích từng bước trong cái hành trình đó — không phải để bạn thuộc lòng, mà để khi gặp sự cố (timeout, 404, trang không load...), bạn biết cần nhìn vào đâu.

---

## Hành trình của một request

Cứ mỗi lần bạn gõ `google.com` và nhấn Enter:

```
Bạn gõ URL
   ↓
1. DNS lookup      → Dịch "google.com" thành IP address
2. TCP connection  → Mở kết nối đến server
3. HTTP request    → Gửi yêu cầu "Cho tôi trang /"
4. Server xử lý   → Tìm file, query DB, tạo HTML...
5. HTTP response   → Server gửi lại HTML + headers
6. Browser render  → Parse HTML, tải CSS/JS/ảnh, vẽ trang
```

Cả quá trình này thường xảy ra trong dưới 1 giây. Mỗi bước dưới đây giải thích một phần của hành trình đó.

---

## TCP/IP — Bộ luật giao thông của Internet

Trước khi bất kỳ byte nào được truyền đi, cần có một bộ quy tắc chung mà mọi máy tính đều tuân theo. Đó là **TCP/IP**.

TCP/IP được chia thành 4 lớp, mỗi lớp chỉ quan tâm đến việc của mình:

```
┌─────────────────────────────────────────────────────┐
│  Lớp 4 — Application   HTTP, DNS, SSH, FTP, SMTP   │  ← Bạn làm việc ở đây
├─────────────────────────────────────────────────────┤
│  Lớp 3 — Transport     TCP (chắc chắn), UDP (nhanh) │  ← Đảm bảo data đến đủ
├─────────────────────────────────────────────────────┤
│  Lớp 2 — Internet      IP address, routing          │  ← Tìm đường đến đích
├─────────────────────────────────────────────────────┤
│  Lớp 1 — Link          Dây cáp, WiFi, MAC address   │  ← Truyền vật lý
└─────────────────────────────────────────────────────┘
```

Các lớp dưới lo những thứ cơ bản, để lớp trên có thể nghĩ ở mức cao hơn. Là web developer, bạn chủ yếu quan tâm đến **lớp Application** (HTTP). Nhưng biết các lớp dưới giúp bạn hiểu:
- Tại sao request bị **timeout** → vấn đề ở Transport layer
- Tại sao WiFi chậm hơn cáp → vấn đề ở Link layer
- Tại sao cùng domain trỏ được nhiều server → vấn đề thuộc Internet layer

### IP Address — Địa chỉ của mọi thiết bị

Mỗi thiết bị kết nối Internet đều có một **IP address** — dãy số định danh duy nhất:

```
IPv4: 192.168.1.100    (dạng cũ, 32-bit, đã gần cạn kiệt từ 2011)
IPv6: 2001:db8::1      (dạng mới, 128-bit, gần như vô hạn)
```

Tại sao IPv4 "cạn" mà Internet vẫn hoạt động? Vì **PAT (Port Address Translation)**: tất cả thiết bị trong nhà bạn dùng chung một IP public, router phân biệt chúng bằng cổng kết nối. Đó là lý do điện thoại, laptop, TV trong nhà bạn đều lên được mạng dù chỉ có một đường Internet.

### TCP vs UDP — Chọn cái nào?

| | TCP | UDP |
|---|---|---|
| Đảm bảo gói tin đến? | Có — gửi lại nếu mất | Không |
| Tốc độ | Chậm hơn | Nhanh hơn |
| Dùng cho | HTTP, email, file transfer | Video stream, game, DNS |
| Khi nào mất data là OK? | Không OK | OK (hơi giật còn hơn lag) |

HTTP dùng TCP — bạn cần *chính xác* mọi byte của HTML. Video stream dùng UDP — mất vài frame còn tốt hơn phải đợi buffer.

---

## DNS — Cuốn danh bạ của Internet

Máy tính giao tiếp qua IP (`216.58.216.78`), nhưng không ai nhớ được IP. DNS dịch tên miền thành IP.

### Cấu trúc tên miền

```
docs.google.com
 ↑      ↑    ↑
Sub   Second  Top-Level
domain level  Domain (TLD)
```

- **TLD**: `.com`, `.org`, `.vn`, `.io`, `.dev`...
- **Second-level**: `google`, `facebook`, `github` — cái bạn đăng ký
- **Subdomain**: `docs`, `mail`, `api` — bạn tự cấu hình

### Quy trình tra cứu DNS

Khi gõ `google.com`:

```
Browser cache → Hệ điều hành → DNS Resolver (ISP)
    ↓ (nếu không có cache)
Root Name Server → .com TLD Server → google.com Name Server
    ↓
IP: 216.58.216.78 → Browser kết nối đến IP này
```

Toàn bộ quá trình này thường mất dưới 50ms và kết quả được cache — lần sau vào lại không cần tra nữa.

> **Thực hành khi làm việc**: Khi deploy site mới, bạn sẽ cần cấu hình DNS record để trỏ domain về server của mình. Thay đổi DNS mất từ vài phút đến 48 giờ để propagate toàn cầu — đây là lý do tại sao "đổi DNS rồi mà vẫn chưa vào được".

---

## URL — Địa chỉ của mọi tài nguyên

URL là thứ bạn nhìn thấy trên thanh địa chỉ trình duyệt. Nó không chỉ là địa chỉ — nó chứa *đầy đủ thông tin* để tìm đúng tài nguyên cần lấy.

```
https://api.example.com:443/users/123?format=json&lang=vi#profile
  ↑         ↑             ↑    ↑          ↑                ↑
Protocol  Domain         Port Path    Query string       Fragment
```

| Phần | Giải thích | Ví dụ thực tế |
|---|---|---|
| **Protocol** | Dùng giao thức gì | `https://` (bảo mật), `http://` |
| **Domain** | Server nào | `api.example.com` |
| **Port** | Cổng nào (thường ẩn) | `:443` → mặc định HTTPS |
| **Path** | Tài nguyên nào trên server | `/users/123` |
| **Query string** | Tham số thêm (key=value) | `?format=json&lang=vi` |
| **Fragment** | Vị trí trong trang, *không gửi lên server* | `#profile` |

**Port hay bị ẩn vì dùng mặc định**: HTTP → 80, HTTPS → 443. Khi code local bạn thấy `:3000` hay `:5173` vì đó không phải port mặc định.

**Query string** là cách phổ biến để truyền data qua GET:
```
google.com/search?q=javascript+tutorial&hl=vi
                   ↑ từ khoá tìm kiếm    ↑ ngôn ngữ
```

---

## HTTP — Ngôn ngữ giao tiếp của Web

HTTP là bộ quy tắc mô tả *cách* browser và server nói chuyện với nhau. Mọi tương tác web đều là một cặp request-response HTTP.

### Một cuộc hội thoại HTTP trông như thế nào

```
Browser gửi request:
───────────────────────────────────
GET /about HTTP/1.1
Host: example.com
User-Agent: Mozilla/5.0 Chrome/120
Accept: text/html

(không có body vì đây là GET)

Server trả lời:
───────────────────────────────────
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Content-Length: 4523

<html>
  <body>Về chúng tôi...</body>
</html>
```

### Headers — Phần mà nhiều developer bỏ qua

Headers là metadata đi kèm theo mỗi request/response. Chúng điều khiển rất nhiều thứ.

**Một số request headers quan trọng:**

| Header | Nghĩa là | Ví dụ |
|---|---|---|
| `Host` | Tôi muốn vào site nào | `Host: example.com` |
| `User-Agent` | Tôi đang dùng browser gì | `Chrome/120 on Windows` |
| `Accept` | Tôi nhận được kiểu file gì | `text/html, application/json` |
| `Authorization` | Tôi là ai (token đăng nhập) | `Bearer eyJ...` |
| `Cookie` | Cookie của browser | `session=abc123` |

**Một số response headers quan trọng:**

| Header | Nghĩa là | Ví dụ |
|---|---|---|
| `Content-Type` | Data tôi gửi về là kiểu gì | `application/json` |
| `Set-Cookie` | Lưu cookie này vào browser | `session=abc123; HttpOnly` |
| `Cache-Control` | Cache được bao lâu | `max-age=3600` |
| `Location` | Redirect đến đây | `/new-url` |

### HTTP Methods — Ý định của request

Method cho server biết bạn muốn *làm gì* với tài nguyên đó:

| Method | Ý định | Ví dụ |
|---|---|---|
| `GET` | Lấy dữ liệu | Xem danh sách sản phẩm |
| `POST` | Tạo mới | Đăng ký tài khoản |
| `PUT` | Thay thế hoàn toàn | Cập nhật toàn bộ profile |
| `PATCH` | Cập nhật một phần | Đổi chỉ avatar |
| `DELETE` | Xoá | Xoá bài viết |

Thiết kế API theo nguyên tắc này gọi là **RESTful API** — chuẩn phổ biến nhất. Ví dụ:
```
GET    /api/posts          → Lấy danh sách bài viết
GET    /api/posts/42       → Lấy bài viết số 42
POST   /api/posts          → Tạo bài viết mới
PATCH  /api/posts/42       → Sửa bài viết số 42
DELETE /api/posts/42       → Xoá bài viết số 42
```

### Response Codes — Kết quả của request

Mã 3 chữ số server trả về cho biết chuyện gì đã xảy ra:

| Nhóm | Ý nghĩa | Các mã thường gặp |
|---|---|---|
| **2xx** | Thành công | `200 OK`, `201 Created`, `204 No Content` |
| **3xx** | Redirect | `301 Moved Permanently`, `302 Found` |
| **4xx** | Lỗi từ phía client | `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found` |
| **5xx** | Lỗi từ phía server | `500 Internal Server Error`, `503 Service Unavailable` |

> **Mẹo debug**: Response code là điểm khởi đầu khi có lỗi.
> - `401` → bạn chưa đăng nhập (hoặc token hết hạn)
> - `403` → đã đăng nhập nhưng không có quyền
> - `404` → URL sai hoặc tài nguyên bị xoá
> - `500` → có bug ở phía server, cần xem log

---

## Trình duyệt làm gì với HTML nhận được?

Nhận được HTML từ server không phải là xong. Browser phải làm thêm nhiều việc.

### Pipeline rendering

```
1. Parse HTML            → Xây dựng DOM tree (cây phân cấp các elements)
2. Tải CSS, JS, ảnh      → Các request HTTP song song
3. Parse CSS             → Xây dựng CSSOM tree
4. Kết hợp DOM + CSSOM   → Render tree (chỉ các element hiển thị)
5. Layout                → Tính toán vị trí, kích thước mỗi element
6. Paint                 → Vẽ pixels lên màn hình
7. Composite             → Kết hợp các layers lại
```

Đây là lý do tại sao:
- CSS ở `<head>` tốt hơn ở cuối body — tránh "flash of unstyled content"
- Script ở cuối body (hoặc dùng `defer`) tốt hơn — không chặn render
- Ảnh lớn không được tối ưu → trang tải chậm

### Browser cache

Sau khi tải một trang, browser lưu nhiều tài nguyên vào cache cục bộ. Lần sau vào lại:

```
Browser hỏi: "Resource này đã hết hạn chưa?" (Cache-Control: max-age)
     ↓ Chưa hết hạn
Dùng từ cache — không cần download lại → Cực nhanh

     ↓ Đã hết hạn
Gửi request kèm ETag/Last-Modified
     ↓ Server trả về 304 Not Modified (nếu không thay đổi)
Dùng từ cache

     ↓ Server trả về 200 với nội dung mới
Download và cập nhật cache
```

> **Thực tế khi dev**: Khi thay đổi CSS/JS mà reload trang vẫn thấy cũ → browser đang dùng cache. `Ctrl+Shift+R` (hard reload) hoặc mở DevTools → Disable cache để fix.

### DevTools — Người bạn không thể thiếu

Nhấn **F12** (hoặc chuột phải → Inspect) để mở DevTools. Đây là công cụ debug quan trọng nhất:

| Tab | Dùng để |
|---|---|
| **Elements** | Xem cấu trúc HTML, edit CSS realtime |
| **Console** | Chạy JS, xem lỗi và log |
| **Network** | Theo dõi mọi HTTP request — URL, method, status, response |
| **Performance** | Profiling tốc độ render |
| **Application** | Xem cookies, localStorage, sessionStorage |

Tab **Network** đặc biệt quan trọng — nó hiển thị *mọi request* browser gửi đi, bao gồm cả API calls, hình ảnh, fonts. Khi debug, đây là nơi đầu tiên cần nhìn.

---

## Web Server và Technology Stack

Server cần phần mềm để xử lý request. Lựa chọn phần mềm và ngôn ngữ lập trình tạo thành một **stack**.

### Web Server Software

| Software | Điểm mạnh | Thường dùng với |
|---|---|---|
| **nginx** | Cực nhanh với static files, nhiều connections | Reverse proxy, CDN, static hosting |
| **Apache** | Linh hoạt, cấu hình dễ, đa nền tảng | PHP, Python |
| **IIS** | Tích hợp sâu với Windows | ASP.NET |

Cách kết hợp phổ biến: **nginx** làm "cửa ngõ" nhận mọi request, chuyển static files thẳng, còn dynamic content chuyển sang **app server** (Node.js, PHP...) xử lý.

### Các stack phổ biến

| Stack | Thành phần | Phù hợp |
|---|---|---|
| **MERN** | MongoDB + Express + React + Node.js | JavaScript thuần, startup |
| **LAMP** | Linux + Apache + MySQL + PHP | Traditional web, WordPress |
| **JAMstack** | JavaScript + APIs + Markup | Blog, landing page, performance |
| **Next.js** | React + Node.js (full-stack framework) | Modern web app — cái khoá học này dùng |

### Database

**SQL (Relational)** — lưu data có cấu trúc trong bảng:
- **PostgreSQL**: Mạnh nhất, dùng cho production
- **MySQL**: Phổ biến nhất, dùng nhiều nơi
- **SQLite**: File-based, dùng cho development/nhỏ

**NoSQL** — linh hoạt hơn, phù hợp data không có cấu trúc cố định:
- **MongoDB**: Document-based, phổ biến nhất

> Khoá học này dùng PostgreSQL. Đừng lo về việc chọn database ngay — 80% kiến thức SQL là giống nhau giữa các hệ thống.

---

## Tổng kết — Khi bạn gõ google.com và nhấn Enter

```
0ms    Bạn nhấn Enter
1ms    DNS lookup: "google.com" → 216.58.216.78 (hoặc từ cache)
5ms    TCP connection đến 216.58.216.78:443
10ms   TLS handshake (thiết lập kết nối HTTPS bảo mật)
15ms   HTTP Request: GET / HTTP/1.1
       (bay qua cáp quang từ Việt Nam đến server Google)
150ms  HTTP Response: 200 OK + HTML
155ms  Browser bắt đầu parse HTML
160ms  Phát hiện cần tải CSS, JS, fonts → gửi thêm requests song song
300ms  DOM ready, CSS applied, page visible
500ms  JS chạy xong, page fully interactive
```

Mỗi bước trong hành trình này tương ứng với một khái niệm bạn vừa học. Module tiếp theo sẽ bắt đầu thực hành: học **HTML và CSS** để tạo ra nội dung và giao diện của trang web.
