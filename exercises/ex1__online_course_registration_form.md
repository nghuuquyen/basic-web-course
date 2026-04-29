# Ex1 — Online Course Registration Form

## Mục Tiêu

Bài tập này giúp bạn thực hành xây dựng form HTML đầy đủ và style nó bằng CSS — một trong những component phổ biến nhất trong bất kỳ web application nào.

Form không phải chỉ là "điền rồi submit". Form tốt cần có cấu trúc HTML đúng chuẩn, validation rõ ràng, layout dễ đọc, và hoạt động được trên cả mobile lẫn desktop.

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

## Stage 1 — Xây Form Cơ Bản

Thiết kế form đăng ký khoá học online với đầy đủ các trường thông tin.

### Các trường bắt buộc

| Trường | Loại input |
|---|---|
| Họ và tên | `text` |
| Email | `email` |
| Số điện thoại | `tel` |
| Chọn khoá học | `select` với `optgroup` (nhóm theo danh mục) |
| Hình thức học | `radio`: Online / Offline / Hybrid |
| Kỹ năng hiện có | `checkbox` — ít nhất 3 lựa chọn |
| Ngày muốn bắt đầu | `date` |
| Ghi chú thêm | `textarea` |
| Upload CV hoặc tài liệu | `file` |
| Nút submit | `button[type="submit"]` |

### Yêu cầu kỹ thuật

**HTML:**
- Dùng `<form>`, `<fieldset>`, `<legend>` để nhóm các trường liên quan
- Mỗi input phải có `<label for="...">` tương ứng
- Dùng HTML5 validation: `required`, `pattern` khi cần thiết

**CSS:**
- CSS trong file riêng, không inline
- Form phải cơ bản responsive (hiển thị đúng trên mobile)

---

## Stage 2 — Cải Thiện (Chọn ít nhất 2)

Sau khi đã có form hoạt động được ở Stage 1, chọn **ít nhất 2** cải tiến từ danh sách dưới:

1. Bố cục 2 cột trên desktop (các trường chia đôi màn hình)
2. Cải thiện spacing và alignment để dễ đọc hơn
3. Thêm focus state và invalid state rõ ràng bằng CSS (khi user đang gõ vào trường, khi trường bị lỗi validation)
4. Refactor CSS để dễ mở rộng sau này (dùng CSS variables, tổ chức selector rõ ràng hơn)
5. Redesign hoàn toàn theo một visual style bạn chọn

### Giải thích (150–200 từ)

Kèm theo file code, viết một đoạn giải thích ngắn trả lời:
- Bạn đã chọn cải tiến nào?
- Bạn thay đổi gì trong HTML/CSS để thực hiện?
- Tại sao những thay đổi đó làm form tốt hơn?

---

## Stage 3 — Tailwind CSS

Redesign lại form ở Stage 1 bằng Tailwind CSS. Mục tiêu là thay toàn bộ custom CSS bằng utility classes — trong khi vẫn giữ nguyên (hoặc cải thiện) layout và usability.

### Yêu cầu

- Xoá bỏ hoàn toàn file CSS cũ
- Giữ nguyên cấu trúc form và các trường từ Stage 1
- Dùng Tailwind cho tất cả: layout, spacing, typography, màu sắc, border, focus/validation states
- Form vẫn phải responsive từ mobile đến desktop
- Giữ accessibility: `<label for>`, focus state nhìn thấy được

**Cài Tailwind:** Có thể dùng CDN (đơn giản hơn) hoặc build setup nếu bạn đã quen.

```html
<!-- Tailwind qua CDN — thêm vào <head> -->
<script src="https://cdn.tailwindcss.com"></script>
```

### Gợi ý cải tiến với Tailwind

- Đặt form trong card (`bg-white rounded-xl shadow-md p-8 max-w-2xl mx-auto`)
- Bố cục 2 cột trên desktop: `grid grid-cols-1 md:grid-cols-2 gap-6`
- Style input: `rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500`
- Spacing nhất quán: `space-y-4`, `gap-6`
- Highlight required fields bằng màu hoặc dấu `*`

### Giải thích (150–200 từ)

Kèm theo file code, viết một đoạn giải thích:
- Cách tiếp cận thay đổi như thế nào khi dùng Tailwind so với custom CSS?
- Bạn đã cải thiện gì về layout/styling?
- Ưu điểm và thách thức khi dùng Tailwind CSS là gì?

---

## Cấu Trúc Nộp Bài

```
ex1/
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
