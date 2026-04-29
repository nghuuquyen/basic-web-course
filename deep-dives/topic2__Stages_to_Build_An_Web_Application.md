# Topic 2 — Các Giai Đoạn Xây Dựng Ứng Dụng Web

---

## Phần 1 — Nền Tảng: 6 Giai Đoạn Phát Triển Web

---

### Tổng Quan

Một ứng dụng web được xây dựng chuyên nghiệp đi qua 6 giai đoạn:

```
[1] Thu thập yêu cầu  →  [2] Lên kế hoạch  →  [3] Thiết kế
                                                      ↓
[6] Bảo trì          ←  [5] Test & Ra mắt  ←  [4] Lập trình
```

Mỗi giai đoạn có một mục đích rõ ràng và có *output cụ thể* cần đạt được trước khi sang giai đoạn tiếp theo. Vấn đề phát hiện càng muộn thì càng tốn kém để sửa — sửa lỗi trong requirements mất 1 giờ, sửa cùng lỗi đó sau khi đã code có thể mất vài ngày.

---

### Giai Đoạn 1 — Thu Thập Yêu Cầu (Requirements)

**Mục tiêu:** Hiểu rõ bạn cần build *cái gì* và *cho ai* trước khi làm bất cứ điều gì.

Yêu cầu chia làm hai loại:

**Functional requirements** — hệ thống làm được gì:
> "User có thể đặt hàng online", "Admin có thể cập nhật menu", "Khách nhận email xác nhận sau khi đặt hàng"

**Non-functional requirements** — hệ thống hoạt động như thế nào:
> "Trang load trong vòng 3 giây", "Hoạt động trên mobile", "Uptime 99.9%", "Tuân thủ GDPR"

Ngoài tính năng, cần xác định rõ:
- **Target audience** — 20 nhân viên nội bộ hay 1 triệu khách hàng? Người dùng quen công nghệ hay không? Dùng thiết bị gì? Câu trả lời ảnh hưởng đến mọi quyết định từ UI đến infrastructure.
- **Constraints** — Deadline? Budget? Tech stack bắt buộc? Quy định pháp lý phải tuân thủ?

**Output của giai đoạn này:** Tài liệu mô tả yêu cầu (dù đơn giản hay chi tiết), được cả hai bên xác nhận bằng văn bản.

---

### Giai Đoạn 2 — Lên Kế Hoạch (Planning)

**Mục tiêu:** Xác định *cách làm* — tech stack, cấu trúc ứng dụng, timeline, và ai làm gì.

Giai đoạn này bao gồm:

**Thiết kế kiến trúc** — Frontend/backend tách riêng hay monolithic? SSR hay CSR? Database loại gì? Quyết định ở đây ảnh hưởng đến toàn bộ quá trình phát triển.

**Sitemap** — Sơ đồ các trang và cách chúng liên kết. Giúp mọi người có cùng hiểu biết về cấu trúc ứng dụng trước khi design.

**Ước tính thời gian và chi phí (Estimation)** — Chia nhỏ công việc, ước tính từng phần, cộng buffer cho những điều không dự đoán được. Đây là kỹ năng quan trọng — ước tính quá thấp dẫn đến làm thêm không công, ước tính quá cao mất hợp đồng.

**Output của giai đoạn này:** Sitemap, tech stack đã chọn, timeline, hợp đồng hoặc thỏa thuận bằng văn bản.

---

### Giai Đoạn 3 — Thiết Kế (Design)

**Mục tiêu:** Tạo ra bản thiết kế được client duyệt *trước khi* bắt đầu code.

Quy trình thiết kế thường đi theo thứ tự:

**Wireframe** — Bản phác thảo đen trắng, chỉ thể hiện cấu trúc layout. Không cần đẹp, chỉ cần đúng về mặt tổ chức nội dung. Mục đích là thống nhất với client về *cái gì ở đâu* trước khi đầu tư thời gian vào visual.

**Mockup** — Wireframe được đưa vào thực tế với màu sắc, font, ảnh thật. Trông gần giống website thực sự.

**Prototype** — Mockup có thể click được, mô phỏng tương tác. Dùng để user test trước khi code.

Ngoài UI/UX, giai đoạn này cũng thiết kế **database schema** — cấu trúc dữ liệu với các bảng và mối quan hệ. Sai ở bước này sẽ rất đau sau — migration database khi đang production là cực kỳ rủi ro.

**Output của giai đoạn này:** Mockup hoàn chỉnh, database schema, được client xác nhận bằng văn bản.

---

### Giai Đoạn 4 — Lập Trình (Development)

**Mục tiêu:** Hiện thực hóa design thành ứng dụng chạy được, với code chất lượng cao có thể maintain được.

Các hoạt động chính:

- **Setup môi trường** — repository, CI/CD, linting, code formatting. Đầu tư vài giờ ban đầu tiết kiệm nhiều giờ về sau.
- **Frontend** — Build UI theo design, routing, state management.
- **Backend** — APIs, business logic, authentication, data validation.
- **Database** — Implement schema, queries, indexes, migrations.
- **Integration** — Kết nối frontend/backend, tích hợp third-party services.
- **Code review** — Mọi code trước khi merge nên được review. Bắt bugs sớm, chia sẻ kiến thức.
- **Unit testing** — Test cho business logic quan trọng. Tests là "lưới an toàn" khi refactor.

**Output của giai đoạn này:** Source code, các trang và APIs hoạt động được, preview link để client theo dõi tiến độ.

---

### Giai Đoạn 5 — Kiểm Thử và Ra Mắt (Testing & Launch)

**Mục tiêu:** Đảm bảo ứng dụng hoạt động đúng, nhanh, và an toàn — rồi đưa lên production.

Các loại testing cần thực hiện:

| Loại test | Kiểm tra gì |
|---|---|
| Functional testing | Từng tính năng có hoạt động đúng không? |
| Cross-browser/device | Trên Chrome, Firefox, Safari, mobile... |
| Performance testing | Trang load bao lâu? Chịu được bao nhiêu user? |
| Security testing | SQL injection, XSS, authentication bypass? |
| UAT (User Acceptance Testing) | User thực tế test theo real-world scenarios |

**UAT** là bước quan trọng nhất — client tự tay test, xác nhận rằng ứng dụng không chỉ "chạy về mặt kỹ thuật" mà còn "đáp ứng đúng nhu cầu của họ".

**Output của giai đoạn này:** Bug report đã fix, UAT được sign-off, ứng dụng live trên production.

---

### Giai Đoạn 6 — Bảo Trì (Maintenance)

**Mục tiêu:** Đảm bảo ứng dụng tiếp tục hoạt động ổn định, bảo mật, và phát triển theo nhu cầu.

Launch không phải kết thúc — thực ra là bắt đầu. Sau khi ra mắt:

- **Bug fixes** — User sẽ tìm ra những bugs testing không bắt được
- **Security updates** — Dependencies có lỗ hổng mới, cần cập nhật
- **Feature updates** — Cải tiến dựa trên feedback người dùng
- **Monitoring** — Theo dõi performance, error rate, uptime
- **Backup** — Database backup định kỳ, test restore process

> App thành công không bao giờ "xong". Instagram, Shopify hay bất kỳ product nào bạn dùng hàng ngày đều có team engineering làm việc trên nó mỗi ngày.

**Output của giai đoạn này:** Maintenance log, update notes, enhancement roadmap.

---
---

## Phần 2 — Thực Tế: Từ Tin Nhắn Đến Bàn Giao

Đủ lý thuyết. Bây giờ nhìn vào thực tế.

Bạn vừa nhận được tin nhắn từ người quen: *"Bạn ơi, mình có tiệm bánh nhỏ, muốn làm website để nhận đơn online, bạn giúp mình được không? Mình trả phí nhé."*

Bạn biết làm web. Nhưng bạn bắt đầu từ đâu? Hỏi gì? Làm gì trước? Ước tính bao nhiêu tiền? Nếu họ thấy giá cao quá thì sao?

---

### Bước 1 — Buổi Gặp Đầu Tiên

Sắp xếp gặp mặt hoặc gọi video call. Đây là cuộc trò chuyện quan trọng nhất — nếu bạn hiểu sai ở đây, mọi thứ sau đều sai theo.

**Về mục tiêu thực sự:**

> "Anh/chị muốn website để làm gì chính? Để khách biết mình tồn tại, hay để nhận đơn đặt bánh online, hay cả hai?"
>
> "Nếu có website, anh/chị kỳ vọng điều gì thay đổi trong 3 tháng đầu?"

Câu hỏi thứ hai quan trọng — nó giúp bạn hiểu *định nghĩa thành công* của họ là gì. Đôi khi client nói "muốn website" nhưng thực ra chỉ cần một trang Google My Business được setup đúng.

**Về nội dung:**

> "Tiệm có bao nhiêu loại bánh? Ảnh chụp chưa, hay cần thuê photographer?"
>
> "Nội dung text — mô tả, câu chuyện tiệm — ai viết? Mình hỗ trợ được hay anh/chị tự viết?"

**Về tính năng:**

> "Khách đặt online muốn thanh toán qua ví hay tiền mặt khi nhận?"
>
> "Cần quản lý đơn hàng không? Hay nhận thông báo qua Zalo là đủ?"
>
> "Sau này anh/chị có tự cập nhật menu được không, hay cần nhờ mình?"

Câu cuối quyết định tech stack: nếu client cần tự cập nhật → cần CMS. Nếu không → static site là đủ.

**Về thực tế:**

> "Deadline ra mắt là khi nào? Có event hay dịp đặc biệt không?"
>
> "Budget khoảng bao nhiêu?"

Đừng ngại hỏi về budget sớm. Biết budget giúp bạn đề xuất giải pháp phù hợp ngay từ đầu.

---

### Bước 2 — Ước Tính (Estimation)

Sau buổi gặp, bạn cần estimate thời gian để biết báo giá bao nhiêu. Đây là kỹ năng nhiều developer mới yếu — ước tính quá thấp dẫn đến làm thêm không công, ước tính quá cao mất hợp đồng.

**Cách ước tính theo công việc:**

Chia nhỏ project thành từng task, ước tính giờ cho mỗi task, cộng lại:

| Hạng mục | Ước tính |
|---|---|
| Gặp, thu thập yêu cầu, planning | 4 giờ |
| Wireframe + mockup (5 trang) | 8 giờ |
| Client review & chỉnh sửa design | 4 giờ |
| Setup project, cấu hình | 2 giờ |
| Code trang chủ | 4 giờ |
| Code trang Menu (grid + detail) | 6 giờ |
| Code form đặt hàng + Zalo notification | 6 giờ |
| Code trang Về chúng tôi + Liên hệ | 4 giờ |
| Responsive + cross-browser test | 4 giờ |
| Fix bugs sau UAT | 4 giờ |
| Deploy, setup domain, bàn giao | 2 giờ |
| **Tổng** | **~48 giờ** |

Bạn làm freelance bán thời gian, mỗi ngày làm được ~4 giờ → khoảng **12 ngày làm việc**.

**Buffer:** Luôn thêm 20-30% cho những điều không dự đoán được (client chậm feedback, yêu cầu thay đổi nhỏ, bug lạ, cuộc sống có chuyện...). 12 ngày → **báo client 15-16 ngày**.

**Tính giá:**

Giả sử rate của bạn là 200.000đ/giờ:

```
48 giờ × 200.000đ = 9.600.000đ
```

Bạn có thể báo thẳng theo giờ, hoặc báo giá trọn gói: *"Project này em báo 9-10 triệu trọn gói"*.

> Khi mới bắt đầu, rate thấp hơn thị trường là bình thường. Quan trọng hơn là estimate *số giờ* chính xác — đừng estimate thiếu rồi bán rẻ mà vẫn không đủ tiền.

---

### Kịch Bản: Estimate Cao Hơn Budget Của Client

Bạn báo 9 triệu. Client nói: *"Ôi, mình chỉ có khoảng 5 triệu thôi bạn ơi."*

Đây là tình huống cực kỳ phổ biến. Bạn có 3 lựa chọn:

**Option 1 — Giảm scope (được khuyến khích)**

Cùng ngồi lại xem có thể cắt tính năng nào để fit budget:

> "5 triệu thì mình làm được phần cơ bản: trang giới thiệu, menu bánh, và form liên hệ. Phần đặt hàng online với Zalo notification sẽ phức tạp hơn, mình tách ra làm phase 2 sau nếu tiệm muốn nâng cấp."

Cắt tính năng không phải thất bại — đây là cách làm thực tế. Nhiều startup thành công bắt đầu từ MVP đơn giản.

Sau khi cắt scope, estimate lại:

| Hạng mục (Scope rút gọn) | Ước tính |
|---|---|
| Planning + Design (3 trang) | 12 giờ |
| Code trang chủ + About + Contact | 10 giờ |
| Code trang Menu (static, không đặt online) | 5 giờ |
| Test + Deploy | 5 giờ |
| **Tổng** | **~32 giờ → ~6.4 triệu** |

Có thể thỏa thuận ở mức 6 triệu — trong budget của client, và bạn vẫn được trả đúng công sức.

**Option 2 — Giữ giá, giải thích giá trị**

Nếu bạn tự tin vào chất lượng công việc:

> "Em hiểu 9 triệu là nhiều với tiệm nhỏ. Nhưng website này sẽ giúp chị nhận đơn 24/7, không cần trả lời Zalo từng cái một — một tháng chỉ cần thêm 2-3 đơn là đã hoàn vốn. Em không thể làm thấp hơn vì muốn đảm bảo chất lượng tốt nhất cho chị."

Không phải lúc nào cũng thuyết phục được — nhưng đôi khi client cần nghe lý do cụ thể.

**Option 3 — Từ chối lịch sự**

Nếu khoảng cách quá lớn và không thể tìm được điểm chung:

> "Em rất muốn giúp chị, nhưng với budget này em không thể đảm bảo chất lượng như chị xứng đáng được. Nếu sau này ngân sách có thêm, mình liên hệ lại nhé."

Từ chối project không phù hợp là kỹ năng quan trọng. Nhận project dưới giá, rush, làm không tốt — ảnh hưởng đến reputation lâu dài hơn là mất một hợp đồng nhỏ.

---

### Bước 3 — Thỏa Thuận Bằng Văn Bản

Dù làm với bạn bè hay người quen, hãy xác nhận bằng văn bản những gì đã thống nhất. Không cần hợp đồng luật pháp phức tạp — một email là đủ:

```
Chào chị,

Cảm ơn chị đã tin tưởng. Em tóm tắt lại những gì mình thống nhất:

SCOPE:
- Trang chủ với ảnh và thông tin tiệm
- Menu bánh (khoảng 8-10 sản phẩm)
- Form đặt hàng gửi thông báo về Zalo
- Trang Về chúng tôi + Liên hệ + bản đồ

NỘI DUNG:
- Text: em viết mẫu, chị review và điều chỉnh
- Ảnh: chị cung cấp (ít nhất 1 ảnh mỗi sản phẩm)
- Logo + màu sắc thương hiệu: chị cung cấp

TIMELINE: Hoàn thành trong 16 ngày làm việc từ ngày chị xác nhận

PHÍ: 9.000.000đ
- 50% (4.500.000đ) thanh toán khi bắt đầu
- 50% (4.500.000đ) thanh toán khi bàn giao

REVISION: Bao gồm 2 vòng chỉnh sửa design. Yêu cầu thay đổi lớn sau khi đã duyệt design
sẽ tính thêm phí.

BẢO HÀNH: Lỗi kỹ thuật phát sinh trong 30 ngày đầu, em fix miễn phí.

Nếu đồng ý, chị reply xác nhận và chuyển khoản đợt 1 để em bắt đầu nhé.

Trân trọng,
[Tên bạn]
```

Tại sao 50/50? Khoản 50% trước đảm bảo bạn không làm không công nếu client "bỗng dưng mất tích". Khoản 50% sau đảm bảo client biết mình sẽ nhận đúng thứ đã thống nhất.

---

### Bước 4 — Thiết Kế

Đã nhận 50% trước, bắt đầu bằng design — không phải code.

**Wireframe trước:** Vẽ nhanh trên Figma (hoặc giấy) layout của các trang chính. Gửi cho client:

> "Chị xem cấu trúc layout như thế này được không? Em chưa làm màu sắc và ảnh thật, chỉ muốn confirm bố cục trước để tiết kiệm thời gian cho cả hai."

Sau khi client duyệt wireframe, mới làm mockup đầy đủ.

**Mockup → Approval:** Sau khi mockup xong, gửi và chờ xác nhận bằng văn bản (tin nhắn, email):

> "Chị thấy design này ổn chưa? Nếu ổn em bắt đầu code từ bản này nhé."

Tại sao quan trọng: Nếu sau khi code xong client nói *"anh nghĩ màu nền sẽ là vàng chứ không phải trắng"* — bạn có thể trả lời *"dạ, theo tin nhắn ngày [X] chị đã confirm design màu trắng, nếu muốn thay đổi mình tính thêm phí nhé."*

---

### Bước 5 — Code

Design được duyệt, giờ mới code.

Setup đúng cách ngay từ đầu:

```bash
npx create-next-app@latest tiem-banh --typescript --tailwind --app
cd tiem-banh
git init && git add . && git commit -m "Initial setup"
```

Tạo `.env.local` cho Zalo webhook URL, thêm vào `.gitignore`. Đừng bao giờ commit credentials.

**Demo sớm, demo thường:** Đừng biến mất 2 tuần rồi xuất hiện với bản hoàn chỉnh. Dùng Vercel — mỗi push lên GitHub là có preview URL. Gửi link cho client sau mỗi milestone:

> "Chị ơi, em vừa xong trang chủ và trang menu. Chị xem thử ở link này nhé: [preview URL]. Feedback gì cứ nhắn em."

Giao tiếp thường xuyên tránh surprises lúc bàn giao.

---

### Bước 6 — Kiểm Thử

Trước khi gửi link "xong rồi" cho client, tự test kỹ:

**Chức năng:**
- [ ] Form đặt hàng có gửi về Zalo không?
- [ ] Ảnh có hiển thị đúng không?
- [ ] Link điều hướng có đúng không?

**Responsive:**
- [ ] Chrome DevTools → test ở iPhone SE (375px), iPad (768px), Desktop (1280px)
- [ ] Text có bị overflow không? Button có đủ lớn để bấm trên mobile không?

**Trình duyệt:**
- [ ] Chrome, Firefox, Safari (quan trọng với người dùng iPhone)

**Performance:**
- [ ] Chạy Lighthouse (F12 → Lighthouse) — target 90+ cho Performance và SEO

Sau khi bạn tự test xong, gửi cho client test với kịch bản cụ thể:

```
Bước 1: Vào trang chủ → kiểm tra ảnh và thông tin tiệm có đúng không
Bước 2: Vào trang Menu → kiểm tra tên bánh và giá
Bước 3: Thử đặt 1 đơn → chị có nhận thông báo Zalo không?
Bước 4: Test trên điện thoại của chị
```

---

### Bước 7 — Bàn Giao và Thu Tiền

Client test xong, confirm ổn → deploy lên domain thật, thu 50% còn lại.

**Bàn giao đầy đủ:**
- [ ] Credentials: hosting account, domain login, Vercel account
- [ ] Source code trên GitHub (invite client làm collaborator nếu cần)
- [ ] Hướng dẫn ngắn cách cập nhật nội dung (nếu có CMS)
- [ ] Liên hệ của bạn cho khi cần hỗ trợ

**Nói rõ về bảo trì:**

> "Em đã bàn giao xong nhé. Nếu có lỗi kỹ thuật trong 30 ngày đầu em fix miễn phí. Từ tháng 2 trở đi, nếu cần cập nhật thêm gì, mình tính theo giờ hoặc ký gói hỗ trợ hàng tháng."

Nói rõ điều này tránh tình huống khó xử 6 tháng sau khi client nhắn *"bạn ơi thêm nhanh giúp mình cái này"* và bạn không biết phải trả lời sao.

---

### Kịch Bản Khác Hay Gặp

**Client chậm feedback, kéo dài timeline:**

> "Chị ơi, em cần feedback design trước thứ Sáu để giữ đúng timeline mình đã thống nhất. Nếu review muộn hơn, deadline hoàn thành sẽ bị đẩy lùi tương ứng nhé."

Đặt deadline rõ ràng cho *từng bước review*, không chỉ deadline cuối cùng.

**Client thêm yêu cầu giữa chừng ("scope creep"):**

> "Cái này hay đó chị, nhưng nằm ngoài scope ban đầu mình đã thống nhất. Em estimate thêm khoảng [X giờ / Y triệu] để làm thêm phần này. Chị muốn thêm vào không?"

Không nên nói không thẳng, nhưng cũng không nên nhận thêm việc miễn phí. Đặt giá trị cho thời gian của bạn.

**Client không hài lòng sau khi bàn giao:**

Trước tiên, kiểm tra xem vấn đề họ nêu có nằm trong scope đã thống nhất không:

- Nếu **có** (là bug hoặc thiếu tính năng đã agree) → sửa ngay, không cần tranh luận.
- Nếu **không** (là yêu cầu mới phát sinh) → giải thích lịch sự và báo giá thêm.

Đây là lúc email xác nhận lúc đầu phát huy tác dụng.

---

### Nhìn Lại: Tại Sao Cần Quy Trình?

Sau khi làm xong tiệm bánh, bạn sẽ thấy tại sao từng bước tồn tại:

| Giai đoạn | Nếu bỏ qua |
|---|---|
| Thu thập yêu cầu | Code xong rồi mới biết client muốn thứ khác |
| Lên kế hoạch & estimate | Không biết mình cần bao lâu, dễ bị thiệt |
| Wireframe trước khi code | Code xong bị yêu cầu đổi layout — mất ngày |
| Xác nhận bằng văn bản | *"Hồi đó anh có nói đâu"* |
| Test trước khi bàn giao | Bug trên production, mất uy tín |
| Nói rõ scope bảo trì | Làm thêm không công, quan hệ xấu đi |

Quy trình này không phải thủ tục hành chính — nó là cách bảo vệ bạn, bảo vệ client, và đảm bảo cả hai đều hài lòng khi project kết thúc.
