// @ts-check
const { themes: prismThemes } = require('prism-react-renderer');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Netgiro Developer Docs',
  tagline: 'Payment integration documentation for Netgiro',
  favicon: 'images/favicon.ico',

  url: 'https://netgiro.github.io',
  baseUrl: '/',

  organizationName: 'netgiro',
  projectName: 'netgiro.github.io',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          lastVersion: 'current',
          versions: {
            current: {
              label: 'V2',
              path: '',
            },
            v1: {
              label: 'V1',
              path: 'v1',
            },
          },
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'images/brand-logo.svg',
      navbar: {
        title: '',
        logo: {
          alt: 'Netgiro',
          src: 'images/brand-logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            type: 'docsVersionDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/netgiro/netgiro.github.io',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'V2 API',
                to: '/docs/overview',
              },
              {
                label: 'V1 API',
                to: '/docs/v1/api',
              },
            ],
          },
          {
            title: 'Resources',
            items: [
              {
                label: 'Partner Portal',
                href: 'https://partner.netgiro.is',
              },
              {
                label: 'Test Environment',
                href: 'https://api.test.netgiro.is/v2',
              },
            ],
          },
          {
            title: 'Contact',
            items: [
              {
                label: 'Developer Support',
                href: 'mailto:dev@netgiro.is',
              },
              {
                label: 'General Inquiries',
                href: 'mailto:netgiro@netgiro.is',
              },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} Netgiro Greidslumidlun. Kt: 5101222830 | Katrinartun 2, 105 Reykjavik | Simi: 4 300 330`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['csharp', 'json', 'bash'],
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
    }),
};

module.exports = config;
