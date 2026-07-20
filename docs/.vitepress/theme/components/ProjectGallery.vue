<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

const props = defineProps<{
  folder: string
  images: { file: string; alt: string }[]
}>()

const scrollContainer = ref<HTMLElement | null>(null)
const activeIndex = ref(0)

const imageList = computed(() =>
  props.images.map((img) => ({
    src: `${props.folder}/${img.file}`,
    alt: img.alt,
  }))
)

function updateActive() {
  const container = scrollContainer.value
  if (!container) return
  const containerRect = container.getBoundingClientRect()
  const centerX = containerRect.left + containerRect.width / 2
  let closestIndex = 0
  let minDist = Infinity
  const imgs = container.querySelectorAll('img')
  imgs.forEach((img, i) => {
    const rect = img.getBoundingClientRect()
    const imgCenter = rect.left + rect.width / 2
    const dist = Math.abs(imgCenter - centerX)
    if (dist < minDist) {
      minDist = dist
      closestIndex = i
    }
  })
  activeIndex.value = closestIndex
}

onMounted(() => {
  scrollContainer.value?.addEventListener('scroll', updateActive, { passive: true })
  window.addEventListener('resize', updateActive)
  updateActive()
})

onUnmounted(() => {
  scrollContainer.value?.removeEventListener('scroll', updateActive)
  window.removeEventListener('resize', updateActive)
})
</script>

<template>
  <div class="project-gallery">
    <div class="project-screenshots" ref="scrollContainer">
      <img
        v-for="(img, i) in imageList"
        :key="i"
        :src="img.src"
        :alt="img.alt"
        data-zoomable
        loading="lazy"
        width="800"
        height="600"
      >
    </div>
    <div class="project-indicators">
      <span
        v-for="(_, i) in imageList"
        :key="i"
        class="indicator"
        :class="{ active: activeIndex === i }"
      ></span>
    </div>
  </div>
</template>

<style scoped>
.project-gallery {
  margin: 20px 0;
}

.project-screenshots {
  display: flex;
  gap: 24px;
  justify-content: center;
  flex-wrap: wrap;
}

.project-screenshots img {
  flex: 1;
  min-width: 0;
  height: 400px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  cursor: zoom-in;
  transition: transform 0.2s;
}

.project-screenshots img:hover {
  transform: scale(1.02);
}

.project-indicators {
  display: none;
}

@media (max-width: 1024px) {
  .project-screenshots img {
    height: 300px;
  }
}

@media (max-width: 768px) {
  .project-screenshots {
    flex-wrap: nowrap;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    gap: 12px;
    padding: 0 16px 12px;
    justify-content: flex-start;
  }

  .project-screenshots::-webkit-scrollbar {
    display: none;
  }

  .project-screenshots img {
    flex: none;
    width: 80%;
    height: auto;
    scroll-snap-align: center;
    object-fit: cover;
  }

  .project-indicators {
    display: flex;
    justify-content: center;
    gap: 8px;
    padding: 8px 0;
  }

  .project-indicators .indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--vp-c-bg-soft);
    transition: all 0.3s;
  }

  .project-indicators .indicator.active {
    width: 24px;
    border-radius: 4px;
    background: var(--vp-c-brand-1);
  }
}
</style>
