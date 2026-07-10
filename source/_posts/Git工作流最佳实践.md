---
title: Git工作流最佳实践
date: 2026-07-05 11:00:00
tags: [Git, 版本控制, 团队协作]
categories: [开发工具]
---

## 为什么要用 Git

Git 是目前最流行的分布式版本控制系统，可以帮助团队高效地协作开发。

## 分支策略

### Git Flow

```
main        ──────────────────────────── 生产环境
  │
develop     ──────────────────────────── 开发环境
  │   │
feature/xxx ──────────────────          功能分支
  │
release/x.x ──────────────────          发布分支
```

### GitHub Flow

更简单的分支策略，适合持续部署的项目：

1. 从 main 创建分支
2. 在分支上开发
3. 提交 Pull Request
4. 代码审查后合并

## 常用命令

```bash
# 创建并切换分支
git checkout -b feature/new-feature

# 暂存修改
git stash

# 恢复暂存
git stash pop

# 查看提交历史
git log --oneline --graph

# 变基
git rebase main
```

## Commit 规范

使用语义化的提交信息：

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 重构
- `test`: 测试相关
- `chore`: 构建/工具相关

```
feat: 添加用户登录功能
fix: 修复订单支付超时问题
docs: 更新 API 文档
```

## 总结

良好的 Git 工作流可以提高团队协作效率，减少代码冲突。
