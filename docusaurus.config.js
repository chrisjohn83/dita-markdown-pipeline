const config = {
  title: 'Connected Car Docs',
  tagline: 'Connected Car Documentation',

  url: 'https://chrisjohn83.github.io',
  baseUrl: '/dita-markdown-pipeline/',

  onBrokenLinks: 'warn',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  favicon: 'img/favicon.ico',

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

  
  themeConfig: {
    navbar: {
      title: 'Connected Car Docs',
      items: [
        {
          to: '/docs/',
          label: 'Documentation',
          position: 'left',
        },
      ],
    },

    footer: {
      style: 'dark',
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} Connected Car Docs`,
    },

  },
};

module.exports = config;