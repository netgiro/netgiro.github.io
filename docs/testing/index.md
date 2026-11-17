---
sidebar_position: 3
title: Testing
---

# Testing

## URLs

Note that the test environment has no `/v1` prefix for hosted checkout, while production does.

| Integration | Test | Production |
|-------------|------|------------|
| [V2 API](/docs/api) | `https://api.test.netgiro.is/v2` | `https://api.netgiro.is/v2` |
| [Hosted Checkout](/docs/hosted-checkout) | `https://securepay.test.netgiro.is/` | `https://securepay.netgiro.is/v1/` |
| Hosted Checkout — create checkout | `https://securepay.test.netgiro.is/Checkout/Payment` | `https://securepay.netgiro.is/v1/Checkout/Payment` |

## Next steps

- [**Provider**](./provider.md) — Register a test merchant account and get your SecretKey
- [**Customer**](./customer.md) — Test phone numbers and the test customer
- [**API/POS**](./api-pos.md) — Generate barcodes and access codes
