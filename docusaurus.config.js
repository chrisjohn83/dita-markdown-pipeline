module.exports = {
  title: 'Connected Car Docs',

  tagline: 'Connected Car Documentation',

  url: 'https://chrisjohn83.github.io',

  baseUrl: '/dita-markdown-pipeline/',

  favicon: 'img/favicon.ico',

  organizationName: 'chrisjohn83',

  projectName: 'dita-markdown-pipeline',

  trailingSlash: false,

  onBrokenLinks: 'warn',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  presets: [
    [
      'classic',
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
        },

        blog: false,

        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
};