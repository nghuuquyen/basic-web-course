# Module 4 — Lập Trình Server-Side và Dynamic Web

Bốn module trước cho bạn nền tảng về giao tiếp web, HTML, CSS, và JavaScript phía client. Module này chuyển sang **phía server** — nơi data được lưu trữ, business logic được thực thi, và bảo mật được đảm bảo. Đây là kiến thức cần nắm trước (hoặc song song) khi học Next.js.

---

## Nhắc lại nhanh: Static vs Dynamic

Bạn đã biết: web tĩnh là file HTML cố định, web động là server chạy code để tạo HTML phù hợp từng request. Nhưng thực tế phức tạp hơn một chút:

| | Static | Dynamic |
|---|---|---|
| Ví dụ | Trang giới thiệu công ty | Dashboard, mạng xã hội, e-commerce |
| Server làm gì | Gửi file HTML sẵn có | Query DB, xử lý logic, tạo HTML |
| Tốc độ | Cực nhanh | Chậm hơn (xử lý mỗi request) |
| Nội dung | Giống nhau cho mọi người | Cá nhân hoá theo user |

Trong thực tế, hầu hết ứng dụng là **kết hợp cả hai**: trang giới thiệu static, trang dashboard dynamic. Hiểu sự khác biệt giúp bạn chọn đúng chiến lược cho từng phần.

---

## Routing — Bản đồ của ứng dụng

Server có thể phục vụ hàng trăm URL: `/`, `/login`, `/dashboard`, `/dashboard/invoices`... Khi request đến, server cần biết nên chạy *code nào* để xử lý. Cơ chế này gọi là **routing**.

Routing là việc ánh xạ **URL pattern → handler (code xử lý)**:

```javascript
// Express.js — khai báo routes thủ công
app.get('/', handleHomePage);
app.get('/dashboard', handleDashboard);
app.get('/dashboard/invoices', handleInvoices);
app.post('/api/invoices', createInvoice);
app.delete('/api/invoices/:id', deleteInvoice);
```

Next.js App Router có cách tiếp cận khác — **file-based routing**: cấu trúc thư mục *chính là* routes, không cần khai báo thủ công:

```
app/
├── page.tsx                    → GET /
├── login/
│   └── page.tsx                → GET /login
└── dashboard/
    ├── page.tsx                → GET /dashboard
    └── invoices/
        ├── page.tsx            → GET /dashboard/invoices
        └── [id]/
            └── page.tsx        → GET /dashboard/invoices/:id
```

`[id]` là **dynamic segment** — bắt bất kỳ giá trị nào ở vị trí đó:

```
/dashboard/invoices/abc-123  → params.id = "abc-123"
/dashboard/invoices/xyz-456  → params.id = "xyz-456"
```

Dùng để tạo trang chi tiết cho từng item: invoice, profile từng user, bài blog theo slug...

### URL nói "cái gì", Method nói "làm gì"

Kết hợp URL và HTTP method tạo ra ngôn ngữ rõ ràng cho API:

| Method | Ý nghĩa | Ví dụ |
|---|---|---|
| `GET` | Đọc — không thay đổi data | Xem danh sách invoices |
| `POST` | Tạo mới | Tạo invoice mới |
| `PUT` / `PATCH` | Cập nhật | Sửa invoice |
| `DELETE` | Xoá | Xoá invoice |

```
GET    /api/invoices        → Lấy danh sách
GET    /api/invoices/123    → Lấy invoice #123
POST   /api/invoices        → Tạo mới
PATCH  /api/invoices/123    → Sửa invoice #123
DELETE /api/invoices/123    → Xoá invoice #123
```

Thiết kế theo nguyên tắc này gọi là **RESTful API** — chuẩn phổ biến nhất hiện nay.

> Nhìn vào routes của một ứng dụng là hiểu ngay nó có những tính năng gì. File-based routing của Next.js biến cấu trúc thư mục thành "tài liệu sống" — dễ đọc, dễ bảo trì hơn routing khai báo thủ công.

---

## Server Components vs Client Components

Đây là một trong những thay đổi tư duy lớn nhất khi học Next.js, nên cần hiểu rõ trước khi bắt tay code.

**Vấn đề của React truyền thống (Create React App):** Toàn bộ JavaScript được gửi xuống browser. Browser phải tải JS bundle (có thể vài MB), parse, execute, fetch data từ API — *sau đó mới* render ra HTML. Người dùng thấy trang trắng trong vài giây. Trên mạng chậm hoặc điện thoại cũ, điều này đặc biệt tệ.

**Server Components giải quyết thế nào:**

```
React cũ (Client Components):
Browser → tải JS bundle → execute → fetch API → render HTML
                                                      ↑
                                              User chờ ở đây

Next.js App Router (Server Components):
Server → query DB → render HTML → gửi xuống Browser → hiển thị ngay
                                                            ↑
                                                    User thấy ngay
```

Server Component chạy trên server, tạo HTML sẵn sàng hiển thị, gửi xuống browser. Browser nhận HTML và render ngay — không cần đợi JS load.

### Khi nào dùng cái nào?

```
Server Component (mặc định):          Client Component ('use client'):
✓ Không gửi JS xuống browser          ✓ useState, useEffect, useRef
✓ Query database trực tiếp            ✓ Event handlers (onClick...)
✓ Đọc file system, env variables      ✓ Browser APIs (localStorage...)
✓ Credentials không đến browser       ✗ JS bundle lớn hơn
✗ Không có state, event handlers      ✗ Không query database trực tiếp
✗ Không có browser APIs
```

Câu hỏi quyết định:

```
Component này có cần user tương tác không?
(click, gõ phím, animation, real-time update...)
    │
    ├── Không → Server Component (mặc định, không làm gì thêm)
    │
    └── Có → Client Component (thêm 'use client' đầu file)
              Ví dụ: search input, dropdown menu, form validation realtime
```

**Chiến lược tốt nhất**: giữ phần lớn UI là Server Components, chỉ "đẩy xuống client" những phần thực sự cần tương tác:

```
Page (Server)
└── Layout (Server)
    └── DataTable (Server)        ← Fetch data trên server
        ├── SearchInput (Client)  ← Cần input event
        └── DeleteButton (Client) ← Cần click event
```

> Server Components là mặc định trong Next.js App Router. Khi mới dùng Next.js, nhiều người tìm cách thêm `'use client'` khắp nơi — thực ra nên làm ngược lại: chỉ thêm khi thực sự cần interactivity.

---

## Database và SQL

Data của ứng dụng cần được lưu *bền vững* — lưu trong biến JavaScript sẽ mất khi server restart. Database là hệ thống lưu trữ được tối ưu cho việc lưu, truy vấn, và quản lý data có cấu trúc.

### Relational Database — Bảng và mối quan hệ

Database quan hệ (PostgreSQL, MySQL, SQLite) lưu data trong **bảng** — giống Excel nhưng mạnh hơn nhiều và có thể xử lý hàng triệu rows. Các bảng liên kết với nhau qua **foreign key**:

```
Bảng customers:                       Bảng invoices:
┌──────────┬──────┬───────────┐       ┌─────────┬─────────────────┬────────┐
│ id (PK)  │ name │ email     │       │ id (PK) │ customer_id (FK)│ amount │
├──────────┼──────┼───────────┤       ├─────────┼─────────────────┼────────┤
│ cust-001 │ John │ j@...     │◄──────│ inv-001 │    cust-001     │ 500    │
│ cust-002 │ Jane │ j@...     │◄───┬──│ inv-002 │    cust-001     │ 200    │
└──────────┴──────┴───────────┘    └──│ inv-003 │    cust-002     │ 800    │
                                      └─────────┴─────────────────┴────────┘
```

- **PK (Primary Key)**: định danh duy nhất của mỗi row — thường là UUID hoặc auto-increment integer
- **FK (Foreign Key)**: cột trỏ đến PK của bảng khác — tạo quan hệ "invoice thuộc về customer nào"

### SQL — Ngôn ngữ giao tiếp với database

```sql
-- Lấy tất cả invoices
SELECT * FROM invoices;

-- Lấy với điều kiện
SELECT * FROM invoices WHERE status = 'pending';

-- Sắp xếp và giới hạn số lượng kết quả
SELECT * FROM invoices ORDER BY date DESC LIMIT 10;

-- JOIN — kết hợp data từ 2 bảng
SELECT invoices.amount, customers.name, customers.email
FROM invoices
JOIN customers ON invoices.customer_id = customers.id
WHERE invoices.status = 'paid';

-- Phân trang: LIMIT số rows, OFFSET bỏ qua bao nhiêu rows đầu
SELECT * FROM invoices
ORDER BY date DESC
LIMIT 10 OFFSET 20;  -- Trang 3: bỏ 20 rows đầu, lấy 10 tiếp theo

-- Tìm kiếm không phân biệt hoa/thường (PostgreSQL)
SELECT * FROM customers
WHERE name ILIKE '%john%' OR email ILIKE '%john%';
```

Còn lại: `INSERT`, `UPDATE`, `DELETE`:

```sql
INSERT INTO invoices (customer_id, amount, status)
VALUES ('cust-001', 500, 'pending');

UPDATE invoices SET status = 'paid' WHERE id = 'inv-001';

DELETE FROM invoices WHERE id = 'inv-001';
```

> **Đừng sợ SQL.** 80% công việc thực tế chỉ dùng SELECT/INSERT/UPDATE/DELETE với vài điều kiện WHERE. Cái quan trọng hơn là bảo mật — xem tiếp.

### SQL Injection — Lỗ hổng không được phép mắc

Đây là lỗ hổng phổ biến nhất và cũng nghiêm trọng nhất khi làm việc với database:

```typescript
// NGUY HIỂM — đừng bao giờ làm thế này
const query = `SELECT * FROM users WHERE email = '${userInput}'`;

// Nếu userInput = "' OR '1'='1' --"
// → Query trở thành:
// SELECT * FROM users WHERE email = '' OR '1'='1' --'
// → '1'='1' luôn đúng → trả về TOÀN BỘ bảng users!
```

Giải pháp là **parameterized queries** — không bao giờ ghép string:

```typescript
// AN TOÀN — driver tự escape mọi ký tự đặc biệt
const result = await sql`SELECT * FROM users WHERE email = ${userInput}`;
// Dù userInput có chứa gì, nó chỉ được xử lý như một string bình thường
```

> **Nguyên tắc vàng, không có ngoại lệ**: Không bao giờ ghép user input trực tiếp vào chuỗi SQL. Luôn dùng parameterized queries.

---

## ORM — SQL bằng ngôn ngữ TypeScript

SQL thuần hoạt động tốt, nhưng khi project lớn dần có một số vấn đề:
- Lỗi cú pháp SQL chỉ phát hiện lúc runtime, không phải lúc viết code
- Không có type-checking cho kết quả query
- Strings SQL dài xen lẫn logic nghiệp vụ, khó đọc

**ORM (Object-Relational Mapping)** giải quyết điều này bằng cách cho phép làm việc với database qua TypeScript objects và methods — ORM tự dịch thành SQL:

```typescript
// SQL thuần
const result = await sql`
  SELECT invoices.id, invoices.amount, customers.name
  FROM invoices
  JOIN customers ON invoices.customer_id = customers.id
  WHERE invoices.status = 'pending'
  ORDER BY invoices.date DESC
`;
// result không có type — TypeScript không biết result[0].name có tồn tại không

// Prisma ORM — type-safe
const invoices = await prisma.invoice.findMany({
  where: { status: 'pending' },
  orderBy: { date: 'desc' },
  include: { customer: { select: { name: true } } },
});
// invoices[0].customer.name → TypeScript biết chính xác field này tồn tại
```

| | SQL thuần | ORM (Prisma) |
|---|---|---|
| Type safety | Tự khai báo types | Tự generate từ schema |
| Học | Cần biết SQL | Cần học Prisma API |
| Query phức tạp | Linh hoạt hơn | Đôi khi awkward |
| Migration | Tự viết SQL | ORM tự generate |

### Cạm bẫy: N+1 Problem

Lỗi hiệu năng phổ biến nhất khi dùng ORM — chạy nhiều query riêng lẻ thay vì một query JOIN:

```typescript
// SAI — 1 + N queries (N = số invoices)
const invoices = await prisma.invoice.findMany({ take: 10 });
for (const invoice of invoices) {
  // Mỗi vòng lặp gửi 1 query riêng → 10 query riêng lẻ!
  const customer = await prisma.customer.findUnique({
    where: { id: invoice.customerId }
  });
}

// ĐÚNG — chỉ 1 query với JOIN
const invoices = await prisma.invoice.findMany({
  take: 10,
  include: { customer: true },  // → 1 query duy nhất
});
```

### Khoá học này dùng gì?

Project dùng `@vercel/postgres` với tagged template literals — cách trung gian: viết SQL trực tiếp nhưng tự động parameterized và có TypeScript generics:

```typescript
import { sql } from '@vercel/postgres';

const data = await sql<Invoice[]>`
  SELECT invoices.id, invoices.amount, customers.name
  FROM invoices
  JOIN customers ON invoices.customer_id = customers.id
  WHERE customers.name ILIKE ${`%${query}%`}
  LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
`;
// data.rows → Invoice[] với type đầy đủ
```

> Viết SQL trực tiếp trong khoá học này là *có chủ đích* — giúp bạn hiểu query thực sự chạy thế nào. Khi đi làm, bạn sẽ quyết định dùng SQL thuần hay ORM tùy project. Biết cả hai là lợi thế.

---

## Authentication và Authorization

Bạn xây được dashboard hiển thị data nhạy cảm. Nhưng hiện tại ai cũng truy cập được — không có gì ngăn người lạ vào xem toàn bộ dữ liệu.

Trước khi bảo vệ ứng dụng, cần phân biệt rõ hai khái niệm hay bị nhầm:

**Authentication** = "Bạn là ai?" → Xác minh danh tính (đăng nhập)  
**Authorization** = "Bạn được làm gì?" → Kiểm soát quyền hạn (phân quyền)

```
Ví dụ thực tế — toà nhà văn phòng:
Authentication: Bạn có thẻ nhân viên không? (xác minh bạn là ai)
Authorization:  Bạn được vào tầng nào? (xác minh bạn được làm gì)

Bạn có thể vượt qua authentication (có thẻ giả)
nhưng vẫn bị chặn ở authorization (thẻ không có quyền tầng đó).
```

### Vấn đề: HTTP là stateless

HTTP không "nhớ" giữa các request — mỗi request là độc lập. Nếu user đăng nhập ở request 1, request 2 server không tự biết điều đó. Cần một cơ chế để "ghi nhớ" trạng thái đăng nhập.

**Giải pháp phổ biến: JWT (JSON Web Token)**

```
Lần 1 — Đăng nhập:
Browser  →  POST /login {email, password}  →  Server
                                              ├── Kiểm tra credentials
                                              ├── Tạo JWT: {userId, role, exp: "24h"}
                                              └── Set-Cookie: token=eyJ... (HttpOnly)
Browser  ←  Cookie được lưu  ←────────────  Server

Lần 2 — Request tiếp theo:
Browser  →  GET /dashboard (Cookie: token=eyJ...)  →  Server
                                                       ├── Xác minh JWT signature
                                                       ├── Lấy userId từ payload
                                                       └── Phục vụ request
Browser  ←  HTML dashboard  ←──────────────────────  Server
```

`HttpOnly` cookie — JavaScript không đọc được cookie này, ngăn tấn công XSS đánh cắp token.

### Password — Tuyệt đối không lưu dạng plaintext

Nếu database bị hack và password được lưu dạng plaintext → attacker có password của *mọi* user — và phần lớn người dùng tái sử dụng password ở nhiều dịch vụ khác.

**Hashing** là quá trình một chiều: `password → hash`. Không thể đảo ngược từ hash về password.

```typescript
import bcrypt from 'bcryptjs';

// Khi đăng ký — hash trước khi lưu
const hash = await bcrypt.hash('mypassword123', 10);
// '10' là cost factor: cao hơn = chậm hơn = khó brute force hơn
// Lưu hash vào DB, không lưu password gốc

// Khi đăng nhập — so sánh
await bcrypt.compare('mypassword123', hash);  // → true
await bcrypt.compare('wrongpassword', hash);  // → false
```

**Tại sao không dùng MD5 hay SHA-256?** Vì chúng quá *nhanh* — attacker có thể thử hàng tỷ password/giây bằng GPU. bcrypt được thiết kế **chậm có chủ đích** (vài milliseconds/hash) và tự thêm random salt — khiến brute force gần như không khả thi.

### Middleware — Gác cổng một lần cho tất cả routes

Thay vì kiểm tra auth trong từng route handler, **middleware** chạy *trước* khi request đến handler:

```
Request đến /dashboard/invoices
         ↓
   middleware.ts (chạy trước)
         ├── Cookie có JWT hợp lệ? → Cho qua → Route Handler → Response
         └── Không có / expired?  → Redirect đến /login
```

Không cần lặp lại code kiểm tra auth ở mọi nơi — middleware lo hết.

> **Hai nguyên tắc không có ngoại lệ:**
> 1. Không bao giờ lưu password dạng plaintext
> 2. Không bao giờ tin input từ client để quyết định quyền hạn — luôn verify trên server

---

## Data Fetching Patterns

Server cần lấy data để render trang. Câu hỏi là: **lấy khi nào?**

Câu trả lời phụ thuộc vào đặc điểm của data — thay đổi thường xuyên không, có cá nhân hoá theo user không.

### SSG — Static Site Generation

HTML được render **một lần lúc build**, lưu vào disk:

```
Build time: query DB → render HTML → lưu file
Request 1:  trả file HTML ngay (< 1ms)
Request 2:  trả file HTML ngay (< 1ms)
...
```

**Phù hợp khi:** Blog, tài liệu, landing page — nội dung ít thay đổi  
**Vấn đề:** Data chỉ cập nhật khi build lại

### SSR — Server-side Rendering

HTML được render **mỗi khi có request**:

```
Request 1: query DB → render HTML → gửi (100ms)
Request 2: query DB → render HTML → gửi (100ms)
...
```

**Phù hợp khi:** Dashboard, trang cá nhân, kết quả tìm kiếm — data luôn mới nhất, cá nhân hoá theo user  
**Vấn đề:** Server phải xử lý mỗi request, chậm hơn SSG

### ISR — Incremental Static Regeneration

Kết hợp tốt nhất của cả hai: cache như SSG, nhưng tự động rebuild sau N giây:

```
Lần đầu:               Build → cache HTML
Trong 60 giây:         Trả cache (nhanh)
Sau 60 giây, request đến:  Trả cache cũ ngay → rebuild background
Request tiếp theo:     Trả cache đã cập nhật
```

**Phù hợp khi:** Catalog sản phẩm, tin tức — data thay đổi thỉnh thoảng, không cần realtime

### Streaming

Thay vì chờ toàn bộ trang render xong mới gửi, server gửi HTML **từng phần** xuống browser ngay khi sẵn sàng:

```
Không streaming:  ░░░░░░░░░░░░░░░ 3 giây chờ → ████████ tất cả cùng lúc
Có streaming:     ████ 0.1s → ░░░████ 0.5s → ░░░░░░░████ 3s → hoàn chỉnh
```

Người dùng thấy nội dung xuất hiện dần dần thay vì màn hình trắng 3 giây. "Time to first content" ngắn hơn dù "time to full page" không đổi.

> **Không có pattern "tốt nhất"** — tốt nhất là chọn đúng cho từng trường hợp. Tự hỏi: *"Data này thay đổi bao lâu một lần? Có khác nhau giữa các user không?"* Trả lời xong là biết dùng pattern nào.

---

## Form Handling và Validation

Forms là cách user đưa data vào ứng dụng. Vấn đề: user có thể nhập sai, nhập thiếu, hoặc cố tình nhập data độc hại. Cần **validation** trước khi xử lý.

### Validate ở đâu?

**Client-side** (JavaScript trong browser):
- Feedback ngay lập tức → UX tốt
- Giảm tải server (không gửi request nếu sai)
- **Nhưng có thể bypass hoàn toàn** — user tắt JS, hoặc gửi request trực tiếp qua Postman/curl

**Server-side** (trước khi ghi DB):
- Không thể bypass — đây là "nguồn sự thật" cuối cùng
- Bắt buộc cho bảo mật
- Chậm hơn (cần round-trip)

**Kết luận**: Làm cả hai. Client-side cho UX, server-side cho bảo mật thật sự.

### Zod — Validate với TypeScript types

Zod cho phép định nghĩa "schema" một lần, dùng cho cả validation lẫn TypeScript types:

```typescript
import { z } from 'zod';

const InvoiceSchema = z.object({
  customerId: z.string({
    invalid_type_error: 'Vui lòng chọn khách hàng.',
  }),
  amount: z.coerce              // coerce: tự convert "10" (string) → 10 (number)
    .number()
    .gt(0, { message: 'Số tiền phải lớn hơn 0.' })
    .max(1_000_000, { message: 'Số tiền tối đa 1,000,000.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Vui lòng chọn trạng thái.',
  }),
});

// safeParse — không throw exception, trả về result object
const result = InvoiceSchema.safeParse(formData);

if (!result.success) {
  return { errors: result.error.flatten().fieldErrors };
  // {
  //   customerId: ['Vui lòng chọn khách hàng.'],
  //   amount: ['Số tiền phải lớn hơn 0.'],
  //   status: ['Vui lòng chọn trạng thái.']
  // }
}

// result.data đã được validate và có TypeScript type đầy đủ
await createInvoice(result.data);
```

### CSRF — Tấn công giả mạo request

**CSRF (Cross-Site Request Forgery)**: trang web độc hại trick browser của user gửi request đến ứng dụng của bạn.

Ví dụ: User đang đăng nhập `bank.com`. Vô tình vào trang độc hại. Trang đó có form ẩn `<form action="https://bank.com/transfer">` tự submit — browser *tự động* gửi kèm cookie đăng nhập của `bank.com`.

> Next.js Server Actions tự động bảo vệ CSRF — không cần làm gì thêm.

> **Nguyên tắc vàng về input**: "Never trust user input." Mọi data từ bên ngoài đều có thể sai hoặc độc hại — luôn validate trên server.

---

## Caching và Performance

5 queries mỗi request × 100ms/query = 500ms mỗi lần vào trang. Nhân với 1000 người dùng đồng thời = 5000 queries giống hệt nhau chạy cùng lúc → database quá tải.

**Caching** giải quyết bằng cách lưu kết quả, lần sau trả ngay mà không cần làm lại:

```
Request 1 vào /dashboard:
  → Cache miss → Query DB (200ms) → Lưu vào cache → Trả response

Request 2-1000 vào /dashboard (trong 60 giây):
  → Cache hit → Trả từ cache (< 1ms) → Không query DB
```

### Cache Invalidation — Phần khó nhất

Khi data trong DB thay đổi, cache cũ sai. Cần xoá cache để request tiếp theo fetch data mới:

```typescript
import { revalidatePath } from 'next/cache';

async function createInvoice(data) {
  await sql`INSERT INTO invoices ...`;
  revalidatePath('/dashboard/invoices'); // Xoá cache của trang này
  // Request tiếp theo sẽ render lại từ DB
}
```

> *"There are only two hard things in Computer Science: cache invalidation and naming things."*
> — Phil Karlton, kỹ sư Netscape
>
> Câu này vẫn đúng đến ngày nay. Caching dễ thêm vào; cache invalidation mới là phần khó. Invalidate quá sớm → không có lợi ích gì. Invalidate quá muộn → user thấy data cũ.

### CDN — Cache gần người dùng hơn

**CDN (Content Delivery Network)** là mạng server phân tán toàn cầu. Static files (images, CSS, JS, pre-built HTML) được cache ở server gần user nhất:

```
Không CDN:                  Có CDN:
User ở Hà Nội               User ở Hà Nội
      ↓                           ↓
Server ở US (200ms)         CDN edge ở Singapore (20ms)
```

Vercel — platform để deploy Next.js — tự động push static content lên CDN toàn cầu.

> **Nguyên tắc caching**: Cache những thứ ít thay đổi, invalidate ngay khi data thay đổi. Không cache data cá nhân hoá theo user trong shared cache.

---

## Environment Variables và Secrets

Code cần kết nối đến nhiều services: database, email, payment gateway... Mỗi service cần credentials riêng, và những credentials này:
- Khác nhau giữa development và production
- **Không được commit lên Git** — repo có thể public, bị clone, bị hack

Giải pháp: **environment variables** — đặt ngoài source code, trong môi trường chạy:

```bash
# .env.local — chỉ tồn tại trên máy bạn, KHÔNG commit lên git
POSTGRES_URL="postgresql://user:password@host:5432/mydb"
AUTH_SECRET="random-64-char-string-generated-with-openssl"
STRIPE_SECRET_KEY="sk_live_..."
```

```typescript
// Dùng trong code
const db = postgres(process.env.POSTGRES_URL!);
// '!' nói TypeScript: "Tôi đảm bảo biến này tồn tại"
```

File `.env.local` được thêm vào `.gitignore` — không bao giờ lên repository.

### Server-only vs Public variables

Next.js phân biệt hai loại:

```bash
# Server-only — KHÔNG xuất hiện trong JS bundle gửi đến browser
POSTGRES_URL="postgresql://..."
AUTH_SECRET="..."
STRIPE_SECRET_KEY="..."

# Public — nhúng vào JS bundle, accessible từ browser
# Chỉ dùng cho những thứ browser thực sự cần biết
NEXT_PUBLIC_APP_URL="https://myapp.com"
NEXT_PUBLIC_POSTHOG_KEY="phc_..."
```

> **Nguyên tắc**: Nếu không có lý do cụ thể browser cần biết → đừng thêm `NEXT_PUBLIC_`. Database URL, API secret keys, auth secrets không bao giờ được dùng prefix này.

**Quy trình chuẩn khi setup project:**
1. Tạo `.env.local` với credentials thật
2. Tạo `.env.example` với key names nhưng không có values — commit file này để document
3. Thêm `.env.local` vào `.gitignore`
4. Khi deploy: set environment variables trong dashboard của platform (Vercel, Railway...)

---

## Error Handling

Ứng dụng chạy trong môi trường không thể kiểm soát hoàn toàn — database timeout, network gián đoạn, user nhập data bất ngờ, bug chưa phát hiện. Câu hỏi không phải "lỗi có xảy ra không?" mà là "khi lỗi xảy ra, ứng dụng xử lý thế nào?"

### Hai loại lỗi cần xử lý khác nhau

**Expected errors** — có thể dự đoán, xử lý trong business logic:
- Form validation fail → trả về error message, hiển thị trên UI
- Invoice ID không tồn tại → trang 404
- User chưa đăng nhập → redirect về `/login`
- User không có quyền → trang 403

**Unexpected errors** — không lường trước, cần error boundary:
- Database connection mất
- Network timeout
- Bug trong code (null reference, type error...)

### Error Boundaries — Tường lửa ngăn crash lan rộng

Nếu không xử lý, unexpected error crash toàn bộ app — user thấy trang trắng. Error boundary giới hạn phạm vi crash:

```
Không có error boundary:        Có error boundary:
┌──────────────────────┐       ┌────────────────────────────┐
│ Header               │       │ Header ✓                   │
│ Sidebar              │       │ Sidebar ✓                  │
│ ❌ CRASH             │       │ ┌──────────────────────┐   │
│ → Trang trắng        │       │ │ ❌ Có lỗi xảy ra     │   │
└──────────────────────┘       │ │ [Thử lại]            │   │
                                │ └──────────────────────┘   │
                                └────────────────────────────┘
```

Trong Next.js: tạo file `error.tsx` trong thư mục route là tự động có error boundary cho route đó.

### Thông báo lỗi tốt vs tệ

Người dùng không cần biết stack trace hay lỗi database nội bộ:

```
Tệ:  "PostgreSQLError: relation 'invoices' does not exist at Object.<anonymous>"
Tốt: "Không thể tải danh sách hoá đơn. Vui lòng thử lại sau."

Tệ:  404
Tốt: "Không tìm thấy hoá đơn này. Có thể nó đã bị xoá.
      → Xem tất cả hoá đơn"
```

Luôn cho user một **hướng thoát**: nút "Thử lại", link quay lại trang trước, hoặc link đến nơi khác.

> **Log đầy đủ cho developer, thông báo thân thiện cho user.** Hai thứ này phục vụ hai đối tượng khác nhau — đừng trộn lẫn.

---

## SEO và Metadata

Xây được ứng dụng tốt nhưng không ai tìm thấy — cũng như không có. **SEO (Search Engine Optimization)** giúp trang xuất hiện trong kết quả tìm kiếm.

Search engine crawlers đọc HTML của trang để hiểu nội dung. Metadata trong `<head>` là nguồn thông tin chính.

### Metadata cơ bản

```html
<head>
  <title>Invoices | Acme Dashboard</title>
  <!-- Tên trang — quan trọng nhất cho SEO, hiện trên tab browser và kết quả Google -->

  <meta name="description" content="Quản lý và theo dõi hoá đơn của bạn">
  <!-- Mô tả hiện dưới title trong kết quả Google — 150-160 ký tự -->

  <link rel="canonical" href="https://myapp.com/dashboard/invoices">
  <!-- URL chính thức của trang — tránh duplicate content khi có nhiều URL cùng nội dung -->
</head>
```

### Open Graph — Preview khi share lên social media

```html
<meta property="og:title" content="Acme Dashboard">
<meta property="og:description" content="Quản lý hoá đơn dễ dàng">
<meta property="og:image" content="https://myapp.com/og-image.png">
<meta property="og:url" content="https://myapp.com">
```

Không có OG tags → share lên Slack/Facebook trông như link thuần, không có preview → ít người click.

### Tại sao Next.js tốt cho SEO hơn React thuần?

```html
<!-- Crawler thấy với React thuần (Create React App) -->
<body>
  <div id="root"></div>
  <!-- Trống! JavaScript chưa chạy, crawler không thấy nội dung gì -->
</body>

<!-- Crawler thấy với Next.js SSR/SSG -->
<body>
  <h1>Danh sách hoá đơn</h1>
  <table>
    <tr><td>Invoice #001</td><td>500,000 VND</td></tr>
    ...
  </table>
</body>
```

Next.js render HTML trên server — crawler đọc được nội dung thật → indexing tốt hơn → SEO tốt hơn.

> SEO là đầu tư dài hạn — thay đổi hôm nay có thể mất vài tuần mới thấy kết quả. Hai việc đơn giản nhất có tác động lớn nhất: (1) mỗi trang có `<title>` và `<meta description>` mô tả đúng nội dung, (2) dùng SSR/SSG để crawler đọc được HTML thật.

---

## Tổng kết

Server-side programming không phải một kỹ năng đơn lẻ — là nhiều mảnh ghép lại với nhau:

```
┌───────────────────────────────────────────────────────────────────┐
│                    Ứng Dụng Web Hoàn Chỉnh                        │
├──────────────────────────┬────────────────────────────────────────┤
│  Routing                 │ URL → đúng code xử lý                  │
│  Server/Client Split     │ Render đúng nơi, bảo mật và hiệu năng  │
│  Database + SQL          │ Lưu trữ và truy vấn data bền vững       │
│  ORM                     │ Database bằng TypeScript objects        │
│  Authentication          │ Xác minh "bạn là ai"                   │
│  Authorization           │ Kiểm soát "bạn được làm gì"            │
│  Data Fetching Patterns  │ Static, SSR, ISR, Streaming             │
│  Form + Validation       │ Nhận và kiểm tra input từ user          │
│  Caching                 │ Tránh tính lại những gì đã có           │
│  Environment Variables   │ Quản lý secrets an toàn                 │
│  Error Handling          │ Xử lý khi mọi thứ không như kế hoạch   │
│  SEO + Metadata          │ Giúp người dùng tìm thấy ứng dụng       │
└──────────────────────────┴────────────────────────────────────────┘
```

Mỗi chapter trong khoá học Next.js sẽ thực hành một hoặc nhiều mảnh trong bảng trên. Có bức tranh tổng thể này, mỗi tính năng mới sẽ dễ hiểu hơn nhiều vì bạn biết nó *giải quyết vấn đề gì* và *tại sao* nó quan trọng.
