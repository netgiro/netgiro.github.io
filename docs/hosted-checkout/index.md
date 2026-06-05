---
sidebar_position: 3
title: Hosted Checkout
---

# Hosted Checkout

A server-side checkout integration. Your backend creates a cart via a JSON API call, receives a checkout URL, and redirects the customer's browser to that URL. The customer confirms payment on the Netgiro checkout page and is redirected back to your site.

## Authentication

Send the API key as a header (same key as the V2 API):

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
| CallbackUrl | string | No | URL Netgiro calls server-to-server when payment is confirmed |
| ManualCapture | bool | No | Default `false`. Set `true` for authorization/hold |

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

## Confirmation types

| ManualCapture | CallbackUrl | Behavior |
|---------------|-------------|----------|
| `false` (default) | not provided | **Automatic** — payment confirmed immediately after customer approves |
| `false` | provided | **Server callback** — Netgiro calls CallbackUrl when customer confirms. If the callback does not return HTTP 2xx, Netgiro retries once. If retry also fails, the sale is cancelled. |
| `true` | any | **Manual** — payment becomes a reservation. Merchant captures later via POST `/v2/transaction/capture` |

## Flow

1. Merchant's server sends **POST** `/Checkout/Payment` with JSON body and `X-Netgiro-Api-Key` header
2. Netgiro creates the cart and returns `CheckoutUrl`
3. Merchant redirects the customer's browser to `CheckoutUrl`
4. Customer identifies themselves (phone number or electronic ID) and confirms payment
5. If `CallbackUrl` was provided, Netgiro calls it server-to-server with the payment result
6. Customer is redirected back to `SuccessUrl` (on success) or `CancelUrl` (on cancel/failure)

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
      |  Callback (if provided)      |                                |
      |<-----------------------------|                                |
      |                              |                                |
      |                              |  302 Redirect to SuccessUrl    |
      |                              |------------------------------->|
      |                              |                                |
```
