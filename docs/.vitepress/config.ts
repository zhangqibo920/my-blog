import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '栈里拾光',
  description: '个人技术博客 - 记录编程心得、学习笔记与开源实践',
  lang: 'zh-CN',

  head: [
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['script', { async: true, src: 'https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: '栈里拾光' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'theme-color', content: '#3451b2' }],
  ],

  sitemap: {
    hostname: 'https://qb-ez5.pages.dev',
  },

  transformHead(ctx) {
    const head: [string, Record<string, string>][] = []
    if (ctx.pageData.title) {
      head.push(['meta', { property: 'og:title', content: ctx.pageData.title }])
    }
    if (ctx.pageData.description) {
      head.push(['meta', { property: 'og:description', content: ctx.pageData.description }])
    }
    head.push(['meta', { property: 'og:image', content: 'https://qb-ez5.pages.dev/favicon.svg' }])
    return head
  },

  lastUpdated: true,

  themeConfig: {
    siteTitle: '栈里拾光',

    nav: [
      { text: '首页', link: '/' },
      { text: '学习专栏', link: '/blog/' },
      { text: '札记', link: '/notes/' },
      { text: '项目经历', link: '/projects/' },
      { text: '关于', link: '/about/' },
    ],

    sidebar: {
      '/blog/': [
        {
          text: '专栏分类',
          items: [
            { text: '全部内容', link: '/blog/' },
            { text: 'Vue.js', link: '/blog/vue' },
            { text: 'TypeScript', link: '/blog/typescript' },
            { text: 'CSS', link: '/blog/css' },
            { text: 'Java', link: '/blog/java' },
            { text: 'MySQL', link: '/blog/mysql' },
            { text: '工程化', link: '/blog/engineering' },
            {
              text: '支付集成',
              collapsed: false,
              items: [
                { text: '微信支付', link: '/blog/wechat-pay' },
                { text: '支付宝支付', link: '/blog/alipay-pay' },
              ],
            },
          ],
        },
      ],
      '/projects/': [
        {
          text: '项目列表',
          items: [
            { text: '全部项目', link: '/projects/' },
            { text: '大学牲 App', link: '/projects/college-life' },
            { text: '定向运动', link: '/projects/orienteering' },
            { text: '脊柱康复', link: '/projects/spine-rehab' },
            { text: '"战书"双语阅读器', link: '/projects/war-book' },
            { text: '一起来工具箱', link: '/projects/toolkit' },
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
      label: '文章目录',
      level: [2, 3],
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
  },
})
