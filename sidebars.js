/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    'overview',
    'authentication',
    {
      type: 'category',
      label: 'Checkout',
      link: { type: 'doc', id: 'checkout/index' },
      items: [
        'checkout/payment',
        'checkout/status',
        'checkout/flows',
      ],
    },
    {
      type: 'category',
      label: 'Transaction',
      link: { type: 'doc', id: 'transaction/index' },
      items: [
        'transaction/details',
        'transaction/capture',
        'transaction/cancel',
        'transaction/refund',
      ],
    },
    {
      type: 'category',
      label: 'Settlement',
      link: { type: 'doc', id: 'settlement/index' },
      items: [
        'settlement/list',
        'settlement/items',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      link: { type: 'doc', id: 'reference/index' },
      items: [
        'reference/status-codes',
        'reference/callbacks',
        'reference/validation-errors',
      ],
    },
  ],
};

module.exports = sidebars;
