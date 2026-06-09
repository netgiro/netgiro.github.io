---
sidebar_position: 1
title: Create Checkout
---

# Create Checkout

**POST** `/Checkout/Payment`

| Environment | URL |
|-------------|-----|
| Production | `https://securepay.netgiro.is/v1/Checkout/Payment` |
| Test | `https://securepay.test.netgiro.is/v1/Checkout/Payment` |

## Authentication

Send the API key as a header (same key as the [V2 API](/docs/api/authentication)):

```
X-Netgiro-Api-Key: <ApplicationId GUID>
```

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

### Business error (HTTP 400)

```json
{
  "Success": false,
  "Message": "Invalid application key"
}
```

### Missing API key (HTTP 401)

```json
{
  "Success": false,
  "Message": "API key is required"
}
```
