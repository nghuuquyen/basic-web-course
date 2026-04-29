---
title: "Phần 1 — Xây Blog Tĩnh với Next.js Pages Router"
---

# Phần 1 — Xây Blog Tĩnh với Next.js Pages Router

Khi làm web với React thuần, mọi thứ đều được render trên trình duyệt — browser nhận HTML gần như trống, tải JavaScript, chạy React rồi mới hiển thị nội dung. Với blog, điều này dẫn đến trang tải chậm lần đầu và SEO kém (Google crawl được HTML trống, không thấy nội dung). Next.js giải quyết bằng cách render HTML **trước khi gửi về browser**.

Phần này dùng **Pages Router** — kiến trúc gốc của Next.js — để xây blog tĩnh từ file Markdown.

---

## Về tài liệu này

Bài thực hành gốc được **Next.js cung cấp chính thức** tại:

**[https://nextjs.org/learn/pages-router](https://nextjs.org/learn/pages-router)**

Tài liệu này là bản **tổng hợp và dịch sang Tiếng Việt** để hỗ trợ thêm cho quá trình học. Khuyến khích đọc song song cả hai nguồn — tài liệu gốc có các bài tập tương tác và code sandbox ngay trong trình duyệt, còn tài liệu này giúp nắm nhanh ý chính bằng tiếng Việt.

---

## Mục Lục

1. [Khởi tạo project](#1-khởi-tạo-project)
2. [Layout component và CSS Modules](#2-layout-component-và-css-modules)
3. [Đọc dữ liệu bài viết với `getStaticProps`](#3-đọc-dữ-liệu-bài-viết-với-getstaticprops)
4. [Dynamic Routing với `getStaticPaths`](#4-dynamic-routing-với-getstaticpaths)
5. [Chuyển Markdown sang HTML với Remark](#5-chuyển-markdown-sang-html-với-remark)
6. [Component `Date` và thư viện `date-fns`](#6-component-date-và-thư-viện-date-fns)
7. [Điều hướng với Next.js `Link`](#7-điều-hướng-với-nextjs-link)
8. [API Routes trong Next.js](#8-api-routes-trong-nextjs)
9. [Xuất trang tĩnh với `next export`](#9-xuất-trang-tĩnh-với-next-export)

---

## 1. Khởi Tạo Project

```bash
npx create-next-app@latest nextjs-blog
cd nextjs-blog
npm run dev
```

Mở trình duyệt tại `http://localhost:3000` — bạn sẽ thấy trang chủ mặc định của Next.js.

### Cấu trúc thư mục

```
nextjs-blog/
├── pages/          ← Mỗi file .js ở đây = một trang web (quan trọng nhất)
├── public/         ← Ảnh, icon, file tĩnh — truy cập trực tiếp qua URL
├── styles/         ← File CSS
└── package.json    ← Danh sách thư viện và script
```

### File-based Routing

Trong Express hay React Router, bạn phải tự khai báo route:

```js
// Express: phải viết tay
app.get('/about', handler);
app.get('/posts/:id', handler);
```

Next.js làm khác hơn — **tên file chính là route**:

| File | URL tương ứng |
|------|---------------|
| `pages/index.js` | `/` |
| `pages/about.js` | `/about` |
| `pages/posts/first.js` | `/posts/first` |

Bạn không cần cấu hình gì thêm. Tạo file là có route.

> File-based routing giúp cấu trúc thư mục phản ánh trực tiếp cấu trúc URL. Dễ đọc, dễ điều hướng hơn nhiều so với quản lý route thủ công.

---

## 2. Layout Component và CSS Modules

Khi blog có nhiều trang (trang chủ, trang bài viết, trang giới thiệu...), mỗi trang đều có **header** và **footer** giống nhau. Nếu copy-paste HTML vào từng trang, mỗi khi cần sửa header bạn phải sửa ở nhiều nơi — dễ sót, khó bảo trì.

Giải pháp: tạo một `Layout` component bao ngoài nội dung mỗi trang.

### Layout component

```jsx
// components/layout.js
import styles from './layout.module.css';
import Link from 'next/link';

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>

      {/* Header: hiển thị khác nhau tùy trang chủ hay trang con */}
      <header>
        {home ? (
          <h1>Tên lớn — đang ở trang chủ</h1>
        ) : (
          <Link href="/">Tên nhỏ hơn — có thể click về trang chủ</Link>
        )}
      </header>

      {/* Nội dung chính — được truyền vào từ bên ngoài */}
      <main>{children}</main>

      {/* Chỉ hiện nút "Back to home" khi không phải trang chủ */}
      {!home && <Link href="/">← Back to home</Link>}
    </div>
  );
}
```

**`children` là gì?** Khi bạn đặt nội dung bên trong component:

```jsx
<Layout>
  <p>Đây là nội dung trang</p>
</Layout>
```

Thì `<p>Đây là nội dung trang</p>` chính là `children`. Component `Layout` nhận nó qua props và render ở vị trí `{children}`. Cơ chế này tạo ra các "khung" linh hoạt chứa bất kỳ nội dung nào.

Sử dụng trong các trang:

```jsx
// pages/index.js — trang chủ
export default function Home() {
  return (
    <Layout home>          {/* home={true} */}
      <p>Nội dung trang chủ</p>
    </Layout>
  );
}

// pages/posts/[id].js — trang bài viết
export default function Post() {
  return (
    <Layout>               {/* home không được truyền → undefined → false */}
      <p>Nội dung bài viết</p>
    </Layout>
  );
}
```

### CSS Modules — CSS không bị xung đột

Trong project lớn với nhiều file CSS, rất dễ bị trùng tên class. Cả `layout.css` và `card.css` đều có `.container` → chúng ghi đè lên nhau theo thứ tự import, gây bug khó tìm.

CSS Modules tự động đổi tên class thành tên duy nhất lúc build:

```css
/* components/layout.module.css */
.container {
  max-width: 36rem;
  margin: 3rem auto;
}
```

```jsx
import styles from './layout.module.css';

// styles.container thực ra là "layout_container__xK2p1" — tên duy nhất
<div className={styles.container}>
```

Class `.container` trong file này **không bao giờ** xung đột với `.container` ở file khác.

### `_app.js` — Bao ngoài toàn bộ ứng dụng

```jsx
// pages/_app.js
import '../styles/global.css';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

File `_app.js` bao ngoài tất cả các trang. Đây là nơi duy nhất nên import CSS toàn cục — vì CSS toàn cục áp dụng cho mọi trang, nếu import ở component thông thường Next.js sẽ cảnh báo về side effects.

> Tách giao diện dùng chung thành component riêng là nguyên tắc cơ bản trong React. CSS Modules giúp viết CSS an toàn trong môi trường nhiều file mà không lo xung đột.

---

## 3. Đọc Dữ Liệu Bài Viết Với `getStaticProps`

Blog cần hiển thị danh sách bài viết trên trang chủ. Thay vì dùng database, cách đơn giản và hiệu quả với blog cá nhân là lưu bài viết dưới dạng **file Markdown** ngay trong project — không cần database, chỉnh sửa bằng bất kỳ text editor nào, version control cùng code.

### Cấu trúc file Markdown

Mỗi bài viết là một file `.md` trong thư mục `posts/`:

```markdown
---
title: 'Two Forms of Pre-rendering'
date: '2020-01-01'
---

Next.js has two forms of pre-rendering: **Static Generation** and **Server-side Rendering**...
```

Phần giữa hai dấu `---` là **YAML front-matter** — quy ước phổ biến để nhúng metadata (tiêu đề, ngày tháng, tác giả...) vào đầu file. Phần còn lại là nội dung bài viết.

### Đọc và xử lý file Markdown

Cần `fs` (Node.js built-in để đọc file) và `gray-matter` (tách front-matter):

```js
// lib/posts.js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  // 1. Lấy tên tất cả file trong thư mục /posts
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames.map((fileName) => {
    // 2. Dùng tên file làm ID bài viết (bỏ đuôi .md)
    const id = fileName.replace(/\.md$/, '');

    // 3. Đọc nội dung file
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // 4. Dùng gray-matter tách front-matter
    //    matterResult.data = { title: '...', date: '...' }
    //    matterResult.content = nội dung markdown
    const matterResult = matter(fileContents);

    return { id, ...matterResult.data };
    // → { id: 'ssg-ssr', title: '...', date: '...' }
  });

  // 5. Sắp xếp từ mới nhất đến cũ nhất
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}
```

Code dùng `fs` — API của Node.js để đọc file từ ổ cứng. Code này **chỉ chạy trên server hoặc lúc build**, không bao giờ được gửi về trình duyệt. Next.js tự động loại bỏ những import như `fs`, `path` khỏi bundle JavaScript gửi cho client.

### `getStaticProps` — Lấy dữ liệu lúc build

`getStaticProps` là hàm đặc biệt của Next.js. Khi bạn export hàm này từ một trang, Next.js gọi nó **lúc build** để lấy dữ liệu, rồi truyền vào component qua props:

```jsx
// pages/index.js
import { getSortedPostsData } from '../lib/posts';

// Next.js gọi hàm này lúc build, KHÔNG phải lúc user request
export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: { allPostsData }, // → truyền vào Home component qua props
  };
}

// Component nhận data đã được chuẩn bị sẵn qua props
export default function Home({ allPostsData }) {
  return (
    <ul>
      {allPostsData.map(({ id, date, title }) => (
        <li key={id}>
          {title} — {date}
        </li>
      ))}
    </ul>
  );
}
```

**Tại sao không dùng `useEffect` + `fetch`?** Bạn hoàn toàn có thể, nhưng khi đó HTML ban đầu sẽ không có nội dung bài viết — SEO kém và trang "nhấp nháy" khi load. `getStaticProps` bakes data vào HTML từ lúc build:

```
Dùng useEffect/fetch:
  HTML trống → JS load → fetch() → render danh sách
  ↑ user thấy màn hình trống trước

Dùng getStaticProps:
  Build time: gọi getSortedPostsData() → baked vào HTML
  User request: HTML đã có sẵn danh sách bài viết
  ↑ hiển thị ngay lập tức
```

> `getStaticProps` là trái tim của SSG trong Next.js. Mọi thứ bên trong chạy ở môi trường Node.js lúc build — có thể đọc file, query database, gọi API bên ngoài — miễn là kết quả serialize được thành JSON.

---

## 4. Dynamic Routing Với `getStaticPaths`

Trang chủ đã hiển thị được danh sách bài viết. Bước tiếp theo: khi user click vào một bài, họ cần đến trang `/posts/ssg-ssr` hoặc `/posts/pre-rendering`.

Vấn đề: số lượng bài không cố định. Mỗi lần thêm file Markdown mới, cần có trang mới tương ứng. Không thể tạo tay từng file `pages/posts/ssg-ssr.js` cho từng bài.

Giải pháp: **dynamic routing** — một file xử lý nhiều URL.

### File `[id].js` — Route động

Đặt tên file với dấu ngoặc vuông: `pages/posts/[id].js`

`[id]` là placeholder — file này match tất cả URL dạng `/posts/bất-kỳ-chuỗi-nào`:

| URL | Giá trị `id` |
|-----|-------------|
| `/posts/ssg-ssr` | `"ssg-ssr"` |
| `/posts/pre-rendering` | `"pre-rendering"` |
| `/posts/hello-world` | `"hello-world"` |

### Vấn đề với SSG: phải biết trước tất cả URL

Với SSG, Next.js cần biết **trước lúc build** tất cả các trang cần tạo. Nếu có 10 bài viết, cần build 10 trang. Đây là việc của `getStaticPaths`:

```js
// lib/posts.js — trả về danh sách id của tất cả bài viết
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => ({
    params: {
      id: fileName.replace(/\.md$/, ''), // bỏ đuôi .md
    },
  }));
}
// Kết quả: [
//   { params: { id: 'ssg-ssr' } },
//   { params: { id: 'pre-rendering' } }
// ]
```

```jsx
// pages/posts/[id].js
import { getAllPostIds, getPostData } from '../../lib/posts';

// Bước 1: Khai báo tất cả URL cần build
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false, // URL không có trong danh sách → 404
  };
}

// Bước 2: Với mỗi URL, lấy data tương ứng
export async function getStaticProps({ params }) {
  // params.id = 'ssg-ssr' hoặc 'pre-rendering' tùy URL
  const postData = await getPostData(params.id);
  return { props: { postData } };
}

// Bước 3: Render trang
export default function Post({ postData }) {
  return (
    <article>
      <h1>{postData.title}</h1>
    </article>
  );
}
```

### Luồng hoạt động đầy đủ

```
Lúc build:
  1. Next.js thấy pages/posts/[id].js
  2. Gọi getStaticPaths() → nhận được list paths:
     [{ params: { id: 'ssg-ssr' } }, { params: { id: 'pre-rendering' } }]
  3. Với mỗi path, gọi getStaticProps({ params: { id: '...' } })
  4. Render HTML và lưu thành file

Kết quả trên disk:
  out/posts/ssg-ssr.html        ← đã render sẵn
  out/posts/pre-rendering.html  ← đã render sẵn

Lúc user request /posts/ssg-ssr:
  → trả file ssg-ssr.html có sẵn, không cần tính toán gì thêm
```

`fallback: false` — khi user vào URL không có trong danh sách (`/posts/bai-khong-ton-tai`), Next.js trả về 404. Phù hợp khi danh sách bài viết cố định và đã biết hết lúc build.

> `getStaticPaths` và `getStaticProps` là cặp đôi không thể thiếu cho trang động với SSG. `getStaticPaths` trả lời "cần build những trang nào?", `getStaticProps` trả lời "trang này cần data gì?".

---

## 5. Chuyển Markdown Sang HTML Với Remark

Hàm `getPostData` đọc được nội dung file Markdown, nhưng phần nội dung vẫn là chuỗi thô:

```
**Next.js** has two forms of pre-rendering...
```

Nếu render thẳng chuỗi này vào JSX, trình duyệt hiển thị nguyên văn ký tự `**` thay vì chữ in đậm. Cần **chuyển Markdown thành HTML** trước.

### Xử lý Markdown với Remark

`remark` xử lý văn bản theo kiến trúc plugin. Plugin `remark-html` chuyển Markdown thành HTML string:

```js
// lib/posts.js
import { remark } from 'remark';
import html from 'remark-html';

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  // Chuyển Markdown → HTML
  const processedContent = await remark()
    .use(html)                          // plugin chuyển đổi
    .process(matterResult.content);     // xử lý nội dung markdown

  const contentHtml = processedContent.toString();
  // contentHtml = "<p><strong>Next.js</strong> has two forms..."

  return {
    id,
    contentHtml,
    ...matterResult.data, // title, date
  };
}
```

Hàm cần `await` vì `remark().process()` là async — do đó `getPostData` phải là `async function`. Điều này kéo theo `getStaticProps` phải `await` khi gọi hàm:

```jsx
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id); // ← phải await
  return { props: { postData } };
}
```

### Hiển thị HTML trong React

React mặc định **escape** tất cả nội dung để chống XSS — nếu bạn làm:

```jsx
<div>{postData.contentHtml}</div>
// Hiển thị nguyên văn: <p><strong>Next.js</strong>...
// KHÔNG render thành HTML
```

Để render HTML string thực sự, dùng prop `dangerouslySetInnerHTML`:

```jsx
<div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
```

React cố tình đặt tên dài và rõ để nhắc nhở: prop này vô hiệu hóa cơ chế bảo vệ XSS. Nếu render HTML đến từ **user input chưa được làm sạch**, kẻ tấn công có thể nhúng script độc hại. Trong trường hợp này hoàn toàn an toàn vì HTML được tạo từ file Markdown do **bạn** viết và kiểm soát.

> Hiểu rõ data đến từ đâu trước khi dùng `dangerouslySetInnerHTML`. Nội dung do bạn tạo ra và kiểm soát thì an toàn. Nội dung từ người dùng hoặc nguồn bên ngoài thì cần sanitize trước.

---

## 6. Component `Date` và Thư Viện `date-fns`

Ngày tháng trong file Markdown lưu dạng `'2020-01-01'` — chuẩn để sort, nhưng không thân thiện với người đọc. Cần hiển thị đẹp hơn (`January 1, 2020`), và vì logic này dùng ở nhiều nơi, nên đóng gói thành component riêng:

```jsx
// components/date.js
import { parseISO, format } from 'date-fns';

export default function Date({ dateString }) {
  const date = parseISO(dateString);
  // parseISO('2020-01-01') → đối tượng Date JavaScript

  return (
    <time dateTime={dateString}>
      {format(date, 'LLLL d, yyyy')}
    </time>
  );
  // Render ra: <time datetime="2020-01-01">January 1, 2020</time>
}
```

**`date-fns`** là thư viện xử lý ngày tháng nhẹ hơn `moment.js` vì tree-shakable — chỉ bundle hàm bạn dùng. Hai hàm ở đây: `parseISO` chuyển chuỗi ISO thành `Date` object, `format` định dạng theo pattern.

### Thẻ `<time>` — Semantic HTML

Component dùng `<time>` thay vì `<span>`:

```html
<time datetime="2020-01-01">January 1, 2020</time>
```

Thẻ `<time>` cho browser và search engine biết đây là giá trị thời gian. Screen reader (công cụ đọc cho người khiếm thị) đọc đúng ngữ cảnh. Thuộc tính `dateTime` chứa giá trị chuẩn cho máy đọc, nội dung bên trong là cho người đọc — đây là thực hành tốt về **web accessibility**.

### Sử dụng lại ở nhiều nơi

```jsx
// Trong trang bài viết (pages/posts/[id].js)
import Date from '../../components/date';

<article>
  <h1>{postData.title}</h1>
  <Date dateString={postData.date} />
  <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
</article>

// Trong trang chủ (pages/index.js)
import Date from '../components/date';

<small>
  <Date dateString={date} />
</small>
```

Chỉnh sửa một lần ở `components/date.js` là cập nhật ở mọi nơi dùng nó.

> Khi một đoạn logic hoặc giao diện xuất hiện ở nhiều hơn một nơi, hãy đóng gói thành component. Và khi viết HTML, dùng thẻ có ý nghĩa phù hợp — không phải mọi thứ đều là `<div>`.

---

## 7. Điều Hướng Với Next.js `Link`

Danh sách bài viết cần link để user click vào. Dùng thẻ `<a>` thông thường sẽ thực hiện **full page reload** — tải lại toàn bộ trang từ đầu, mất đi lợi thế của SPA.

### `<Link>` — Client-side Navigation

```jsx
import Link from 'next/link';

{allPostsData.map(({ id, date, title }) => (
  <li key={id}>
    <Link href={`/posts/${id}`}>{title}</Link>
    <br />
    <small>
      <Date dateString={date} />
    </small>
  </li>
))}
```

`Link` thực hiện **client-side navigation**: chỉ tải phần dữ liệu cần thiết của trang mới và cập nhật DOM — không reload toàn trang, giữ nguyên state React.

| | `<a href>` | `<Link href>` |
|--|------------|---------------|
| Cách hoạt động | Full page reload | Chỉ cập nhật phần thay đổi |
| Tốc độ | Chậm hơn | Nhanh hơn |
| Prefetching | Không | Tự động tải trước trang liên kết |
| State React | Bị reset | Được giữ lại |

**Prefetching:** Khi một `Link` xuất hiện trong viewport, Next.js tự động tải trước nội dung trang đó ở background. Khi user click, trang đã tải sẵn — chuyển trang gần như tức thì.

> Luôn dùng `<Link>` thay vì `<a>` cho các link nội bộ trong ứng dụng Next.js. Dùng `<a>` khi link đến trang web bên ngoài.

---

## 8. API Routes Trong Next.js

Bất kỳ file nào trong thư mục `pages/api/` tự động trở thành một **API endpoint** — nhận request và trả về JSON thay vì HTML:

```js
// pages/api/hello.js
export default function handler(req, res) {
  res.status(200).json({ text: 'Hello' });
}
```

Truy cập `http://localhost:3000/api/hello` → server trả về `{ "text": "Hello" }`.

Hàm `handler` nhận `req` (request object: method, headers, body, query...) và `res` (response object). Syntax quen thuộc nếu bạn đã dùng Express.

```
pages/
  index.js       → GET /         → trả về HTML (trang web)
  api/
    hello.js     → GET /api/hello → trả về JSON (API)
```

Files trong `pages/api/` chạy hoàn toàn trên **server-side** — code không lộ ra ngoài, có thể truy cập database, đọc biến môi trường nhạy cảm.

> **Lưu ý quan trọng:** API Routes **không hoạt động** khi export trang tĩnh (`next export`). Vì API Routes cần server Node.js đang chạy để xử lý request — khi export tĩnh, không có server. Nếu muốn dùng cả API Routes lẫn trang tĩnh, cần deploy lên Vercel hoặc server Node.js.

---

## 9. Xuất Trang Tĩnh Với `next export`

Blog dùng SSG hoàn toàn nên có thể deploy lên **static hosting** (GitHub Pages, Netlify, Cloudflare Pages...) — rẻ hơn, đơn giản hơn, và nhanh hơn do file phục vụ trực tiếp từ CDN.

### Cấu hình `next.config.js`

```js
// next.config.js
const nextConfig = {
  output: 'export',       // Bảo Next.js xuất ra file HTML tĩnh
  images: {
    unoptimized: true,    // Tắt tối ưu hóa ảnh (cần server để xử lý)
  },
};

module.exports = nextConfig;
```

`images.unoptimized: true` vì tính năng optimize ảnh của Next.js cần server đang chạy để resize theo request — khi export tĩnh, không có server.

### Build và xem kết quả

```bash
npm run build
```

Với `output: 'export'` đã cấu hình, `next build` tự động xuất file tĩnh vào thư mục `out/`:

```
out/
├── index.html               ← trang chủ
├── posts/
│   ├── ssg-ssr.html         ← trang bài viết 1
│   └── pre-rendering.html   ← trang bài viết 2
├── _next/                   ← JavaScript và CSS được bundle
└── images/                  ← ảnh
```

Toàn bộ nội dung thư mục `out/` có thể upload lên GitHub Pages, Netlify hay bất kỳ CDN nào là xong.

> Chọn chiến lược deploy phù hợp với loại ứng dụng. Blog với nội dung ít thay đổi là ứng viên hoàn hảo cho static hosting: không tốn server, tốc độ cao nhờ CDN toàn cầu, miễn phí trên nhiều nền tảng.

---

## Tổng Kết

### Luồng dữ liệu của toàn bộ blog

```
/posts/*.md  (bài viết dạng Markdown + YAML front-matter)
     │
     ▼
lib/posts.js
  ├── gray-matter  → tách title, date, nội dung
  └── remark       → chuyển Markdown → HTML string
     │
     ▼
getStaticPaths()   → "Next.js ơi, hãy build những trang này"
getStaticProps()   → "đây là dữ liệu cho từng trang"
     │
     ▼
React components   → render HTML với dữ liệu đã chuẩn bị sẵn
     │
     ▼
out/               → file HTML tĩnh, sẵn sàng deploy
```

### Bảng tra cứu nhanh

| Khái niệm | Giải thích | Dùng khi nào |
|-----------|------------|--------------|
| **File-based routing** | Tên file = URL | Luôn luôn trong Next.js |
| **`[id].js`** | Một file xử lý nhiều URL | Trang có tham số động (bài viết, sản phẩm...) |
| **`getStaticProps`** | Lấy data lúc build, truyền vào component | Khi trang cần data và nội dung ít thay đổi |
| **`getStaticPaths`** | Khai báo trước danh sách URL cần build | Dùng cùng `getStaticProps` cho dynamic routes |
| **CSS Modules** | CSS scoped theo file, không xung đột | Styling component cụ thể |
| **`_app.js`** | Bao ngoài tất cả trang | Import global CSS, global state/provider |
| **`<Link>`** | Chuyển trang không reload | Mọi link nội bộ trong ứng dụng |
| **`dangerouslySetInnerHTML`** | Render HTML string | Nội dung từ Markdown/CMS đã qua xử lý |
| **API Routes** | Serverless endpoint trả JSON | Form submission, data mutation, proxy API |
| **`output: 'export'`** | Xuất toàn bộ site thành file tĩnh | Deploy lên static hosting |

### Thư viện đã dùng

| Thư viện | Mục đích |
|----------|----------|
| `gray-matter` | Parse YAML front-matter trong file Markdown |
| `remark` + `remark-html` | Chuyển nội dung Markdown thành HTML |
| `date-fns` | Format và xử lý ngày tháng |
