<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const { frontmatter, page } = useData()

const publishDate = computed(() => {
  const date = frontmatter.value.date
  if (!date) return null
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

const lastUpdated = computed(() => {
  const timestamp = page.value.lastUpdated
  if (!timestamp) return null
  return new Date(timestamp).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

const readingTime = computed(() => {
  const content = page.value.content || ''
  const wordsPerMinute = 200
  const wordCount = content.length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return minutes
})
</script>

<template>
  <div class="article-meta-bar">
    <div class="meta-left">
      <span v-if="publishDate" class="meta-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        发布于 {{ publishDate }}
      </span>
      <span v-if="lastUpdated" class="meta-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
        更新于 {{ lastUpdated }}
      </span>
    </div>
    <div class="meta-right">
      <span class="meta-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        约 {{ readingTime }} 分钟
      </span>
      <span class="meta-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        阅读 <span id="busuanzi_value_page_pv"></span>
      </span>
    </div>
  </div>
</template>

<style scoped>
.article-meta-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  padding: 12px 16px;
  margin: 20px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  font-size: 13px;
  color: var(--vp-c-text-3);
}

.meta-left,
.meta-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.meta-item svg {
  flex-shrink: 0;
  opacity: 0.7;
}

@media (max-width: 640px) {
  .article-meta-bar {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .meta-left,
  .meta-right {
    width: 100%;
    justify-content: flex-start;
  }
}
</style>
