---
title: JavaScript异步编程详解
date: 2026-07-09 10:00:00
tags: [JavaScript, 异步编程, Promise]
categories: [前端开发]
---

## 前言

JavaScript 的异步编程是前端开发中的核心概念之一。本文将从回调函数到 Promise，再到 async/await，带你全面理解 JavaScript 的异步编程模型。

## 回调函数

回调函数是最早的异步解决方案：

```javascript
function fetchData(callback) {
  setTimeout(() => {
    callback(null, { name: '张三', age: 25 });
  }, 1000);
}

fetchData((err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
```

### 回调地狱

当多个异步操作嵌套时，代码会变得难以维护：

```javascript
getData(function(a) {
  getMoreData(a, function(b) {
    getEvenMoreData(b, function(c) {
      console.log(c);
    });
  });
});
```

## Promise

Promise 是对回调函数的改进，提供了更清晰的异步处理方式：

```javascript
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ name: '张三', age: 25 });
    }, 1000);
  });
};

fetchData()
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

### Promise 链

```javascript
getData()
  .then(a => getMoreData(a))
  .then(b => getEvenMoreData(b))
  .then(c => console.log(c))
  .catch(err => console.error(err));
```

## async/await

async/await 是 Promise 的语法糖，让异步代码看起来像同步代码：

```javascript
async function fetchData() {
  try {
    const data = await getData();
    const moreData = await getMoreData(data);
    const result = await getEvenMoreData(moreData);
    console.log(result);
  } catch (err) {
    console.error(err);
  }
}
```

### 并行执行

使用 `Promise.all` 可以并行执行多个异步操作：

```javascript
async function fetchAll() {
  const [users, posts, comments] = await Promise.all([
    fetchUsers(),
    fetchPosts(),
    fetchComments()
  ]);
  return { users, posts, comments };
}
```

## 总结

- 回调函数：简单但容易造成回调地狱
- Promise：解决了回调地狱问题，但代码仍然不够简洁
- async/await：最优雅的异步解决方案，代码可读性最好

选择合适的异步编程方式，能让你的代码更加清晰和易于维护。
