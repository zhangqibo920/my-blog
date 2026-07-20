---
title: Monorepo 最佳实践
description: Monorepo 是将多个项目放在一个仓库中管理的方式
date: 2026-07-10
---

# Monorepo 最佳实践

Monorepo 是将多个项目放在一个仓库中管理的方式。本文介绍如何用 pnpm workspace 搭建 Monorepo 工程。

## 为什么选择 Monorepo

- **代码共享**: 公共包、工具函数、类型定义可以在项目间复用
- **原子提交**: 跨项目的改动可以一次提交
- **统一管理**: 依赖版本、构建配置、CI/CD 统一维护
- **开发体验**: 支持本地链接，实时预览修改效果

## 项目结构

```
my-project/
├── packages/
│   ├── shared/            # 公共工具包
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   ├── utils.ts
│   │   │   └── types.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── ui/                # UI 组件库
│   │   ├── src/
│   │   │   ├── components/
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── web/               # Web 应用
│   │   ├── src/
│   │   ├── package.json
│   │   └── vite.config.ts
│   └── cli/               # CLI 工具
│       ├── src/
│       └── package.json
├── pnpm-workspace.yaml
├── package.json
└── tsconfig.base.json
```

## 初始化

### 1. 配置 workspace

```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*'
```

### 2. 根 package.json

```json
{
  "name": "my-project",
  "private": true,
  "scripts": {
    "dev": "pnpm --filter web dev",
    "build": "pnpm -r build",
    "lint": "pnpm -r lint",
    "test": "pnpm -r test"
  },
  "devDependencies": {
    "typescript": "^5.4.0"
  }
}
```

### 3. 子包配置

```json
// packages/shared/package.json
{
  "name": "@my-project/shared",
  "version": "0.0.1",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {
    "build": "tsup src/index.ts --dts",
    "lint": "eslint src/"
  }
}
```

## 包间依赖

### 引用本地包

```json
// packages/web/package.json
{
  "dependencies": {
    "@my-project/shared": "workspace:*",
    "@my-project/ui": "workspace:*"
  }
}
```

`workspace:*` 表示引用 workspace 中的最新版本。

### 使用

```typescript
// packages/web/src/main.ts
import { formatDate } from '@my-project/shared'
import { Button } from '@my-project/ui'
```

## 常用命令

```bash
# 安装所有依赖
pnpm install

# 只在特定包中运行命令
pnpm --filter web dev
pnpm --filter @my-project/shared build

# 在所有包中运行命令
pnpm -r build
pnpm -r lint

# 添加依赖到特定包
pnpm --filter web add lodash-es
pnpm --filter web add -D @types/lodash-es

# 添加公共依赖到根目录
pnpm add -Dw typescript eslint prettier
```

## Turborepo 加速

Turborepo 可以缓存构建结果，大幅提升 CI 速度：

```json
// package.json
{
  "devDependencies": {
    "turbo": "^2.0.0"
  },
  "scripts": {
    "build": "turbo run build",
    "lint": "turbo run lint",
    "test": "turbo run test"
  }
}
```

```json
// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "lint": {},
    "test": {
      "dependsOn": ["build"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

## CI/CD 优化

### 只构建有变更的包

```yaml
# .github/workflows/ci.yml
- name: Get changed packages
  id: changed
  uses: tj-actions/changed-files@v44
  with:
    files_yaml: |
      packages/shared:
        - packages/shared/**

- name: Build shared
  if: steps.changed.outputs.packages_shared == 'true'
  run: pnpm --filter @my-project/shared build
```

### 缓存策略

```yaml
- name: Cache node_modules
  uses: actions/cache@v4
  with:
    path: |
      node_modules
      packages/*/node_modules
    key: ${{ runner.os }}-pnpm-${{ hashFiles('**/pnpm-lock.yaml') }}
```

## 最佳实践

1. **公共包保持精简** — 只放真正需要共享的代码
2. **明确包的边界** — 每个包有清晰的职责
3. **统一版本管理** — 使用 changesets 管理版本发布
4. **使用 TypeScript 项目引用** — 获得更好的类型支持
5. **CI 缓存** — 充分利用 Turborepo 缓存

## 总结

Monorepo 不是银弹，但对于需要共享代码的多项目场景，它能显著提升开发效率和代码质量。pnpm workspace + Turborepo 是目前最佳的实践组合。
