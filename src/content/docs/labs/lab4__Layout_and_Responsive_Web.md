---
title: "Lab 4 — Layout & Responsive Web Design"
---

# Lab 4 — Layout & Responsive Web Design

Ngày nay, người dùng vào web từ mọi loại thiết bị — điện thoại 320px, tablet 768px, màn hình 4K 3840px. Một website tốt không phải là website "trông đẹp trên màn hình của designer" mà là website **hoạt động tốt trên mọi màn hình**. Đó là bài toán responsive design.

---

## Mục Lục

1. [Responsive Design là gì?](#1-responsive-design-là-gì)
2. [Các thành phần cốt lõi](#2-các-thành-phần-cốt-lõi)
3. [Mobile-First vs Desktop-First](#3-mobile-first-vs-desktop-first)
4. [Layout Patterns](#4-layout-patterns)
5. [Visual Hierarchy](#5-visual-hierarchy)
6. [Best Practices](#6-best-practices)
7. [Tools và Testing](#7-tools-và-testing)
8. [Thực hành](#8-thực-hành)

---

## 1. Responsive Design Là Gì?

### Vấn đề mà responsive giải quyết

Trước khi responsive design phổ biến, website được thiết kế với width cố định (thường 960px hoặc 1024px). Khi xem trên điện thoại, browser thu nhỏ toàn bộ trang xuống — text nhỏ đến mức phải zoom, nút bấm khó bấm đúng, navigation không dùng được.

Responsive design là approach thiết kế website sao cho **layout tự điều chỉnh** phù hợp với kích thước màn hình của người xem, thay vì co lại hay scroll ngang.

### Responsive vs Adaptive

| | Responsive | Adaptive |
|---|---|---|
| Cách hoạt động | Fluid — layout co giãn theo viewport | Fixed — phục vụ layout khác nhau dựa vào thiết bị |
| Codebase | Một codebase cho tất cả | Nhiều version (desktop/tablet/mobile) |
| Bảo trì | Dễ hơn | Phức tạp hơn |
| Control | Ít kiểm soát hơn | Nhiều kiểm soát hơn |
| Phổ biến | Chuẩn ngày nay | Dùng trong trường hợp đặc biệt |

Responsive (Fluid Grid) là lựa chọn mặc định. Adaptive chỉ đáng xem xét khi có yêu cầu UX khác biệt hoàn toàn giữa mobile và desktop.

---

## 2. Các Thành Phần Cốt Lõi

### Viewport Meta Tag

Không có thẻ này, mobile browser mặc định zoom trang ra 980px rồi thu nhỏ lại — layout của bạn không hoạt động.

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

- `width=device-width`: viewport width = chiều rộng thực của thiết bị
- `initial-scale=1`: không zoom lúc ban đầu

Đây là thẻ bắt buộc trong mọi website responsive. Nếu quên thêm, mọi media query của bạn đều vô nghĩa trên mobile.

### Fluid Layout — Đơn vị tương đối

Thay vì dùng pixel cố định, dùng tỷ lệ phần trăm và các đơn vị tương đối:

```css
/* Cứng nhắc — không responsive */
.container {
  width: 960px;
  padding: 30px;
}

/* Linh hoạt — responsive */
.container {
  width: 100%;
  max-width: 1200px;  /* Giới hạn trên màn hình lớn */
  padding: 1.5rem;    /* rem scale theo font-size root */
  margin: 0 auto;
}
```

Đơn vị hữu ích:

| Đơn vị | Tương đối với | Dùng cho |
|---|---|---|
| `%` | Element cha | Width, height, padding theo container |
| `rem` | Root font-size (thường 16px) | Font size, spacing — scale đều |
| `em` | Font-size của element hiện tại | Padding/margin liên quan đến text |
| `vw` / `vh` | Viewport width/height | Full-screen sections, large typography |
| `clamp()` | Min, preferred, max | Fluid typography |

```css
/* Fluid typography với clamp: min 1rem, prefer 2.5vw, max 1.5rem */
h2 {
  font-size: clamp(1rem, 2.5vw, 1.5rem);
}
```

### Media Queries

Media query cho phép áp dụng CSS khác nhau tùy theo đặc điểm của thiết bị:

```css
/* Base styles (mobile) */
.nav {
  flex-direction: column;
}

/* Tablet trở lên */
@media screen and (min-width: 768px) {
  .nav {
    flex-direction: row;
  }
}

/* Desktop trở lên */
@media screen and (min-width: 1024px) {
  .nav {
    justify-content: space-between;
  }
}
```

**Breakpoints thông dụng:**

```css
/* Mobile: 0 - 639px (không cần media query) */
/* Tablet: 640px trở lên */
@media (min-width: 640px) { ... }
/* Laptop: 1024px trở lên */
@media (min-width: 1024px) { ... }
/* Desktop: 1280px trở lên */
@media (min-width: 1280px) { ... }
```

> Đừng tạo quá nhiều breakpoint. Thường 3-4 breakpoints là đủ. Thêm breakpoint chỉ khi layout thực sự "vỡ" tại điểm đó, không phải theo số đẹp.

**Media query theo orientation:**

```css
@media (orientation: landscape) {
  /* Màn hình nằm ngang */
}

@media (prefers-color-scheme: dark) {
  /* Dark mode theo OS */
}

@media (prefers-reduced-motion: reduce) {
  /* Người dùng yêu cầu giảm animation */
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Flexible Images và Media

```css
/* Ảnh không vượt quá container */
img, video {
  max-width: 100%;
  height: auto;  /* Giữ aspect ratio */
}
```

**Responsive image với `<picture>`** — phục vụ ảnh phù hợp kích thước thiết bị:

```html
<picture>
  <!-- Ảnh nhỏ cho mobile -->
  <source srcset="hero-mobile.jpg" media="(max-width: 640px)">
  <!-- Ảnh trung bình cho tablet -->
  <source srcset="hero-tablet.jpg" media="(max-width: 1024px)">
  <!-- Ảnh lớn cho desktop (fallback) -->
  <img src="hero-desktop.jpg" alt="Hero image">
</picture>
```

**`srcset` và `sizes`** — để browser chọn ảnh phù hợp dpi:

```html
<img src="photo-400.jpg"
     srcset="photo-400.jpg 400w, photo-800.jpg 800w, photo-1200.jpg 1200w"
     sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
     alt="Photo">
```

---

## 3. Mobile-First vs Desktop-First

### Mobile-First (Recommended)

Viết base styles cho mobile trước, rồi dùng `min-width` media queries để mở rộng cho màn hình lớn hơn.

```css
/* Base: mobile */
.grid {
  display: grid;
  grid-template-columns: 1fr;  /* 1 cột */
  gap: 1rem;
}

/* Tablet trở lên */
@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);  /* 2 cột */
  }
}

/* Desktop trở lên */
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);  /* 3 cột */
  }
}
```

### Desktop-First

Viết base styles cho desktop, dùng `max-width` để thu gọn cho màn hình nhỏ hơn.

```css
/* Base: desktop */
.grid {
  grid-template-columns: repeat(3, 1fr);
}

/* Tablet */
@media (max-width: 1023px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Mobile */
@media (max-width: 767px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
```

**Tại sao Mobile-First được khuyến khích?**

1. **Stats**: > 60% traffic web là từ mobile. Ưu tiên trải nghiệm cho đa số người dùng.
2. **Progressive enhancement**: Bắt đầu từ essentials (mobile), thêm dần complexity (desktop). Tư duy tốt hơn.
3. **Performance**: Browser mobile không tải CSS cho breakpoints lớn hơn.
4. **CSS specificity**: Thêm vào (`min-width`) thường sạch hơn override (`max-width`).

---

## 4. Layout Patterns

### Flexbox cho layout 1D

Flexbox tốt nhất khi các items cần phân bổ theo một chiều (hàng hoặc cột):

```css
/* Navigation bar */
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
}

/* Card actions ở dưới */
.card {
  display: flex;
  flex-direction: column;
}
.card__body { flex: 1; }  /* Chiếm hết phần còn lại */
.card__footer { margin-top: auto; }  /* Luôn ở dưới cùng */
```

### CSS Grid cho layout 2D

Grid tốt nhất khi cần kiểm soát cả hàng lẫn cột:

```css
/* Holy Grail layout */
.page {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }

/* Mobile: stack everything */
@media (max-width: 768px) {
  .page {
    grid-template-areas:
      "header"
      "main"
      "sidebar"
      "footer";
    grid-template-columns: 1fr;
  }
}
```

### Common Responsive Patterns

**Stack** — Items stack theo chiều dọc trên mobile, nằm ngang trên desktop:

```css
.cards {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 768px) {
  .cards { flex-direction: row; }
}
```

**Fluid Columns** — Số cột tự điều chỉnh theo space:

```css
.auto-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}
```

Không cần media query — items tự sắp xếp. Khi viewport > 500px → 2 cột, > 750px → 3 cột...

**Off-Canvas Navigation** — Menu ẩn trên mobile, hiện khi toggle:

```css
.sidebar {
  position: fixed;
  left: -100%;
  width: 280px;
  transition: left 0.3s ease;
}

.sidebar.is-open {
  left: 0;
}

@media (min-width: 1024px) {
  .sidebar {
    position: static;
    left: 0;
  }
}
```

---

## 5. Visual Hierarchy

Khi thiết kế layout, câu hỏi quan trọng nhất là: **Người dùng nên nhìn vào đâu đầu tiên?**

Visual hierarchy là cách sắp xếp elements để dẫn dắt mắt người đọc theo thứ tự bạn muốn.

### Z-Pattern và F-Pattern

Mắt người đọc di chuyển theo pattern dự đoán được:

**Z-Pattern** (landing page, trang marketing):
```
Logo ────────────── CTA Button
         ↘
Headline/Visual
         ↘
Content ─────────── CTA
```

Đặt logo trên trái, CTA trên phải, headline ở giữa, CTA thứ hai ở dưới phải.

**F-Pattern** (nội dung dạng text, blog, danh sách):
```
████████████████████
████████
████████████████████
████
████████
```

Header hàng đầu được đọc đầy đủ. Sau đó mắt quét theo chiều dọc bên trái, dừng lại đọc ngang ở điểm hấp dẫn.

### 7 nguyên tắc visual hierarchy

1. **Kích thước**: Element lớn = quan trọng hơn. H1 > H2 > body text.

2. **Màu sắc và contrast**: Màu nổi bật kéo mắt trước. CTA button thường là màu nổi nhất trang.

3. **White space**: Khoảng trắng xung quanh element → element đó "thở" và nổi bật. Đừng nhồi nhét mọi thứ.

4. **Proximity**: Elements gần nhau → liên quan đến nhau. Tên và giá của sản phẩm cần ở gần nhau.

5. **Alignment**: Sắp xếp theo đường ẩn. Mọi thứ căn theo một grid → cảm giác gọn gàng.

6. **Repetition**: Dùng cùng style cho cùng loại nội dung. Tất cả card cùng border-radius, tất cả button cùng height.

7. **Typography hierarchy**: Primary (H1, H2) → Secondary (body) → Tertiary (caption, label).

---

## 6. Best Practices

### Đừng ẩn content trên mobile

Quan niệm cũ: mobile thì ẩn bớt content. Sai. Người dùng mobile cũng cần thông tin đầy đủ — họ chỉ cần trình bày theo cách phù hợp hơn.

```css
/* Tệ */
.sidebar { display: none; }  /* Ẩn hoàn toàn trên mobile */

/* Tốt hơn */
.sidebar {
  order: 2;  /* Đẩy xuống dưới main content */
}
.main-content {
  order: 1;
}
```

### Touch-friendly trên mobile

Kích thước tối thiểu của touch target: **44x44px** (Apple guideline) hoặc **48x48px** (Google Material Design).

```css
/* Nút có text ngắn dễ bị quá nhỏ */
.btn {
  min-height: 44px;
  min-width: 44px;
  padding: 0.75rem 1rem;
}

/* Link trong text — dễ misclick */
a {
  padding: 0.25rem 0;  /* Tăng vùng bấm */
}
```

### Image optimization

Ảnh thường là nguyên nhân số 1 làm trang load chậm.

```html
<!-- lazy loading: chỉ tải khi gần vào viewport -->
<img src="product.jpg" alt="Product" loading="lazy">

<!-- Aspect ratio container: tránh layout shift khi ảnh đang tải -->
<div style="aspect-ratio: 16/9;">
  <img src="..." style="width: 100%; height: 100%; object-fit: cover;">
</div>
```

Với Next.js, dùng `<Image>` component — tự động optimize, lazy load, và prevent layout shift.

### Test trên thiết bị thực

DevTools browser emulation là tốt nhưng không đủ. Luôn test trên thiết bị thực trước khi release — đặc biệt là interaction (hover không tồn tại trên touch screen).

---

## 7. Tools và Testing

### Browser DevTools — Responsive Mode

- Chrome/Firefox: F12 → Toggle Device Toolbar (icon điện thoại)
- Test preset devices (iPhone, iPad, Galaxy...)
- Test custom viewport size
- Throttle network để simulate 3G

### Responsive Testing Tools

- **[BrowserStack](https://www.browserstack.com)** — Test trên thiết bị thực qua cloud
- **[Responsively](https://responsively.app)** — Desktop app, xem nhiều viewport cùng lúc
- **[Screenfly](https://screenfly.org)** — Online tool, nhanh

### CSS Grid/Flexbox Debugger

- Chrome DevTools: Panel Layout → Grid/Flexbox overlay
- Firefox: Có overlay visualization tốt nhất trong số các browsers

### Performance

- **Google Lighthouse** (F12 → Lighthouse): Audit performance, accessibility, SEO
- **[PageSpeed Insights](https://pagespeed.web.dev)**: Test real-world performance
- **WebPageTest**: Detailed waterfall analysis

---

## 8. Thực Hành

### Bài tập: Xây dựng Portfolio Website Responsive

Xây dựng một portfolio website đơn giản bao gồm:

**Cài đặt môi trường:**

```bash
npm create vite@latest my-portfolio -- --template vanilla
cd my-portfolio
npm install
npm run dev
```

**Cấu trúc HTML cần có:**

```
├── Header / Navigation (với mobile hamburger menu)
├── Hero Section (tên, tagline, CTA button)
├── About Section
├── Projects Grid (2-3 project cards)
├── Contact Section
└── Footer
```

**Yêu cầu kỹ thuật:**

1. **Viewport meta tag** bắt buộc
2. **Mobile-first approach**: viết CSS mobile trước, dùng `min-width` breakpoints
3. **Navigation**: hamburger menu trên mobile, full navbar trên desktop
4. **Projects grid**: 1 cột (mobile) → 2 cột (tablet) → 3 cột (desktop)
5. **Images**: `max-width: 100%` và `loading="lazy"`
6. **Touch targets**: tất cả button/link ít nhất 44px height

**Breakpoints gợi ý:**

```css
/* Mobile: mặc định (0 - 639px) */

/* Tablet */
@media (min-width: 640px) { }

/* Desktop */
@media (min-width: 1024px) { }
```

**Kiểm tra trước khi nộp:**

- [ ] Mở DevTools → Toggle Device Toolbar → test ở iPhone SE (375px)
- [ ] Test ở iPad (768px)
- [ ] Test ở Desktop (1280px)
- [ ] Tất cả text đọc được, không bị overflow
- [ ] Navigation hoạt động đúng ở cả 3 breakpoints
- [ ] Ảnh không vỡ hay overflow

### Tài nguyên tham khảo

- [CSS Grid Layout Guide — CSS-Tricks](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Flexbox Guide — CSS-Tricks](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Responsive Design — MDN Web Docs](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [Google's Responsive Web Design Basics](https://web.dev/articles/responsive-web-design-basics)
