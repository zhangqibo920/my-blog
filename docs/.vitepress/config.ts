import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '栈里拾光',
  description: '个人技术博客 - 记录编程心得、学习笔记与开源实践',
  lang: 'zh-CN',

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],

  themeConfig: {
    siteTitle: '栈里拾光',

    nav: [
      { text: '首页', link: '/' },
      {
        text: '博客',
        items: [
          { text: '全部文章', link: '/blog/' },
          { text: 'Vue 技术', link: '/blog/vue-composition-api' },
          { text: 'TypeScript', link: '/blog/typescript-utility-types' },
        ],
      },
      { text: '札记', link: '/notes/' },
      { text: '项目经历', link: '/projects/' },
      { text: '关于', link: '/about' },
    ],

    sidebar: {
      '/blog/': [
        {
          text: '前端开发',
          items: [
            { text: 'Vue 3 组合式 API', link: '/blog/vue-composition-api' },
            { text: 'TypeScript 工具类型', link: '/blog/typescript-utility-types' },
            { text: 'CSS 容器查询实战', link: '/blog/css-container-queries' },
          ],
        },
        {
          text: '工程化',
          items: [
            { text: 'Vite 性能优化', link: '/blog/vite-performance' },
            { text: 'Monorepo 最佳实践', link: '/blog/monorepo-practices' },
          ],
        },
      ],
      '/projects/': [
        {
          text: '项目列表',
          items: [
            { text: '全部项目', link: '/projects/' },
            { text: '企业级管理后台', link: '/projects/admin' },
            { text: '微信小程序商城', link: '/projects/miniprogram' },
            { text: '跨端校园服务平台', link: '/projects/campus' },
          ],
        },
      ],
      '/notes/': [
        {
          text: '学习札记',
          items: [
            { text: '全部笔记', link: '/notes/' },
            { text: '2026-07-10 VitePress 博客搭建', link: '/notes/2026-07-10' },
            { text: '2026-07-09 CSS 容器查询', link: '/notes/2026-07-09' },
            { text: '2026-07-08 Vue 3 组合式 API', link: '/notes/2026-07-08' },
            { text: '2026-07-07 Spring Boot 自动配置', link: '/notes/2026-07-07' },
            { text: '2026-07-06 TypeScript 工具类型', link: '/notes/2026-07-06' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/zhangqibo920' },
    ],

    search: {
      provider: 'local',
    },

    editLink: {
      pattern: 'https://github.com/zhangqibo920/my-blog/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页',
    },

    footer: {
      message: '基于 VitePress 构建',
      copyright: '© 2024-2026 栈里拾光',
    },

    outline: {
      label: '页面导航',
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
  },
})
