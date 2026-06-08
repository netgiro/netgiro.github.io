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

## Authentication

Send the API key as a header (same key as the [V2 API](/docs/api/authentication)):

```
X-Netgiro-Api-Key: <ApplicationId GUID>
```

## Endpoint

**POST** `/Checkout/Payment`

| Environment | URL |
|-------------|-----|
| Production | `https://securepay.netgiro.is/v1/Checkout/Payment` |
| Test | `https://securepay.test.netgiro.is/v1/Checkout/Payment` |

Content-Type: `application/json`

## Request

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
| CallbackUrl | string | No | URL Netgiro calls server-to-server when payment is confirmed (see [Callbacks](#callbacks) below) |
| ManualCapture | bool | No | Default `false`. Set `true` for authorization/hold (see [Authorization flow](#authorization-flow) below) |

## Responses

### Success (HTTP 200)

```json
{
  "Success": true,
  "CheckoutUrl": "https://securepay.netgiro.is/v1/Home/Checkout/abc-123"
}
```

Redirect the customer's browser to `CheckoutUrl`.

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

## After the customer pays

When the customer completes payment, Netgiro redirects their browser to your `SuccessUrl` with the following query parameters:

```
https://merchant.is/success?TransactionId=abc-123&ReferenceNumber=order-123&InvoiceNumber=12345&TotalAmount=5000&Status=2&NetgiroSignature=...
```

| Parameter | Description |
|-----------|-------------|
| TransactionId | Identifier of the payment in Netgiro's system |
| ReferenceNumber | Your original `Reference` value |
| InvoiceNumber | Netgiro invoice number |
| TotalAmount | Payment amount |
| Status | `2` = confirmed, `5` = cancelled |
| NetgiroSignature | Signature to verify the response is authentic |

If the customer cancels, they are redirected to your `CancelUrl` instead.

:::warning Important
Always verify the payment server-side before fulfilling the order. Do not rely solely on the browser redirect — a customer could manipulate the URL. Use the [callback](#callbacks) or call [GET /v2/transaction/details](/docs/api/transaction/details) to confirm the payment status.
:::

## Callbacks

If you provide a `CallbackUrl`, Netgiro sends a server-to-server POST request to that URL when the customer confirms payment. This is more reliable than the browser redirect since it can't be blocked by the customer closing their browser.

**Callback request from Netgiro to your server:**

```
POST https://merchant.is/confirm
Content-Type: application/x-www-form-urlencoded

TransactionId=abc-123&ReferenceNumber=order-123&InvoiceNumber=12345&TotalAmount=5000&Status=2&NetgiroSignature=...
```

Your endpoint must return **HTTP 2xx** to acknowledge receipt.

:::warning Callback reliability
If your `CallbackUrl` does not return HTTP 2xx, Netgiro retries **once**. If the retry also fails, the sale is **cancelled automatically**. Make sure your callback endpoint is reliable.
:::

Callbacks are optional. If not provided, use the browser redirect parameters or poll [GET /v2/transaction/details](/docs/api/transaction/details) to verify payment status.

## Confirmation types

| ManualCapture | CallbackUrl | Behavior |
|---------------|-------------|----------|
| `false` (default) | not provided | **Automatic** — payment confirmed immediately after customer approves |
| `false` | provided | **Server callback** — Netgiro calls CallbackUrl when customer confirms |
| `true` | any | **Authorization** — payment becomes a reservation (see below) |

## Authorization flow

Set `ManualCapture: true` to hold funds without charging. Useful for bookings, pre-orders, etc.

1. Create checkout with `ManualCapture: true`
2. Customer confirms on the Netgiro checkout page — funds are held
3. When ready to charge, call [POST /v2/transaction/capture](/docs/api/transaction/capture)
4. To release the hold without charging, call [POST /v2/transaction/cancel](/docs/api/transaction/cancel)

## Full flow

```
Merchant Server                  Netgiro                        Customer Browser
      |                              |                                |
      |  POST /Checkout/Payment      |                                |
      |  (JSON + API key)            |                                |
      |----------------------------->|                                |
      |                              |                                |
      |  { CheckoutUrl: "..." }      |                                |
      |<-----------------------------|                                |
      |                              |                                |
      |  302 Redirect to CheckoutUrl |                                |
      |------------------------------------------------------------->|
      |                              |                                |
      |                              |  Customer confirms payment     |
      |                              |<-------------------------------|
      |                              |                                |
      |  Callback POST (if provided) |                                |
      |<-----------------------------|                                |
      |  Return HTTP 200             |                                |
      |----------------------------->|                                |
      |                              |                                |
      |                              |  302 Redirect to SuccessUrl    |
      |                              |  (?TransactionId=...&Status=2) |
      |                              |------------------------------->|
      |                              |                                |
```

## Testing

Use the [test environment](/docs/testing) to try the full flow:

- **Test endpoint:** `https://securepay.test.netgiro.is/v1/Checkout/Payment`
- **API key:** Register at the [Test Partner Portal](https://partner.test.netgiro.is) to get your test ApplicationId
- **Test customer SSN:** `1111111119`, password: `meerko1` ([more test customers](/docs/testing/customer))
