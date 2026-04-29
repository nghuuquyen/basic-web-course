---
title: "Lab 3 — Tailwind CSS"
---

# Lab 3 — Tailwind CSS

Hầu hết CSS frameworks (Bootstrap, Bulma...) cho bạn các component sẵn: button, card, navbar. Bạn dùng class `btn btn-primary` và nhận về một button trông giống mọi website khác dùng cùng framework. Tailwind khác hoàn toàn — nó không cho bạn component, nó cho bạn **các primitive để tự xây**.

---

## Mục Lục

1. [Tư duy Utility-First](#1-tư-duy-utility-first)
2. [Cài đặt](#2-cài-đặt)
3. [Các tính năng cốt lõi](#3-các-tính-năng-cốt-lõi)
4. [Responsive Design với Tailwind](#4-responsive-design-với-tailwind)
5. [States: Hover, Focus, và các trạng thái khác](#5-states-hover-focus-và-các-trạng-thái-khác)
6. [Dark Mode](#6-dark-mode)
7. [Customization](#7-customization)
8. [Maintainability](#8-maintainability)
9. [Thực hành](#9-thực-hành)

---

## 1. Tư Duy Utility-First

### Vấn đề với "semantic class names"

Cách làm truyền thống: bạn đặt tên class mô tả *ý nghĩa* của element, rồi viết CSS riêng cho class đó.

```html
<button class="submit-button">Submit</button>
```

```css
.submit-button {
  background-color: #3b82f6;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 600;
}
```

Vấn đề phát sinh khi project lớn:
- Phải liên tục đặt tên class (`.card-header`, `.card-header-title`, `.card-header-title-text`...)
- CSS file phình to, khó maintain
- Muốn thay đổi một chút phải vào CSS sửa, rồi kiểm tra xem thay đổi đó ảnh hưởng gì khác không

### Cách Tailwind nghĩ

Thay vì đặt tên và viết CSS riêng, dùng trực tiếp các utility class nhỏ:

```html
<button class="bg-blue-500 text-white px-4 py-2 rounded font-semibold hover:bg-blue-600">
  Submit
</button>
```

Mỗi class làm đúng **một việc nhỏ**:
- `bg-blue-500` → `background-color: #3b82f6`
- `text-white` → `color: white`
- `px-4` → `padding-left: 1rem; padding-right: 1rem`
- `py-2` → `padding-top: 0.5rem; padding-bottom: 0.5rem`
- `rounded` → `border-radius: 0.25rem`
- `font-semibold` → `font-weight: 600`

### Nhưng đây chẳng phải là inline styles sao?

Câu hỏi đúng. Utility classes có 3 điểm khác với inline styles:

1. **Design system**: Tailwind dùng scale cố định (`p-1`, `p-2`, `p-4`, `p-8`...) thay vì magic numbers. Bạn chọn từ palette sẵn có → UI nhất quán tự nhiên.

2. **Responsive và States**: Inline styles không thể viết `hover:` hay `md:`. Tailwind có modifiers cho mọi trường hợp.

3. **Constraints**: Khi có 50 shade blue trong inline styles, bạn sẽ dùng 50 giá trị khác nhau. Tailwind có `blue-50` đến `blue-950` — bạn chọn trong khoảng đó.

---

## 2. Cài Đặt

### Method 1: Với Vite (Recommended cho project mới)

```bash
npm create vite@latest my-project -- --template vanilla
cd my-project
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Chỉnh `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Thêm vào `src/style.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Method 2: Với Next.js

```bash
npx create-next-app@latest my-app
# → Chọn "Yes" cho Tailwind CSS khi được hỏi
```

Next.js tự cấu hình Tailwind, không cần làm thêm gì.

### Method 3: Play CDN (Chỉ để thử, không dùng cho production)

```html
<script src="https://cdn.tailwindcss.com"></script>
```

Thêm vào `<head>` là dùng được ngay. Nhược điểm: tải toàn bộ Tailwind (~3MB), không optimize.

### Tại sao cần cấu hình `content`?

Tailwind scan tất cả file trong `content` để tìm class names bạn dùng, rồi **chỉ generate CSS cho những class đó**. Một project thực tế thường chỉ cần < 10kB CSS — trong khi nếu include toàn bộ Tailwind là ~3.7MB.

> Nếu thêm class vào HTML nhưng không thấy style áp dụng, kiểm tra xem file đó có nằm trong `content` pattern chưa.

---

## 3. Các Tính Năng Cốt Lõi

### Spacing và Sizing

Tailwind dùng scale 4px (1 unit = 4px):

```
p-1  → padding: 4px
p-2  → padding: 8px
p-4  → padding: 16px
p-8  → padding: 32px
p-16 → padding: 64px
```

Tương tự cho margin (`m-`), width (`w-`), height (`h-`):

```html
<div class="w-full max-w-sm mx-auto p-6">
  <!-- full width, max 384px, centered, 24px padding -->
</div>
```

### Colors

Tailwind có palette màu sẵn với 11 shade (50→950):

```html
<div class="bg-blue-100 border border-blue-300 text-blue-800">
  Info message
</div>

<div class="bg-red-50 border border-red-200 text-red-700">
  Error message
</div>
```

### Typography

```html
<h1 class="text-4xl font-bold tracking-tight text-gray-900">
  Tiêu đề lớn
</h1>

<p class="text-base text-gray-600 leading-relaxed">
  Đoạn văn bình thường
</p>

<span class="text-sm font-medium text-blue-600 uppercase tracking-wide">
  Label nhỏ
</span>
```

### Flexbox và Grid

```html
<!-- Flexbox: căn giữa nội dung -->
<div class="flex items-center justify-between gap-4">
  <span>Left</span>
  <span>Right</span>
</div>

<!-- Grid: 3 cột bằng nhau -->
<div class="grid grid-cols-3 gap-6">
  <div>...</div>
  <div>...</div>
  <div>...</div>
</div>

<!-- Grid responsive: 1 cột → 2 cột → 3 cột -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  ...
</div>
```

---

## 4. Responsive Design Với Tailwind

Tailwind dùng mobile-first breakpoints. Không có prefix = style mọi màn hình. Prefix tức là "từ breakpoint này trở lên".

| Prefix | Min-width | Thiết bị |
|---|---|---|
| *(không có)* | 0px | Mobile |
| `sm:` | 640px | Tablet nhỏ |
| `md:` | 768px | Tablet |
| `lg:` | 1024px | Laptop |
| `xl:` | 1280px | Desktop |
| `2xl:` | 1536px | Desktop lớn |

```html
<!-- 1 cột trên mobile, 2 cột trên tablet, 4 cột trên desktop -->
<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
  ...
</div>

<!-- Text nhỏ trên mobile, lớn hơn trên desktop -->
<h1 class="text-2xl md:text-4xl lg:text-5xl font-bold">
  Tiêu đề responsive
</h1>

<!-- Ẩn trên mobile, hiện trên desktop -->
<nav class="hidden lg:flex items-center gap-4">
  ...
</nav>

<!-- Hiện trên mobile (hamburger), ẩn trên desktop -->
<button class="lg:hidden">Menu</button>
```

---

## 5. States: Hover, Focus, và Các Trạng Thái Khác

### Hover và Focus

```html
<button class="bg-blue-500 hover:bg-blue-600 
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
               text-white px-4 py-2 rounded transition-colors">
  Button
</button>
```

`transition-colors` thêm smooth transition cho color changes.

### Active và Disabled

```html
<button class="bg-blue-500 active:bg-blue-700 
               disabled:opacity-50 disabled:cursor-not-allowed
               text-white px-4 py-2 rounded">
  Button
</button>
```

### Group Hover — Hover vào parent, style child

```html
<div class="group cursor-pointer p-4 hover:bg-gray-50 rounded-lg">
  <h3 class="text-gray-900">Tiêu đề</h3>
  <!-- Chỉ đổi màu khi hover vào parent div -->
  <p class="text-gray-500 group-hover:text-blue-600">
    Mô tả tự đổi màu khi hover vào card
  </p>
  <!-- Icon chỉ hiện khi hover vào parent -->
  <svg class="hidden group-hover:block h-4 w-4 text-blue-500">...</svg>
</div>
```

### Peer — Sibling selector

```html
<input id="email" type="email" class="peer border rounded px-3 py-2" placeholder=" ">
<label for="email" 
       class="peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-blue-500">
  Email
</label>
```

---

## 6. Dark Mode

```js
// tailwind.config.js
export default {
  darkMode: 'class',  // hoặc 'media' (theo OS setting)
  // ...
}
```

Với `'class'`, dark mode kích hoạt khi có class `dark` trên `<html>`:

```html
<html class="dark">
  ...
</html>
```

Dùng prefix `dark:` để style theo dark mode:

```html
<div class="bg-white dark:bg-gray-900">
  <h1 class="text-gray-900 dark:text-white">Tiêu đề</h1>
  <p class="text-gray-600 dark:text-gray-400">Mô tả</p>
  <button class="bg-blue-500 dark:bg-blue-400 text-white px-4 py-2 rounded">
    Action
  </button>
</div>
```

Toggle dark mode bằng JavaScript:

```js
function toggleDarkMode() {
  document.documentElement.classList.toggle('dark');
}
```

---

## 7. Customization

Tailwind được thiết kế để customize — design system của bạn thay thế hoặc mở rộng defaults.

```js
// tailwind.config.js
export default {
  theme: {
    extend: {
      // Thêm màu custom vào palette sẵn có
      colors: {
        brand: {
          50:  '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a5f',
        }
      },
      // Thêm font
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
      },
      // Thêm spacing
      spacing: {
        '18': '4.5rem',
        '72': '18rem',
      },
      // Thêm breakpoint
      screens: {
        'xs': '475px',
      }
    }
  }
}
```

Sau đó dùng như class Tailwind bình thường:

```html
<h1 class="font-heading text-brand-900">Tiêu đề custom</h1>
<div class="mt-18 xs:w-full">...</div>
```

### Thêm CSS tùy chỉnh

Với `@layer`, bạn viết CSS tùy chỉnh mà vẫn giữ được specificity đúng:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  /* Component classes tái sử dụng */
  .btn {
    @apply px-4 py-2 rounded font-semibold transition-colors;
  }
  .btn-primary {
    @apply bg-blue-500 text-white hover:bg-blue-600;
  }
  .card {
    @apply bg-white rounded-xl shadow-sm border border-gray-200 p-6;
  }
}

@layer utilities {
  /* Utility classes không có trong Tailwind */
  .text-balance {
    text-wrap: balance;
  }
}
```

Dùng `@apply` để tổng hợp Tailwind classes vào một CSS rule.

---

## 8. Maintainability

Mối lo phổ biến: "Nếu dùng Tailwind, HTML sẽ dài ngoằm, khó đọc lắm."

Thực tế khi project lớn:

### Vấn đề: Lặp lại cùng một tập classes

```html
<!-- 3 card đều giống nhau -->
<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">...</div>
<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">...</div>
<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">...</div>
```

**Giải pháp 1**: Extract thành component (React/Vue/Svelte):

```jsx
function Card({ children }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {children}
    </div>
  );
}
```

**Giải pháp 2**: Dùng `@apply` (như ở trên):

```css
.card {
  @apply bg-white rounded-xl shadow-sm border border-gray-200 p-6;
}
```

**Giải pháp 3**: Loop trong template:

```html
<!-- Thay vì copy-paste 10 lần -->
<ul>
  {#each items as item}
    <li class="flex items-center gap-3 py-2 border-b border-gray-100">
      {item.name}
    </li>
  {/each}
</ul>
```

> Tailwind được dùng tại GitHub, Netflix, Heroku, Twitch, Shopify và hàng nghìn startup. Maintainability không phải vấn đề nếu tổ chức code tốt.

---

## 9. Thực Hành

### Phần 1: Khám phá Tailwind

1. Vào [Tailwind CSS Showcase](https://tailwindcss.com/showcase) và xem các site thực tế dùng Tailwind
2. Thử [Tailwind Play](https://play.tailwindcss.com) — không cần cài đặt gì, code ngay trong browser

### Phần 2: Build 5 components sau trên Tailwind Play

**Component 1: Card bài viết**

```html
<section class="h-screen w-full flex justify-center items-center bg-gradient-to-b from-sky-400 to-sky-200">
    <div class="max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
        <a href="#">
            <img class="rounded-t-lg"
                src="https://plus.unsplash.com/premium_photo-1672829032578-67aae2e62363?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1986&q=80"
                alt="Sample Image" />
        </a>
        <div class="p-5">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Noteworthy technology acquisitions 2021
            </h5>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
            </p>
            <a href="#" class="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-sm font-medium text-white hover:bg-blue-800">
                Read more →
            </a>
        </div>
    </div>
</section>
```

**Component 2: Hero section** — dùng background image với overlay

**Component 3: Data table** — với hover row highlight

**Component 4: Testimonial / blockquote**

**Component 5: Registration form** — với floating labels

Bạn có thể copy từ các template có sẵn trong lab slides, nhưng hãy thử tự **tùy chỉnh** màu sắc, spacing, hoặc thêm dark mode variant sau khi copy xong.

### Phần 3: Tự build

Tự design và build một trong các component sau từ đầu (không copy template):
- Profile card (avatar, tên, bio, social links)
- Pricing table (3 tiers với highlighted tier)
- Navigation bar với mobile menu toggle

### Tài nguyên

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind UI Components](https://tailwindui.com) (có bản free)
- [Flowbite](https://flowbite.com) — component library dựa trên Tailwind (free)
- [Headless UI](https://headlessui.com) — accessible components cho Tailwind + React/Vue
