# Vue 3 组合式 API 深度指南

组合式 API（Composition API）是 Vue 3 最重要的特性之一。本文将深入探讨其核心概念和最佳实践。

## 为什么需要组合式 API

在 Vue 2 的选项式 API 中，相关逻辑被分散在 `data`、`methods`、`computed`、`watch` 等不同选项中。随着组件变得复杂，代码会越来越难维护。

```javascript
// 选项式 API - 逻辑分散
export default {
  data() {
    return { count: 0, name: '' }
  },
  computed: {
    doubleCount() { return this.count * 2 }
  },
  methods: {
    increment() { this.count++ }
  },
  watch: {
    count(newVal) { console.log(newVal) }
  }
}
```

组合式 API 将相关逻辑组织在一起：

```vue
<script setup>
import { ref, computed, watch } from 'vue'

const count = ref(0)
const name = ref('')

const doubleCount = computed(() => count.value * 2)

function increment() {
  count.value++
}

watch(count, (newVal) => {
  console.log(newVal)
})
</script>
```

## 核心 API

### ref 与 reactive

```typescript
import { ref, reactive } from 'vue'

// ref - 用于基本类型
const count = ref(0)
console.log(count.value) // 0

// reactive - 用于对象
const state = reactive({
  name: '张三',
  age: 25
})
console.log(state.name) // 张三
```

**选择建议**: 大多数场景使用 `ref` 即可，`reactive` 适合复杂嵌套对象。

### computed

```typescript
import { ref, computed } from 'vue'

const firstName = ref('张')
const lastName = ref('三')

// 只读 computed
const fullName = computed(() => `${firstName.value}${lastName.value}`)

// 可写 computed
const writableFullName = computed({
  get: () => `${firstName.value}${lastName.value}`,
  set: (value: string) => {
    firstName.value = value[0]
    lastName.value = value.slice(1)
  }
})
```

### watch 与 watchEffect

```typescript
import { ref, watch, watchEffect } from 'vue'

const keyword = ref('')

// watch - 明确指定监听源
watch(keyword, (newVal, oldVal) => {
  console.log(`从 ${oldVal} 变为 ${newVal}`)
})

// watchEffect - 自动追踪依赖
watchEffect(() => {
  console.log(`当前关键词: ${keyword.value}`)
})

// 监听多个源
watch([keyword, count], ([newKeyword, newCount]) => {
  console.log(newKeyword, newCount)
})
```

### 生命周期钩子

```typescript
import { onMounted, onUpdated, onUnmounted } from 'vue'

onMounted(() => {
  console.log('组件已挂载')
})

onUpdated(() => {
  console.log('组件已更新')
})

onUnmounted(() => {
  console.log('组件已卸载')
})
```

## 组合式函数（Composables）

组合式函数是复用有状态逻辑的推荐方式：

```typescript
// composables/useCounter.ts
import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  const doubleCount = computed(() => count.value * 2)

  function increment() { count.value++ }
  function decrement() { count.value-- }
  function reset() { count.value = initialValue }

  return { count, doubleCount, increment, decrement, reset }
}
```

使用：

```vue
<script setup>
import { useCounter } from './composables/useCounter'

const { count, doubleCount, increment } = useCounter(10)
</script>

<template>
  <p>计数: {{ count }}，双倍: {{ doubleCount }}</p>
  <button @click="increment">+1</button>
</template>
```

## 最佳实践

1. **使用 `<script setup>`** — 编译时语法糖，更简洁
2. **ref 优于 reactive** — ref 类型推断更好，使用更一致
3. **组合式函数命名以 `use` 开头** — 遵循社区约定
4. **保持组合式函数职责单一** — 一个函数只做一件事
5. **避免解构 reactive 会丢失响应性** — 使用 `toRefs`

## 总结

组合式 API 让代码组织更灵活、逻辑复用更方便。掌握 `ref`、`computed`、`watch` 和组合式函数是写好 Vue 3 的关键。
