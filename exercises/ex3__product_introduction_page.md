# Ex3 — Product Introduction Page

## Mục Tiêu

Bài tập này giúp bạn thực hành xây dựng layout trang web hoàn chỉnh — từ header đến footer — bằng semantic HTML và Flexbox.

Khác với form hay table, bài này yêu cầu bạn suy nghĩ về cấu trúc trang tổng thể: các section được tổ chức ra sao, nội dung trong mỗi section là gì, và layout thay đổi như thế nào giữa mobile và desktop.

Bài tập chia làm **3 stages** — mỗi stage xây trên stage trước. **Lưu riêng từng stage** vào folder/file khác nhau trước khi nộp.

---

## Yêu Cầu Chung

Áp dụng cho tất cả các stages:

- Không dùng frameworks (Bootstrap, Tailwind, v.v.) — trừ Stage 3
- Không dùng JavaScript
- Không copy template có sẵn
- Code phải sạch và được format đúng
- CSS phải đặt trong file riêng, không viết inline
- Bạn phải giải thích được code của mình khi được hỏi

---

## Stage 1 — Xây Trang Cơ Bản

Thiết kế một trang giới thiệu sản phẩm đơn giản. Bạn được tự chọn sản phẩm (ứng dụng, thiết bị, khoá học, dịch vụ... đều được).

### Cấu trúc bắt buộc

**Header:**
- Logo (có thể là text + CSS styling)
- Navigation links

**Hero Section:**
- Tiêu đề lớn (tagline)
- Mô tả ngắn về sản phẩm
- Call-to-action button

**Feature Section:**
- Đúng **3 feature cards** — mỗi card có icon/ảnh, tiêu đề, mô tả ngắn

**Footer:**
- Thông tin liên hệ hoặc copyright

### Yêu cầu kỹ thuật

- Dùng semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- Dùng **Flexbox** cho layout (không dùng float hay table)
- Trang cơ bản responsive — hiển thị được trên mobile
- Ít nhất **một hover effect** (button, card, nav link...)

---

## Stage 2 — Cải Thiện (Chọn ít nhất 2)

Chọn **ít nhất 2** cải tiến từ danh sách dưới:

1. Cải thiện spacing và alignment tổng thể (padding, margin, căn chỉnh)
2. Thêm một CSS animation nhỏ (fade in, slide up khi trang load, hoặc animation khác)
3. Thêm gradient hoặc background pattern cho hero section hoặc một section nào đó
4. Bố cục 2 cột cho tablet/desktop (ví dụ hero section có text bên trái, ảnh bên phải)
5. Tổ chức lại CSS thành các section rõ ràng theo component

### Giải thích

Viết một đoạn ngắn mô tả:
- Bạn đã cải thiện gì về layout?
- Tại sao những thay đổi đó làm trang tốt hơn về mặt cấu trúc?

---

## Stage 3 — Tailwind CSS

Redesign lại trang ở Stage 1 bằng Tailwind CSS. Mục tiêu là thay custom CSS và Flexbox bằng utility classes — trong khi giữ cấu trúc semantic HTML và cải thiện thiết kế.

### Yêu cầu

- Xoá bỏ hoàn toàn file CSS cũ
- Giữ nguyên cấu trúc trang: Header, Hero, 3 feature cards, Footer
- Giữ semantic HTML
- Responsive từ mobile đến desktop
- Accessibility: navigation rõ ràng, text có đủ contrast, heading hierarchy đúng (`h1` → `h2`)

**Cài Tailwind:** Có thể dùng CDN.

```html
<!-- Tailwind qua CDN — thêm vào <head> -->
<script src="https://cdn.tailwindcss.com"></script>
```

### Gợi ý cải tiến với Tailwind

**Header:**
```html
<header class="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
```

**Hero Section:**
```html
<section class="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-6 text-center">
```

**Feature Cards — responsive grid:**
```html
<div class="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 py-16">
  <div class="rounded-xl shadow-md p-6 hover:shadow-lg hover:scale-105 transition">
    ...
  </div>
</div>
```

**Center content:**
```html
<div class="container mx-auto px-4 max-w-6xl">
```

### Giải thích (150–200 từ)

Kèm theo file code, viết một đoạn giải thích:
- Cách tiếp cận layout thay đổi như thế nào khi dùng Tailwind so với Flexbox + custom CSS?
- Bạn cải thiện gì về visual design và cấu trúc?
- Ưu điểm và trade-off của Tailwind khi xây trang là gì?

---

## Cấu Trúc Nộp Bài

```
ex3/
├── stage1/
│   ├── index.html
│   └── style.css
├── stage2/
│   ├── index.html
│   ├── style.css
│   └── explanation.txt
└── stage3/
    ├── index.html
    └── explanation.txt
```
