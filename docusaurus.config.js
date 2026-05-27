const config = {
  title: 'Connected Car Docs',
  tagline: 'Connected Car Documentation',
  favicon: 'img/favicon.ico',

  url: 'https://chrisjohn83.github.io',
  baseUrl: '/dita-markdown-pipeline/',

  organizationName: 'chrisjohn83',
  projectName: 'dita-markdown-pipeline',

  onBrokenLinks: 'warn',

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

plugins: [
  [
    require.resolve('@easyops-cn/docusaurus-search-local'),
    {
      hashed: true,
    },
  ],
],

  themeConfig: {
    navbar: {
      title: 'Connected Car Docs',
      items: [
        {
          to: '/docs/Topics/Overview',
          label: 'Overview',
          position: 'left',
        },
        {
          to: '/docs/Topics/Architecture',
          label: 'Architecture',
          position: 'left',
        },
        {
          to: '/docs/API/fleet/ref-fleet-list-vehicles',
          label: 'APIs',
          position: 'left',
        },
      ],
    },
  },
};

module.exports = config;