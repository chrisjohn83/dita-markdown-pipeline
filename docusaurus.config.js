const config = {
  title: 'Connected Car Documentation',
  tagline: 'Connected Car Docs',
  favicon: 'img/favicon.ico',

  url: 'https://chrisjohn83.github.io',
  baseUrl: '/dita-markdown-pipeline/',

  organizationName: 'chrisjohn83',
  projectName: 'dita-markdown-pipeline',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  presets: [
    [
      'classic',
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  plugins: [
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: 'openapi',
        docsPluginId: 'classic',
        config: {
          vehicleapi: {
            specPath: 'openapi/vehicle-api.yaml',
            outputDir: 'docs/api',
            sidebarOptions: {
              groupPathsBy: 'tag',
            },
          },
        },
      },
    ],
  ],

  themes: ['docusaurus-theme-openapi-docs'],

  themeConfig: {
    navbar: {
      title: 'Connected Car Docs',
      items: [
        {
          to: '/docs/intro',
          label: 'Documentation',
          position: 'left',
        },
        {
          to: '/docs/api',
          label: 'API Reference',
          position: 'left',
        },
      ],
    },
  },
};

module.exports = config;