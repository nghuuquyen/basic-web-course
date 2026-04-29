---
title: "Module 3 — JavaScript"
---

# Module 3 — JavaScript

HTML tạo cấu trúc, CSS tạo giao diện — nhưng cả hai đều *tĩnh*. JavaScript là ngôn ngữ làm cho trang web trở nên sống động: phản ứng với click của người dùng, cập nhật nội dung mà không reload trang, gọi API, validate form... Đây cũng là ngôn ngữ duy nhất chạy được trong browser, và ngày nay còn chạy được trên server (Node.js), mobile (React Native), desktop (Electron).

Một điều quan trọng trước khi bắt đầu: **JavaScript là ngôn ngữ có nhiều cạm bẫy hơn hầu hết ngôn ngữ khác**. Module này không chỉ dạy cú pháp — nó giải thích tại sao những cạm bẫy đó tồn tại để bạn tránh được chúng.

---

## JavaScript chạy ở đâu?

Khi browser tải trang, nó tải HTML, CSS, và JavaScript. HTML/CSS được browser xử lý trực tiếp. JavaScript được **JavaScript engine** của browser thực thi — một chương trình phiên dịch code JS thành hành động.

```html
<!-- 3 cách đặt JavaScript vào trang -->

<!-- 1. Inline — không bao giờ nên dùng ngoài trường hợp rất đặc biệt -->
<button onclick="alert('click!')">Click</button>

<!-- 2. Internal — OK cho trang nhỏ, demo -->
<script>
  console.log("Hello from inline script");
</script>

<!-- 3. External — cách tốt nhất -->
<script src="app.js" defer></script>
<!-- defer: tải song song với HTML nhưng chạy sau khi DOM đã sẵn sàng -->
```

`defer` quan trọng vì: nếu script ở `<head>` không có `defer`, browser sẽ *dừng* parse HTML để tải và chạy script → trang load chậm và script không thể truy cập DOM vì DOM chưa được tạo.

### Người dùng không có JavaScript

Không thể giả định mọi người đều có JS. Search engine crawlers có giới hạn về JS execution. Dùng `<noscript>` để fallback:

```html
<noscript>
  <p>Trang này cần JavaScript. Vui lòng bật JavaScript trong browser.</p>
</noscript>
```

---

## Biến và kiểu dữ liệu

### let, const, và var

JavaScript có 3 cách khai báo biến. Trong thực tế, bạn chỉ cần 2:

```javascript
// const — khi giá trị không thay đổi (dùng mặc định)
const PI = 3.14;
const user = { name: "Alice" };  // Object reference cố định, nhưng properties có thể thay đổi

// let — khi giá trị cần thay đổi
let count = 0;
count++;

// var — ĐỪNG dùng. Có behavior cũ kỳ gây bug (xem phần Hoisting)
var x = 10;  // ← Tránh
```

**Quy tắc đơn giản**: Dùng `const` cho mọi thứ. Chỉ đổi sang `let` khi cần reassign. Không bao giờ dùng `var`.

### Kiểu dữ liệu

JavaScript là **dynamically typed** — không cần khai báo kiểu, và một biến có thể chứa bất kỳ kiểu nào:

```javascript
// Primitive types — immutable, so sánh bằng giá trị
const name = "Alice";        // string
const age = 25;              // number (cả integer lẫn float)
const isActive = true;       // boolean
const nothing = null;        // null — cố tình không có giá trị
let notYet;                  // undefined — chưa được gán
const id = Symbol("user");   // symbol — unique identifier

// Reference types — so sánh bằng reference (địa chỉ bộ nhớ)
const obj = { name: "Alice", age: 25 };  // object
const arr = [1, 2, 3, "four"];           // array (là object đặc biệt)
const fn = () => "hello";               // function (là object)
```

### Truthy và Falsy — Cạm bẫy phổ biến

Trong JavaScript, *mọi giá trị* có thể dùng trong boolean context:

```javascript
// Chỉ 6 giá trị này là falsy (false trong if):
false, 0, "", null, undefined, NaN

// Tất cả còn lại là truthy — kể cả:
[], {}, "false", -1, "0"  // ← truthy hết!

// Ứng dụng thực tế:
if (user) { ... }              // user tồn tại và không null/undefined
if (items.length) { ... }      // mảng không rỗng
if (response.data) { ... }     // data không null/undefined/""

// Cạm bẫy:
if ([]) { console.log("chạy") }  // Chạy! Mảng rỗng là truthy
if (0) { console.log("chạy") }  // Không chạy! 0 là falsy
```

---

## Cú pháp cơ bản

### Conditionals

```javascript
// if/else if/else
if (score >= 90) {
  grade = "A";
} else if (score >= 80) {
  grade = "B";
} else {
  grade = "C";
}

// Ternary — viết ngắn cho điều kiện đơn giản
const label = isLoggedIn ? "Đăng xuất" : "Đăng nhập";

// Optional chaining — truy cập nested property an toàn
const city = user?.address?.city;   // Thay vì user && user.address && user.address.city
const first = arr?.[0];
const result = fn?.();

// Nullish coalescing — dùng giá trị mặc định khi null/undefined
const name = user?.name ?? "Người dùng ẩn danh";
// Khác với ||: || cũng fallback cho 0, "", false; ?? chỉ fallback cho null/undefined
```

### Loops

```javascript
// for — khi cần index
for (let i = 0; i < 5; i++) {
  console.log(i);
}

// for...of — duyệt qua iterable (array, string, Map, Set)
const fruits = ["apple", "banana", "cherry"];
for (const fruit of fruits) {
  console.log(fruit);
}

// while — khi không biết trước số lần lặp
let page = 1;
while (hasMoreData) {
  loadPage(page++);
}
```

### Arrays — Các methods quan trọng nhất

Thay vì dùng loop thủ công, JavaScript có nhiều array methods rất tiện:

```javascript
const numbers = [1, 2, 3, 4, 5];

// map — biến đổi mỗi phần tử, trả về array mới
const doubled = numbers.map(n => n * 2);        // [2, 4, 6, 8, 10]

// filter — lọc, trả về array mới với các phần tử thỏa điều kiện
const evens = numbers.filter(n => n % 2 === 0); // [2, 4]

// reduce — gộp thành một giá trị
const sum = numbers.reduce((acc, n) => acc + n, 0);  // 15

// find — tìm phần tử đầu tiên thỏa điều kiện
const firstBig = numbers.find(n => n > 3);  // 4

// some / every — kiểm tra điều kiện
const hasEven = numbers.some(n => n % 2 === 0);   // true — có ít nhất 1
const allPos = numbers.every(n => n > 0);          // true — tất cả đều đúng

// Những methods hay dùng khác
numbers.includes(3);            // true
[...numbers].sort((a, b) => b - a);  // Sort giảm dần (cần spread để không mutate)
numbers.slice(1, 3);            // [2, 3] — tạo bản sao một đoạn
numbers.flat();                 // Flatten array lồng nhau
numbers.flatMap(n => [n, n*2]); // Map rồi flat
```

**Quan trọng**: `map`, `filter`, `reduce` không thay đổi array gốc — chúng trả về array mới. Đây là **immutability** — pattern quan trọng trong modern JavaScript.

### Objects

```javascript
const user = {
  name: "Alice",
  age: 25,
  address: { city: "Hà Nội" },
  greet() {
    return `Xin chào, tôi là ${this.name}`;
  }
};

// Truy cập
user.name            // dot notation
user["name"]         // bracket notation — dùng khi key là biến

// Destructuring — lấy properties ra thành biến
const { name, age } = user;
const { name: userName, address: { city } } = user;  // Nested + rename

// Spread — copy và merge objects
const updated = { ...user, age: 26 };       // Override age
const merged = { ...defaults, ...userPrefs }; // userPrefs override defaults

// Shorthand properties
const name = "Bob";
const age = 30;
const person = { name, age };  // Tương đương { name: name, age: age }
```

### Functions và Arrow Functions

```javascript
// Function declaration — có hoisting (có thể gọi trước khi định nghĩa)
function add(a, b) { return a + b; }

// Arrow function — cú pháp ngắn hơn, không có `this` riêng
const add = (a, b) => a + b;          // Implicit return
const square = n => n * n;            // Một tham số, bỏ ()
const getUser = () => ({ name: "Alice" }); // Return object: cần ()

// Default parameters
function greet(name = "Bạn") {
  return `Xin chào, ${name}!`;
}

// Rest parameters — nhận số lượng argument không xác định
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3, 4);  // 10

// Spread trong function call
const numbers = [1, 2, 3];
Math.max(...numbers);  // Tương đương Math.max(1, 2, 3)
```

---

## Scope và Closures

### Scope — Biến sống ở đâu?

```javascript
const globalVar = "tôi ở khắp nơi";

function outer() {
  const outerVar = "tôi chỉ ở outer";

  function inner() {
    const innerVar = "tôi chỉ ở inner";

    console.log(globalVar);  // ✓ Có thể truy cập
    console.log(outerVar);   // ✓ Có thể truy cập (closure)
    console.log(innerVar);   // ✓ Có thể truy cập
  }

  // console.log(innerVar);  // ✗ Lỗi! Không thấy được từ đây
}
```

JavaScript dùng **lexical scope**: biến có thể nhìn vào scope bên ngoài nơi nó được *định nghĩa*, không phải nơi nó được *gọi*. Đây được gọi là **lexical scoping** hay **static scoping**.

### Closures — "Nhớ" môi trường lúc được tạo

```javascript
function makeCounter(start = 0) {
  let count = start;  // Biến private — không thể truy cập từ ngoài

  return {
    increment() { count++; },
    decrement() { count--; },
    value() { return count; }
  };
}

const counter = makeCounter(10);
counter.increment();  // count = 11
counter.increment();  // count = 12
counter.value();      // 12

// count không thể truy cập trực tiếp từ ngoài
// counter.count → undefined
```

Closure là cơ chế JavaScript dùng để tạo "private state" — giúp tránh global variables và tạo ra modules.

### Hoisting — Hành vi bất ngờ của `var`

```javascript
// Đây là lý do không dùng var:
console.log(x);  // undefined — không lỗi, nhưng chưa có giá trị
var x = 5;

// var được JavaScript "kéo" khai báo lên đầu scope:
// var x;             ← JavaScript tự làm điều này
// console.log(x);    ← undefined
// x = 5;

// let/const không có behavior này:
// console.log(y);  // ✗ ReferenceError — rõ ràng hơn, dễ debug hơn
let y = 5;

// Function declarations được hoisted hoàn toàn:
sayHi();  // Hoạt động!
function sayHi() { console.log("Hi!"); }
```

**Kết luận**: `const`/`let` có behavior dễ đoán hơn. Luôn khai báo biến trước khi dùng.

---

## DOM — Giao tiếp với HTML

DOM (Document Object Model) là cách JavaScript nhìn thấy và thay đổi HTML. Khi browser parse HTML, nó tạo ra một cây đối tượng — đó là DOM.

### Chọn elements

```javascript
// Chọn một element
const title = document.getElementById("main-title");
const btn = document.querySelector(".submit-btn");        // CSS selector
const link = document.querySelector('a[href="/about"]'); // Attribute selector

// Chọn nhiều elements
const items = document.querySelectorAll(".item");        // NodeList
const links = document.querySelectorAll("nav a");

// Duyệt NodeList
items.forEach(item => {
  item.style.color = "red";
});

// Chuyển NodeList sang Array để dùng array methods
const itemsArray = [...items];
```

### Đọc và thay đổi

```javascript
// Nội dung
element.textContent = "Nội dung mới";          // An toàn — strip HTML tags
element.innerHTML = "<strong>In đậm</strong>"; // Cẩn thận XSS nếu user input!

// Attributes
element.getAttribute("href");
element.setAttribute("href", "https://example.com");
element.removeAttribute("disabled");
element.hasAttribute("required");

// Input value
inputEl.value;           // Đọc
inputEl.value = "text";  // Ghi

// CSS classes
el.classList.add("active");
el.classList.remove("hidden");
el.classList.toggle("expanded");
el.classList.contains("active");  // → true/false

// Inline styles (ưu tiên dùng classList hơn)
el.style.display = "none";
el.style.backgroundColor = "blue";  // camelCase thay vì background-color
```

### Tạo và thêm/xoá elements

```javascript
// Tạo và thêm
const li = document.createElement("li");
li.textContent = "Item mới";
li.classList.add("item");
ul.appendChild(li);   // Thêm cuối
ul.prepend(li);       // Thêm đầu

// Xoá
li.remove();

// Ví dụ thực tế: render danh sách từ data
function renderUserList(users) {
  const ul = document.querySelector("#user-list");
  ul.innerHTML = "";  // Xoá list cũ

  users.forEach(user => {
    const li = document.createElement("li");
    li.textContent = user.name;
    li.dataset.userId = user.id;  // Gắn data vào element
    ul.appendChild(li);
  });
}
```

> **Tại sao không dùng `innerHTML` để thêm elements từ user input?**
> Nếu `user.name` chứa `<script>alert('xss')</script>`, dùng `innerHTML` sẽ *chạy* script đó. Đây là lỗ hổng **XSS (Cross-Site Scripting)**. Luôn dùng `textContent` cho text, dùng DOM methods cho HTML.

---

## Events — Phản ứng với người dùng

Events là cơ chế để JavaScript "lắng nghe" hành động: click, gõ phím, submit form, scroll...

### Đăng ký event listener

```javascript
// addEventListener — cách đúng
button.addEventListener("click", function(event) {
  console.log("Clicked!", event.target);
});

// Arrow function (phổ biến hơn)
button.addEventListener("click", (e) => {
  e.preventDefault();  // Ngăn hành động mặc định (follow link, submit form...)
  e.stopPropagation(); // Ngăn event lan lên element cha
  // Logic xử lý...
});
```

### Các events hay dùng

```javascript
// Click và keyboard
el.addEventListener("click", handler);
el.addEventListener("dblclick", handler);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
  if (e.ctrlKey && e.key === "s") saveDocument();
});

// Form
form.addEventListener("submit", (e) => {
  e.preventDefault();  // Ngăn reload trang
  const data = Object.fromEntries(new FormData(e.target));
  submitData(data);
});
input.addEventListener("input", (e) => {
  validateField(e.target.value);  // Chạy mỗi lần user gõ
});

// Page load
document.addEventListener("DOMContentLoaded", () => {
  // DOM đã sẵn sàng — an toàn để query elements
  init();
});
```

### Event Bubbling — Hiểu để không bị bất ngờ

Khi click vào một element, event *lan lên* các element cha:

```
<div id="outer">          ← 3. Event lan đến đây
  <div id="inner">        ← 2. Rồi đến đây
    <button>Click</button> ← 1. Click xảy ra ở đây
  </div>
</div>
```

Điều này có thể gây bug nếu không biết, nhưng cũng rất hữu ích qua pattern **Event Delegation**:

```javascript
// Thay vì gắn listener cho từng button (100 buttons = 100 listeners)
buttons.forEach(btn => btn.addEventListener("click", handler)); // Kém

// Gắn một listener cho container, tận dụng bubbling
document.querySelector("#todo-list").addEventListener("click", (e) => {
  if (e.target.matches(".delete-btn")) {
    e.target.closest("li").remove();
  }
  if (e.target.matches(".complete-btn")) {
    e.target.closest("li").classList.toggle("completed");
  }
});
// ✓ Hoạt động với cả những items được thêm vào SAU này
// ✓ Chỉ 1 listener thay vì hàng trăm
```

---

## Classes và Modules

### Classes — OOP trong JavaScript

```javascript
class Animal {
  constructor(name, sound) {
    this.name = name;
    this.sound = sound;
  }

  speak() {
    return `${this.name}: ${this.sound}!`;
  }

  static create(name, sound) {  // Static method — gọi trên class, không phải instance
    return new Animal(name, sound);
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name, "Gâu");  // Gọi constructor của class cha
    this.tricks = [];
  }

  learn(trick) {
    this.tricks.push(trick);
    return this;  // Method chaining
  }

  speak() {
    return super.speak() + " *vẫy đuôi*";  // Gọi method của class cha
  }
}

const dog = new Dog("Rex");
dog.learn("sit").learn("shake");  // Chaining
console.log(dog.speak());  // "Rex: Gâu! *vẫy đuôi*"
```

> **Lưu ý**: Class trong JavaScript là "syntactic sugar" — bên dưới vẫn là prototype-based inheritance. Không giống class trong Java/C#. Cần hiểu điều này khi debug.

### Modules — Tổ chức code

Khi app lớn, cần chia code thành các file riêng. ES6 Modules cho phép làm điều đó:

```javascript
// math.js
export const PI = 3.14159;
export function add(a, b) { return a + b; }
export default function multiply(a, b) { return a * b; }

// app.js
import multiply from './math.js';        // Default import
import { PI, add } from './math.js';     // Named imports
import { add as sum } from './math.js';  // Import với alias
import * as math from './math.js';       // Import tất cả
```

Trong HTML:
```html
<script type="module" src="app.js"></script>
```

---

## Lập trình Bất đồng bộ

Đây là một trong những phần khó nhất của JavaScript — và cũng quan trọng nhất với web development.

### Tại sao cần async?

JavaScript chạy **single-threaded** — một lần chỉ làm một việc. Nếu phải đợi response từ server (có thể mất 500ms), browser sẽ *đơ* trong suốt thời gian đó.

Giải pháp: **bất đồng bộ** — khởi động thao tác, đăng ký callback khi xong, rồi tiếp tục làm việc khác trong lúc chờ.

### Vấn đề: Callback Hell

```javascript
// Code thực tế với callback lồng nhau — "Pyramid of Doom"
login(email, password, function(user) {
  getUserProfile(user.id, function(profile) {
    getOrders(profile.id, function(orders) {
      processOrders(orders, function(result) {
        // Khó đọc, khó debug, khó handle error
      });
    });
  });
});
```

### Giải pháp 1: Promises

```javascript
// Promise là "lời hứa" về một giá trị sẽ có trong tương lai
fetch('/api/user')                    // Trả về Promise ngay
  .then(response => response.json())  // Khi response đến, parse JSON
  .then(user => fetchOrders(user.id)) // Khi có user, lấy orders
  .then(orders => render(orders))     // Khi có orders, render
  .catch(error => showError(error))   // Xử lý bất kỳ lỗi nào trong chain
  .finally(() => hideLoading());      // Luôn chạy cuối, dù lỗi hay không
```

### Giải pháp 2: Async/Await — Code trông như đồng bộ

```javascript
async function loadUserDashboard(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);

    if (!response.ok) {
      throw new Error(`Lỗi HTTP: ${response.status}`);
    }

    const user = await response.json();
    const orders = await fetchOrders(user.id);

    render(user, orders);

  } catch (error) {
    showError("Không thể tải dữ liệu. Vui lòng thử lại.");
    console.error(error);
  } finally {
    hideLoading();
  }
}
```

Async/await không làm code *thực sự* đồng bộ — nó vẫn bất đồng bộ bên dưới. Nó chỉ làm code *trông* giống đồng bộ, dễ đọc hơn.

### Chạy song song với Promise.all

```javascript
// Chạy tuần tự — chậm (500ms + 300ms = 800ms)
const user = await fetchUser(id);    // Đợi 500ms
const settings = await fetchSettings(); // Đợi 300ms thêm

// Chạy song song — nhanh hơn (max(500ms, 300ms) = 500ms)
const [user, settings] = await Promise.all([
  fetchUser(id),
  fetchSettings()
]);
```

> **Quy tắc**: Dùng `Promise.all` khi các thao tác *độc lập với nhau*. Dùng `await` tuần tự khi kết quả cái trước cần cho cái sau.

### Fetch API

```javascript
// GET
const response = await fetch('/api/products');
const products = await response.json();

// POST với JSON body
const response = await fetch('/api/products', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: "Sản phẩm mới", price: 99000 })
});

// Luôn kiểm tra response.ok
if (!response.ok) {
  const error = await response.json();
  throw new Error(error.message);
}

const newProduct = await response.json();
```

---

## Browser APIs

Ngoài DOM, browser cung cấp nhiều API khác:

### Web Storage

```javascript
// localStorage — lưu vĩnh viễn (cho đến khi xoá)
localStorage.setItem("theme", "dark");
const theme = localStorage.getItem("theme");  // "dark"
localStorage.removeItem("theme");

// Lưu object
localStorage.setItem("user", JSON.stringify(user));
const saved = JSON.parse(localStorage.getItem("user"));

// sessionStorage — chỉ tồn tại trong session (tab hiện tại)
sessionStorage.setItem("draft", draftText);
```

### Dataset — Gắn data vào elements

```html
<button data-user-id="123" data-action="delete">Xoá</button>
```

```javascript
const btn = document.querySelector("button");
console.log(btn.dataset.userId);   // "123"
console.log(btn.dataset.action);   // "delete"

// Rất hữu ích trong event delegation
list.addEventListener("click", (e) => {
  const { userId, action } = e.target.dataset;
  if (action === "delete") deleteUser(userId);
});
```

---

## TypeScript — JavaScript có type

TypeScript là JavaScript với type system. Nó *compile* thành JavaScript — browser không chạy TypeScript trực tiếp.

**Tại sao cần TypeScript?**

```javascript
// JavaScript — không biết user có field gì
function sendEmail(user) {
  return fetch('/send', { body: user.emial });  // Typo! "emial" thay vì "email"
  // Không có lỗi khi viết code, chỉ biết khi chạy và email không gửi được
}
```

```typescript
// TypeScript — phát hiện lỗi ngay khi gõ
interface User {
  name: string;
  email: string;
  age?: number;  // ? = optional
}

function sendEmail(user: User) {
  return fetch('/send', { body: user.emial });
  //                          ↑ Lỗi ngay! "emial" không tồn tại trong User
}
```

TypeScript hữu ích nhất trong project lớn, nhiều người, nhiều file. Khoá học này dùng TypeScript (Next.js mặc định hỗ trợ TS).

---

## JavaScript Frameworks

Khi app phức tạp, vanilla JavaScript (không dùng framework) trở nên khó quản lý. Frameworks cung cấp cấu trúc và công cụ.

### SPA vs MPA

| | Single Page App (SPA) | Multi-Page App (MPA) |
|---|---|---|
| Hoạt động như thế nào | Load HTML một lần, JS thay đổi nội dung | Mỗi URL = tải trang mới từ server |
| Ví dụ | Figma, Trello, Gmail | Amazon, Wikipedia, blog |
| Ưu điểm | Chuyển trang mượt, không reload | SEO tốt, load đầu nhanh, đơn giản hơn |
| Nhược điểm | Load lần đầu chậm, SEO khó | Reload khi navigate |
| Frameworks | React, Vue, Angular | Next.js, Remix (hybrid) |

**Xu hướng hiện tại**: Kết hợp cả hai. Frameworks như **Next.js** (React) và **Nuxt.js** (Vue) render HTML trên server (tốt cho SEO và load đầu), rồi "hydrate" thành SPA sau khi load (tốt cho UX).

### React — Framework phổ biến nhất

React là thư viện UI của Facebook. Thay vì thao tác DOM trực tiếp, bạn mô tả *giao diện nên trông như thế nào* với JSX — React lo việc update DOM:

```jsx
// Component — đơn vị cơ bản của React
function UserCard({ name, email, onDelete }) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p>{email}</p>
      <button onClick={onDelete}>Xoá</button>
    </div>
  );
}

// Hooks — state và side effects trong functional components
function Counter() {
  const [count, setCount] = useState(0);  // State

  useEffect(() => {
    document.title = `Count: ${count}`;   // Chạy sau mỗi lần count thay đổi
  }, [count]);

  return (
    <div>
      <p>Đếm: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
    </div>
  );
}
```

### Progressive Web Apps (PWA)

PWA là web app có trải nghiệm gần giống native app:

- **Cài được lên home screen** — không cần App Store
- **Offline** — hoạt động khi mất mạng qua Service Workers
- **Push notifications** — gửi thông báo đến người dùng
- **Fast** — caching mạnh

PWA được viết bằng HTML/CSS/JS thông thường, chỉ cần thêm Service Worker và manifest file.

---

## Tổng kết

```
Nền tảng:
  Variables    → const mặc định, let khi cần thay đổi, không dùng var
  Types        → Hiểu truthy/falsy để tránh bug
  Arrays       → map, filter, reduce thay vì loop thủ công
  Objects      → Destructuring, spread, shorthand
  Functions    → Arrow functions, default params, rest/spread

Quan trọng:
  Scope        → Lexical scope, closure cho private state
  Hoisting     → Lý do không dùng var
  DOM          → querySelector, classList, textContent vs innerHTML
  Events       → addEventListener, bubbling, event delegation
  Async        → Promises → async/await, Promise.all cho song song
  Fetch        → GET/POST, check response.ok, JSON

Hướng tới:
  TypeScript   → Type safety, phát hiện lỗi sớm
  React/Next   → Component UI, server rendering
  PWA          → Web app gần giống native
```

Module tiếp theo: **Lập trình Server-side** — xây dựng back-end, làm việc với database, authentication, và API.
