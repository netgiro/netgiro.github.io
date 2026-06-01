/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    'overview',
    {
      type: 'category',
      label: 'API',
      link: { type: 'doc', id: 'api/index' },
      items: [
        'api/authentication',
        {
          type: 'category',
          label: 'Checkout',
          link: { type: 'doc', id: 'api/checkout/index' },
          items: [
            'api/checkout/payment',
            'api/checkout/status',
            'api/checkout/flows',
          ],
        },
        {
          type: 'category',
          label: 'Transaction',
          link: { type: 'doc', id: 'api/transaction/index' },
          items: [
            'api/transaction/details',
            'api/transaction/capture',
            'api/transaction/cancel',
            'api/transaction/refund',
          ],
        },
        {
          type: 'category',
          label: 'Settlement',
          link: { type: 'doc', id: 'api/settlement/index' },
          items: [
            'api/settlement/list',
            'api/settlement/items',
          ],
        },
        {
          type: 'category',
          label: 'Reference',
          link: { type: 'doc', id: 'api/reference/index' },
          items: [
            'api/reference/status-codes',
            'api/reference/callbacks',
            'api/reference/validation-errors',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Testing',
      link: { type: 'doc', id: 'testing/index' },
      items: [
        'testing/provider',
        'testing/customer',
        'testing/api-pos',
      ],
    },
    {
      type: 'category',
      label: 'Web Shop Plugins',
      link: { type: 'doc', id: 'web-shop-plugins/index' },
      items: [
        {
          type: 'category',
          label: 'Shopify',
          link: { type: 'doc', id: 'web-shop-plugins/shopify/index' },
          items: [
            'web-shop-plugins/shopify/new-merchants',
            'web-shop-plugins/shopify/migrating-merchants',
            'web-shop-plugins/shopify/refunds',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Resources',
      link: { type: 'doc', id: 'resources/index' },
      items: [
        'resources/pos-modules',
        'resources/logos',
        'resources/widgets',
      ],
    },
  ],
};

module.exports = sidebars;
