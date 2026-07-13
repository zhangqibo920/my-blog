<script setup lang="ts">
import { computed, ref, onMounted, nextTick } from 'vue'
import { ActivityCalendar } from 'vue-activity-calendar'
import 'vue-activity-calendar/style.css'
import { getNoteDates } from '../composables/noteData'

const isReady = ref(false)

const noteDates = computed(() => getNoteDates())

const currentYear = computed(() => new Date().getFullYear())

const calendarData = computed(() => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const startDate = new Date(today)
  startDate.setDate(startDate.getDate() - 364)

  const data: { date: string; count: number }[] = []
  const current = new Date(startDate)

  while (current <= today) {
    const dateStr = current.toISOString().slice(0, 10)
    data.push({
      date: dateStr,
      count: noteDates.value[dateStr] || 0,
    })
    current.setDate(current.getDate() + 1)
  }

  return data
})

const totalNotes = computed(() => Object.values(noteDates.value).reduce((s, n) => s + n, 0))
const activeDays = computed(() => Object.keys(noteDates.value).length)

const longestStreak = computed(() => {
  const dates = Object.keys(noteDates.value).sort()
  if (dates.length === 0) return 0
  
  let maxStreak = 1
  let currentStreak = 1
  
  for (let i = 1; i < dates.length; i++) {
    const prev = new Date(dates[i - 1])
    const curr = new Date(dates[i])
    const diffDays = Math.floor((curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) {
      currentStreak++
      maxStreak = Math.max(maxStreak, currentStreak)
    } else {
      currentStreak = 1
    }
  }
  
  return maxStreak
})

const currentStreak = computed(() => {
  const dates = Object.keys(noteDates.value).sort()
  if (dates.length === 0) return 0
  
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  let streak = 0
  let checkDate = new Date(today)
  
  while (true) {
    const dateStr = checkDate.toISOString().slice(0, 10)
    if (noteDates.value[dateStr]) {
      streak++
      checkDate.setDate(checkDate.getDate() - 1)
    } else {
      break
    }
  }
  
  return streak
})

const colors = ['#eef2f7', '#c5ddf0', '#9cc9e8', '#73a9d8', '#4a8bc2']

onMounted(() => {
  nextTick(() => {
    isReady.value = true
  })
})
</script>

<template>
  <div class="note-heatmap">
    <div class="heatmap-top">
      <span class="heatmap-title">贡献度</span>
      <span class="heatmap-year">{{ currentYear }}</span>
    </div>
    
    <div class="heatmap-container">
      <div v-show="isReady" class="heatmap-scroll">
        <ActivityCalendar
          :data="calendarData"
          :width="53"
          :height="7"
          :cell-length="11"
          :cell-interval="2"
          :colors="colors"
          :cell-border-radius="2"
          :font-size="12"
          :show-level-flag="false"
          :week-day-flag-text="['周一', '周二', '周三', '周四', '周五', '周六', '周日']"
        />
      </div>
    </div>
    
    <div class="heatmap-bottom">
      <div class="stats">
        <span class="stat-item">
          <span class="stat-value">{{ totalNotes }}</span>
          <span class="stat-label">次贡献</span>
        </span>
        <span class="stat-divider"></span>
        <span class="stat-item">
          <span class="stat-value">{{ longestStreak }}</span>
          <span class="stat-label">天最长连续</span>
        </span>
        <span class="stat-divider"></span>
        <span class="stat-item">
          <span class="stat-value">{{ currentStreak }}</span>
          <span class="stat-label">天连续贡献</span>
        </span>
      </div>
      <div class="legend">
        <span class="legend-text">少</span>
        <div class="legend-colors">
          <span v-for="(color, index) in colors" :key="index" class="legend-cell" :style="{ backgroundColor: color }"></span>
        </div>
        <span class="legend-text">多</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.note-heatmap {
  margin: 24px 0 36px;
  padding: 20px 24px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  background: var(--vp-c-bg);
  transition: box-shadow 0.3s ease;
  min-width: 0;
  box-sizing: border-box;
}

.note-heatmap:hover {
  box-shadow: 0 4px 20px rgba(115, 169, 216, 0.1);
}

.heatmap-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.heatmap-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.heatmap-year {
  font-size: 14px;
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.heatmap-container {
  min-height: 110px;
}

.heatmap-scroll {
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  margin: 0 -4px;
  padding: 0 4px;
  min-width: 0;
  animation: fadeIn 0.25s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.heatmap-scroll::-webkit-scrollbar {
  height: 6px;
}

.heatmap-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.heatmap-scroll::-webkit-scrollbar-thumb {
  background: var(--vp-c-divider);
  border-radius: 3px;
}

.heatmap-scroll::-webkit-scrollbar-thumb:hover {
  background: var(--vp-c-text-3);
}

.heatmap-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--vp-c-divider);
}

.stats {
  display: flex;
  align-items: center;
  gap: 16px;
}

.stat-item {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.stat-value {
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.stat-label {
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.stat-divider {
  width: 1px;
  height: 16px;
  background: var(--vp-c-divider);
}

.legend {
  display: flex;
  align-items: center;
  gap: 6px;
}

.legend-text {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.legend-colors {
  display: flex;
  gap: 2px;
}

.legend-cell {
  width: 11px;
  height: 11px;
  border-radius: 2px;
}

:deep(.activityCalendar .left) {
  width: 36px !important;
  flex-shrink: 0;
}

:deep(.activityCalendar .left > div) {
  font-size: 12px !important;
  color: var(--vp-c-text-3);
  font-weight: 400;
}

:deep(.activityCalendar .right) {
  padding: 4px 8px !important;
}

:deep(.activityCalendar .right .header) {
  padding: 0 0 18px !important;
  min-height: 20px;
}

:deep(.activityCalendar .right .header div) {
  font-size: 12px !important;
  color: var(--vp-c-text-3);
  font-weight: 400;
}

:deep(.activityCalendar) {
  color: var(--vp-c-text-2);
  background: transparent !important;
}

:deep(.activityCalendar .right .content .item:hover) {
  transform: scale(1.15);
}
</style>
