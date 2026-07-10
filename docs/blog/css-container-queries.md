# CSS 容器查询实战

容器查询（Container Queries）是 CSS 近年来最令人期待的特性之一。它让组件可以根据父容器的尺寸来调整自身样式，而不仅仅是视口。

## 为什么需要容器查询

传统媒体查询基于视口宽度：

```css
/* 这个断点是基于整个页面宽度的 */
@media (min-width: 768px) {
  .card { flex-direction: row; }
}
```

但在组件化开发中，同一个组件可能出现在不同宽度的容器中（侧边栏、主内容区、弹窗）。容器查询完美解决了这个问题。

## 基本语法

### 1. 声明容器

```css
.card-wrapper {
  container-type: inline-size;
  container-name: card;
}
```

`container-type` 有三个值：
- `inline-size` — 只监听行内方向尺寸（最常用）
- `size` — 同时监听行内和块方向
- `normal` — 不作为容器

### 2. 容器查询

```css
@container card (min-width: 400px) {
  .card {
    flex-direction: row;
  }
  .card .image {
    width: 200px;
  }
}

@container card (max-width: 399px) {
  .card {
    flex-direction: column;
  }
}
```

## 实战：自适应卡片组件

```vue
<template>
  <div class="card-container">
    <div class="card">
      <img :src="cover" class="card-image" />
      <div class="card-body">
        <h3 class="card-title">{{ title }}</h3>
        <p class="card-desc">{{ description }}</p>
        <div class="card-meta">
          <span>{{ date }}</span>
          <span>{{ readingTime }} 分钟阅读</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-container {
  container-type: inline-size;
  container-name: card;
}

.card {
  display: flex;
  gap: 16px;
  padding: 16px;
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
}

.card-body {
  flex: 1;
}

.card-title {
  margin: 0 0 8px;
  font-size: 1.25rem;
}

.card-desc {
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0 0 12px;
}

.card-meta {
  display: flex;
  gap: 12px;
  font-size: 0.875rem;
  color: var(--vp-c-text-3);
}

/* 宽容器：横向布局 */
@container card (min-width: 500px) {
  .card-image {
    width: 240px;
    height: 160px;
    flex-shrink: 0;
  }

  .card-title {
    font-size: 1.5rem;
  }
}

/* 窄容器：纵向布局 */
@container card (max-width: 499px) {
  .card {
    flex-direction: column;
  }

  .card-image {
    height: 180px;
  }
}
</style>
```

## 容器查询单位

容器查询引入了新的相对单位：

| 单位 | 说明 |
|------|------|
| `cqw` | 容器宽度的 1% |
| `cqh` | 容器高度的 1% |
| `cqi` | 容器行内方向尺寸的 1% |
| `cqb` | 容器块方向尺寸的 1% |
| `cqmin` | cqi 和 cqb 中较小的 |
| `cqmax` | cqi 和 cqb 中较大的 |

```css
.card-title {
  /* 根据容器宽度动态调整字号 */
  font-size: clamp(1rem, 3cqi, 1.5rem);
}
```

## 容器查询 vs 媒体查询

| 特性 | 容器查询 | 媒体查询 |
|------|---------|---------|
| 基于 | 父容器尺寸 | 视口尺寸 |
| 组件复用 | 高（自适应） | 低（需手动适配） |
| 浏览器支持 | Chrome 105+, Firefox 110+ | 全部 |
| 适用场景 | 组件级响应式 | 页面级响应式 |

## 浏览器兼容性

截至 2026 年，容器查询已获得所有主流浏览器支持。对于旧浏览器可以使用 polyfill：

```css
/* 降级方案 */
.card {
  flex-direction: column;
}

@supports (container-type: inline-size) {
  .card-container {
    container-type: inline-size;
  }

  @container (min-width: 500px) {
    .card {
      flex-direction: row;
    }
  }
}
```

## 总结

容器查询让组件真正做到了「自适应」，是组件化开发的重要拼图。建议在新项目中积极使用，逐步替代视口级别的媒体查询。
