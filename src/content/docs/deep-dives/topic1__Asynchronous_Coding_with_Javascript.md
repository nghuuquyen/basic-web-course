---
title: "Topic 1 — Lập Trình Bất Đồng Bộ với JavaScript"
---

# Topic 1 — Lập Trình Bất Đồng Bộ với JavaScript

Hãy tưởng tượng bạn gọi một API để lấy danh sách sản phẩm. API đó mất 3 giây để trả về kết quả. Nếu JavaScript phải ngồi chờ trong 3 giây đó, browser sẽ đứng hoàn toàn — không cuộn được, không click được, không làm gì được. Người dùng sẽ nghĩ website bị treo.

Đây là vấn đề cốt lõi mà lập trình bất đồng bộ giải quyết.

---

## Mục Lục

1. [JavaScript là Single-Threaded](#1-javascript-là-single-threaded)
2. [Non-Blocking và Asynchronous là gì?](#2-non-blocking-và-asynchronous-là-gì)
3. [Event-Driven Programming](#3-event-driven-programming)
4. [The Event Loop](#4-the-event-loop)
5. [Callback Functions](#5-callback-functions)
6. [Promises](#6-promises)
7. [Async/Await](#7-asyncawait)
8. [So sánh ba cách tiếp cận](#8-so-sánh-ba-cách-tiếp-cận)
9. [Parallel Processing và Web Workers](#9-parallel-processing-và-web-workers)

---

## 1. JavaScript là Single-Threaded

**Single-threaded** có nghĩa là JavaScript chỉ có thể thực thi **một lệnh tại một thời điểm**. Không giống các ngôn ngữ đa luồng như Java hay C++ có thể chạy nhiều tác vụ song song, JavaScript xử lý tuần tự từng dòng một.

Điều này có vẻ như là nhược điểm lớn — và nó sẽ là nhược điểm thực sự nếu không có cơ chế bất đồng bộ. Hãy tưởng tượng một đoạn code như thế này nếu JavaScript thực sự bị chặn:

```javascript
// Nếu JavaScript là blocking:
const data = fetch('https://api.example.com/products'); // Dừng 3 giây
console.log(data); // Chỉ chạy sau khi fetch xong
// Trong 3 giây đó: UI đứng, click không phản hồi, scroll không hoạt động
```

Giải pháp không phải là thêm thread — JavaScript vẫn single-threaded. Giải pháp là **event loop** và **Web APIs** từ browser.

---

## 2. Non-Blocking và Asynchronous là gì?

### Synchronous vs Asynchronous

**Synchronous (đồng bộ)** — code chạy tuần tự, lệnh sau chờ lệnh trước hoàn thành:

```javascript
console.log('1');
console.log('2');  // Chờ dòng trên xong mới chạy
console.log('3');
// Output: 1 2 3 (theo thứ tự)
```

**Asynchronous (bất đồng bộ)** — code không chờ, tiếp tục chạy trong khi tác vụ khác đang xử lý ở background:

```javascript
console.log('1');
setTimeout(() => console.log('2'), 1000);  // Không chờ 1 giây
console.log('3');
// Output: 1 3 2 (2 xuất hiện sau 1 giây)
```

### Non-Blocking

**Non-blocking** có nghĩa là một tác vụ chậm không "chặn" (block) các tác vụ khác. Khi gọi API hay đọc file, JavaScript giao việc đó cho browser API, rồi tiếp tục xử lý code tiếp theo. Khi browser API hoàn thành, JavaScript mới quay lại xử lý kết quả.

Đây là lý do browser vẫn phản hồi với user dù đang chờ dữ liệu từ server.

---

## 3. Event-Driven Programming

JavaScript theo mô hình **event-driven** — chương trình phản ứng với các sự kiện thay vì chạy theo trình tự cố định.

**Event** là hành động xảy ra trong hệ thống: user click, bàn phím nhập, dữ liệu tải xong, timer kết thúc, lỗi xảy ra...

Khi một event xảy ra, nó kích hoạt **callback function** đã được đăng ký cho event đó:

```javascript
// Đăng ký lắng nghe event 'click' trên button
document.getElementById('btn').addEventListener('click', function() {
  console.log('Button được click!');
  // Hàm này chỉ chạy khi event click xảy ra
});

// Code tiếp tục chạy — không đợi user click
console.log('Đã đăng ký event listener');
```

Mô hình event-driven là nền tảng của toàn bộ lập trình bất đồng bộ trong JavaScript.

---

## 4. The Event Loop

Event loop là cơ chế giúp JavaScript — mặc dù single-threaded — xử lý được các tác vụ bất đồng bộ. Hiểu event loop giúp bạn dự đoán chính xác thứ tự thực thi của code.

### Các thành phần của JavaScript Runtime

```
┌─────────────────────────────────────────┐
│           JavaScript Engine             │
│                                         │
│  ┌──────────────┐  ┌─────────────────┐  │
│  │  Call Stack  │  │      Heap       │  │
│  │              │  │  (Objects,      │  │
│  │  foo()       │  │   Memory)       │  │
│  │  bar()       │  │                 │  │
│  └──────────────┘  └─────────────────┘  │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│              Browser / Node             │
│                                         │
│  Web APIs: setTimeout, fetch, DOM...    │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │         Message Queue          │   │
│  │  [callback1, callback2, ...]   │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
         ↑ Event Loop kiểm tra liên tục
```

**Call Stack** — nơi JavaScript thực thi code. Khi gọi function, frame mới được push vào stack. Khi function return, frame đó bị pop ra. Stack hoạt động theo nguyên tắc LIFO (Last In, First Out).

**Heap** — vùng nhớ lưu objects và variables.

**Message Queue (Task Queue)** — hàng đợi chứa các callback cần được thực thi. Khi timer hết hạn, API trả về kết quả, hay event xảy ra — callback tương ứng được đưa vào queue này.

**Event Loop** — vòng lặp liên tục kiểm tra: *"Call stack có rỗng không?"*. Nếu rỗng, lấy callback đầu tiên trong queue và đưa vào call stack để thực thi.

### Ví dụ step-by-step

```javascript
console.log('Start');        // 1

setTimeout(() => {
  console.log('Timeout');    // 3 (sau khi stack rỗng)
}, 0);

console.log('End');          // 2
```

1. `console.log('Start')` — push vào stack → thực thi → pop ra. In "Start"
2. `setTimeout(...)` — push vào stack → giao callback cho Web API → pop ra. Timer bắt đầu
3. `console.log('End')` — push vào stack → thực thi → pop ra. In "End"
4. Timer 0ms kết thúc → callback được đưa vào Message Queue
5. Event Loop thấy stack rỗng → lấy callback từ queue → thực thi. In "Timeout"

> Đây là lý do tại sao `setTimeout(..., 0)` không chạy ngay lập tức — callback vẫn phải qua queue và đợi stack rỗng.

### Run-to-Completion

Mỗi message trong queue được xử lý **hoàn toàn** trước khi message tiếp theo được xử lý. Một function đang chạy không thể bị ngắt giữa chừng bởi function khác — đây là "run-to-completion".

Điều này có nghĩa: nếu một function chạy quá lâu (tính toán phức tạp, vòng lặp lớn), nó sẽ block toàn bộ UI trong thời gian đó. Browser sẽ hiện cảnh báo "A script is taking too long to run".

---

## 5. Callback Functions

Callback là cách xử lý bất đồng bộ đầu tiên trong JavaScript. Một **callback function** là hàm được truyền như argument vào hàm khác, và sẽ được gọi khi tác vụ hoàn thành.

```javascript
// Ví dụ đơn giản
function fetchData(url, callback) {
  setTimeout(() => {
    const data = { name: 'Product A', price: 100 };
    callback(null, data);  // null = không có lỗi
  }, 1000);
}

fetchData('https://api.example.com/product', function(error, data) {
  if (error) {
    console.error('Lỗi:', error);
    return;
  }
  console.log('Dữ liệu:', data);
});
```

### Callback Hell — Pyramid of Doom

Vấn đề xảy ra khi nhiều tác vụ bất đồng bộ phụ thuộc vào nhau:

```javascript
// Lấy user → lấy orders của user → lấy chi tiết order đầu tiên → tính total
getUser(userId, function(err, user) {
  if (err) { handleError(err); return; }
  
  getOrders(user.id, function(err, orders) {
    if (err) { handleError(err); return; }
    
    getOrderDetails(orders[0].id, function(err, details) {
      if (err) { handleError(err); return; }
      
      calculateTotal(details, function(err, total) {
        if (err) { handleError(err); return; }
        
        console.log('Total:', total);
        // Có thể còn thêm tầng nữa...
      });
    });
  });
});
```

Code này gọi là "Pyramid of Doom" — hình dạng tam giác chúc đầu, khó đọc, khó debug, khó handle error đúng cách. Đây là lý do Promises ra đời.

---

## 6. Promises

**Promise** đại diện cho một giá trị **sẽ có trong tương lai**. Nó là object mô tả kết quả của tác vụ bất đồng bộ — kết quả đó có thể là thành công hoặc thất bại.

### Các trạng thái của Promise

```
┌──────────┐
│ Pending  │ → đang chờ kết quả
└──────────┘
      │
      ├──── thành công ──→ ┌───────────┐
      │                    │ Fulfilled │
      │                    └───────────┘
      │
      └──── thất bại ───→ ┌──────────┐
                          │ Rejected │
                          └──────────┘
```

### Tạo và dùng Promise

```javascript
// Tạo Promise
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ id, name: 'Quyen' });   // Thành công
      } else {
        reject(new Error('Invalid ID'));   // Thất bại
      }
    }, 1000);
  });
}

// Consume Promise với .then() và .catch()
fetchUser(1)
  .then(user => {
    console.log('User:', user);
    return fetchOrders(user.id);   // Trả về Promise mới
  })
  .then(orders => {
    console.log('Orders:', orders);
    return getOrderDetails(orders[0].id);
  })
  .then(details => {
    console.log('Details:', details);
  })
  .catch(error => {
    console.error('Lỗi:', error);  // Bắt lỗi từ bất kỳ bước nào
  })
  .finally(() => {
    console.log('Luôn chạy dù thành công hay thất bại');
  });
```

So với callback hell, Promise chain dễ đọc hơn nhiều — các bước nằm ngang thay vì lồng sâu, và có một điểm `.catch()` duy nhất để xử lý lỗi.

### Promise.all — Chạy song song

Khi nhiều tác vụ không phụ thuộc nhau, chạy song song sẽ nhanh hơn:

```javascript
// Chạy tuần tự: mất 3s (1s + 1s + 1s)
const user = await fetchUser(1);
const products = await fetchProducts();
const settings = await fetchSettings();

// Chạy song song: mất ~1s (tất cả chạy cùng lúc)
const [user, products, settings] = await Promise.all([
  fetchUser(1),
  fetchProducts(),
  fetchSettings()
]);
```

> Chỉ dùng `Promise.all` khi các tác vụ độc lập nhau. Nếu một tác vụ cần kết quả của tác vụ trước, phải chạy tuần tự.

---

## 7. Async/Await

`async/await` là cú pháp xây trên Promises, nhưng cho phép viết code bất đồng bộ trông giống code đồng bộ. Dưới hood vẫn là Promise.

```javascript
// Cùng logic với Promise chain ở trên, nhưng viết bằng async/await
async function loadUserData(userId) {
  try {
    const user = await fetchUser(userId);    // Đợi Promise resolve
    console.log('User:', user);
    
    const orders = await fetchOrders(user.id);
    console.log('Orders:', orders);
    
    const details = await getOrderDetails(orders[0].id);
    console.log('Details:', details);
    
    return details;
  } catch (error) {
    console.error('Lỗi:', error);   // Bắt lỗi bằng try/catch quen thuộc
  }
}

loadUserData(1);
```

### Quy tắc của async/await

**`async` function luôn trả về Promise** — dù bạn có `return` một giá trị bình thường:

```javascript
async function getNumber() {
  return 42;   // Thực ra trả về Promise.resolve(42)
}

getNumber().then(n => console.log(n));  // 42
```

**`await` chỉ dùng được bên trong `async` function** — không thể dùng ở top-level (trừ khi dùng top-level await trong modules):

```javascript
// Lỗi — không thể dùng await bên ngoài async function
const data = await fetch('https://api.example.com');  // SyntaxError

// Đúng
async function main() {
  const data = await fetch('https://api.example.com');
}
```

### Xử lý lỗi đúng cách

```javascript
async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      if (i === retries - 1) throw error;  // Hết lần retry → throw
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));  // Chờ trước khi retry
    }
  }
}
```

---

## 8. So Sánh Ba Cách Tiếp Cận

| | Callback | Promise | Async/Await |
|---|---|---|---|
| **Introduced** | Từ đầu JS | ES6 (2015) | ES2017 |
| **Cú pháp** | Lồng nhau | Chain `.then()` | Giống synchronous |
| **Error handling** | `if (err)` ở mỗi bước | `.catch()` một lần | `try/catch` |
| **Readable** | Kém (nếu nhiều cấp) | Khá | Tốt nhất |
| **Debug** | Khó | Trung bình | Dễ |
| **Dùng khi** | Simple callbacks, event handlers | Khi cần `.race()`, `.all()` | Hầu hết trường hợp |

**Quy tắc thực tế:**

- Dùng **async/await** cho hầu hết mọi tác vụ bất đồng bộ — code dễ đọc nhất
- Dùng **Promise** trực tiếp khi cần `Promise.all()`, `Promise.race()`, `Promise.allSettled()`
- Dùng **callback** khi làm việc với event listeners hoặc API cũ không trả Promise

```javascript
// Async/await + Promise.all kết hợp — best of both worlds
async function loadDashboard(userId) {
  // Chạy song song với Promise.all, nhưng await để lấy kết quả
  const [user, notifications, stats] = await Promise.all([
    fetchUser(userId),
    fetchNotifications(userId),
    fetchStats(userId)
  ]);
  
  return { user, notifications, stats };
}
```

---

## 9. Parallel Processing và Web Workers

### Async ≠ Parallel

Có một hiểu lầm phổ biến: `setTimeout`, `fetch`, `async/await`... đều là bất đồng bộ, nhưng chúng **không phải là parallel programming**.

Bất đồng bộ trong JavaScript nghĩa là: code không bị block khi chờ kết quả. Nhưng JavaScript engine vẫn chỉ có **một thread** chạy code của bạn. Tại một thời điểm, chỉ một đoạn JavaScript được thực thi.

```
Async (non-blocking):
  Thread 1: [---JS code---][---callback---][---more code---]
  Web API:         [========= fetch =========]
  ↑ JS không block, nhưng vẫn chỉ có 1 thread JS

True Parallel:
  Thread 1: [---JS code---][---more code---]
  Thread 2:    [===heavy computation===]
  ↑ Hai luồng chạy thực sự đồng thời
```

### Web Workers — True Parallelism

**Web Worker** cho phép chạy JavaScript ở một thread riêng biệt, song song với main thread. Đây là cách duy nhất để có **true parallel execution** trong browser.

```javascript
// main.js — Tạo và giao tiếp với worker
const worker = new Worker('worker.js');

// Gửi dữ liệu sang worker
worker.postMessage({ data: largeArray, operation: 'sort' });

// Nhận kết quả từ worker (không block main thread)
worker.onmessage = function(event) {
  console.log('Kết quả từ worker:', event.data);
  renderResults(event.data);
};

worker.onerror = function(error) {
  console.error('Worker error:', error);
};
```

```javascript
// worker.js — Chạy ở thread riêng
self.onmessage = function(event) {
  const { data, operation } = event.data;
  
  let result;
  if (operation === 'sort') {
    // Tính toán nặng — không ảnh hưởng main thread
    result = heavySort(data);
  }
  
  // Gửi kết quả về main thread
  self.postMessage(result);
};
```

> Web Worker không thể truy cập DOM — không dùng được `document`, `window`. Giao tiếp với main thread chỉ qua `postMessage()`. Data được copy (không phải share) khi gửi qua postMessage.

### Ba loại Worker

**Dedicated Worker** — chỉ một script dùng được:
```javascript
const worker = new Worker('worker.js');
// Chỉ script này kết nối được với worker
```

**Shared Worker** — nhiều tab/script trong cùng domain dùng chung:
```javascript
const worker = new SharedWorker('shared-worker.js');
worker.port.start();
worker.port.postMessage('Hello from tab 1');
// Tab khác cũng kết nối được cùng worker instance
```

**Service Worker** — proxy network, chạy ngay cả khi không có tab nào mở:
```javascript
// Đăng ký service worker
navigator.serviceWorker.register('/sw.js').then(registration => {
  console.log('SW registered:', registration);
});
```
Service Worker là nền tảng của **Progressive Web Apps (PWA)** — cho phép app hoạt động offline, push notification, background sync.

### Khi nào dùng Web Worker?

- **Tính toán nặng**: sort/filter mảng lớn, xử lý ảnh, cryptography
- **Parse dữ liệu lớn**: parse CSV/JSON nhiều MB
- **Real-time processing**: audio/video processing, game physics

```javascript
// Ví dụ thực tế: xử lý ảnh không block UI
const imageWorker = new Worker('image-processor.js');

document.getElementById('upload').addEventListener('change', (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  
  reader.onload = (e) => {
    // Giao cho worker xử lý — UI vẫn responsive
    imageWorker.postMessage({
      imageData: e.target.result,
      filters: ['grayscale', 'blur']
    });
  };
  
  reader.readAsArrayBuffer(file);
});

imageWorker.onmessage = (e) => {
  displayProcessedImage(e.data);
};
```

---

## Tóm Tắt

JavaScript giải quyết bài toán single-threaded không phải bằng cách thêm thread, mà bằng event loop — một cơ chế thông minh cho phép xử lý nhiều tác vụ mà không block UI.

Lộ trình học bất đồng bộ:

1. **Hiểu event loop** — biết tại sao và khi nào code chạy theo thứ tự nào
2. **Callback** — nền tảng của event-driven programming
3. **Promise** — giải quyết callback hell, cú pháp sạch hơn
4. **Async/await** — viết code bất đồng bộ như synchronous
5. **Web Workers** — khi thực sự cần chạy song song

Trong thực tế làm việc với Next.js hay React, bạn sẽ dùng async/await hàng ngày — fetch dữ liệu từ API, đọc database, xử lý form. Hiểu rõ event loop giúp bạn debug các vấn đề về timing và thứ tự thực thi một cách tự tin.
