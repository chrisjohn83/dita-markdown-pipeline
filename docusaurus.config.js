// @ts-check

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Connected Car Docs',
  tagline: 'Connected Car Documentation',

  url: 'https://example.com',
  baseUrl: '/',

  favicon: 'img/favicon.ico',

  onBrokenLinks: 'warn',
markdown: {
  hooks: {
    onBrokenMarkdownLinks: 'warn',
  },
},

  organizationName: 'github',
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