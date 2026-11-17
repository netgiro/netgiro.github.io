---
sidebar_position: 1
title: Create Checkout
---

# Create Checkout

**POST** `/Checkout/Payment`

| Environment | URL |
|-------------|-----|
| Production | `https://securepay.netgiro.is/v1/Checkout/Payment` |
| Test | `https://securepay.test.netgiro.is/Checkout/Payment` |

## Authentication

Send the API key as a header (same key as the [V2 API](/docs/api/authentication)). The API key is the **SecretKey** of your integration key, not the ApplicationId:

```
X-Netgiro-Api-Key: YOUR_SECRET_KEY
```

:::warning Call from your server
Create the checkout from your backend only, then redirect the customer's browser to the returned `CheckoutUrl`. Never send the SecretKey to the browser.
:::

## Request

Content-Type: `application/json`

```json
{
  "Amount": 5000,
  "Reference": "order-123",
  "SuccessUrl": "https://merchant.is/success",
  "CancelUrl": "https://merchant.is/cancel",
  "CallbackUrl": "https://merchant.is/confirm",
  "ManualCapture": false
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Amount | int | Yes | Payment amount in ISK |
| Reference | string | Yes | Merchant's order ID |
| SuccessUrl | string | Yes | URL to redirect customer after successful payment |
| CancelUrl | string | Yes | URL to redirect customer if payment is cancelled |
| CallbackUrl | string | No | URL Netgiro calls server-to-server when payment status changes (see [Payment Confirmation](./payment-confirmation.md#callbacks)) |
| ManualCapture | bool | No | Default `false`. Set `true` for authorization/hold (see [Authorization Flow](./flow.md#authorization-flow)) |

## Responses

### Success (HTTP 200)

```json
{
  "Success": true,
  "CheckoutUrl": "https://securepay.netgiro.is/v1/Home/Checkout/abc-123"
}
```

Redirect the customer's browser to `CheckoutUrl`. The customer will identify themselves and confirm the payment on the Netgiro checkout page.

### Validation error (HTTP 400)

```json
{
  "Success": false,
  "Message": "'Amount' must be greater than 0"
}
```

### Invalid API key (HTTP 400)

Returned when the key does not match an active integration key, for example an ApplicationId or an archived key.

```json
{
  "Success": false,
  "Message": "Invalid app key"
}
```

### Missing API key (HTTP 401)

```json
{
  "Success": false,
  "Message": "API key is required"
}
```
