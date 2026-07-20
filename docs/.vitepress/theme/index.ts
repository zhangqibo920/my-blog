import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import ProjectGallery from './components/ProjectGallery.vue'
import NoteHeatmap from './components/NoteHeatmap.vue'
import ArticleMeta from './components/ArticleMeta.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('ProjectGallery', ProjectGallery)
    app.component('NoteHeatmap', NoteHeatmap)
    app.component('ArticleMeta', ArticleMeta)
  },
}
