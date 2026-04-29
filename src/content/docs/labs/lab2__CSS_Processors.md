---
title: "Lab 2 — CSS Processors"
---

# Lab 2 — CSS Processors

Viết CSS cho project nhỏ thì ổn. Nhưng khi project lớn lên — hàng chục components, nhiều người cùng viết, màu sắc phải thống nhất trên toàn site — plain CSS bắt đầu cho thấy giới hạn của nó. CSS processors ra đời để giải quyết những giới hạn đó.

---

## Mục Lục

1. [CSS Processors là gì?](#1-css-processors-là-gì)
2. [Sass / SCSS](#2-sass--scss)
3. [PostCSS](#3-postcss)
4. [BEM — Quy ước đặt tên class](#4-bem--quy-ước-đặt-tên-class)
5. [Thực hành](#5-thực-hành)

---

## 1. CSS Processors là Gì?

Plain CSS có một số vấn đề mà người viết code lớn sẽ gặp phải:

- **Không có variables** (trước 2018): muốn dùng cùng một màu ở 50 chỗ, phải copy-paste 50 lần. Đổi màu → đổi 50 chỗ.
- **Không có scope**: tất cả CSS đều global. Viết `.button { color: red }` có thể ảnh hưởng đến mọi button trong toàn site.
- **Không có modularity thật sự**: `@import` trong CSS tạo thêm HTTP request, không phải module system.
- **Lặp đi lặp lại**: vendor prefixes như `-webkit-`, `-moz-` phải viết tay cho từng property.

CSS processor là tool xử lý CSS (hoặc một ngôn ngữ mở rộng của CSS) rồi output ra CSS thuần mà browser hiểu được. Có hai loại:

| Loại | Cách hoạt động | Ví dụ |
|---|---|---|
| **Preprocessor** | Bạn viết ngôn ngữ riêng → compile sang CSS | Sass, SCSS, Less, Stylus |
| **Postprocessor** | Xử lý CSS đã viết → tối ưu, thêm prefix | PostCSS, Autoprefixer |

Trong thực tế, hầu hết project hiện đại dùng **cả hai**: SCSS để viết code dễ hơn, PostCSS (qua Vite/Next.js) để tự động thêm vendor prefix và tối ưu output.

---

## 2. Sass / SCSS

Sass là preprocessor phổ biến nhất. Có hai syntax:
- **Sass** (`.sass`): dùng indentation thay vì `{}`  — ít dùng hơn
- **SCSS** (`.scss`): superset của CSS — mọi CSS hợp lệ đều là SCSS hợp lệ

Bài lab này dùng SCSS.

### Cài đặt và compile

```bash
npm install -g sass
sass --watch src/style.scss dist/style.css
```

Flag `--watch` giúp Sass tự compile lại khi bạn lưu file. Trong các framework như Vite hay Next.js, Sass được tích hợp sẵn — chỉ cần cài package:

```bash
npm install -D sass
```

### Variables

Thay vì copy-paste giá trị ở khắp nơi, lưu vào biến một lần:

```scss
$primary: #3b82f6;
$font-body: 'Inter', sans-serif;
$spacing-base: 1rem;

.button {
  background-color: $primary;
  font-family: $font-body;
  padding: $spacing-base;
}

.link {
  color: $primary;  // Cùng màu, chỉ cần đổi một chỗ
}
```

> **CSS Variables vs Sass Variables**: Sass variables (`$var`) tồn tại lúc compile — chúng biến mất trong CSS output. CSS custom properties (`--var`) tồn tại trong runtime và có thể thay đổi bằng JavaScript. Dự án hiện đại thường dùng cả hai: Sass vars để organize lúc viết code, CSS vars để theming runtime.

### Nesting

HTML có cấu trúc lồng nhau, CSS thì không. SCSS cho phép viết selector theo cấu trúc tương tự HTML:

```scss
// Thay vì viết:
nav ul { margin: 0; }
nav ul li { padding: 8px; }
nav ul li a { color: white; }
nav ul li a:hover { color: gray; }

// SCSS cho phép viết:
nav {
  ul {
    margin: 0;
    
    li {
      padding: 8px;
      
      a {
        color: white;
        
        &:hover {  // & = selector cha (nav ul li a)
          color: gray;
        }
      }
    }
  }
}
```

`&` đại diện cho selector hiện tại, rất hữu ích khi kết hợp với pseudo-classes và BEM:

```scss
.button {
  background: blue;
  
  &:hover { background: darkblue; }
  &:disabled { opacity: 0.5; }
  &--primary { background: green; }     // .button--primary
  &__icon { margin-right: 8px; }        // .button__icon
}
```

> **Đừng nest quá sâu**: Nesting 3-4 cấp trở lên tạo ra CSS quá specificity cao và khó override. Giới hạn ở 3 cấp là đủ.

### Mixins

Mixin là tập hợp CSS declarations có thể tái sử dụng, giống như function trong programming:

```scss
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero {
  @include flex-center;
  height: 100vh;
}

.card {
  @include flex-center;
}
```

Mixin có thể nhận tham số:

```scss
@mixin button-variant($bg, $color: white) {
  background-color: $bg;
  color: $color;
  border: 2px solid darken($bg, 10%);
  
  &:hover {
    background-color: darken($bg, 10%);
  }
}

.btn-primary { @include button-variant(#3b82f6); }
.btn-danger  { @include button-variant(#ef4444); }
.btn-dark    { @include button-variant(#1f2937); }
```

Mixin đặc biệt hữu ích cho **media queries**:

```scss
$tablet: 768px;
$desktop: 1024px;

@mixin tablet {
  @media only screen and (min-width: $tablet) {
    @content;
  }
}

@mixin desktop {
  @media only screen and (min-width: $desktop) {
    @content;
  }
}

// Usage
.hero-title {
  font-size: 1.5rem;
  
  @include tablet {
    font-size: 2rem;
  }
  
  @include desktop {
    font-size: 3rem;
  }
}
```

### Extend và Placeholder

`@extend` cho phép một selector "kế thừa" styles từ selector khác:

```scss
%message-base {       // % = placeholder class, không compile ra CSS trừ khi được extend
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.message-success {
  @extend %message-base;
  background: #d1fae5;
  border: 1px solid #10b981;
}

.message-error {
  @extend %message-base;
  background: #fee2e2;
  border: 1px solid #ef4444;
}
```

Output CSS sẽ group các selectors lại, không tạo code trùng lặp.

**Khi nào dùng `@extend` vs `@mixin`?**

- Dùng `@extend` khi các elements thực sự có quan hệ "là một loại của" nhau (is-a relationship)
- Dùng `@mixin` khi cần tham số, hoặc không chắc về relationship

### Partials và Modules

Thay vì nhồi tất cả vào một file khổng lồ, tách thành các file nhỏ:

```
styles/
  _variables.scss     # Biến toàn cục
  _mixins.scss        # Mixins tái sử dụng
  _reset.scss         # CSS reset
  _typography.scss    # Font, heading styles
  components/
    _button.scss
    _card.scss
    _navbar.scss
  pages/
    _home.scss
    _about.scss
  main.scss           # File chính, import tất cả
```

File bắt đầu bằng `_` là partial — Sass không compile chúng thành file CSS riêng mà chỉ dùng khi được import.

```scss
// main.scss
@use 'variables';       // Import _variables.scss
@use 'mixins';          // Import _mixins.scss
@use 'reset';
@use 'typography';
@use 'components/button';
@use 'components/card';
```

> Dùng `@use` thay vì `@import` (deprecated). `@use` có namespacing tốt hơn, tránh conflict giữa các partials.

### Operators

SCSS có thể tính toán:

```scss
$container-width: 960px;
$columns: 12;

.col-4 {
  width: ($container-width / $columns) * 4;  // = 320px
}

.sidebar {
  width: 30%;
  padding: 16px * 2;  // = 32px
}
```

---

## 3. PostCSS

PostCSS không phải preprocessor — nó là tool xử lý CSS *sau khi* bạn viết xong, thông qua hệ sinh thái plugin.

### Cách PostCSS hoạt động

```
CSS input → PostCSS parses thành AST → plugins xử lý AST → CSS output
```

PostCSS chỉ là engine. Chức năng thực sự đến từ plugins.

### Tại sao cần PostCSS?

Bạn có thể dùng CSS syntax hiện đại (nesting, custom media queries) dù browser chưa hỗ trợ đầy đủ — PostCSS compile xuống syntax cũ hơn cho bạn. Autoprefixer tự động thêm vendor prefixes dựa trên danh sách browser target.

### Các Plugin Quan Trọng

**Autoprefixer** — tự động thêm `-webkit-`, `-moz-`, `-ms-`:

```css
/* Input */
.box {
  display: flex;
  user-select: none;
}

/* Output sau Autoprefixer */
.box {
  display: -webkit-flex;
  display: flex;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}
```

Bạn không cần viết prefix tay — Autoprefixer làm cho bạn dựa vào dữ liệu từ [Can I Use](https://caniuse.com).

**PostCSS Preset Env** — dùng CSS tương lai ngay hôm nay:

```css
/* Input: CSS nesting (syntax mới) */
nav {
  & ul {
    margin: 0;
  }
}

/* Output: traditional CSS */
nav ul {
  margin: 0;
}
```

**Stylelint** — linter cho CSS, bắt lỗi trước khi chạy:

```css
/* Stylelint sẽ báo lỗi ở dòng này */
.box {
  color: #xyz;     /* Invalid hex */
}
```

### Dùng PostCSS trong thực tế

Nếu bạn dùng Vite, Next.js, hoặc Create React App — PostCSS đã được tích hợp sẵn. Chỉ cần tạo file config:

```js
// postcss.config.js
module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-preset-env': { stage: 2 },
  }
}
```

> PostCSS là backbone của Tailwind CSS. Khi bạn dùng Tailwind, bạn đang dùng PostCSS.

---

## 4. BEM — Quy Ước Đặt Tên Class

Viết CSS lâu dài, vấn đề không phải là kỹ thuật mà là **đặt tên**. Khi project có hàng trăm class, không có quy ước → class conflict, override nhau, không ai hiểu class nào dùng để làm gì.

**BEM** (Block–Element–Modifier) là quy ước đặt tên phổ biến nhất để giải quyết vấn đề này.

### Khái niệm

**Block**: Thành phần UI độc lập, có nghĩa khi đứng một mình.
```
card, navbar, button, form, modal
```

**Element**: Phần bên trong block, không có nghĩa nếu đứng ngoài block đó.
```
card__title, card__image, navbar__logo, button__icon
```

**Modifier**: Biến thể của block hoặc element (trạng thái, kích cỡ, màu sắc).
```
button--primary, button--large, card--featured, navbar--sticky
```

### Syntax

```
.block {}
.block__element {}
.block--modifier {}
.block__element--modifier {}
```

### Ví dụ thực tế

HTML:

```html
<div class="card card--featured">
  <img class="card__image" src="..." alt="...">
  <div class="card__body">
    <h2 class="card__title">Tiêu đề bài viết</h2>
    <p class="card__excerpt">Mô tả ngắn...</p>
    <a class="card__link card__link--primary" href="#">Đọc thêm</a>
  </div>
</div>
```

SCSS:

```scss
.card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  
  &--featured {
    border-color: #3b82f6;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
  }
  
  &__image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  
  &__body {
    padding: 1.5rem;
  }
  
  &__title {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  
  &__excerpt {
    color: #6b7280;
    margin-bottom: 1rem;
  }
  
  &__link {
    color: #3b82f6;
    text-decoration: none;
    
    &--primary {
      font-weight: 600;
      text-decoration: underline;
    }
  }
}
```

### Lợi ích của BEM

- **Không cascade conflict**: `.card__title` không ảnh hưởng đến `.article__title`
- **Tự documenting**: Nhìn vào class name là biết element này thuộc block nào
- **Dễ tìm kiếm**: Tìm `.card__` là ra tất cả elements của card
- **Portable**: Chuyển block sang project khác mà không cần chỉnh CSS

### Khi nào không dùng BEM?

BEM sinh ra cho dự án lớn với plain CSS/SCSS. Nếu bạn dùng:
- **CSS Modules** (Next.js/React): Scoping tự động, không cần BEM
- **Tailwind CSS**: Utility-first, không có custom class names
- **Styled Components/Emotion**: CSS-in-JS, scope tự động

---

## 5. Thực Hành

### Bài 1: Cài đặt Sass và thử các tính năng

1. Tạo project mới:
```bash
mkdir sass-practice && cd sass-practice
npm init -y
npm install -D sass
```

2. Tạo file `src/style.scss` và thử:
   - Khai báo variables cho color palette và spacing
   - Viết CSS cho navbar với nesting
   - Tạo mixin `flex-center` và dùng ở 3 nơi khác nhau
   - Tạo mixin `respond-to($breakpoint)` cho responsive

3. Compile:
```bash
npx sass --watch src/style.scss dist/style.css
```

### Bài 2: Refactor CSS sang SCSS với BEM

Lấy một đoạn HTML/CSS bất kỳ từ project trước và:
1. Đổi tên classes theo BEM
2. Extract variables cho màu sắc, spacing
3. Tách thành partials (`_variables.scss`, `_components.scss`, `main.scss`)
4. Dùng mixin cho media queries

### Tài nguyên

- [Sass Basics](https://sass-lang.com/guide)
- [Sass Playground](https://www.sassmeister.com/)
- [BEM Documentation](https://getbem.com/)
- [PostCSS Plugins Directory](https://www.postcss.parts/)
