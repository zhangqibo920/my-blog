---
title: 学习札记
description: 每天记录学习中的点滴，积累成长的足迹
---

# 学习札记

每天记录学习中的点滴，积累成长的足迹。

<NoteHeatmap />

<div class="timeline" role="list" aria-label="学习笔记时间轴">

<div class="timeline-item" role="listitem">
  <div class="timeline-dot"></div>
  <div class="timeline-date">2026-07-10</div>
  <div class="timeline-content">
    <a href="/notes/2026-07-10">VitePress 博客搭建完成</a>
    <p>从零搭建了个人技术博客，使用 VitePress + Cloudflare Pages 的方案。配置了自动部署、本地搜索、暗色模式等功能。</p>
    <div class="timeline-tags">
      <span class="tag">VitePress</span>
      <span class="tag">Cloudflare Pages</span>
    </div>
  </div>
</div>

<div class="timeline-item" role="listitem">
  <div class="timeline-dot"></div>
  <div class="timeline-date">2026-07-09</div>
  <div class="timeline-content">
    <a href="/notes/2026-07-09">学习 CSS 容器查询</a>
    <p>深入学习了 CSS Container Queries，理解了它和媒体查询的区别。容器查询让组件真正实现了"自适应"，是组件化开发的重要拼图。</p>
    <div class="timeline-tags">
      <span class="tag">CSS</span>
      <span class="tag">响应式设计</span>
    </div>
  </div>
</div>

<div class="timeline-item" role="listitem">
  <div class="timeline-dot"></div>
  <div class="timeline-date">2026-07-08</div>
  <div class="timeline-content">
    <a href="/notes/2026-07-08">Vue 3 组合式 API 复习</a>
    <p>重新梳理了 ref、computed、watch 等核心 API，练习了组合式函数的封装。组合式函数让逻辑复用变得非常优雅。</p>
    <div class="timeline-tags">
      <span class="tag">Vue 3</span>
      <span class="tag">Composition API</span>
    </div>
  </div>
</div>

<div class="timeline-item" role="listitem">
  <div class="timeline-dot"></div>
  <div class="timeline-date">2026-07-07</div>
  <div class="timeline-content">
    <a href="/notes/2026-07-07">Spring Boot 自动配置原理</a>
    <p>阅读了 Spring Boot 自动配置的源码，理解了 @EnableAutoConfiguration 的工作原理。核心是通过 spring.factories 加载配置类。</p>
    <div class="timeline-tags">
      <span class="tag">Spring Boot</span>
      <span class="tag">源码分析</span>
    </div>
  </div>
</div>

<div class="timeline-item" role="listitem">
  <div class="timeline-dot"></div>
  <div class="timeline-date">2026-07-06</div>
  <div class="timeline-content">
    <a href="/notes/2026-07-06">TypeScript 工具类型练习</a>
    <p>做了 TypeScript 类型体操练习，掌握了 Partial、Pick、Omit、Record 等工具类型的使用场景。类型编程的威力超乎想象。</p>
    <div class="timeline-tags">
      <span class="tag">TypeScript</span>
      <span class="tag">类型体操</span>
    </div>
  </div>
</div>

</div>

<style>
.timeline {
  position: relative;
  padding: 24px 0;
  margin: 20px 0;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 79px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--vp-c-divider);
}

.timeline-item {
  position: relative;
  display: flex;
  align-items: flex-start;
  margin-bottom: 32px;
}

.timeline-dot {
  position: absolute;
  left: 72px;
  top: 6px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  border: 3px solid var(--vp-c-bg);
  z-index: 1;
  transition: transform 0.25s;
}

.timeline-item:hover .timeline-dot {
  transform: scale(1.3);
}

.timeline-date {
  flex-shrink: 0;
  width: 60px;
  text-align: right;
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  padding-top: 2px;
}

.timeline-content {
  flex: 1;
  margin-left: 36px;
  padding: 16px 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  transition: border-color 0.25s, box-shadow 0.25s;
}

.timeline-content:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.timeline-content a {
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  text-decoration: none;
  margin-bottom: 6px;
}

.timeline-content a:hover {
  color: var(--vp-c-brand-1);
}

.timeline-content p {
  margin: 0 0 10px;
  font-size: 14px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.timeline-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.tag {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

@media (max-width: 768px) {
  .timeline::before {
    left: 11px;
  }

  .timeline-dot {
    left: 4px;
  }

  .timeline-date {
    width: auto;
    text-align: left;
    margin-bottom: 4px;
  }

  .timeline-item {
    flex-direction: column;
    padding-left: 30px;
  }

  .timeline-content {
    margin-left: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .timeline-dot,
  .timeline-content {
    transition: none !important;
  }
}
</style>
