---
title: Vue3组合式API入门
date: 2026-07-07 09:00:00
tags: [Vue.js, Vue3, 前端框架]
categories: [前端开发]
---

## 什么是组合式 API

Vue3 引入了组合式 API（Composition API），它是一种基于函数的 API，让我们可以更灵活地组织组件逻辑。

## setup 函数

```vue
<script>
import { ref, computed } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const doubleCount = computed(() => count.value * 2)

    function increment() {
      count.value++
    }

    return {
      count,
      doubleCount,
      increment
    }
  }
}
</script>
```

## 响应式数据

### ref

用于创建基本类型的响应式数据：

```javascript
import { ref } from 'vue'

const count = ref(0)
console.log(count.value) // 0
count.value++ // 修改值
```

### reactive

用于创建对象类型的响应式数据：

```javascript
import { reactive } from 'vue'

const state = reactive({
  name: '张三',
  age: 25
})

state.age++ // 直接修改属性
```

## 生命周期钩子

```javascript
import { onMounted, onUnmounted } from 'vue'

export default {
  setup() {
    onMounted(() => {
      console.log('组件已挂载')
    })

    onUnmounted(() => {
      console.log('组件已卸载')
    })
  }
}
```

## 组件通信

### Props

```vue
<template>
  <div>{{ message }}</div>
</template>

<script>
export default {
  props: {
    message: String
  }
}
</script>
```

### Emits

```vue
<script>
export default {
  emits: ['update'],
  setup(props, { emit }) {
    function handleClick() {
      emit('update', newValue)
    }
    return { handleClick }
  }
}
</script>
```

## 总结

组合式 API 让代码组织更加灵活，逻辑复用更加方便，是 Vue3 最重要的特性之一。
