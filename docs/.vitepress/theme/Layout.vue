<script setup lang="ts">
import { onMounted, nextTick, watch } from 'vue'
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import StatsFooter from './components/StatsFooter.vue'
import PageViews from './components/PageViews.vue'
import ArticleMeta from './components/ArticleMeta.vue'
import { useBusuanzi } from './composables/useBusuanzi'
import { useMediumZoom } from './composables/useMediumZoom'

const { Layout: DefaultLayout } = DefaultTheme

useBusuanzi()
useMediumZoom()

const route = useRoute()
const processed = new WeakSet<Node>()

function switchTab(btn: HTMLElement, diagramWrap: HTMLElement, codeWrap: HTMLElement, show: 'diagram' | 'code') {
  if (show === 'diagram') {
    btn.classList.remove('code-active')
    diagramWrap.style.visibility = 'visible'
    diagramWrap.style.position = 'relative'
    codeWrap.style.visibility = 'hidden'
    codeWrap.style.position = 'absolute'
  } else {
    btn.classList.add('code-active')
    codeWrap.style.visibility = 'visible'
    codeWrap.style.position = 'relative'
    diagramWrap.style.visibility = 'hidden'
    diagramWrap.style.position = 'absolute'
  }
}

async function renderMermaid() {
  const mod = await import('mermaid')
  const mermaid = mod.default
  mermaid.initialize({ startOnLoad: false, theme: 'default', securityLevel: 'loose' })

  const allPres = document.querySelectorAll('pre')
  for (const pre of allPres) {
    if (processed.has(pre)) continue

    const parent = pre.parentElement
    if (!parent) continue
    const pClass = parent.className || ''
    const preClass = pre.className || ''
    const codeEl = pre.querySelector('code')
    const codeClass = codeEl?.className || ''
    if (!pClass.includes('mermaid') && !preClass.includes('mermaid') && !codeClass.includes('mermaid')) continue

    const code = (codeEl || pre).textContent?.trim() || ''
    if (!code) continue

    const firstLine = code.split('\n')[0].trim()
    if (!/^(flowchart|sequenceDiagram|graph|classDiagram|stateDiagram|gantt|pie|erDiagram|journey|mindmap|xychart|block-beta|sankey-beta)/.test(firstLine)) continue

    processed.add(pre)

    const container = document.createElement('div')
    container.className = 'mermaid-toggle'

    const btn = document.createElement('button')
    btn.className = 'mermaid-toggle-btn'
    btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>'

    const diagramWrap = document.createElement('div')
    diagramWrap.className = 'mermaid-diagram'
    diagramWrap.style.visibility = 'hidden'
    diagramWrap.style.position = 'absolute'

    const codeWrap = document.createElement('div')
    codeWrap.className = 'mermaid-code'
    codeWrap.style.visibility = 'hidden'
    codeWrap.style.position = 'absolute'
    codeWrap.appendChild(pre.cloneNode(true))

    container.appendChild(btn)
    container.appendChild(diagramWrap)
    container.appendChild(codeWrap)

    // 先挂载到 DOM
    parent.replaceWith(container)

    // 渲染 Mermaid
    const id = `mermaid-${Math.random().toString(36).slice(2, 8)}`
    try {
      const { svg } = await mermaid.render(id, code)
      diagramWrap.innerHTML = svg
      let current: 'diagram' | 'code' = 'diagram'
      btn.addEventListener('click', () => {
        current = current === 'diagram' ? 'code' : 'diagram'
        switchTab(btn, diagramWrap, codeWrap, current)
      })
      switchTab(btn, diagramWrap, codeWrap, 'diagram')
    } catch (e: any) {
      diagramWrap.innerHTML = `<pre style="color:red;padding:16px;white-space:pre-wrap">Mermaid error: ${e.message}</pre>`
      let current: 'diagram' | 'code' = 'diagram'
      btn.addEventListener('click', () => {
        current = current === 'diagram' ? 'code' : 'diagram'
        switchTab(btn, diagramWrap, codeWrap, current)
      })
      switchTab(btn, diagramWrap, codeWrap, 'diagram')
    }
  }
}

function widenNotesContent() {
  nextTick(() => {
    const isNotes = route.path === '/notes/' || route.path === '/notes/index.html'
    const containers = document.querySelectorAll('.VPDoc .content-container, .VPDoc > .container')
    containers.forEach((el) => {
      ;(el as HTMLElement).style.maxWidth = isNotes ? '100%' : ''
    })
  })
}

onMounted(() => {
  nextTick(() => {
    setTimeout(() => {
      renderMermaid()
      widenNotesContent()
    }, 500)
  })
})

watch(() => route.path, () => {
  nextTick(() => {
    setTimeout(() => {
      renderMermaid()
      widenNotesContent()
    }, 500)
  })
})
</script>

<template>
  <DefaultLayout>
    <template #doc-before>
      <ArticleMeta />
    </template>
    <template #doc-after>
      <PageViews />
    </template>
    <template #layout-bottom>
      <StatsFooter />
    </template>
  </DefaultLayout>
</template>
