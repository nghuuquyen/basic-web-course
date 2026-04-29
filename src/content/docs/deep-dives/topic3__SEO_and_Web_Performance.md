---
title: "Topic 3 — SEO và Web Performance"
---

Bạn vừa deploy website lên production. Đẹp, chạy tốt, tất cả tính năng hoạt động. Bạn chia sẻ link cho bạn bè và mọi người khen.

Rồi một tuần trôi qua. Một tháng. Traffic từ Google vẫn là 0.

Hoặc kịch bản khác: Google đã index trang của bạn, nhưng khi user click vào — họ thoát ra ngay vì trang load mất 8 giây, layout nhảy loạn khi ảnh đang tải.

Đây không phải vấn đề code — code của bạn đúng. Đây là vấn đề của **SEO** và **Web Performance**: hai thứ quyết định liệu website của bạn có thực sự tiếp cận được người dùng hay không.

---

## Bức Tranh Toàn Cảnh

Toàn bộ bài này xoay quanh một câu hỏi đơn giản: *Làm sao để đúng người tìm thấy website của bạn, và ở lại?*

Câu trả lời có 3 lớp, theo thứ tự:

```
┌─────────────────────────────────────────────────────────────┐
│  Lớp 1 — DISCOVERABLE                                       │
│  Google tìm thấy, hiểu đúng, và đánh giá tốt website bạn    │
│  → SEO: crawling, indexing, metadata, on-page               │
├─────────────────────────────────────────────────────────────┤
│  Lớp 2 — FAST & STABLE                                      │
│  Người dùng vào trang có trải nghiệm tốt                    │
│  → Core Web Vitals: tốc độ load, layout ổn định, responsive │
├─────────────────────────────────────────────────────────────┤
│  Lớp 3 — MONITORED                                          │
│  Bạn biết điều gì đang xảy ra và kịp thời cải thiện         │
│  → Analytics, Error tracking, vòng lặp cải tiến liên tục    │
└─────────────────────────────────────────────────────────────┘
```

Ba lớp này cần được xây theo thứ tự — không có lớp 1 thì Google không biết bạn tồn tại, không có lớp 2 thì user sẽ thoát trước khi đọc được gì, không có lớp 3 thì bạn không biết vấn đề đang ở đâu để sửa.

---

## Mục Lục

**Phần 1 — Discoverable: Giúp Google tìm thấy và hiểu bạn**
1. [Google tìm thấy website của bạn như thế nào?](#1-google-tìm-thấy-website-của-bạn-như-thế-nào)
2. [Vấn đề với JavaScript-rendered content](#2-vấn-đề-với-javascript-rendered-content)
3. [Giúp Googlebot điều hướng website của bạn](#3-giúp-googlebot-điều-hướng-website-của-bạn)
4. [Nói với Google trang này là gì](#4-nói-với-google-trang-này-là-gì)
5. [On-Page SEO — Những gì bạn trực tiếp kiểm soát](#5-on-page-seo--những-gì-bạn-trực-tiếp-kiểm-soát)

**Phần 2 — Fast & Stable: Trải nghiệm người dùng là ranking factor**

6. [Tại sao tốc độ lại là ranking factor?](#6-tại-sao-tốc-độ-lại-là-ranking-factor)
7. [Core Web Vitals — Ba thước đo trải nghiệm người dùng](#7-core-web-vitals--ba-thước-đo-trải-nghiệm-người-dùng)
8. [Chẩn đoán vấn đề performance](#8-chẩn-đoán-vấn-đề-performance)
9. [Bốn nguyên nhân chính và cách khắc phục](#9-bốn-nguyên-nhân-chính-và-cách-khắc-phục)

**Phần 3 — Monitored: Áp dụng và duy trì**

10. [Áp dụng vào Next.js](#10-áp-dụng-vào-nextjs)
11. [Monitoring liên tục sau launch](#11-monitoring-liên-tục-sau-launch)

---

## Phần 1 — Discoverable: Giúp Google Tìm Thấy và Hiểu Bạn

---

## 1. Google Tìm Thấy Website Của Bạn Như Thế Nào?

Google không "lướt web" theo thời gian thực — nó có một cỗ máy phức tạp chạy 24/7 gồm 4 bước:

```
Crawling → Indexing → Rendering → Ranking
```

**Crawling** — Googlebot (robot tự động của Google) liên tục duyệt web, theo links từ trang này sang trang khác, download nội dung. Nó bắt đầu từ các trang đã biết, rồi khám phá trang mới qua internal links và external links.

**Indexing** — Phân tích nội dung đã crawl, hiểu trang này nói về gì, lưu vào database khổng lồ (search index). Không phải mọi trang đều được index — Google có thể quyết định không index nếu nội dung kém hoặc duplicate. Trang chậm ảnh hưởng đến crawl budget (Googlebot crawl ít hơn) nhưng không phải lý do trực tiếp để từ chối index.

**Rendering** — Thực thi JavaScript để render trang như browser thực sự. Bước này quan trọng với các ứng dụng React/Next.js — nội dung trang của bạn trông như thế nào *sau khi JS chạy* mới là thứ Google đánh giá.

**Ranking** — Khi user gõ query, Google tìm các trang liên quan trong index và sắp xếp theo hàng trăm tín hiệu: chất lượng nội dung, backlinks, page speed, user experience...

Bạn kiểm soát được 3 bước đầu (đảm bảo Googlebot có thể crawl, index, render đúng). Ranking là kết quả tự nhiên của chất lượng tổng thể.

> **Crawl budget** — Googlebot không crawl vô hạn. Mỗi website có giới hạn số trang được crawl trong một khoảng thời gian. Nếu website có quá nhiều trang không cần thiết (duplicate content, search result pages, filter combinations...), Googlebot lãng phí budget vào đó thay vì crawl các trang quan trọng.

---

## 2. Vấn Đề Với JavaScript-Rendered Content

Đây là điểm nhiều developer mới bỏ qua, và nó giải thích tại sao SEO của SPA thường kém hơn SSR.

Khi Googlebot crawl một React SPA điển hình, HTML nó nhận được trông như thế này:

```html
<html>
  <body>
    <div id="root"></div>
    <script src="/bundle.js"></script>
  </body>
</html>
```

Nội dung thực sự — tiêu đề, mô tả sản phẩm, bài viết blog — tất cả nằm trong `bundle.js`. Googlebot phải tải và chạy JavaScript mới thấy được nội dung đó.

Vấn đề là rendering JavaScript trong Google xảy ra trong một hàng đợi riêng, có thể mất vài ngày đến vài tuần. Trong thời gian đó, trang của bạn trong index chỉ là HTML trống.

Ngược lại, khi dùng Next.js với SSR hoặc SSG:

```html
<html>
  <body>
    <h1>Tên sản phẩm</h1>
    <p>Mô tả đầy đủ...</p>
    <script src="/bundle.js"></script>
  </body>
</html>
```

HTML đã có đầy đủ nội dung ngay từ đầu. Googlebot không cần chạy JavaScript — index ngay lập tức, ranking tốt hơn.

| Rendering Strategy | Googlebot thấy gì | SEO |
|---|---|---|
| CSR (React thuần) | HTML trống, chờ JS | Kém — nội dung delayed |
| SSR (mỗi request) | HTML đầy đủ | Tốt |
| SSG (build time) | HTML đầy đủ | Tốt nhất — không cần server |
| ISR (incremental) | HTML đầy đủ, tự cập nhật | Tốt — kết hợp cả hai |

**Đây là một trong những lý do chính để dùng Next.js** thay vì React thuần cho website cần SEO.

---

## 3. Giúp Googlebot Điều Hướng Website Của Bạn

Giả sử Google đã biết website của bạn tồn tại. Bây giờ bạn cần đảm bảo nó tìm đúng trang, crawl đúng thứ, và bỏ qua những gì không cần thiết.

### robots.txt

File đặt ở root website, chỉ thị cho crawler trang nào được phép crawl, trang nào không:

```
# https://yoursite.com/robots.txt

User-agent: *
Disallow: /admin/           # Không crawl trang admin
Disallow: /api/             # Không crawl API endpoints
Disallow: /search?          # Không crawl search results (duplicate content)

Sitemap: https://yoursite.com/sitemap.xml
```

Lưu ý quan trọng: `Disallow` ngăn *crawling*, không ngăn *indexing*. Nếu trang bị disallow nhưng có link từ nơi khác trỏ đến, Google vẫn có thể index URL đó (dù không đọc được nội dung). Để ngăn indexing hoàn toàn, dùng `noindex` meta tag.

### XML Sitemap

File liệt kê tất cả URLs muốn được index, kèm thông tin về từng trang:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yoursite.com/</loc>
    <lastmod>2024-01-15</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://yoursite.com/products/item-1</loc>
    <lastmod>2024-01-10</lastmod>
    <priority>0.8</priority>
  </url>
</urlset>
```

Sitemap đặc biệt quan trọng với website mới (chưa có external links), website lớn (nhiều trang), hoặc content được tạo dynamic (e-commerce, blog). Submit qua Google Search Console.

### HTTP Status Codes

Googlebot dùng HTTP status codes để hiểu trạng thái của từng URL. Dùng sai sẽ ảnh hưởng trực tiếp đến indexing:

| Code | Ý nghĩa | Nên làm |
|---|---|---|
| 200 | Trang tồn tại, bình thường | Tốt — sẽ được index |
| 301 | Redirect vĩnh viễn | Dùng khi đổi URL — chuyển toàn bộ "giá trị SEO" sang URL mới |
| 302 | Redirect tạm thời | Chỉ dùng khi thực sự tạm thời — Google giữ index URL cũ |
| 404 | Không tìm thấy | Ổn nếu trang đã xóa — nhưng không để tích lũy quá nhiều |
| 410 | Đã xóa vĩnh viễn | Tốt hơn 404 để thông báo xóa có chủ ý |
| 500 | Server error | Xấu — Googlebot retry nhiều lần, tốn crawl budget |

---

## 4. Nói Với Google Trang Này Là Gì

Sau khi Googlebot tìm thấy trang, bạn cần cung cấp đủ tín hiệu để nó hiểu *nội dung và mục đích* của trang — và hiển thị đúng trong kết quả tìm kiếm.

### Meta Tags cơ bản

```html
<head>
  <!-- Title: xuất hiện trên tab browser và kết quả tìm kiếm -->
  <title>Giày Chạy Bộ Nike Air Max | YourShop</title>

  <!-- Description: đoạn mô tả dưới title trong search results -->
  <meta name="description"
    content="Nike Air Max đế đệm khí, siêu nhẹ. Phù hợp chạy bộ và đi hàng ngày.
             Giao hàng toàn quốc, đổi trả 30 ngày.">

  <!-- Không muốn trang này xuất hiện trong search: -->
  <meta name="robots" content="noindex, nofollow">
</head>
```

Title và description không ảnh hưởng trực tiếp đến ranking, nhưng ảnh hưởng đến **click-through rate (CTR)** — tỷ lệ user click vào kết quả của bạn. CTR cao là tín hiệu tốt cho Google, và là cái bạn trực tiếp kiểm soát được.

### Canonical Tag — Giải quyết duplicate content

Cùng nội dung xuất hiện ở nhiều URLs là vấn đề phổ biến với e-commerce:

```
/products                     ← trang gốc
/products?sort=price          ← sort khác nhưng nội dung giống
/products?page=1              ← pagination
/products?color=red&size=42   ← filter combinations
```

Google không biết nên index URL nào và phân tán "link equity" giữa chúng. Canonical tag chỉ định URL "chính thức":

```html
<!-- Thêm vào tất cả các trang duplicate -->
<link rel="canonical" href="https://yoursite.com/products">
```

### Open Graph — Khi trang được share lên mạng xã hội

```html
<meta property="og:title" content="Tiêu đề khi share lên Facebook">
<meta property="og:description" content="Mô tả khi share">
<meta property="og:image" content="https://yoursite.com/og-image.jpg">
<meta property="og:url" content="https://yoursite.com/page">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://yoursite.com/twitter-image.jpg">
```

### Structured Data — Rich Snippets trong search results

Structured data (schema.org) cung cấp thông tin có cấu trúc để Google hiển thị **rich snippets** — kết quả tìm kiếm đặc biệt với star ratings, giá, availability — tăng CTR mà không cần rank cao hơn:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Nike Air Max",
  "offers": {
    "@type": "Offer",
    "price": "1500000",
    "priceCurrency": "VND",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "reviewCount": "128"
  }
}
</script>
```

---

## 5. On-Page SEO — Những Gì Bạn Trực Tiếp Kiểm Soát

Các sections trước nói về cách để Googlebot *tìm thấy* và *hiểu* website. Phần này là những gì bạn làm ngay trong từng trang để tối ưu chất lượng.

### URL structure

URL tốt giúp cả user lẫn Googlebot hiểu trang nói về gì:

```
# Tốt
/blog/how-to-optimize-nextjs-performance
/products/womens-running-shoes
/docs/getting-started

# Không tốt
/p?id=12345                              ← không đọc được
/blog/post_2024_01_15_very_long_title   ← quá dài
/Blog/HowToOptimize                      ← uppercase gây vấn đề
```

Nguyên tắc: lowercase, dùng dấu `-` thay vì `_`, ngắn gọn có ý nghĩa, phản ánh cấu trúc phân cấp.

### Heading structure

```html
<h1>Tiêu đề chính — mỗi trang chỉ có MỘT H1</h1>
  <h2>Mục lớn</h2>
    <h3>Mục con</h3>
  <h2>Mục lớn khác</h2>
```

H1 chứa primary keyword, xuất hiện đúng một lần. H2, H3 tạo outline rõ ràng cho Googlebot hiểu cấu trúc nội dung. Không bỏ cấp (H1 → H3 bỏ qua H2).

### Chất lượng nội dung

Không có shortcut ở đây. Google ngày càng tốt hơn trong việc đánh giá nội dung thực sự hữu ích:

- **Helpful content**: trả lời đúng câu hỏi user đang tìm kiếm
- **E-E-A-T** (Experience, Expertise, Authority, Trust): ai viết, có credentials không, nguồn có tin cậy không
- **Content depth**: bao quát topic đầy đủ, không superficial
- **Freshness**: cập nhật nội dung cũ định kỳ

### Alt text cho ảnh

```html
<!-- Không có giá trị SEO hay accessibility -->
<img src="product.jpg" alt="image">

<!-- Đúng: mô tả cụ thể -->
<img src="nike-air-max-white.jpg" alt="Nike Air Max màu trắng, nhìn từ cạnh bên">
```

Alt text phục vụ cả accessibility (screen readers) và Google Image Search.

---

## Phần 2 — Fast & Stable: Trải Nghiệm Người Dùng là Ranking Factor

---

## 6. Tại Sao Tốc Độ Lại Là Ranking Factor?

Page speed là ranking signal từ 2010. Năm 2021, Google mở rộng điều này với **Page Experience Update**: thay vì chỉ đo tốc độ chung chung, Google định nghĩa ba metrics cụ thể — **Core Web Vitals** — đo trải nghiệm người dùng theo các khía cạnh rõ ràng và có thể đo được.

Điều này có nghĩa: không chỉ cần "nhanh" mà còn phải nhanh *đúng cách* — nội dung chính xuất hiện sớm, layout không nhảy, tương tác phản hồi kịp thời.

---

## 7. Core Web Vitals — Ba Thước Đo Trải Nghiệm Người Dùng

Google không đo "tốc độ" một cách chung chung — họ định nghĩa ba metrics cụ thể, gọi chung là **Core Web Vitals**, mỗi cái đo một khía cạnh khác nhau của trải nghiệm:

### LCP — Largest Contentful Paint

*"Nội dung chính xuất hiện trong bao lâu?"*

LCP đo thời gian từ khi user bắt đầu tải trang đến khi element lớn nhất trong viewport (thường là hero image hoặc block text lớn) hoàn tất render.

| Đánh giá | LCP |
|---|---|
| Tốt | < 2.5 giây |
| Cần cải thiện | 2.5 – 4.0 giây |
| Kém | > 4.0 giây |

**Nguyên nhân phổ biến:** Server response chậm, hero image không được optimize, render-blocking JavaScript.

### CLS — Cumulative Layout Shift

*"Layout có ổn định không, hay tự nhảy khi đang xem?"*

CLS đo tổng mức độ bất ngờ của layout shift trong suốt vòng đời trang. Ai cũng từng trải qua: đang chuẩn bị click một nút thì ảnh load xong đẩy nút xuống, click nhầm vào quảng cáo. Đó là CLS xấu.

| Đánh giá | CLS |
|---|---|
| Tốt | < 0.1 |
| Cần cải thiện | 0.1 – 0.25 |
| Kém | > 0.25 |

**Nguyên nhân phổ biến:** Ảnh không có `width`/`height` khai báo trước, ads tải muộn đẩy content, web fonts gây text reflow.

### INP — Interaction to Next Paint

*"Trang có phản hồi nhanh khi user tương tác không?"*

INP đo độ trễ từ khi user tương tác (click, tap, key press) đến khi browser hiển thị visual response. Nếu main thread đang bận xử lý JavaScript nặng, user click vào button nhưng không thấy phản hồi ngay — INP kém.

| Đánh giá | INP |
|---|---|
| Tốt | < 200ms |
| Cần cải thiện | 200 – 500ms |
| Kém | > 500ms |

**Nguyên nhân phổ biến:** Long tasks JavaScript (> 50ms), bundle quá lớn, third-party scripts nặng.

> INP thay thế FID (First Input Delay) từ năm 2024. FID chỉ đo lần tương tác đầu tiên; INP đo tất cả tương tác trong suốt vòng đời trang — phản ánh chính xác hơn trải nghiệm tổng thể.

---

## 8. Chẩn Đoán Vấn Đề Performance

Biết về Core Web Vitals chưa đủ — bạn cần biết *trang của mình đang ở đâu* và *vấn đề cụ thể là gì* để fix đúng chỗ.

### Lighthouse — Chẩn đoán nhanh trong DevTools

Lighthouse tích hợp trong Chrome DevTools, cho điểm trang theo 5 categories và chỉ ra cụ thể những gì đang kéo điểm xuống:

**Cách chạy:** F12 → Tab "Lighthouse" → chọn categories → "Analyze page load"

```
Performance   →  điểm tổng hợp, breakdown LCP / CLS / INP
Accessibility →  screen reader, color contrast, ARIA
Best Practices → HTTPS, modern APIs, security issues
SEO           →  meta tags, crawlability, mobile-friendly
PWA           →  offline support, installable
```

Lighthouse không chỉ cho điểm — nó còn liệt kê **Opportunities** (những thứ có thể fix để cải thiện điểm) và **Diagnostics** (thông tin bổ sung về performance).

> Chạy ở Incognito mode để extensions không ảnh hưởng kết quả. Chạy 3 lần và lấy trung bình — điểm có thể fluctuate theo điều kiện mạng và CPU lúc đó.

**Hạn chế:** Lighthouse là *lab data* — chạy trên máy bạn, trong điều kiện kiểm soát. Nó không phản ánh trải nghiệm thực tế của user trên các thiết bị và đường truyền khác nhau.

### PageSpeed Insights — Kết hợp lab data và field data

[pagespeed.web.dev](https://pagespeed.web.dev) chạy cả Lighthouse lẫn dữ liệu thực từ Chrome User Experience Report (CrUX) trong cùng một report. Đây là tool đầu tiên nên dùng khi cần kiểm tra nhanh — không cần cài đặt, không cần tài khoản.

Phần **Field Data** trong report hiển thị Core Web Vitals thực tế từ user Chrome đã truy cập trang đó — đây mới là con số Google dùng để ranking, không phải điểm Lighthouse.

---

## 9. Bốn Nguyên Nhân Chính Và Cách Khắc Phục

Phần lớn vấn đề Core Web Vitals đến từ 4 nguồn: **ảnh, fonts, JavaScript, và third-party scripts**. Fix 4 thứ này giải quyết được 80% vấn đề phổ biến.

### Ảnh — Nguyên nhân số 1 của LCP kém và CLS

Ảnh không optimize thường là thứ đẩy LCP lên cao nhất. Ảnh thiếu khai báo kích thước là nguyên nhân số 1 của CLS.

**Với Next.js `<Image>` — fix gần như tự động:**

```javascript
import Image from 'next/image';

// Hero image: priority để browser tải trước — cải thiện LCP
<Image src="/hero.jpg" width={1200} height={600} alt="Hero" priority />

// Ảnh thông thường: lazy load + blur placeholder — tránh CLS
<Image
  src="/product.jpg"
  width={400}
  height={300}
  alt="Product name"
  placeholder="blur"
/>
```

`next/image` tự động: convert sang WebP/AVIF (định dạng nhỏ hơn JPEG/PNG đáng kể), resize theo viewport, lazy load, và reserve space tránh CLS.

**Không dùng Next.js:**

```html
<!-- Luôn khai báo width và height — tránh CLS -->
<img src="product.jpg" width="400" height="300" loading="lazy" alt="Product">

<!-- Preload hero image — cải thiện LCP -->
<link rel="preload" as="image" href="/hero.jpg">
```

### Fonts — Nguyên nhân của CLS và text reflow

Web fonts gây FOUT (Flash of Unstyled Text) hoặc FOIT (Flash of Invisible Text) — cả hai đều gây layout shift.

**Với Next.js `next/font`:**

```javascript
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',  // Dùng fallback font ngay, swap khi font load xong
});

export default function RootLayout({ children }) {
  return <html className={inter.className}>{children}</html>;
}
```

`next/font` tự động self-host fonts (không request Google Fonts — giảm latency), preload, và thêm `size-adjust` CSS để giảm CLS khi font swap xảy ra.

**Không dùng Next.js:**

```css
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter.woff2') format('woff2');
  font-display: swap;  /* Tránh FOIT */
}
```

```html
<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>
```

### JavaScript — Nguyên nhân của INP kém và LCP chậm

Bundle JS lớn làm main thread bận, dẫn đến INP kém và LCP chậm. Giải pháp: chỉ load code khi thực sự cần.

**Dynamic import trong Next.js:**

```javascript
import dynamic from 'next/dynamic';

// Thay vì load ngay khi trang mở:
// import HeavyChart from '@/components/HeavyChart';

// Chỉ load khi component cần render:
const HeavyChart = dynamic(() => import('@/components/HeavyChart'), {
  loading: () => <div className="skeleton" />,
  ssr: false,  // Nếu component cần browser APIs
});
```

Dùng dynamic import cho: charts/maps, text editors, modal dialogs nặng, admin-only features — bất kỳ component nặng không cần thiết khi load trang lần đầu.

### Third-Party Scripts — Nguyên nhân âm thầm của mọi metrics

Analytics, chat widgets, ad networks — mỗi script thêm vào đều chạy trên main thread và có thể block rendering.

**Dùng `next/script` để kiểm soát thứ tự load:**

```javascript
import Script from 'next/script';

// afterInteractive: load sau khi trang đã interactive
// Dùng cho: analytics, tracking pixels
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_ID"
  strategy="afterInteractive"
/>

// lazyOnload: load khi browser idle
// Dùng cho: chat widgets, social embeds
<Script
  src="https://widget.intercom.io/widget/xxx"
  strategy="lazyOnload"
/>
```

**Facade pattern** — Với embeds nặng như YouTube, chỉ load iframe thực khi user chủ động click play:

```javascript
function YouTubeEmbed({ videoId }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        allow="autoplay"
      />
    );
  }

  return (
    <div onClick={() => setPlaying(true)} className="youtube-facade">
      <img
        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
        alt="Play video"
      />
      <button aria-label="Play">▶</button>
    </div>
  );
}
```

---

## Phần 3 — Monitored: Áp Dụng và Duy Trì

---

## 10. Áp Dụng Vào Next.js

Next.js giải quyết nhiều vấn đề SEO và performance mặc định — nhưng bạn cần setup đúng để tận dụng.

### Chọn rendering strategy phù hợp

Đây là quyết định quan trọng nhất về SEO khi xây dựng từng trang:

```
Blog, docs, landing page          → SSG — HTML build sẵn, nhanh nhất
Product page (data thay đổi)      → ISR — static + tự revalidate
Dashboard, user-specific content  → SSR hoặc Server Components
```

### Metadata API trong App Router

```javascript
// app/products/[id]/page.tsx

// Static metadata (cho trang không cần data)
export const metadata = {
  title: 'Sản Phẩm | YourShop',
  description: 'Mô tả trang',
};

// Dynamic metadata (dựa vào data từng trang)
export async function generateMetadata({ params }) {
  const product = await getProduct(params.id);

  return {
    title: `${product.name} | YourShop`,
    description: product.description,
    alternates: {
      canonical: `https://yoursite.com/products/${params.id}`,
    },
    openGraph: {
      title: product.name,
      images: [{ url: product.imageUrl }],
    },
  };
}
```

### Checklist trước khi launch

**SEO:**
- [ ] Mỗi trang có `title` và `description` unique, có ý nghĩa
- [ ] H1 xuất hiện đúng một lần trên mỗi trang
- [ ] Tất cả ảnh có `alt` text mô tả
- [ ] URL lowercase, dùng dấu `-`, có ý nghĩa
- [ ] Canonical tag cho các trang có duplicate content
- [ ] `robots.txt` tồn tại và đúng cú pháp
- [ ] Sitemap được generate và submit lên Search Console
- [ ] Trang render đầy đủ nội dung trong HTML (không phụ thuộc JS)

**Performance:**
- [ ] Hero image dùng `<Image priority>` hoặc `fetchpriority="high"`
- [ ] Tất cả ảnh dùng `next/image` hoặc khai báo `width`/`height`
- [ ] Web fonts dùng `next/font` hoặc `font-display: swap`
- [ ] Components nặng dùng `dynamic()` import
- [ ] Analytics và third-party scripts dùng `strategy="afterInteractive"`
- [ ] Lighthouse score 90+ cho Performance và SEO

---

## 11. Monitoring Liên Tục Sau Launch

Checklist ở Section 10 giúp bạn *ra mắt đúng*. Nhưng đó chỉ là điểm bắt đầu.

Mỗi tính năng mới thêm vào đều có thể ảnh hưởng đến SEO và performance — một third-party script không được defer, một ảnh upload thiếu optimize, một JS error âm thầm làm form không submit được trên một số thiết bị. Không có monitoring, bạn sẽ không biết những thứ đó đang xảy ra cho đến khi user phàn nàn, hoặc traffic giảm.

Vòng lặp cần duy trì sau launch:

```
Deploy → Measure → Identify issues → Fix → Deploy → Measure lại
  ↑______________________________________________|
```

Bạn cần ba loại công cụ để duy trì vòng lặp này, mỗi loại trả lời một câu hỏi khác nhau:

```
Google Analytics   →  "Người dùng đang làm gì?"
Search Console     →  "Google đang thấy website tôi như thế nào?"
Sentry             →  "Có lỗi nào đang xảy ra mà tôi không biết không?"
```

### Google Analytics 4 — Hiểu hành vi người dùng

Google Analytics (miễn phí) cho bạn thấy traffic đến từ đâu và người dùng làm gì sau khi vào trang.

**Setup trong Next.js:**

```javascript
// app/layout.tsx
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
```

**Các metrics cần theo dõi và dấu hiệu bất thường:**

| Metric | Ý nghĩa | Dấu hiệu cần điều tra |
|---|---|---|
| **Organic traffic** | Lượt truy cập từ Google | Giảm > 20% trong 1 tuần |
| **Bounce rate** | Tỷ lệ vào rồi thoát ngay | Tăng đột ngột — trang load chậm hoặc nội dung không đúng kỳ vọng |
| **Session duration** | Thời gian trung bình trên site | Giảm sau khi deploy — UX có thể bị xấu đi |
| **Conversion rate** | Tỷ lệ hoàn thành mục tiêu | Giảm sau khi thay đổi UI/flow |

### Google Search Console — Hiểu Google đang thấy gì

Search Console (miễn phí) cho bạn biết *Google nhìn website như thế nào* — khác với những gì người dùng thấy trong Analytics.

**Bốn reports cần kiểm tra định kỳ:**

- **Performance**: keyword nào đang được click, impressions, CTR, average position. Impressions cao nhưng CTR thấp → title/description chưa hấp dẫn.
- **Coverage**: trang nào được index, trang nào bị lỗi (crawl error, noindex nhầm, redirect loop...).
- **Core Web Vitals**: URLs nào đang Poor / Needs Improvement / Good theo field data từ user thực — đây là con số Google dùng để ranking.
- **Manual actions**: Google có đang phạt site không (spam, thin content...).

> Setup nhận email tự động từ Search Console khi có vấn đề nghiêm trọng — manual penalty, coverage drop đột ngột. Đảm bảo đây là email bạn đọc thường xuyên.

### Sentry — Bắt JavaScript errors trước khi user phàn nàn

Đây là thứ nhiều developer bỏ qua — và hối hận khi traffic giảm mà không hiểu tại sao.

JavaScript errors xảy ra trên production mà bạn không bao giờ thấy trên máy dev:
- Form submit không hoạt động trên Safari → user bỏ đi → conversion rate giảm
- Crash trên một số Android cũ → bounce rate tăng → Google thấy trang có UX kém
- JS error block render → LCP tăng vọt trên một số thiết bị

**Sentry** (có free tier) tự động thu thập errors từ browser của user thực, kèm stack trace, browser/OS/device của user gặp lỗi, số user bị ảnh hưởng, và breadcrumbs — những gì user đã làm trước khi lỗi xảy ra.

**Setup trong Next.js:**

```bash
npx @sentry/wizard@latest -i nextjs
```

Wizard tự động cấu hình. Config cơ bản:

```javascript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,         // Capture 10% requests cho performance
  replaysOnErrorSampleRate: 1.0, // Record session replay khi có error
});
```

Khi có error trên production, Sentry notify ngay qua email hoặc Slack với đủ context để reproduce và fix. Alternatives: Datadog, Rollbar, Bugsnag — cùng mục đích, khác về pricing.

### Lịch review thực tế

Không cần ngồi nhìn dashboard mỗi ngày. Review có chủ đích:

| Thời điểm | Làm gì |
|---|---|
| **Sau mỗi deploy lớn** | Chạy Lighthouse, check Sentry có error mới không, xem Analytics real-time |
| **Hàng tuần** | Analytics: traffic trend, conversion rate có bình thường không |
| **Hàng tháng** | Search Console: rankings thay đổi như thế nào, Coverage report có lỗi mới không |
| **Khi thấy anomaly** | Organic traffic giảm đột ngột, bounce rate tăng bất thường → điều tra ngay |

---

## Tóm Tắt

Ba lớp trong bức tranh toàn cảnh:

```
Discoverable  →  Google tìm thấy, hiểu đúng, đánh giá tốt nội dung của bạn
Fast & Stable →  Người dùng có trải nghiệm tốt → Google dùng làm ranking signal
Monitored     →  Bạn biết điều gì đang xảy ra và cải thiện liên tục
```

Cả 3 lớp phụ thuộc nhau. Nội dung tốt nhưng load chậm — không rank. Nhanh nhưng có JS error âm thầm — conversion giảm, bounce rate tăng, ranking xấu đi theo thời gian. Không có monitoring — bạn không biết mình đang ở đâu để cải thiện.

**Next.js giúp bạn** giải quyết phần lớn technical SEO và performance mặc định — SSR/SSG tự động, `next/image` và `next/font` tích hợp sẵn. Việc của bạn là: chọn rendering strategy đúng cho từng loại trang, viết metadata có ý nghĩa, kiểm soát third-party scripts, và setup bộ ba Google Analytics + Search Console + Sentry trước khi launch.

SEO và performance không phải đích đến — chúng là vòng lặp **deploy → measure → improve** không có điểm kết thúc.
