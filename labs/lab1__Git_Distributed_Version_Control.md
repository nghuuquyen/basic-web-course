# Lab 1 — Git: Quản Lý Source Code

Bạn đã bao giờ lỡ tay xoá một file quan trọng, hoặc muốn quay lại bản code trước khi sửa một tính năng nhưng không biết làm sao? Version control giải quyết đúng vấn đề đó. Git là tool mà mọi developer ngày nay đều phải biết — không phải "nên biết", mà là **phải biết**.

---

## Mục Lục

1. [Git là gì?](#1-git-là-gì)
2. [Các lệnh cơ bản](#2-các-lệnh-cơ-bản)
3. [Nhánh (Branches)](#3-nhánh-branches)
4. [Merge và Rebase](#4-merge-và-rebase)
5. [Xử lý conflict](#5-xử-lý-conflict)
6. [Làm việc với Remote Repository](#6-làm-việc-với-remote-repository)
7. [Gitflow và GitHub Flow](#7-gitflow-và-github-flow)
8. [Best Practices](#8-best-practices)
9. [Thực hành](#9-thực-hành)

---

## 1. Git là gì?

### Tại sao cần version control?

Hãy tưởng tượng bạn đang code một tính năng, sửa được 50% thì phát hiện hướng đi sai. Hoặc đồng nghiệp commit code lên và overwrite mất công việc của bạn. Hoặc client hỏi "bản tháng trước có gì khác bản hiện tại?"

Không có version control, những tình huống này đều là thảm hoạ.

Version control hệ thống hóa việc theo dõi thay đổi trong code, cho phép:
- **Quay lại** bất kỳ phiên bản nào trong lịch sử
- **Làm việc song song** mà không ảnh hưởng nhau
- **Xem ai đã thay đổi gì** và khi nào
- **Merge** nhiều luồng phát triển lại với nhau

### Centralized vs Distributed

Có hai loại VCS:

- **Centralized** (CVS, SVN): Tất cả lịch sử nằm trên một server trung tâm. Mất kết nối → không làm được gì.
- **Distributed** (Git): Mỗi developer có một bản sao đầy đủ của repository. Làm việc offline hoàn toàn được, rồi sync sau.

Git là distributed VCS phổ biến nhất hiện nay. GitHub, GitLab, Bitbucket là các dịch vụ lưu trữ remote repository — chúng không phải là Git, chỉ là nơi để đặt Git repo của bạn trên cloud.

---

## 2. Các Lệnh Cơ Bản

### Khởi tạo repository

Mỗi project cần một repo riêng. Vào thư mục project và chạy:

```bash
git init
```

Lệnh này tạo một thư mục ẩn `.git/` bên trong — đây là nơi Git lưu toàn bộ lịch sử. Đừng xoá hay chỉnh sửa thư mục này.

### Ba trạng thái của file trong Git

Đây là khái niệm quan trọng nhất khi bắt đầu học Git:

```
Working Directory  →  Staging Area (Index)  →  Repository
(bạn chỉnh sửa)       (git add)                 (git commit)
```

- **Working Directory**: Nơi bạn đang làm việc, chỉnh sửa file
- **Staging Area**: "Sân đợi" — những thay đổi đã chọn để đưa vào commit tiếp theo
- **Repository**: Lịch sử vĩnh viễn

### Thêm file vào staging

```bash
git add <tên-file>      # Thêm một file cụ thể
git add .               # Thêm tất cả thay đổi trong thư mục hiện tại
```

`git add` không lưu vào repo — nó chỉ nói "tôi muốn đưa thay đổi này vào commit tiếp theo".

### Commit

```bash
git commit -m "Mô tả thay đổi"
```

Commit là một "checkpoint" — một bản snapshot của toàn bộ project tại thời điểm đó. Mỗi commit có một hash duy nhất (ví dụ `a3f2b1c`) để có thể tham chiếu về sau.

> **Atomic commit**: Mỗi commit nên làm đúng một việc. Không commit nửa tính năng này nửa tính năng kia cùng một lúc — về sau debug sẽ rất khó.

### Xem trạng thái và lịch sử

```bash
git status              # Xem file nào đã thay đổi, cái nào đã staged
git log                 # Xem lịch sử commit
git log --oneline       # Xem lịch sử gọn hơn
git log --graph         # Xem lịch sử dạng cây nhánh
git diff <tên-file>     # Xem thay đổi cụ thể trong file
```

---

## 3. Nhánh (Branches)

### Tại sao cần nhánh?

Giả sử bạn đang phát triển tính năng mới, nhưng đột ngột cần sửa bug khẩn cấp trên production. Nếu không có nhánh, bạn phải commit code dở dang, sửa bug, rồi tiếp tục — lịch sử commit sẽ lộn xộn.

Với nhánh, bạn chuyển sang nhánh `hotfix`, sửa bug, merge về `main`, rồi quay về tiếp tục tính năng — hoàn toàn độc lập.

### Tạo và chuyển nhánh

```bash
git branch <tên-nhánh>          # Tạo nhánh mới
git checkout <tên-nhánh>        # Chuyển sang nhánh
git checkout -b <tên-nhánh>     # Tạo và chuyển luôn (cú pháp nhanh hơn)
git branch                      # Liệt kê tất cả nhánh
```

### Quay lại phiên bản cũ

```bash
git checkout *                  # Hủy tất cả thay đổi chưa commit
git checkout <tên-file>         # Hủy thay đổi của một file cụ thể
git checkout <hash> <tên-file>  # Khôi phục file về một commit cụ thể
```

Dùng `git log` để tìm hash của commit bạn muốn quay về.

### HEAD detached state

Khi bạn `checkout` một commit cụ thể (thay vì một nhánh), Git đặt bạn vào trạng thái **HEAD detached** — HEAD không trỏ vào nhánh nào, mà trỏ thẳng vào commit đó.

Bạn có thể xem code ở trạng thái này, nhưng nếu commit mới thì commit đó sẽ không thuộc nhánh nào cả. Để thoát an toàn, checkout về một nhánh thực sự:

```bash
git checkout main
```

> **Lưu ý**: Nếu bạn tạo commit trong trạng thái detached HEAD và sau đó checkout sang nhánh khác mà không lưu lại, những commit đó có thể bị "mất" (garbage collected) sau một thời gian.

---

## 4. Merge và Rebase

Sau khi làm xong tính năng trên nhánh riêng, bạn cần đưa code trở lại nhánh chính. Có hai cách: **merge** và **rebase**.

### Git Merge

```bash
git checkout main
git merge <tên-nhánh-tính-năng>
```

Merge tạo ra một **commit mới** ("merge commit") kết hợp lịch sử của cả hai nhánh. Lịch sử được bảo toàn hoàn toàn.

```
Before:         After merge:
A---B---C       A---B---C---G  (main)
     \               \   /
      D---E---F        D---E---F  (feature)
```

- Ưu điểm: Lịch sử chân thực, không phá huỷ gì cả
- Nhược điểm: Lịch sử có thể rối khi nhiều nhánh

### Git Rebase

```bash
git checkout feature
git rebase main
```

Rebase "di chuyển" toàn bộ lịch sử của nhánh feature lên đầu nhánh main, tạo ra commit mới cho mỗi commit cũ.

```
Before:         After rebase:
A---B---C       A---B---C---D'---E'---F'  (feature)
     \
      D---E---F  (feature)
```

- Ưu điểm: Lịch sử tuyến tính, sạch sẽ
- Nhược điểm: Thay đổi lịch sử

> **Quy tắc vàng của rebase**: **Không bao giờ rebase trên nhánh public/shared**. Nếu đồng nghiệp đã pull code từ nhánh đó, rebase sẽ gây conflict lịch sử cho họ. Rebase chỉ dùng cho nhánh cá nhân chưa push lên remote, hoặc đã thỏa thuận với team.

---

## 5. Xử Lý Conflict

Conflict xảy ra khi hai người cùng chỉnh sửa cùng một đoạn code trên hai nhánh khác nhau. Git không biết nên giữ cái nào, nên nó đánh dấu và để bạn quyết định.

File bị conflict trông như thế này:

```
<<<<<<< HEAD
const message = "Hello from main branch";
=======
const message = "Hello from feature branch";
>>>>>>> feature
```

Bạn phải:
1. Mở file và chọn giữ phần nào (hoặc kết hợp cả hai)
2. Xoá các dòng `<<<<<<<`, `=======`, `>>>>>>>`
3. `git add <file>` để đánh dấu conflict đã được giải quyết
4. `git commit` để hoàn thành merge

---

## 6. Làm Việc Với Remote Repository

### Kết nối với remote

```bash
git remote add origin <url>     # Thêm remote repository (chỉ làm một lần)
git remote -v                   # Xem danh sách remote
```

"origin" là shortname mặc định cho remote chính — bạn có thể đặt tên khác, nhưng convention là "origin".

### Push, Pull, Clone, Fork

```bash
git push origin <tên-nhánh>     # Đưa code lên remote
git pull                        # Tải code mới nhất về và merge
git fetch                       # Tải code mới về nhưng KHÔNG merge
git clone <url>                 # Sao chép toàn bộ repo về máy
```

Sự khác biệt giữa `pull` và `fetch`: `fetch` tải về nhưng không áp dụng — bạn kiểm tra rồi mới quyết định merge. `pull` = `fetch` + `merge` luôn.

**Fork** là sao chép một remote repo sang remote repo khác (trên GitHub/GitLab). Thường dùng khi muốn đóng góp vào open source — bạn fork về repo của mình, làm thay đổi, rồi tạo Pull Request về repo gốc.

### Khi push bị rejected

Nếu người khác đã push lên trước bạn:

```bash
git pull           # Tải về và merge
# Giải quyết conflict nếu có
git push origin main
```

---

## 7. Gitflow và GitHub Flow

Hai chiến lược branching phổ biến nhất. Chọn cái nào tuỳ vào nhịp độ release của team.

### Gitflow — Cho sản phẩm có versioned releases

Gitflow sử dụng 5 loại nhánh:

| Nhánh | Vai trò |
|---|---|
| `main` | Code production ổn định, mỗi commit là một release |
| `develop` | Tích hợp các tính năng đang phát triển |
| `feature/*` | Phát triển từng tính năng riêng |
| `release/*` | Chuẩn bị cho một lần release |
| `hotfix/*` | Sửa bug khẩn cấp trực tiếp từ main |

```
main ────────────────────────────○ v1.0
        ↑                        ↑
develop ──────────────────────────
          ↓           ↑
feature/login ────────
```

Quy trình điển hình:

```bash
# Bắt đầu tính năng mới
git checkout develop
git checkout -b feature/ten-tinh-nang

# Hoàn thành, merge về develop
git checkout develop
git merge feature/ten-tinh-nang

# Chuẩn bị release
git checkout develop
git checkout -b release/1.0.0

# Release xong
git checkout main
git merge release/1.0.0
git tag 1.0.0
git checkout develop
git merge release/1.0.0
```

**Khi có bug production:**

```bash
git checkout main
git checkout -b hotfix/sua-bug

# Sửa xong
git checkout main
git merge hotfix/sua-bug
git checkout develop
git merge hotfix/sua-bug
git branch -D hotfix/sua-bug
```

> Gitflow phù hợp với: Phần mềm desktop, mobile app, sản phẩm có release cycle rõ ràng (theo tháng, theo quý). Không phù hợp cho web app deploy liên tục.

### GitHub Flow — Cho web app deploy liên tục

Đơn giản hơn nhiều: chỉ có `main` và feature branches.

```
main ──────────────────────────────
         ↓             ↑
feature/ten ──── PR ───
```

Quy trình:
1. Tạo nhánh từ `main`
2. Commit và push thường xuyên
3. Tạo **Pull Request** khi muốn merge
4. Review code, thảo luận
5. Merge và deploy

> GitHub Flow phù hợp với: Web app, startup, team nhỏ deploy nhiều lần trong ngày. Đơn giản, nhanh, ít overhead hơn Gitflow.

**Chọn cái nào?** Không có câu trả lời đúng tuyệt đối. Financial institution, bank, phần mềm y tế → Gitflow (cần kiểm soát chặt). Web startup, SaaS → GitHub Flow (cần tốc độ).

---

## 8. Best Practices

### 1. Mỗi tính năng một nhánh

Đừng làm mọi thứ trên `main`. Nhánh cách ly công việc, giúp review dễ hơn và rollback nếu cần.

### 2. Giữ nhánh ngắn và cập nhật thường xuyên

Nhánh sống lâu → dễ conflict. Rebase thường xuyên lên nhánh gốc để không bị lạc hậu quá nhiều.

### 3. Commit nhỏ, message rõ ràng

Commit message tốt: `Fix: prevent duplicate email on signup`  
Commit message tệ: `fix bug`, `wip`, `update`

Format phổ biến:
```
<loại>: <mô tả ngắn>

<chi tiết nếu cần>

<link issue nếu có>
```

Loại: `feat` (tính năng mới), `fix` (sửa bug), `refactor`, `docs`, `style`, `test`

Ví dụ tốt:
```
feat: add forgot password flow

- Added POST /api/auth/reset-password endpoint
- Sends reset email via Resend
- Token expires in 1 hour

Closes #42
```

### 4. Không commit lên public/shared branch bằng force push

```bash
# Nguy hiểm nếu người khác đã pull nhánh này
git push --force origin main   # ← ĐỪNG LÀM
```

Nếu cần undo commit đã push, dùng `git revert` thay vì `reset` + `force push`:

```bash
git revert <hash>   # Tạo commit mới "undoes" commit cũ, an toàn hơn
```

### 5. Dùng `.gitignore`

Không commit những thứ không cần vào repo:

```
node_modules/      # Dependencies (quá nặng, tạo lại được)
.env               # Biến môi trường (chứa secrets!)
.DS_Store          # File hệ thống macOS
dist/              # Build output (tạo lại được)
*.log              # Log files
```

GitHub có sẵn template `.gitignore` cho từng ngôn ngữ/framework. Tạo project mới → chọn template ngay từ đầu.

### 6. Không commit code broken

Đồng nghiệp pull về, build fail → chặn cả team. Nếu code đang làm dở và cần "dọn dẹp" working directory:

```bash
git stash          # Tạm cất thay đổi chưa xong
git stash pop      # Lấy lại sau
```

Stash là "ngăn kéo tạm" — tốt hơn commit code dở dang lên repo.

### 7. Đừng commit secrets

Một khi `.env` với API key đã được push lên GitHub public, dù bạn xoá đi sau đó, key đó cần được coi là **đã bị lộ** và phải thay mới. Git lưu toàn bộ lịch sử — xoá commit không đơn giản và không đáng tin cậy.

---

## 9. Thực Hành

### Bài tập GitHub Flow

Mục tiêu: Thực hành toàn bộ vòng lặp của GitHub Flow — tạo issue, tạo nhánh, commit, tạo PR, giải quyết conflict.

**Bước 1: Fork và clone**

1. Fork repository được hướng dẫn về GitHub account của bạn
2. Clone về máy: `git clone <url-repo-của-bạn>`
3. Kiểm tra remote: `git remote -v`

**Bước 2: Tạo 3 issues trên GitHub**

Mỗi issue mô tả một task nhỏ (ví dụ: "Add header component", "Add footer component", "Add about page").

**Bước 3: Làm 3 Pull Requests**

Mỗi PR tương ứng với một issue. Tên nhánh có chứa issue number: `feature/#1-add-header`.

**PR #1**: Merge thẳng, không conflict — luyện quy trình cơ bản.

**PR #2**: Trước khi merge, rebase nhánh của bạn lên `main` mới nhất:
```bash
git checkout main
git pull
git checkout feature/#2-add-footer
git rebase main
git push --force-with-lease origin feature/#2-add-footer
```

**PR #3**: Cố tình tạo conflict với PR #1 hoặc #2 (chỉnh sửa cùng một file), rồi resolve conflict trước khi merge.

> **`--force-with-lease` thay vì `--force`**: Safer — từ chối nếu có người khác đã push lên nhánh đó sau lần push của bạn. Luôn dùng cái này thay vì `--force` khi cần force push.
