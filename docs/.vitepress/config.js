import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/fe_playground/",
  title: "前端游乐场",
  description: "前端知识点汇集,构建属于自己的知识体系",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/examples/markdown-examples" },
      { text: "JS修炼之路", link: "js_road/BOM/web-api.md" },
      { text: "vue后台解决方案", link: "/vue_admin/programming_specification" },
      { text: "设计模式", link: "design_patterns/patterns.md" },
    ],

    sidebar: {
      "/examples/": [
        {
          text: "examples",
          items: [
            { text: "Markdown Examples", link: "/examples/markdown-examples" },
            { text: "Runtime API Examples", link: "/examples/api-examples" },
          ],
        },
      ],
      "/js_road/": [
        {
          text: "JS修炼之路",
          items: [
            { text: "Markdown Examples", link: "/examples/markdown-examples" },
            { text: "浏览器api", link: "/js_road/BOM/web-api" },
          ],
        },
      ],
      "/vue_admin/": [
        {
          text: "vue后台解决方案",
          items: [
            {
              text: "标准化编程规范解决方案",
              link: "/vue_admin/programming_specification",
            },
          ],
        },
      ],
      "/design_patterns/": [
        {
          text: "设计模式",
          items: [
            { text: "简介", link: "/design_patterns/patterns.md" },
            { text: "单例模式", link: "/design_patterns/singleton_pattern" },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
