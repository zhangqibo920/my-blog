<template>
  <div class="page-views" aria-label="文章阅读量统计">
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5M12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5m0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3"/></svg>
    阅读量 <span id="busuanzi_value_page_pv"></span>
  </div>
</template>

<style scoped>
.page-views {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: var(--vp-c-text-3);
  margin-top: 16px;
  padding: 4px 10px;
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
}
</style>
