// @ts-check

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Connected Car Docs',
  tagline: 'Connected Car Documentation',

  url: 'https://github.com/chrisjohn83/dita-markdown-pipeline',
  baseUrl: '/dita-markdown-pipeline/',

  favicon: 'img/favicon.ico',

  onBrokenLinks: 'warn',
markdown: {
  hooks: {
    onBrokenMarkdownLinks: 'warn',
  },
},

  organizationName: 'chrisjohn83',
  projectName: 'dita-markdown-pipeline',

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};

module.exports = config;