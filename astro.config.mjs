import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import rehypeBasePath from './src/plugins/rehype-base-path.mjs';
import remarkBasePath from './src/plugins/remark-base-path.mjs';

// SITE_BASE controls the deploy path.
// GitHub Pages (project repo): set SITE_BASE=/basic-web-course
// Vercel / root deploy: leave unset (defaults to '/basic-web-course' for now,
//   override with SITE_BASE='' or SITE_BASE=/ when deploying to root)
const siteBase = process.env.SITE_BASE ?? '/';

export default defineConfig({
  site: 'https://basic.web-programming.io.vn',
  base: siteBase,
  markdown: {
    remarkPlugins: [[remarkBasePath, { base: siteBase }]],
    rehypePlugins: [[rehypeBasePath, { base: siteBase }]],
  },
  integrations: [
    starlight({
      title: 'The Web Basic',
      customCss: ['./src/styles/custom.css'],
      components: {
        Hero: './src/components/overrides/Hero.astro',
      },
      description: 'Tài liệu khoá học Web Design and Development — Nguyễn Hữu Quyền',
      defaultLocale: 'vi',
      locales: {
        root: {
          label: 'Tiếng Việt',
          lang: 'vi',
        },
      },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/nghuuquyen/basic-web-course' },
      ],
      sidebar: [
        { label: 'Trang chủ', link: '/' },
        // { label: 'Lộ trình 6 Level', link: '/roadmap' },
        { label: 'Lịch học', link: '/schedule' },
        {
          label: 'Modules',
          items: [
            { label: 'Giới Thiệu về Nghề Lập Trình Web', link: '/modules/module0__introduction_to_web_development' },
            { label: 'Module 1: How the Web Works', link: '/modules/module1__how_the_web_works' },
            { label: 'Module 2: HTML & CSS', link: '/modules/module2__html_and_css' },
            { label: 'Module 3: JavaScript', link: '/modules/module3__javascript' },
            { label: 'Module 4: Server-side Programming', link: '/modules/module4__introduction_to_server_side_programming' },
          ],
        },
        {
          label: 'Labs',
          items: [
            { label: 'Lab 1: Git & Version Control', link: '/labs/lab1__git_distributed_version_control' },
            { label: 'Lab 2: CSS Processors', link: '/labs/lab2__css_processors' },
            { label: 'Lab 3: Tailwind CSS', link: '/labs/lab3__tailwind_css' },
            { label: 'Lab 4: Layout & Responsive Web', link: '/labs/lab4__layout_and_responsive_web' },
            { label: 'Lab 5: Build website with Next.js', link: '/labs/lab5__build_website_with_nextjs' },
            { label: 'Lab 5 (Part 1): Next.js Pages Router', link: '/labs/lab5__part-1-nextjs-pages-router' },
            { label: 'Lab 5 (Part 2): Next.js App Router', link: '/labs/lab5__part-2-nextjs-app-router' },
          ],
        },
        {
          label: 'Exercises',
          items: [
            { label: 'Ex 1: Online Course Registration Form', link: '/exercises/ex1__online_course_registration_form' },
            { label: 'Ex 2: Student Score Table', link: '/exercises/ex2__student_score_table' },
            { label: 'Ex 3: Product Introduction Page', link: '/exercises/ex3__product_introduction_page' },
          ],
        },
        {
          label: 'Deep Dives',
          items: [
            { label: 'Async JavaScript', link: '/deep-dives/topic1__asynchronous_coding_with_javascript' },
            { label: 'Stages to Build a Web App', link: '/deep-dives/topic2__stages_to_build_an_web_application' },
            { label: 'SEO & Web Performance', link: '/deep-dives/topic3__seo_and_web_performance' },
          ],
        },
        {
          label: 'Final Project',
          items: [
            { label: 'Project Brief', link: '/final-project-brief' },
            { label: 'Report Template', link: '/final-project-report-template' },
            { label: 'Self-Report Template', link: '/final-project-self-report-template' },
          ],
        },
      ],
    }),
  ],
});
