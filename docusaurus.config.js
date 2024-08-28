// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'ProyectosCE',
  tagline: 'Ingeniería en Computadores TEC',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://proyectosce.github.io/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ProyectosCE', // Usually your GitHub org/user name.
  projectName: 'proyectosce.github.io', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  deploymentBranch: "gh-pages",
  

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'es',
    locales: ['es'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],
  plugins: [
    // aquí empiezan los sidebars custom
[
    '@docusaurus/plugin-content-docs',
    {
      id: 'GeomertyTEC',
      path: 'proyectos/CE1106/GeomertyTEC',
      routeBasePath: 'GeomertyTEC',
      sidebarPath: 'C:/Users/amv22/Dev/repos/proyectosce.github.io/customsb/GeomertyTEC.js',
      include: ['**/*.md', '**/*.mdx', '**/intro.md'],
    },
  ],
// aquí terminan los sidebars custom
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'ProyectosCE',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          {to: '/about', label: 'Acerca de', position: 'left'},
          {
            href: 'https://github.com/ProyectosCE',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Links',
            items: [
              {
                label: 'TEC',
                href: 'https://tec.ac.cr',
              },
            ],
          },
          {
            title: 'Repositorio',
            items: [
              {
                label: 'Github',
                href: 'https://github.com/ProyectosCE',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'About',
                to: '/about',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Elaborado por estudiantes del TEC. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;