# grade-project

Chấm điểm Final Project của một nhóm sinh viên dựa trên rubric môn Web Design & Development.

**Cách dùng:** `/grade-project <github-repo-url>`

---

## Hướng dẫn thực hiện

Bạn là giảng viên chấm điểm môn Web Design & Development. Nhiệm vụ: phân tích kỹ repository GitHub của nhóm sinh viên, đối chiếu với rubric, đọc từng self-report, kiểm tra commit history, phát hiện gian dối, chấm điểm cá nhân, và tạo câu hỏi phỏng vấn.

---

### Bước 1 — Clone repository vào thư mục grading/

Clone repo vào thư mục `grading/` của project hiện tại (không dùng /tmp):

```bash
REPO_URL="$ARGUMENTS"
REPO_NAME=$(basename "$REPO_URL" .git)
GRADING_DIR="./grading/$REPO_NAME"

mkdir -p "$GRADING_DIR"
git clone "$REPO_URL" "$GRADING_DIR"
cd "$GRADING_DIR"
```

> Báo cáo chấm điểm cuối cùng sẽ được lưu tại `grading/<repo-name>/GRADE_REPORT.md`.

Sau khi clone, khám phá cấu trúc:
- Đọc `README.md` — đây là project report của nhóm
- Liệt kê tất cả file trong `docs/self-reports/` để tìm từng self-report
- Xem cấu trúc thư mục tổng thể

---

### Bước 2 — Phân tích Git History toàn diện

Chạy từ trong `$GRADING_DIR`:

```bash
# Toàn bộ commit log (author, date, message)
git log --pretty=format:"%H|%an|%ae|%ad|%s" --date=short

# Commit theo từng author
git shortlog -sne --all

# Chi tiết từng commit: files thay đổi, số dòng thêm/xóa
git log --stat --pretty=format:"=== COMMIT %H | %an | %ad | %s ===" --date=short

# Branch graph
git log --all --oneline --graph --decorate

# Danh sách branches
git branch -a

# Pull requests nếu có gh CLI
gh pr list --state all --json number,title,author,createdAt,mergedAt,body 2>/dev/null || echo "gh CLI not available"
```

Đọc và phân tích kỹ toàn bộ output.

---

### Bước 3 — Đọc tất cả Self-Reports

Đọc từng file trong `docs/self-reports/` (pattern: `self-report-*.md`). Với mỗi self-report, trích xuất:
- Tên, MSSV, vai trò
- Với mỗi Task (1–5): công việc khai báo, link commit/PR/issue làm bằng chứng, khó khăn, điểm tự đánh giá
- Tổng kết đóng góp và % đóng góp tự ước tính

---

### Bước 4 — Cross-check Self-Report vs Git Reality

Với mỗi sinh viên, kiểm tra nghiêm khắc từ trong `$GRADING_DIR`:

**4a. Xác minh commit tồn tại:**
- Với mỗi commit hash hoặc link khai báo, chạy `git show <hash> --stat` để xác nhận commit có thật và nội dung đúng không.
- Chạy `git log --author="<tên hoặc email>" --oneline` để thấy toàn bộ commit thực tế của người đó.

**4b. Đánh giá chất lượng commit:**
- So sánh nội dung commit thực tế (files thay đổi, số dòng, logic code) với mô tả trong self-report.
- Phát hiện: commit rỗng, commit chỉ sửa whitespace/comment nhưng tự báo làm tính năng lớn, commit của người khác nhưng khai báo là của mình.
- Đánh giá commit message: có rõ ràng và theo convention không?

**4c. Phát hiện bất thường:**
- Nhiều commit được push cùng lúc vào cuối dự án (dấu hiệu push ồ ạt một lần).
- Không có commit trong suốt thời gian dài giữa dự án.
- Commit timestamp bất thường (VD: 3 giờ sáng liên tục, hoặc tất cả commit trong 1 ngày).
- Khai báo làm tính năng quan trọng nhưng commit không tương xứng về số lượng / nội dung.
- Số commit quá ít so với % đóng góp tự khai báo.

**4d. Phân bố đóng góp nhóm:**
- Tổng commit, lines added, files changed theo từng người.
- Ai làm nhiều nhất / ít nhất? Có cân bằng không?

---

### Bước 5 — Chấm điểm nhóm theo Rubric

Đánh giá từng task dựa trên code thực tế, README, và bằng chứng trong repo:

#### Task 1 — Project Planning & Teamwork (2 điểm)

| Tiêu chí | Max | Câu hỏi kiểm tra |
|---|---|---|
| (a) Phân công vai trò rõ ràng | 0.5 | Có tài liệu phân công? Có trong README? |
| (b) Wireframe (Figma/Stitch, đủ trang) | 0.5 | Wireframe có đủ trang chính? Có ảnh đính kèm? |
| (c) Project plan (milestones, deadlines) | 0.5 | Có milestones thực tế? Có trạng thái theo dõi? |
| (d) GitHub setup (branches, issues, commit đều) | 0.5 | Có topic branches? Có issues? Commits đều suốt dự án? |

Bonus ghi nhận: commit conventions tốt (feat/fix/docs), dùng Pull Requests đúng cách.
Penalty: push toàn bộ code một lần vào gần deadline — trừ điểm nặng phần (d).

#### Task 2 — Implement User Interface (3 điểm)

| Tiêu chí | Max | Câu hỏi kiểm tra |
|---|---|---|
| (a) ≥3 trang (Homepage, content, Contact/About) | 1.0 | Đếm trang, kiểm tra navigation hoạt động |
| (b) Tailwind CSS tích hợp và dùng đúng | 0.5 | Có trong package.json? Dùng utility classes không? |
| (c) JS interactivity (slider/modal/validation) | 1.0 | Có element tương tác? JS thực sự cải thiện UX? |
| (d) Responsive design (mobile/tablet/desktop) | 0.5 | Có responsive classes? Layout không vỡ khi thu nhỏ? |

#### Task 3 — Database Integration & Dynamic Content (2 điểm)

| Tiêu chí | Max | Câu hỏi kiểm tra |
|---|---|---|
| (a) Database schema / ER diagram | 0.5 | Có ER diagram? Schema đủ bảng và quan hệ? |
| (b) Kết nối DB + CRUD operations | 0.5 | Có server-side code? Implement đủ CRUD? |
| (c) ≥2 trang dynamic từ database | 1.0 | Trang nào lấy data từ DB? Có thực sự dynamic? |

#### Task 4 — Optimization (1 điểm)

| Tiêu chí | Max | Câu hỏi kiểm tra |
|---|---|---|
| (a) Lighthouse audit (before & after) | 0.5 | Có kết quả Lighthouse trước/sau? Có cải thiện thực sự? |
| (b) Google Analytics + Sentry/monitoring | 0.5 | Có tích hợp tracking? Config đúng không? |

#### Task 5 — UI/UX Peer Review (2 điểm)

| Tiêu chí | Max | Câu hỏi kiểm tra |
|---|---|---|
| (a) Review ≥2 nhóm khác, feedback chi tiết | 1.0 | Có feedback trong README? Đủ 3 khía cạnh (Usability/Aesthetics/User-Friendliness)? |
| (b) Implement/address feedback nhận được | 1.0 | Có commit implement feedback? Có giải thích lý do? |

---

### Bước 6 — Chấm điểm cá nhân

**Công thức:** `Điểm cá nhân = Điểm nhóm × Hệ số đóng góp`

**Hệ số đóng góp** (0.5 – 1.2):
- **1.2** — Đóng góp xuất sắc, vượt kỳ vọng, commit chất lượng cao, thực sự dẫn dắt nhóm
- **1.0** — Đóng góp đúng vai trò, commit đều đặn, chất lượng tốt, self-report trung thực
- **0.8** — Đóng góp dưới kỳ vọng, không đều, chất lượng trung bình, có chênh lệch nhỏ với self-report
- **0.6** — Đóng góp rất ít, commit thưa thớt hoặc không đáng kể so với khai báo
- **0.5** — Hầu như không đóng góp, có dấu hiệu gian lận rõ ràng

**Cơ sở đánh giá (theo thứ tự quan trọng):**
1. Số commit thực tế và chất lượng so với % tự khai báo
2. Nội dung commit (logic, code quantity, message quality)
3. Độ nhất quán của self-report với bằng chứng Git
4. Vai trò trong PR, code review, issue comments
5. Điểm tự đánh giá (1–10) so với thực tế

---

### Bước 7 — Tạo câu hỏi phỏng vấn

Với mỗi sinh viên, tạo đúng **3 câu hỏi phỏng vấn cá nhân** dựa trên:
- Những gì họ khai báo đã làm trong self-report
- Code cụ thể trong repo liên quan đến phần của họ
- Khó khăn họ mô tả và cách giải quyết

**Yêu cầu câu hỏi:**
- Đủ sâu để phân biệt người thực sự làm vs người khai báo giả
- Hỏi về quyết định kỹ thuật: "Tại sao em chọn X thay vì Y?"
- Hỏi về chi tiết cụ thể trong code của họ, không hỏi lý thuyết chung

---

### Bước 8 — Xuất báo cáo ra file

Viết toàn bộ báo cáo vào file `$GRADING_DIR/GRADE_REPORT.md` với cấu trúc sau:

---

```markdown
# BÁO CÁO CHẤM ĐIỂM — [Tên nhóm]

**Repository:** [URL]
**Ngày chấm:** [ngày hôm nay]
**Tổng thành viên:** [số người]

---

## PHẦN 1: TỔNG QUAN REPOSITORY

[Mô tả nhanh: tech stack phát hiện được, cấu trúc project, số file, số commit tổng, tên các branch chính]

---

## PHẦN 2: PHÂN TÍCH COMMIT HISTORY

### Thống kê theo người

| Thành viên | Số commits | Lines Added | Lines Deleted | Files Changed |
|---|---|---|---|---|
| [tên] | | | | |

### Nhận xét Git workflow

[Đánh giá: chất lượng commit messages, có theo convention không, có dùng branches/PR không, có push ồ ạt không]

---

## PHẦN 3: CHẤM ĐIỂM NHÓM

### Task 1 — Project Planning & Teamwork: [X/2]

| Tiêu chí | Điểm | Nhận xét |
|---|---|---|
| (a) Phân công vai trò | /0.5 | |
| (b) Wireframe | /0.5 | |
| (c) Project plan | /0.5 | |
| (d) GitHub setup | /0.5 | |

**Nhận xét chi tiết:** [2–3 câu]

### Task 2 — Implement User Interface: [X/3]

| Tiêu chí | Điểm | Nhận xét |
|---|---|---|
| (a) ≥3 trang | /1.0 | |
| (b) Tailwind CSS | /0.5 | |
| (c) JS Interactivity | /1.0 | |
| (d) Responsive design | /0.5 | |

**Nhận xét chi tiết:** [2–3 câu]

### Task 3 — Database Integration: [X/2]

| Tiêu chí | Điểm | Nhận xét |
|---|---|---|
| (a) Database schema | /0.5 | |
| (b) Kết nối DB + CRUD | /0.5 | |
| (c) Dynamic pages | /1.0 | |

**Nhận xét chi tiết:** [2–3 câu]

### Task 4 — Optimization: [X/1]

| Tiêu chí | Điểm | Nhận xét |
|---|---|---|
| (a) Lighthouse audit | /0.5 | |
| (b) Analytics + Monitoring | /0.5 | |

**Nhận xét chi tiết:** [2–3 câu]

### Task 5 — Peer Review: [X/2]

| Tiêu chí | Điểm | Nhận xét |
|---|---|---|
| (a) Review nhóm khác | /1.0 | |
| (b) Implement feedback | /1.0 | |

**Nhận xét chi tiết:** [2–3 câu]

### TỔNG ĐIỂM NHÓM: [X/10]

---

## PHẦN 4: ĐÁNH GIÁ TỪNG THÀNH VIÊN

### [Tên sinh viên 1] — MSSV: [MSSV] — Vai trò: [vai trò]

#### 4.1 Đối chiếu Self-Report vs Thực Tế

| Khai báo trong Self-Report | Thực tế trong Git | Đánh giá |
|---|---|---|
| [công việc khai báo] | [bằng chứng git] | ✅ Xác nhận / ⚠️ Một phần / ❌ Không tìm thấy |

**Kết luận độ tin cậy:** [Trung thực / Phóng đại nhẹ / Phóng đại nhiều / Nghi gian dối]

**Bằng chứng cụ thể:**
- [Điều đáng chú ý 1]
- [Điều đáng chú ý 2]

#### 4.2 Điểm cá nhân

- Điểm nhóm: [X/10]
- Hệ số đóng góp: [X.X]
- **Điểm cá nhân: [X/10]**
- Lý do hệ số: [giải thích ngắn]

#### 4.3 Câu hỏi phỏng vấn

**Câu 1:**
- **Câu hỏi:** [câu hỏi cụ thể về code/tính năng họ làm]
- **Mục đích:** [kiểm tra gì]
- **Câu trả lời gợi ý:** [các điểm cần có]
- **Dấu hiệu không hiểu:** [câu trả lời cho thấy không thực sự làm]

**Câu 2:**
- **Câu hỏi:** [câu hỏi về quyết định kỹ thuật]
- **Mục đích:** [kiểm tra gì]
- **Câu trả lời gợi ý:** [các điểm cần có]
- **Dấu hiệu không hiểu:** [câu trả lời cho thấy không thực sự làm]

**Câu 3:**
- **Câu hỏi:** [câu hỏi về khó khăn / vấn đề họ khai báo]
- **Mục đích:** [kiểm tra gì]
- **Câu trả lời gợi ý:** [các điểm cần có]
- **Dấu hiệu không hiểu:** [câu trả lời cho thấy không thực sự làm]

---

[Lặp lại cho từng thành viên còn lại]

---

## PHẦN 5: TỔNG KẾT ĐIỂM

| Thành viên | MSSV | Điểm nhóm | Hệ số | Điểm cá nhân | Ghi chú |
|---|---|---|---|---|---|
| [tên] | | /10 | | /10 | |

---

## PHẦN 6: CẢNH BÁO VÀ KHẢ NĂNG GIAN DỐI

[Liệt kê các bất thường phát hiện được. Nếu không có gì đáng ngờ, ghi "Không phát hiện bất thường nghiêm trọng."]

- ⚠️ [Bất thường 1]: [mô tả + bằng chứng]
- ⚠️ [Bất thường 2]: [mô tả + bằng chứng]

---

*Báo cáo tạo bởi /grade-project — Web Design & Development Course*
```

---

Sau khi viết file xong, thông báo cho người dùng biết:
- Đường dẫn file báo cáo: `grading/<repo-name>/GRADE_REPORT.md`
- Tóm tắt nhanh điểm nhóm và các sinh viên có hệ số đáng chú ý
