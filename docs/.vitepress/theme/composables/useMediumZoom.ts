import { onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'
import mediumZoom from 'medium-zoom'

let zoomInstance: ReturnType<typeof mediumZoom> | null = null

function initZoom() {
  if (zoomInstance) {
    zoomInstance.detach()
    zoomInstance = null
  }

  zoomInstance = mediumZoom('[data-zoomable]', {
    background: 'rgba(0, 0, 0, 0.9)',
    margin: 40,
  })
}

export function useMediumZoom() {
  const route = useRoute()

  onMounted(() => {
    initZoom()
  })

  watch(() => route.path, () => {
    nextTick(() => {
      initZoom()
    })
  })
}
