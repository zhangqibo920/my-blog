# 栈里拾光

个人技术博客，基于 [VitePress](https://vitepress.dev/) 构建，部署在 [Cloudflare Pages](https://pages.cloudflare.com/)。

## 本地开发

```bash
npm install
npm run docs:dev
```

## 构建

```bash
npm run docs:build
npm run docs:preview
```

## 部署

推送到 `main` 分支自动触发 GitHub Actions，构建后通过 Wrangler 部署到 Cloudflare Pages。
