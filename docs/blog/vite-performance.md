# Vite 性能优化指南

Vite 以快速的开发体验著称，但在大型项目中仍有一些优化空间。

## 开发环境优化

### 1. 减少全量重新编译

Vite 使用 esbuild 进行预构建，但某些情况下仍会触发全量重编译：

```typescript
// vite.config.ts
export default defineConfig({
  optimizeDeps: {
    // 预构建包含这些依赖
    include: ['vue', 'vue-router', 'pinia'],
    // 排除不需要预构建的
    exclude: ['your-local-package'],
  },
})
```

### 2. 使用别名避免深层导入

```typescript
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
  },
})
```

### 3. 按需编译

利用 Vite 的按需编译特性，避免引入不需要的代码：

```typescript
// 不要这样
import _ from 'lodash'

// 应该这样
import debounce from 'lodash-es/debounce'
```

## 构建优化

### 1. 代码分割

```typescript
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          'ui-vendor': ['element-plus'],
        },
      },
    },
  },
})
```

### 2. 压缩配置

```typescript
export default defineConfig({
  build: {
    minify: 'terser', // 使用 terser 获得更好的压缩
    terserOptions: {
      compress: {
        drop_console: true, // 移除 console
        drop_debugger: true,
      },
    },
  },
})
```

### 3. 启用 brotli 压缩

```typescript
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
  ],
})
```

### 4. 图片优化

```typescript
import viteImagemin from 'vite-plugin-imagemin'

export default defineConfig({
  plugins: [
    viteImagemin({
      gifsicle: { optimizationLevel: 7 },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 80 },
      pngquant: { quality: [0.8, 0.9] },
    }),
  ],
})
```

## 分析构建产物

### 使用 rollup-plugin-visualizer

```typescript
import visualizer from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    visualizer({
      open: true,
      filename: 'stats.html',
      gzipSize: true,
    }),
  ],
})
```

运行 `npm run build` 后会自动生成 `stats.html`，可视化展示各模块体积。

### 分析依赖

```bash
# 分析预构建依赖
npx vite optimizeDeps --force

# 使用 rollup-plugin-visualizer 查看
npx vite build
```

## 性能监控

### 使用 Lighthouse

```bash
npm install -g lighthouse
lighthouse http://localhost:5173 --output html --view
```

### 使用 Web Vitals

```typescript
import { onCLS, onFID, onLCP } from 'web-vitals'

onCLS(console.log)
onFID(console.log)
onLCP(console.log)
```

## 优化清单

| 优化项 | 效果 | 难度 |
|--------|------|------|
| 按需引入 | ⭐⭐⭐ | 低 |
| 代码分割 | ⭐⭐⭐ | 中 |
| 图片压缩 | ⭐⭐ | 低 |
| gzip/brotli | ⭐⭐ | 低 |
| 移除 console | ⭐ | 低 |
| 预构建优化 | ⭐⭐ | 低 |

## 总结

Vite 本身已经很快，但在大型项目中合理的优化仍然必要。重点关注依赖引入、代码分割和资源压缩三个方面。
