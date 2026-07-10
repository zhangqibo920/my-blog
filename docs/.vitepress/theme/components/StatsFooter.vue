<template>
  <div class="stats-footer">
    <div class="stats-inner">
      <span class="stats-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5M12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5m0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3"/></svg>
        总访问量 <span id="busuanzi_value_site_pv"></span>
      </span>
      <span class="stats-divider">|</span>
      <span class="stats-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path fill="currentColor" d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3m-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3m0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5m8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5"/></svg>
        访客数 <span id="busuanzi_value_site_uv"></span>
      </span>
    </div>
  </div>
</template>

<style scoped>
.stats-footer {
  border-top: 1px solid var(--vp-c-divider);
  padding: 16px 0;
  text-align: center;
  font-size: 13px;
  color: var(--vp-c-text-3);
}

.stats-inner {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.stats-item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.stats-divider {
  color: var(--vp-c-divider);
}
</style>
