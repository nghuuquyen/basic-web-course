---
title: "Phần 2 — Next.js App Router: Dynamic App với Supabase"
---

# Phần 2 — Next.js App Router: Dynamic App với Supabase

> **Kiến thức nền cần có:** HTML/CSS cơ bản, JavaScript ES6+, khái niệm về React component và props. Nếu chưa nắm các khái niệm server-side như routing, database, authentication — đọc thêm `module4__introduction_to_server_side_programming.md` trước.

Phần 1 dạy bạn cách xây trang tĩnh với SSG. Phần này đi xa hơn: xây ứng dụng **dynamic** thực sự — có database PostgreSQL (qua Supabase), CRUD operations, authentication, search, pagination. Đây là kiến trúc của ứng dụng production, dùng **App Router** — hướng đi chính của Next.js từ phiên bản 13+.

---

## Về tài liệu này

Bài thực hành gốc được **Next.js cung cấp chính thức** tại:

**[https://nextjs.org/learn/dashboard-app](https://nextjs.org/learn/dashboard-app)**

Tài liệu này là bản **tổng hợp và dịch sang Tiếng Việt** để hỗ trợ thêm cho quá trình học. Khuyến khích đọc song song cả hai nguồn — tài liệu gốc có các bài tập tương tác với code sandbox, còn tài liệu này giúp nắm nhanh ý chính bằng tiếng Việt và cung cấp ngữ cảnh bổ sung.

---

## Mục Lục

1. [Tối ưu Font và Hình Ảnh](#1-tối-ưu-font-và-hình-ảnh)
2. [Tạo Layouts và Pages](#2-tạo-layouts-và-pages)
3. [Navigation Giữa Các Trang](#3-navigation-giữa-các-trang)
4. [Thiết Lập Database](#4-thiết-lập-database)
5. [Fetch Dữ Liệu](#5-fetch-dữ-liệu)
6. [Static và Dynamic Rendering](#6-static-và-dynamic-rendering)
7. [Streaming](#7-streaming)
8. [Partial Prerendering (PPR)](#8-partial-prerendering-ppr)
9. [Search và Pagination](#9-search-và-pagination)
10. [Mutating Data — Tạo, Sửa, Xoá](#10-mutating-data--tạo-sửa-xoá)
11. [Xử Lý Lỗi](#11-xử-lý-lỗi)
12. [Accessibility](#12-accessibility)
13. [Authentication](#13-authentication)
14. [Metadata và SEO](#14-metadata-và-seo)

---

## 1. Tối Ưu Font và Hình Ảnh

Cách thêm font thông thường là dùng thẻ `<link>` Google Fonts trong HTML, và ảnh bằng thẻ `<img>` thông thường. Cả hai cách này **hoạt động được**, nhưng gây ra hai vấn đề hiệu năng phổ biến mà người mới học hay bỏ qua.

**Vấn đề 1 — CLS (Cumulative Layout Shift):** Khi trang load, browser dùng font dự phòng (Arial, Times New Roman...) để render text trước. Sau khi font Google Fonts tải xong, browser hoán đổi font — text thay đổi kích thước đột ngột, gây trang bị **giật nhảy**. CLS là một trong ba chỉ số Core Web Vitals Google dùng để đánh giá chất lượng trang. CLS cao → điểm SEO thấp.

**Vấn đề 2 — Ảnh không tối ưu:** Thẻ `<img>` tải ảnh theo kích thước gốc dù người dùng đang dùng màn hình nhỏ. Ảnh 4K trên điện thoại là lãng phí bandwidth hoàn toàn.

### Giải pháp của Next.js

**`next/font`** — tải font về server lúc build, nhúng thẳng vào CSS mà không cần request mạng runtime:

```typescript
// app/ui/fonts.ts
import { Inter, Lusitana } from 'next/font/google';

export const inter = Inter({ subsets: ['latin'] });
export const lusitana = Lusitana({ weight: ['400', '700'], subsets: ['latin'] });
```

```tsx
// app/layout.tsx — áp dụng font cho toàn app
<body className={`${inter.className} antialiased`}>{children}</body>
```

**`next/image`** — component `<Image>` tự động chuyển sang WebP/AVIF, resize theo thiết bị, lazy load, và giữ sẵn không gian cho ảnh (ngăn CLS):

```tsx
import Image from 'next/image';

<Image
  src="/hero-desktop.png"
  width={1000}
  height={760}
  alt="Screenshots of the dashboard project"
  className="hidden md:block"
/>
```

> Tối ưu hiệu năng nên làm đúng ngay từ đầu. Hai thứ cần nhớ: dùng `next/font` thay vì Google Fonts CDN, dùng `<Image>` thay vì `<img>`, luôn khai báo `width` và `height`.

---

## 2. Tạo Layouts và Pages

Một ứng dụng dashboard có nhiều trang: trang chủ, invoice list, customer list... Tất cả dùng chung sidebar. Vấn đề quen thuộc: làm thế nào chia sẻ UI giữa nhiều trang mà không copy-paste? Và Next.js biết cần hiển thị trang nào khi user gõ `/dashboard/invoices`?

### File-based Routing trong App Router

App Router dùng cấu trúc thư mục làm route. Mỗi thư mục trong `app/` là một route segment, file `page.tsx` bên trong là UI của route đó:

```
app/
├── page.tsx              → /
├── login/
│   └── page.tsx          → /login
└── dashboard/
    ├── layout.tsx         → layout dùng chung cho /dashboard/*
    ├── page.tsx           → /dashboard
    ├── invoices/
    │   └── page.tsx       → /dashboard/invoices
    └── customers/
        └── page.tsx       → /dashboard/customers
```

**Quy tắc:** Chỉ file tên `page.tsx` mới tạo route công khai. Các file tên khác (`layout.tsx`, `loading.tsx`, `error.tsx`...) có vai trò đặc biệt, không phải là trang.

### Layout — Tái Sử Dụng UI

`layout.tsx` bọc xung quanh tất cả trang con. Khi người dùng navigate giữa các trang, layout **không bị re-render** — chỉ phần `{children}` thay đổi. Điều này giữ nguyên trạng thái sidebar, tiết kiệm tài nguyên:

```tsx
// app/dashboard/layout.tsx
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
        {children}  {/* nội dung từng trang render ở đây */}
      </div>
    </div>
  );
}
```

Root layout (`app/layout.tsx`) là bắt buộc và chứa thẻ `<html>` và `<body>`:

```tsx
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
```

> File-based routing biến cấu trúc thư mục thành "tài liệu sống" của ứng dụng — nhìn vào `app/` là biết ngay ứng dụng có những trang nào. Layout tránh re-render không cần thiết, đồng thời giải quyết vấn đề chia sẻ UI.

---

## 3. Navigation Giữa Các Trang

Sau khi có nhiều trang, cần cho phép người dùng di chuyển. Dùng `<a>` thông thường gây **full page reload** — tải lại toàn bộ CSS và JS, re-initialize React... Với ứng dụng có sidebar, điều này có nghĩa là sidebar bị tải lại không cần thiết mỗi lần navigate.

### `<Link>` — Client-side Navigation

```tsx
import Link from 'next/link';

// Thay thế <a href="/dashboard/invoices"> bằng:
<Link href="/dashboard/invoices">Invoices</Link>
```

Next.js tự động **prefetch** — khi một `<Link>` xuất hiện trong viewport, Next.js âm thầm tải trước trang đó ở background. Click xong là hiện ngay lập tức.

### Highlight Active Link

Sidebar cần hiển thị link nào đang active. Để biết URL hiện tại trong component, dùng hook `usePathname()`:

```tsx
// app/ui/dashboard/nav-links.tsx
'use client';  // bắt buộc vì dùng hook
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { name: 'Home', href: '/dashboard' },
  { name: 'Invoices', href: '/dashboard/invoices' },
  { name: 'Customers', href: '/dashboard/customers' },
];

export default function NavLinks() {
  const pathname = usePathname(); // trả về URL hiện tại, VD: "/dashboard/invoices"

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={clsx(
            'flex h-12 items-center gap-2 rounded-md p-3 text-sm font-medium',
            {
              'bg-sky-100 text-blue-600': pathname === link.href, // active style
              'hover:bg-sky-100': pathname !== link.href,
            }
          )}
        >
          <link.icon className="w-6" />
          <p className="hidden md:block">{link.name}</p>
        </Link>
      ))}
    </>
  );
}
```

**Tại sao phải thêm `'use client'`?** Hooks như `usePathname()` cần môi trường browser (cần biết URL hiện tại của browser). Server Components chạy trên server trước khi gửi HTML xuống — không có khái niệm "browser". Directive `'use client'` báo Next.js component này cần chạy ở client.

> Phân biệt rõ hai loại component: **Server Component** (mặc định) — không có interactivity, không dùng hooks, chạy trên server. **Client Component** (`'use client'`) — có interactivity, dùng hooks, chạy trên browser. Chỉ thêm `'use client'` khi thực sự cần — component càng ít JS gửi xuống browser, trang càng nhanh.

---

## 4. Thiết Lập Database

Ứng dụng cần **database** để lưu trữ dữ liệu thực. Nếu chưa quen với database: hãy nghĩ nó như một bảng tính Excel rất mạnh, được truy cập bằng SQL, lưu trữ an toàn và cho phép nhiều người dùng đồng thời.

### Cấu trúc Database

Ứng dụng dashboard quản lý hoá đơn cần các bảng:

```
users        → tài khoản đăng nhập
customers    → danh sách khách hàng
invoices     → hoá đơn (liên kết với customers)
revenue      → doanh thu theo tháng (dùng cho chart)
```

Quan hệ giữa bảng:

```
customers                    invoices
──────────────────           ─────────────────────────
id (PK)          ◄──────── customer_id (FK)
name                         amount
email                        status ('pending'|'paid')
image_url                    date
```

`FK` (Foreign Key) — cột `customer_id` trong `invoices` trỏ đến `id` của `customers`. Từ một invoice ta biết ngay nó thuộc khách hàng nào.

### Tạo và Seed Database

File `app/seed/route.ts` là một API endpoint đặc biệt: truy cập `/seed` chạy script tạo bảng và chèn dữ liệu mẫu:

```typescript
// app/seed/route.ts (rút gọn)
import bcrypt from 'bcryptjs';
import { sql } from '@vercel/postgres';

export async function GET() {
  // Tạo bảng
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );
  `;

  // Chèn dữ liệu — hash password trước khi lưu
  for (const user of placeholder_users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await sql`
      INSERT INTO users (id, name, email, password)
      VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
      ON CONFLICT (id) DO NOTHING;
    `;
  }

  return Response.json({ message: 'Database seeded successfully' });
}
```

**Tại sao hash password?** Nếu database bị tấn công và lộ, attacker không đọc được password gốc — chỉ thấy chuỗi hash ngẫu nhiên. Đây là quy tắc bảo mật **không thể thương lượng**.

`ON CONFLICT DO NOTHING` đảm bảo script chạy nhiều lần mà không lỗi "duplicate entry".

> Hai nguyên tắc không được bỏ qua khi thiết lập database: (1) không hardcode credentials — dùng biến môi trường `.env.local`, (2) không lưu password plaintext — luôn hash với bcrypt trước khi lưu.

---

## 5. Fetch Dữ Liệu

Database đã có dữ liệu. Bước tiếp theo: đọc và hiển thị lên UI.

Trong kiến trúc truyền thống (React + Express), luồng là: React gọi `fetch('/api/invoices')` → Express query database → trả JSON → React render. Cách này thêm một tầng API trung gian không cần thiết khi frontend và backend ở cùng một project.

### Server Components Query Database Trực Tiếp

Server Components chạy trên server — nghĩa là **có thể query database trực tiếp**, không cần tầng API trung gian:

```typescript
// app/lib/data.ts — các hàm query database
import { sql } from '@vercel/postgres';

export async function fetchRevenue() {
  const data = await sql<Revenue[]>`SELECT * FROM revenue ORDER BY month`;
  return data.rows;
}

export async function fetchLatestInvoices() {
  const data = await sql<LatestInvoiceRaw[]>`
    SELECT invoices.amount, customers.name, customers.email, invoices.id
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    ORDER BY invoices.date DESC
    LIMIT 5
  `;
  return data.rows;
}
```

```tsx
// app/dashboard/(overview)/page.tsx — Server Component
export default async function Page() {
  // Gọi thẳng, không qua API
  const revenue = await fetchRevenue();
  const latestInvoices = await fetchLatestInvoices();

  return (
    <main>
      <RevenueChart revenue={revenue} />
      <LatestInvoices latestInvoices={latestInvoices} />
    </main>
  );
}
```

### Request Waterfall

Nếu viết code tuần tự:

```typescript
const revenue = await fetchRevenue();           // chờ 1s
const latestInvoices = await fetchLatestInvoices(); // chờ thêm 1s
const cardData = await fetchCardData();         // chờ thêm 1s
// Tổng: 3 giây
```

Mỗi `await` chờ request trước hoàn thành mới bắt đầu tiếp — gọi là **request waterfall**. Nhưng 3 query này **độc lập nhau**, không cần chờ theo thứ tự.

`Promise.all()` chạy tất cả song song:

```typescript
const [revenue, latestInvoices, cardData] = await Promise.all([
  fetchRevenue(),
  fetchLatestInvoices(),
  fetchCardData(),
]);
// Tổng: ~1 giây (bằng query chậm nhất)
```

> Server Components đơn giản hoá data fetching — không cần API routes, không cần `useEffect`, không cần manage loading state phức tạp. Nhưng luôn để ý đến waterfall: khi nhiều query độc lập nhau, dùng `Promise.all()`.

---

## 6. Static và Dynamic Rendering

Hãy nghĩ đến hai loại trang trong e-commerce: trang "Về chúng tôi" (gần như không thay đổi) và trang giỏ hàng (cá nhân hóa cho từng user, thay đổi liên tục). Hai loại này có đặc điểm hoàn toàn khác nhau — không nên xử lý giống nhau.

**Static Rendering:** Trang được render **một lần lúc build**, HTML được cache và phục vụ cho mọi request. Cực nhanh, giảm tải server, CDN-friendly. Phù hợp: blog, trang giới thiệu, landing page.

**Dynamic Rendering:** Trang được render **mỗi khi có request**, fetch data mới từ database. Data luôn mới nhất, có thể cá nhân hoá. Phù hợp: dashboard, trang tìm kiếm, giỏ hàng.

Next.js tự động chuyển sang Dynamic Rendering khi component dùng `cookies()`, `headers()`, `searchParams` từ URL, hoặc database query không có caching directive.

**Vấn đề chính với Dynamic Rendering:** Toàn bộ trang phải chờ **query chậm nhất** hoàn thành. Nếu `fetchRevenue()` mất 3 giây, người dùng thấy màn hình trắng 3 giây — dù sidebar và header không cần data đó.

→ Giải pháp: **Streaming** (phần tiếp theo).

> Câu hỏi tự hỏi với mỗi trang: Data này có thay đổi không? Có cá nhân hóa theo user không? Static khi có thể, Dynamic khi cần thiết.

---

## 7. Streaming

Dynamic Rendering làm toàn bộ trang bị chặn bởi query chậm nhất. Với database thực tế còn có thể chậm do server bận, network latency, hay query phức tạp — không thể kiểm soát được.

Với **HTTP Streaming**, server gửi HTML **từng phần (chunk)** ngay khi mỗi phần sẵn sàng — browser bắt đầu render từng phần ngay lập tức thay vì chờ toàn bộ:

```
Không streaming:   ░░░░░░░░░░░░░░░░ → ████████████████ (hiện tất cả cùng lúc)
Có streaming:      ████░            → ░░░████░         → ░░░░░░░████ (hiện dần)
```

### React Suspense

React tích hợp Streaming qua `<Suspense>`:

```tsx
// app/dashboard/(overview)/page.tsx
import { Suspense } from 'react';
import { CardsSkeleton, RevenueChartSkeleton, LatestInvoicesSkeleton } from '@/app/ui/skeletons';

export default async function Page() {
  return (
    <main>
      {/* Hiện ngay lập tức — không cần data */}
      <h1>Dashboard</h1>

      {/* Hiện skeleton trong lúc chờ — mỗi phần độc lập */}
      <Suspense fallback={<CardsSkeleton />}>
        <CardWrapper />
      </Suspense>

      <Suspense fallback={<RevenueChartSkeleton />}>
        <RevenueChart />  {/* fetch 3 giây nhưng không chặn gì khác */}
      </Suspense>

      <Suspense fallback={<LatestInvoicesSkeleton />}>
        <LatestInvoices />
      </Suspense>
    </main>
  );
}
```

Quan trọng: mỗi component **tự fetch data của mình**, không phải page fetch rồi truyền xuống:

```tsx
// app/ui/dashboard/revenue-chart.tsx — tự fetch data
export default async function RevenueChart() {
  const revenue = await fetchRevenue(); // fetch trong component, không phải page
  return <BarChart data={revenue} />;
}
```

### Skeleton Loading

Skeleton là bản "phác thảo mờ" của UI thật — giúp người dùng biết nội dung sắp xuất hiện ở đâu, tốt hơn nhiều so với loading spinner chung chung:

```tsx
// app/ui/skeletons.tsx
export function CardSkeleton() {
  return (
    <div className="rounded-xl bg-gray-100 p-2 shadow-sm">
      <div className="flex p-4">
        <div className="h-5 w-5 rounded-md bg-gray-200" />
        <div className="ml-2 h-6 w-16 rounded-md bg-gray-200" />
      </div>
      <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
        <div className="h-7 w-20 rounded-md bg-gray-200" />
      </div>
    </div>
  );
}
```

> Streaming cải thiện cả tốc độ thực lẫn **tốc độ cảm nhận**. Người dùng thấy nội dung xuất hiện dần thay vì màn hình trắng rồi hiện tất cả cùng lúc. Hai thay đổi để dùng Streaming: (1) tách component nhỏ, mỗi cái tự fetch data, (2) bọc trong `<Suspense>` với skeleton fallback.

---

## 8. Partial Prerendering (PPR)

Sau khi hiểu Static (nhanh nhưng không realtime) và Dynamic + Streaming (realtime nhưng phần static vẫn phải chờ server), câu hỏi đặt ra: có thể **static hoá phần không đổi và stream phần dynamic** trên cùng một trang không?

PPR là tính năng experimental từ Next.js v14 kết hợp static shell và dynamic content trên cùng một route:

1. **Static shell** (header, sidebar, layout) được prerender lúc build, phục vụ ngay lập tức
2. **Dynamic holes** (biểu đồ, bảng data) được stream vào sau, độc lập nhau

Điều thú vị: **không cần thay đổi code logic**. PPR tự động nhận biết `<Suspense>` boundaries để phân chia static/dynamic. Chỉ cần enable trong config:

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  experimental: {
    ppr: 'incremental',
  },
};
```

```tsx
// app/dashboard/layout.tsx — opt-in PPR cho dashboard
export const experimental_ppr = true;
```

> `<Suspense>` không chỉ là cơ chế loading — nó còn là ranh giới để PPR phân chia static/dynamic. Thay vì chọn giữa Static và Dynamic cho cả trang, có thể áp dụng chiến lược tốt nhất cho từng phần.

---

## 9. Search và Pagination

Danh sách invoice có thể lên đến hàng nghìn records. Search term và trang hiện tại nên lưu ở đâu?

| | `useState` (client state) | URL search params |
|---|---|---|
| Reload trang | Mất trạng thái | Giữ nguyên |
| Chia sẻ link | Không thể | Có thể bookmark/share |
| Browser back/forward | Không hoạt động | Hoạt động đúng |
| Server Components đọc được | Không | Có |

→ URL search params là lựa chọn tốt hơn.

### Search Component

```tsx
// app/ui/search.tsx
'use client';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1'); // Reset về trang 1 khi search term thay đổi
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    // Cập nhật URL mà không reload trang
    replace(`${pathname}?${params.toString()}`);
  }, 300); // chờ 300ms sau lần gõ cuối

  return (
    <input
      placeholder={placeholder}
      defaultValue={searchParams.get('query')?.toString()}
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
}
```

**Tại sao cần Debounce?** Nếu không debounce, mỗi keystroke gửi query đến server. Gõ "john" = 4 queries. Debounce 300ms đợi người dùng dừng gõ mới gửi — từ 4 queries xuống còn 1.

### Đọc Search Params trong Server Component

```tsx
// app/dashboard/invoices/page.tsx
export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const invoices = await fetchFilteredInvoices(query, currentPage);
  const totalPages = await fetchInvoicesPages(query);

  return (
    <div>
      <Search placeholder="Search invoices..." />
      <InvoicesTable invoices={invoices} />
      <Pagination totalPages={totalPages} />
    </div>
  );
}
```

> State management không phải lúc nào cũng là `useState`. URL là nơi lưu state tốt cho những gì người dùng muốn share hoặc bookmark. Debounce — kỹ thuật đơn giản nhưng quan trọng để tránh spam request.

---

## 10. Mutating Data — Tạo, Sửa, Xoá

Ứng dụng cần cho phép **tạo**, **sửa**, và **xoá** invoice. Trong kiến trúc truyền thống: form submit → POST đến `/api/invoices` → API route validate và ghi DB → frontend xử lý response.

Next.js App Router giới thiệu **Server Actions** — form submit thẳng vào async function chạy trên server, không cần tạo API route riêng.

### Server Actions

```typescript
// app/lib/actions.ts
'use server'; // directive: mọi function trong file này chạy trên server

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const InvoiceSchema = z.object({
  id: z.string(),
  customerId: z.string({ invalid_type_error: 'Please select a customer.' }),
  amount: z.coerce.number().gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], { invalid_type_error: 'Please select an invoice status.' }),
  date: z.string(),
});
const CreateInvoice = InvoiceSchema.omit({ id: true, date: true });

export async function createInvoice(prevState: State, formData: FormData) {
  // Bước 1: Validate
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  // Bước 2: Chuẩn bị data
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100; // tránh floating point errors
  const date = new Date().toISOString().split('T')[0];

  // Bước 3: Ghi vào DB
  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Create Invoice.' };
  }

  // Bước 4: Xoá cache và redirect
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}
```

**Tại sao lưu tiền bằng cents?** Số thực (float) có lỗi làm tròn: `0.1 + 0.2 = 0.30000000000000004`. Lưu bằng cents (số nguyên) tránh hoàn toàn vấn đề này.

### Dùng Server Action trong Form

```tsx
// app/ui/invoices/create-form.tsx
'use client';
import { useActionState } from 'react';
import { createInvoice, State } from '@/app/lib/actions';

export default function Form({ customers }: { customers: CustomerField[] }) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createInvoice, initialState);

  return (
    <form action={formAction}>
      <select name="customerId" aria-describedby="customer-error">
        {customers.map((customer) => (
          <option key={customer.id} value={customer.id}>{customer.name}</option>
        ))}
      </select>
      <div id="customer-error" aria-live="polite">
        {state.errors?.customerId?.map((error) => (
          <p key={error}>{error}</p>
        ))}
      </div>
      <input type="number" name="amount" step="0.01" />
      <button type="submit">Create Invoice</button>
    </form>
  );
}
```

### Update và Delete

```typescript
// Update — dùng .bind() để truyền id vào action
export async function updateInvoice(id: string, prevState: State, formData: FormData) {
  // validate, update DB, revalidate, redirect
}

const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);
<form action={updateInvoiceWithId}>...</form>

// Delete
export async function deleteInvoice(id: string) {
  await sql`DELETE FROM invoices WHERE id = ${id}`;
  revalidatePath('/dashboard/invoices');
}
```

> Server Actions làm phẳng kiến trúc — không cần lớp API riêng cho mutations. Ba nguyên tắc không được quên: (1) luôn validate trên server, (2) dùng `try/catch` cho database operations, (3) sau khi mutate: `revalidatePath()` xoá cache, `redirect()` điều hướng người dùng.

---

## 11. Xử Lý Lỗi

Ứng dụng có thể bị lỗi trong nhiều tình huống: database không phản hồi, user truy cập ID không tồn tại, network timeout... Cần phân biệt hai loại:

- **Expected errors**: có thể dự đoán được (invoice không tồn tại, validation fail) — trả về trong state, hiển thị trong UI
- **Unexpected errors**: không lường trước (database down, server crash) — dùng `error.tsx`

### `error.tsx` — Xử Lý Unexpected Errors

Next.js tự động render `error.tsx` khi có lỗi chưa được xử lý trong route segment. Thay vì crash toàn bộ app, lỗi được "bắt" tại đây, phần còn lại của app vẫn hoạt động:

```tsx
// app/dashboard/invoices/error.tsx
'use client'; // Error boundaries bắt buộc phải là Client Component

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </main>
  );
}
```

`error.tsx` phải là Client Component vì nhận `reset` function — cần thực thi trong browser để trigger re-render.

### `not-found.tsx` — Xử Lý Resource Không Tồn Tại

Khi user truy cập `/dashboard/invoices/abc-123` mà ID không tồn tại, dùng `notFound()` để render trang 404 có ý nghĩa hơn:

```typescript
// app/lib/data.ts
import { notFound } from 'next/navigation';

export async function fetchInvoiceById(id: string) {
  const data = await sql<InvoiceForm[]>`SELECT * FROM invoices WHERE id = ${id}`;
  const invoice = data.rows[0];

  if (!invoice) {
    notFound(); // ném ra "not found" signal → render not-found.tsx
  }

  return invoice;
}
```

```tsx
// app/dashboard/invoices/[id]/edit/not-found.tsx
export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <h2>404 Not Found</h2>
      <p>Could not find the requested invoice.</p>
      <Link href="/dashboard/invoices">Go Back</Link>
    </main>
  );
}
```

Thứ tự ưu tiên:
```
notFound()    → not-found.tsx (resource không tồn tại)
throw Error   → error.tsx    (mọi lỗi unexpected khác)
return state  → hiển thị trong form UI (validation errors)
```

> Xử lý lỗi tốt là phần của trải nghiệm người dùng. Người dùng gặp "Invoice không tìm thấy" với nút "Quay lại" thì biết phải làm gì — khác hoàn toàn với trang trắng. Luôn cung cấp **hướng thoát** (reset button hoặc back link).

---

## 12. Accessibility

Accessibility (khả năng tiếp cận) đảm bảo ứng dụng dùng được cho mọi người — bao gồm người dùng **screen reader** (người khiếm thị), người dùng bàn phím. Ở nhiều quốc gia, đây là **yêu cầu pháp lý** cho ứng dụng công cộng.

### Liên Kết Label và Input

Screen reader đọc label khi user focus vào input:

```tsx
{/* Sai — label và input không liên kết */}
<label>Amount</label>
<input type="number" name="amount" />

{/* Đúng — htmlFor khớp với id */}
<label htmlFor="amount">Amount</label>
<input id="amount" type="number" name="amount" />
```

### `aria-describedby` và `aria-live`

Để screen reader thông báo error message khi nó xuất hiện:

```tsx
<input
  id="amount"
  name="amount"
  type="number"
  aria-describedby="amount-error"  // trỏ đến phần tử chứa error
/>
{/* aria-live="polite": screen reader đọc nội dung khi thay đổi */}
<div id="amount-error" aria-live="polite" aria-atomic="true">
  {state.errors?.amount?.map((error: string) => (
    <p key={error} className="mt-2 text-sm text-red-500">{error}</p>
  ))}
</div>
```

### Các Thuộc Tính ARIA Quan Trọng

| Thuộc tính | Khi nào dùng |
|---|---|
| `aria-label="..."` | Element không có visible text (chỉ có icon) |
| `aria-describedby="id"` | Trỏ đến element chứa mô tả/error của input |
| `aria-live="polite"` | Nội dung cập nhật động (error messages) |
| `aria-current="page"` | Active link trong navigation |

`sr-only` trong Tailwind — ẩn khỏi màn hình nhưng screen reader đọc được:
```tsx
<span className="sr-only">Loading...</span>
```

> Accessibility không phải tính năng thêm vào cuối — khó bổ sung sau hơn xây đúng ngay từ đầu. Hai thứ dễ làm đúng nhất: dùng `<label htmlFor>` cho mọi input, và thêm `aria-live` cho error messages.

---

## 13. Authentication

Dashboard chứa dữ liệu nhạy cảm — không nên ai cũng truy cập. Cần authentication: chỉ cho phép người dùng đã đăng nhập vào `/dashboard`.

HTTP là **stateless** — mỗi request độc lập, server không nhớ request trước. Sau khi đăng nhập, server tạo **session token** (JWT), lưu trong cookie. Mỗi request sau đó browser tự gửi cookie kèm — server verify và biết ai đang request.

### Kiến Trúc NextAuth

NextAuth.js được tách làm hai file vì middleware chạy trên **Edge Runtime** (không có đầy đủ Node.js APIs), còn `bcryptjs` cần Node.js runtime đầy đủ:

```typescript
// auth.config.ts — KHÔNG import Node.js modules (dùng trong middleware)
export const authConfig = {
  pages: {
    signIn: '/login', // redirect đến đây nếu chưa đăng nhập
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        return isLoggedIn; // false = redirect về /login
      }
      if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [],
};
```

```typescript
// auth.ts — logic đầy đủ với bcrypt (cần Node.js runtime)
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;
        const user = await getUser(email);
        if (!user) return null;

        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (passwordsMatch) return user;

        return null; // trả về null = authentication fail
      },
    }),
  ],
});
```

### Middleware Bảo Vệ Routes

```typescript
// middleware.ts — chạy trước MỌI request khớp với matcher
export default auth;

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
```

Middleware là "người gác cổng" — mọi request đến `/dashboard/*` đều bị kiểm tra trước. Nếu chưa đăng nhập, tự động redirect về `/login`.

> Đừng tự viết authentication từ đầu trừ khi có lý do thực sự mạnh — NextAuth giải quyết hầu hết complexity (session management, CSRF protection, OAuth...). Middleware là nơi lý tưởng để enforce authentication cho toàn bộ route segment.

---

## 14. Metadata và SEO

Khi Google crawl trang web, nó đọc các thẻ `<meta>` trong `<head>` để hiểu nội dung. Khi share link lên Slack hay mạng xã hội, các platform đọc thẻ này để tạo preview. Không có metadata → Google hiển thị URL thô, share link không có ảnh preview.

### Metadata API của Next.js

Thay vì tự viết thẻ `<meta>` trong HTML, export object `metadata` từ `page.tsx` hoặc `layout.tsx`:

```typescript
// app/layout.tsx — metadata mặc định cho toàn app
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Acme Dashboard',
    // %s là placeholder — mỗi trang tự điền tên trang vào đây
    default: 'Acme Dashboard',
  },
  description: 'The official Next.js Course Dashboard, built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};
```

```typescript
// app/dashboard/invoices/page.tsx — override title cho trang Invoices
export const metadata: Metadata = {
  title: 'Invoices',
  // → kết quả: <title>Invoices | Acme Dashboard</title>
};
```

Template `%s` tự động thay bằng title của từng trang — không cần lặp lại "| Acme Dashboard" ở mọi nơi.

### Open Graph — Preview Khi Share

```typescript
export const metadata: Metadata = {
  title: 'Acme Dashboard',
  openGraph: {
    title: 'Acme Dashboard',
    description: 'Manage your invoices and customers',
    images: ['/og-image.png'],
    type: 'website',
  },
};
```

| Metadata | Tác dụng |
|---|---|
| `title` | Tab browser + kết quả Google |
| `description` | Mô tả dưới title trong Google |
| `metadataBase` | Base URL cho relative image paths |
| Open Graph | Preview khi share link lên social media |

> Metadata thường bị bỏ qua nhất khi học web development, nhưng ảnh hưởng trực tiếp đến SEO. Nguyên tắc: mỗi trang nên có `title` và `description` mô tả đúng nội dung trang đó.

---

## Tổng Kết

Sau 14 chapters, đây là toàn bộ những gì đã được xây dựng và học được:

```
┌─────────────────────────────────────────────────────────────────┐
│                     Ứng dụng Acme Dashboard                     │
├──────────────────┬──────────────────────────────────────────────┤
│  Chapter 3-5     │  Nền tảng: font, image, routing, navigation  │
│  Chapter 6-7     │  Data: database setup, data fetching         │
│  Chapter 8-10    │  Rendering: static, dynamic, streaming, PPR  │
│  Chapter 11      │  UX: search và pagination qua URL params     │
│  Chapter 12      │  Mutations: server actions, form handling    │
│  Chapter 13      │  Reliability: error handling, not found      │
│  Chapter 14      │  Inclusivity: accessibility, ARIA            │
│  Chapter 15      │  Security: authentication, middleware        │
│  Chapter 16      │  Discoverability: metadata, SEO              │
└──────────────────┴──────────────────────────────────────────────┘
```

Mỗi layer xây trên layer trước. Một ứng dụng thực tế cần tất cả — không chỉ chức năng chạy được mà còn phải nhanh, bảo mật, accessible, và được tìm thấy.
