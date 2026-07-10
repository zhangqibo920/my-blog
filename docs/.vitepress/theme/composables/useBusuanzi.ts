import { onMounted } from 'vue'
import { useRouter } from 'vitepress'

export function useBusuanzi() {
  const router = useRouter()

  onMounted(() => {
    router.onAfterRouteChanged(() => {
      // Busuanzi script in <head> handles initial load.
      // On SPA navigation, re-inject to update page PV.
      const old = document.getElementById('busuanzi_dynamic_script')
      if (old) old.remove()

      const script = document.createElement('script')
      script.id = 'busuanzi_dynamic_script'
      script.async = true
      script.src = '//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js'
      document.head.appendChild(script)
    })
  })
}
