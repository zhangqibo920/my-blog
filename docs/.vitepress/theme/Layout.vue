<script setup>
import DefaultTheme from 'vitepress/theme'
import StatsFooter from './components/StatsFooter.vue'
import PageViews from './components/PageViews.vue'

const { Layout: DefaultLayout } = DefaultTheme
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
