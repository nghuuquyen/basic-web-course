# grade-project

Chấm điểm Final Project của một nhóm sinh viên dựa trên rubric môn Web Design & Development.

**Cách dùng:** `/grade-project <github-repo-url>`

---

## Hướng dẫn thực hiện

Bạn là giảng viên chấm điểm môn Web Design & Development. Nhiệm vụ: phân tích kỹ repository GitHub của nhóm sinh viên, đối chiếu với rubric, đọc từng self-report, kiểm tra commit history, phát hiện gian dối, chấm điểm cá nhân, và tạo câu hỏi phỏng vấn.

---

### Bước 1 — Clone repository vào thư mục grading/

Clone repo vào thư mục `grading/` của project hiện tại (không dùng /tmp).

**Nếu folder đã tồn tại**, thêm suffix thời gian dạng `YYYY-MM-DD_HH-MM` để phân biệt (VD: `ten-repo_2026-05-19_14-30`):

```bash
REPO_URL="$ARGUMENTS"
REPO_NAME=$(basename "$REPO_URL" .git)
GRADING_DIR="./grading/$REPO_NAME"

if [ -d "$GRADING_DIR" ]; then
  TIME_SUFFIX=$(date "+%Y-%m-%d_%H-%M")
  GRADING_DIR="./grading/${REPO_NAME}_${TIME_SUFFIX}"
  echo "Folder đã tồn tại, dùng thư mục mới: $GRADING_DIR"
fi

mkdir -p "$GRADING_DIR"
git clone "$REPO_URL" "$GRADING_DIR"
cd "$GRADING_DIR"
```

> Báo cáo chấm điểm cuối cùng sẽ được lưu tại `$GRADING_DIR/GRADE_REPORT.md`.

Sau khi clone, khám phá cấu trúc:
- Đọc `README.md` — đây là project report của nhóm
- Liệt kê tất cả file trong `docs/self-reports/` để tìm từng self-report
- Xem cấu trúc thư mục tổng thể

---

### Bước 2 — Phân tích Git History toàn diện

Chạy từ trong `$GRADING_DIR` **trước khi xóa `.git`**:

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

---

### Bước 3 — Đọc tất cả Self-Reports

Đọc từng file trong `docs/self-reports/` (pattern: `self-report-*.md`). Với mỗi self-report, trích xuất:
- Tên, MSSV, vai trò
- Với mỗi Task (1–5): công việc khai báo, link commit/PR/issue làm bằng chứng, điểm tự đánh giá
- **Khó khăn theo từng Task:** ghi lại chính xác nội dung khó khăn sinh viên khai báo cho mỗi Task (nếu có) — đây là input để cross-check với commit thực tế và tạo câu hỏi phỏng vấn
- Tổng kết đóng góp và % đóng góp tự ước tính
- **Khai báo sử dụng AI:** danh sách tính năng/đoạn code nào được hỗ trợ bởi AI (Copilot, ChatGPT, Claude, v.v.)

> **Chính sách AI:** Sử dụng AI để hỗ trợ viết code **không bị coi là gian lận học thuật**. Tuy nhiên, sinh viên **bắt buộc** phải: (1) khai báo rõ những phần code nào được viết với sự hỗ trợ của AI trong self-report, và (2) hiểu được cách code đó vận hành — điều này sẽ được kiểm tra qua câu hỏi phỏng vấn. Không khai báo AI nhưng code có dấu hiệu AI-generated (style không nhất quán, comment bằng tiếng Anh hoàn hảo không khớp trình độ, v.v.) là bất thường cần ghi chú.

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
- Code có dấu hiệu AI-generated (comment/docstring quá hoàn hảo, style không nhất quán với phần code khác) nhưng **không có khai báo AI** trong self-report.

**4e. Kiểm tra khai báo AI usage:**
- Đọc phần khai báo AI trong self-report của từng sinh viên.
- Nếu có khai báo: xác nhận các file/tính năng đó thực sự tồn tại trong code.
- Nếu không khai báo: đọc code của sinh viên đó và tìm dấu hiệu AI-generated. Ghi chú nhưng không tự động phạt — sẽ làm rõ qua câu hỏi phỏng vấn.

**4d. Phân tích đóng góp theo từng Task:**

Với mỗi sinh viên, sử dụng **đúng format bảng 5 cột** sau — **cột "Khai báo trong Self-Report" PHẢI được điền đầy đủ từ nội dung self-report đã đọc ở Bước 3, không được để trống hay để placeholder**:

| Task | Khai báo trong Self-Report | Commit thực tế (hash) | Code tìm thấy | Mức độ đóng góp |
|---|---|---|---|---|
| Task 1 — Planning | [tóm tắt công việc + bằng chứng sinh viên khai báo] | [danh sách hash] | [file path] | ✅ Đủ / ⚠️ Một phần / ❌ Không có |
| Task 2 — UI | [tóm tắt công việc + bằng chứng sinh viên khai báo] | [danh sách hash] | [file path] | ✅ Đủ / ⚠️ Một phần / ❌ Không có |
| Task 3 — Database | [tóm tắt công việc + bằng chứng sinh viên khai báo] | [danh sách hash] | [file path] | ✅ Đủ / ⚠️ Một phần / ❌ Không có |
| Task 4 — Optimization | [tóm tắt công việc + bằng chứng sinh viên khai báo] | [danh sách hash] | [file path] | ✅ Đủ / ⚠️ Một phần / ❌ Không có |
| Task 5 — Peer Review | [tóm tắt công việc + bằng chứng sinh viên khai báo] | [danh sách hash] | [file path] | ✅ Đủ / ⚠️ Một phần / ❌ Không có |

Tiếp theo, liệt kê **khó khăn khai báo** theo từng Task (lấy từ self-report đã đọc ở Bước 3):

- Task 1: [khó khăn sinh viên khai báo, hoặc "Không đề cập"]
- Task 2: [khó khăn sinh viên khai báo, hoặc "Không đề cập"]
- Task 3: [khó khăn sinh viên khai báo, hoặc "Không đề cập"]
- Task 4: [khó khăn sinh viên khai báo, hoặc "Không đề cập"]
- Task 5: [khó khăn sinh viên khai báo, hoặc "Không đề cập"]

Nhận xét: Các khó khăn khai báo có hợp lý với commit/code thực tế không? Hay quá chung chung / không liên quan?

Hướng dẫn phân loại commit: dựa vào commit message, files thay đổi, và thời điểm commit để xác định task tương ứng. Một commit có thể thuộc nhiều task.

**4e. Phân bố đóng góp nhóm:**
- Tổng commit, lines added, files changed theo từng người.
- Ai làm nhiều nhất / ít nhất? Có cân bằng không?

---

### Bước 5 — Chấm điểm nhóm theo Rubric

Đánh giá từng task dựa trên **code thực tế** là ưu tiên hàng đầu, kết hợp với README và bằng chứng trong repo. **Không chỉ tin vào report — phải mở file code ra đọc và xác minh tính năng thực sự tồn tại.**

> **Nguyên tắc kiểm tra code thực tế:** Với mỗi tính năng được khai báo, hãy tìm và đọc file source code tương ứng. Nếu report nói "có slider" → phải thấy code JS/HTML của slider. Nếu report nói "kết nối database" → phải thấy connection code và query thực tế. Điểm chỉ được tính khi code thực sự tồn tại và hợp lệ, không phải chỉ vì report nói có.

**Quy trình xác minh cho mỗi tính năng:**
1. Đọc khai báo trong README/self-report
2. Tìm file source code liên quan (`find . -name "*.js" -o -name "*.ts" -o -name "*.html" -o -name "*.css"`)
3. Đọc code thực tế — có implement đúng không? Có placeholder/comment giả không?
4. Ghi lại file path cụ thể làm bằng chứng trong báo cáo chấm điểm

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
| (a) ≥3 trang (Homepage, content, Contact/About) | 1.0 | Đếm file HTML/page thực tế, kiểm tra routing/navigation trong code |
| (b) Tailwind CSS tích hợp và dùng đúng | 0.5 | Có trong package.json? Đọc file HTML/JSX — có dùng utility classes thực sự không? |
| (c) JS interactivity (slider/modal/validation) | 1.0 | Đọc file JS — code có logic thực không? Hay chỉ import thư viện mà không dùng? |
| (d) Responsive design (mobile/tablet/desktop) | 0.5 | Đọc CSS/HTML — có responsive classes/media queries thực sự không? |

**Kiểm tra code bắt buộc cho Task 2:** Liệt kê tất cả file trang (`*.html`, `*.jsx`, `*.tsx`, `*.vue`), đọc ít nhất 1 file JS interactivity, xác nhận Tailwind class names có trong source.

#### Task 3 — Database Integration & Dynamic Content (2 điểm)

| Tiêu chí | Max | Câu hỏi kiểm tra |
|---|---|---|
| (a) Database schema / ER diagram | 0.5 | Có ER diagram? Đọc schema file (migrations/models) — có khớp với diagram không? |
| (b) Kết nối DB + CRUD operations | 0.5 | Đọc server-side code — có connection string thực, có query/ORM calls không? |
| (c) ≥2 trang dynamic từ database | 1.0 | Đọc route handlers — có fetch data từ DB thực sự không? Hay hardcode data giả? |

**Kiểm tra code bắt buộc cho Task 3:** Tìm và đọc file database connection, đọc ít nhất 2 API route/server handler, xác nhận có query thực chứ không phải mock data.

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

Với mỗi sinh viên, tạo đúng **3 câu hỏi phỏng vấn cá nhân** dựa trên những gì họ khai báo đã làm.

**Triết lý đặt câu hỏi:** Mục tiêu là kiểm tra sinh viên *hiểu* project của mình đến đâu — hiểu vấn đề cần giải quyết, hiểu tại sao chọn cách làm đó, hiểu tính năng hoạt động như thế nào với người dùng. **Không** hỏi cú pháp, không hỏi lý thuyết giáo khoa, không hỏi những chi tiết kỹ thuật mà chỉ người đọc tài liệu mới biết.

**Dạng câu hỏi nên dùng:**
- "Tính năng [X] trong project của em giải quyết vấn đề gì cho người dùng?"
- "Tại sao team quyết định dùng [Y] cho phần này thay vì cách khác?"
- "Nếu có người dùng mới vào trang của em lần đầu, họ sẽ làm gì? Luồng đó được xử lý như thế nào?"
- "Em gặp khó khăn gì khi làm phần [Z]? Em giải quyết bằng cách nào?"
- "Nếu phải làm lại phần này, em sẽ thay đổi gì?"

**Dạng câu hỏi KHÔNG nên dùng (tránh):**
- Hỏi cú pháp: "Viết câu SQL SELECT như thế nào?", "Cú pháp của flexbox là gì?"
- Hỏi lý thuyết chung không liên quan đến project: "HTTP là gì?", "Giải thích REST API."
- Câu hỏi đánh đố chi tiết kỹ thuật: "Dòng 47 trong file này làm gì?"

**Nếu sinh viên khai báo dùng AI:** có ít nhất 1 câu hỏi theo hướng: "Em dùng AI để viết phần [X] — em có thể giải thích phần đó hoạt động như thế nào không? Nếu có lỗi xảy ra ở đây, em sẽ bắt đầu tìm vấn đề từ đâu?"

**Nếu phát hiện code có dấu hiệu AI nhưng không khai báo:** hỏi để kiểm tra mức độ hiểu, ví dụ: "Em có thể giải thích tại sao đoạn code này được viết theo cách này không?"

---

### Bước 8 — Xuất báo cáo ra file

Viết toàn bộ báo cáo vào file `$GRADING_DIR/GRADE_REPORT.md` với cấu trúc **chính xác** dưới đây.

> **TUÂN THỦ CẤU TRÚC BẮT BUỘC:**
> - Sao chép **đúng tên heading** (`##`, `###`, `####`) — không tự ý đổi tên, thêm hay bỏ section
> - PHẦN 4 mỗi thành viên phải có **đúng 3 sub-section**: `#### 4.1 Đóng góp theo từng Task`, `#### 4.2 Điểm cá nhân`, `#### 4.3 Câu hỏi phỏng vấn` — không dùng tên khác
> - Bảng trong `#### 4.1` phải có **đúng 5 cột** (`Task | Khai báo trong Self-Report | Commit thực tế (hash) | Code tìm thấy | Mức độ đóng góp`) — không dùng bảng 4 cột
> - Cột `Khai báo trong Self-Report` phải có nội dung thực từ self-report, không được để placeholder

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

#### 4.1 Đóng góp theo từng Task

> ⚠️ Cột "Khai báo trong Self-Report" phải được điền với nội dung thực tế từ self-report (tóm tắt công việc + bằng chứng sinh viên khai báo), không được để placeholder.

| Task | Khai báo trong Self-Report | Commit thực tế (hash) | Code tìm thấy | Mức độ đóng góp |
|---|---|---|---|---|
| Task 1 — Planning | [công việc + bằng chứng sinh viên khai báo trong self-report] | [hash] | [file path] | ✅ Đủ / ⚠️ Một phần / ❌ Không có |
| Task 2 — UI | [công việc + bằng chứng sinh viên khai báo trong self-report] | [hash] | [file path] | ✅ Đủ / ⚠️ Một phần / ❌ Không có |
| Task 3 — Database | [công việc + bằng chứng sinh viên khai báo trong self-report] | [hash] | [file path] | ✅ Đủ / ⚠️ Một phần / ❌ Không có |
| Task 4 — Optimization | [công việc + bằng chứng sinh viên khai báo trong self-report] | [hash] | [file path] | ✅ Đủ / ⚠️ Một phần / ❌ Không có |
| Task 5 — Peer Review | [công việc + bằng chứng sinh viên khai báo trong self-report] | [hash] | [file path] | ✅ Đủ / ⚠️ Một phần / ❌ Không có |

**Khó khăn khai báo (từ self-report):**
- Task 1: [khó khăn sinh viên khai báo, hoặc "Không đề cập"]
- Task 2: [khó khăn sinh viên khai báo, hoặc "Không đề cập"]
- Task 3: [khó khăn sinh viên khai báo, hoặc "Không đề cập"]
- Task 4: [khó khăn sinh viên khai báo, hoặc "Không đề cập"]
- Task 5: [khó khăn sinh viên khai báo, hoặc "Không đề cập"]

**Nhận xét khó khăn:** [Khó khăn khai báo có hợp lý với commit/code thực tế không? Hay quá chung chung / không gắn với việc họ thực sự làm?]

**Code thực sự tìm thấy (bằng chứng source code):**
- [file path 1] — [tính năng / đoạn code liên quan đến công việc khai báo]
- [file path 2] — [mô tả]

**Khai báo AI usage:** [Có / Không / Không rõ] — [liệt kê tính năng được khai báo dùng AI nếu có]

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

> Câu hỏi tập trung vào mức độ hiểu của sinh viên về vấn đề cần giải quyết và lý do chọn giải pháp đó, không phải kiểm tra cú pháp hay lý thuyết.

**Câu 1:**
- **Câu hỏi:** [hỏi về vấn đề mà tính năng họ làm giải quyết — VD: "Tính năng X giúp người dùng làm gì? Nếu không có nó thì sao?"]
- **Mục đích:** kiểm tra sinh viên hiểu giá trị của tính năng mình làm
- **Dấu hiệu hiểu:** [những gì cần có trong câu trả lời]
- **Dấu hiệu không hiểu:** [dấu hiệu trả lời chỉ thuộc bài, không có sự liên hệ với project thực tế]

**Câu 2:**
- **Câu hỏi:** [hỏi về lý do chọn giải pháp — VD: "Tại sao team dùng Y cho vấn đề này? Có cách nào khác không và tại sao không chọn?"]
- **Mục đích:** kiểm tra sinh viên hiểu trade-off và lý do quyết định
- **Dấu hiệu hiểu:** [những gì cần có]
- **Dấu hiệu không hiểu:** [dấu hiệu trả lời chung chung, không gắn với context của project]

**Câu 3:**
- **Câu hỏi:** [hỏi về quá trình làm và điều họ rút ra — VD: "Phần này khó nhất ở điểm nào? Em xử lý như thế nào?" hoặc "Nếu làm lại em đổi gì?"]
- **Mục đích:** kiểm tra sinh viên có thực sự trải qua quá trình làm hay không
- **Dấu hiệu hiểu:** [kể được khó khăn cụ thể, gắn với code thực tế]
- **Dấu hiệu không hiểu:** [khó khăn quá chung chung hoặc không liên quan đến tính năng họ làm]

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

## PHẦN 7: TỔNG HỢP AI USAGE

| Thành viên | Khai báo dùng AI | Tính năng AI-assisted | Code tìm thấy | Đánh giá hiểu biết |
|---|---|---|---|---|
| [tên] | Có / Không | [danh sách] | ✅/❌ | Cần kiểm tra qua PV |

**Lưu ý:** Dùng AI là được phép. Cột "Đánh giá hiểu biết" sẽ được xác nhận qua phỏng vấn trực tiếp.

---

*Báo cáo tạo bởi /grade-project — Web Design & Development Course*
```

---

Sau khi viết file xong, thông báo cho người dùng biết:
- Đường dẫn file báo cáo: `grading/<repo-name>/GRADE_REPORT.md`
- Tóm tắt nhanh điểm nhóm và các sinh viên có hệ số đáng chú ý
