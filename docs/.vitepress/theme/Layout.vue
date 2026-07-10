<script setup>
import DefaultTheme from 'vitepress/theme'
import StatsFooter from './components/StatsFooter.vue'
import PageViews from './components/PageViews.vue'
import { useBusuanzi } from './composables/useBusuanzi'

const { Layout: DefaultLayout } = DefaultTheme

useBusuanzi()
</script>

<template>
  <DefaultLayout>
    <template #doc-after>
      <PageViews />
    </template>
    <template #layout-bottom>
      <StatsFooter />
    </template>
  </DefaultLayout>
</template>
