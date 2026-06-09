---
sidebar_position: 3
title: Hosted Checkout
---

# Hosted Checkout

Your backend creates a cart via a JSON API call, receives a checkout URL, and redirects the customer's browser to that URL. The customer confirms payment on the Netgiro checkout page and is redirected back to your site.

## Quick start

1. Register at the [Test Partner Portal](https://partner.test.netgiro.is) and get your ApplicationId
2. Call the endpoint with your key:

```bash
curl -X POST https://securepay.test.netgiro.is/v1/Checkout/Payment \
  -H "X-Netgiro-Api-Key: YOUR_APPLICATION_ID" \
  -H "Content-Type: application/json" \
  -d '{
    "Amount": 5000,
    "Reference": "order-123",
    "SuccessUrl": "https://yoursite.is/success",
    "CancelUrl": "https://yoursite.is/cancel"
  }'
```

3. Redirect the customer's browser to the returned `CheckoutUrl`:

```json
{
  "Success": true,
  "CheckoutUrl": "https://securepay.test.netgiro.is/v1/Home/Checkout/abc-123"
}
```

That's it — Netgiro handles the rest.

## What's in this section

| Page | Description |
|------|-------------|
| [**Create Checkout**](./create-checkout.md) | Endpoint, request fields, response examples, and error handling |
| [**Payment Confirmation**](./payment-confirmation.md) | What happens after the customer pays — redirects, callbacks, and verification |
| [**Flow Diagram**](./flow.md) | Full sequence diagram and confirmation type overview |

## Testing

Use the [test environment](/docs/testing) to try the full flow:

- **Test endpoint:** `https://securepay.test.netgiro.is/v1/Checkout/Payment`
- **API key:** Register at the [Test Partner Portal](https://partner.test.netgiro.is) to get your test ApplicationId
- **Test customer SSN:** `1111111119`, password: `meerko1` ([more test customers](/docs/testing/customer))
