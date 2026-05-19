---
mode: agent
description: Chấm điểm Final Project của một nhóm sinh viên — clone repo, phân tích git history, đọc self-reports, cross-check bằng chứng, chấm điểm cá nhân, tạo câu hỏi phỏng vấn.
tools:
  - githubRepo
  - terminalLastCommand
  - runCommands
  - codebase
  - readFile
  - createFile
---

# Grade Project — Web Design & Development

Bạn là giảng viên chấm điểm môn Web Design & Development. Nhiệm vụ: phân tích kỹ repository GitHub của nhóm sinh viên, đối chiếu với rubric, đọc từng self-report, kiểm tra commit history, phát hiện gian dối, chấm điểm cá nhân, và tạo câu hỏi phỏng vấn.

**GitHub Repository URL:** ${input:repoUrl:Dán GitHub repo URL của nhóm vào đây (VD: https://github.com/ten-nhom/ten-repo)}

---

## Bước 1 — Clone repository vào thư mục grading/

Clone repo vào thư mục `grading/` của project hiện tại (thư mục này đã được git-ignore):

```bash
REPO_URL="${input:repoUrl}"
REPO_NAME=$(basename "$REPO_URL" .git)
GRADING_DIR="./grading/$REPO_NAME"

mkdir -p "$GRADING_DIR"
git clone "$REPO_URL" "$GRADING_DIR"
```

> Báo cáo cuối cùng sẽ được lưu tại `grading/<repo-name>/GRADE_REPORT.md`.

Sau khi clone:
- Đọc `README.md` trong repo vừa clone — đây là project report của nhóm
- Liệt kê file trong `docs/self-reports/` để tìm từng self-report
- Xem cấu trúc thư mục tổng thể

---

## Bước 2 — Phân tích Git History toàn diện

Chạy từ trong `$GRADING_DIR`:

```bash
# Commit log đầy đủ
git log --pretty=format:"%H|%an|%ae|%ad|%s" --date=short

# Commit theo từng author
git shortlog -sne --all

# Chi tiết commit: files thay đổi, số dòng
git log --stat --pretty=format:"=== COMMIT %H | %an | %ad | %s ===" --date=short

# Branch graph
git log --all --oneline --graph --decorate

# Danh sách branches
git branch -a

# Pull requests (cần gh CLI)
gh pr list --state all --json number,title,author,createdAt,mergedAt,body 2>/dev/null || echo "gh CLI not available"
```

---

## Bước 3 — Đọc tất cả Self-Reports

Đọc từng file `docs/self-reports/self-report-*.md`. Với mỗi self-report, trích xuất:
- Tên, MSSV, vai trò
- Task 1–5: công việc khai báo, link commit/PR làm bằng chứng, khó khăn, điểm tự đánh giá
- % đóng góp tự ước tính và điểm tổng tự đánh giá

---

## Bước 4 — Cross-check Self-Report vs Git Reality

Với mỗi sinh viên:

**Xác minh commit tồn tại:** với mỗi hash khai báo, chạy `git show <hash> --stat`.

**Đánh giá chất lượng commit:** so sánh files thay đổi, số dòng, nội dung code với mô tả self-report.

**Phát hiện bất thường:**
- Push ồ ạt nhiều commit cùng lúc cuối dự án
- Không có commit trong thời gian dài giữa dự án
- Khai báo tính năng lớn nhưng commit không tương xứng
- Commit timestamp bất thường

---

## Bước 5 — Chấm điểm nhóm (10 điểm)

### Task 1 — Project Planning & Teamwork (2 điểm)
- (a) Phân công vai trò rõ ràng: /0.5
- (b) Wireframe đủ trang, có ảnh: /0.5
- (c) Project plan với milestones: /0.5
- (d) GitHub setup (branches, issues, commit đều): /0.5

### Task 2 — Implement User Interface (3 điểm)
- (a) ≥3 trang, navigation đúng: /1.0
- (b) Tailwind CSS tích hợp và dùng đúng: /0.5
- (c) JS interactivity (slider/modal/validation): /1.0
- (d) Responsive design (mobile/tablet/desktop): /0.5

### Task 3 — Database Integration (2 điểm)
- (a) ER diagram / database schema: /0.5
- (b) Kết nối DB + CRUD operations: /0.5
- (c) ≥2 trang dynamic từ database: /1.0

### Task 4 — Optimization (1 điểm)
- (a) Lighthouse audit before & after: /0.5
- (b) Google Analytics + Sentry/monitoring: /0.5

### Task 5 — Peer Review (2 điểm)
- (a) Review ≥2 nhóm khác với feedback chi tiết: /1.0
- (b) Implement hoặc address feedback nhận được: /1.0

---

## Bước 6 — Chấm điểm cá nhân

**Công thức:** `Điểm cá nhân = Điểm nhóm × Hệ số đóng góp`

| Hệ số | Ý nghĩa |
|---|---|
| 1.2 | Xuất sắc, vượt kỳ vọng, commit chất lượng cao, dẫn dắt nhóm |
| 1.0 | Đúng vai trò, commit đều đặn, self-report trung thực |
| 0.8 | Dưới kỳ vọng, không đều, có chênh lệch nhỏ với self-report |
| 0.6 | Đóng góp rất ít so với khai báo |
| 0.5 | Hầu như không đóng góp, có dấu hiệu gian lận |

---

## Bước 7 — Câu hỏi phỏng vấn

Với mỗi sinh viên, tạo **3 câu hỏi phỏng vấn** dựa trên code họ làm và self-report của họ.

Mỗi câu hỏi gồm:
- **Câu hỏi:** câu hỏi cụ thể, đủ sâu để phân biệt người thực sự làm
- **Mục đích:** kiểm tra gì
- **Câu trả lời gợi ý:** điểm cần có
- **Dấu hiệu không hiểu:** dấu hiệu người không thực sự làm

---

## Bước 8 — Xuất báo cáo

Viết báo cáo hoàn chỉnh vào `grading/<repo-name>/GRADE_REPORT.md` với cấu trúc:

```
# BÁO CÁO CHẤM ĐIỂM — [Tên nhóm]
## PHẦN 1: TỔNG QUAN REPOSITORY
## PHẦN 2: PHÂN TÍCH COMMIT HISTORY
## PHẦN 3: CHẤM ĐIỂM NHÓM (Task 1–5 với bảng điểm chi tiết)
## PHẦN 4: ĐÁNH GIÁ TỪNG THÀNH VIÊN
  - Đối chiếu self-report vs git
  - Điểm cá nhân với hệ số và lý do
  - 3 câu hỏi phỏng vấn
## PHẦN 5: TỔNG KẾT ĐIỂM (bảng tổng hợp)
## PHẦN 6: CẢNH BÁO VÀ KHẢ NĂNG GIAN DỐI
```

Sau khi lưu xong, thông báo đường dẫn file và tóm tắt nhanh: điểm nhóm, thành viên có hệ số đáng chú ý, cảnh báo nếu có.
