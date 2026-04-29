---
title: "Ex2 — Student Score Table"
---

## Mục Tiêu

Bài tập này giúp bạn thực hành xây dựng và style table HTML — một component bị nhiều người làm sai hơn tưởng vì HTML table có cú pháp khá đặc thù.

Table tốt không chỉ là "dữ liệu nằm trong ô". Table cần có cấu trúc semantic đúng để screen reader đọc được, zebra row để mắt dễ theo dõi, header rõ ràng, và hoạt động được trên cả màn hình nhỏ.

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

## Stage 1 — Xây Table Cơ Bản

Tạo bảng điểm sinh viên với **ít nhất 10 dòng dữ liệu**.

### Cấu trúc bắt buộc

**Cột dữ liệu gợi ý** (có thể điều chỉnh):

| STT | Họ tên | Mã SV | Điểm GK | Điểm CK | Điểm TB | Kết quả |
|---|---|---|---|---|---|---|

**Yêu cầu HTML:**
- `<caption>` — tiêu đề bảng
- `<thead>` và `<tbody>` để phân tách header và data
- `<th scope="col">` cho các cột header
- Một dòng tổng kết (summary row) hiển thị điểm trung bình — dùng `colspan` để gộp ô

**Yêu cầu CSS:**
- **Zebra row styling**: các dòng xen kẽ có màu nền khác nhau để dễ đọc
- **Hover highlight**: dòng nổi bật khi di chuột qua
- Bảng có border rõ ràng, ô có padding đủ rộng

---

## Stage 2 — Cải Thiện (Chọn ít nhất 2)

Chọn **ít nhất 2** cải tiến từ danh sách dưới:

1. Tối ưu bảng cho màn hình nhỏ (bảng rộng trên mobile sẽ bị tràn — xử lý bằng scroll ngang hoặc cách khác)
2. Thêm print-friendly styling bằng `@media print` (ẩn các thứ không cần in, tối ưu cho in trên giấy)
3. Làm nổi bật cột Điểm TB hoặc cột Kết quả (dùng màu sắc, font weight)
4. Refactor CSS để đơn giản hơn trong khi vẫn giữ nguyên thiết kế
5. Cải thiện readability khi dữ liệu trong ô quá dài (truncate, tooltip, hoặc cách khác)

### Giải thích

Viết một đoạn ngắn mô tả:
- Bạn đã chọn cải tiến nào?
- Những cải tiến đó làm cho bảng dễ dùng hơn như thế nào?

---

## Stage 3 — Tailwind CSS

Redesign lại bảng ở Stage 1 bằng Tailwind CSS. Mục tiêu là thay toàn bộ custom CSS bằng utility classes — trong khi giữ nguyên hoặc cải thiện readability và usability.

### Yêu cầu

- Xoá bỏ hoàn toàn file CSS cũ
- Giữ nguyên cấu trúc HTML: `<caption>`, `<thead>`, `<tbody>`, `<th scope="col">`, summary row với `colspan`
- Recreate zebra row styling và hover highlight bằng Tailwind
- Bảng vẫn phải responsive

**Cài Tailwind:** Có thể dùng CDN.

```html
<!-- Tailwind qua CDN — thêm vào <head> -->
<script src="https://cdn.tailwindcss.com"></script>
```

### Gợi ý cải tiến với Tailwind

- Bọc bảng trong container có scroll ngang: `<div class="overflow-x-auto">`
- Zebra striping: `odd:bg-white even:bg-gray-50` trên `<tr>`
- Hover: `hover:bg-blue-50` trên `<tr>` (thêm `class="group"`)
- Header: `bg-gray-100 text-gray-700 font-semibold text-sm uppercase`
- Padding ô: `px-4 py-3`
- Highlight cột điểm: `font-medium text-blue-600`

### Giải thích (150–200 từ)

Kèm theo file code, viết một đoạn giải thích:
- Cách tiếp cận thay đổi như thế nào khi dùng Tailwind so với custom CSS?
- Bạn cải thiện gì về layout và readability?
- Ưu điểm và hạn chế của Tailwind khi áp dụng cho table là gì?

---

## Cấu Trúc Nộp Bài

```
ex2/
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
