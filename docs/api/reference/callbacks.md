---
sidebar_position: 2
title: Callbacks
---

# Callbacks

Callbacks are optional. When provided on payment creation, Netgiro sends a POST request with `Content-Type: application/json` to your server when the payment status changes.

:::warning Important
If the callback URL does not return a successful HTTP response (2xx), Netgiro retries **once**. If the retry also fails, the sale is **cancelled automatically**.
:::

## Confirm callback

Sent to `CallbackUrl` when the customer confirms the payment.

```http
POST https://merchant.is/confirm
Content-Type: application/json
X-Netgiro-Signature: <signature>
```

```json
{
  "Success": true,
  "Message": "Success",
  "TransactionId": "abc-123",
  "ReferenceNumber": "order-123",
  "TotalAmount": 5000
}
```

## Cancel callback

Sent to `CallbackCancelUrl` when the payment is cancelled or expires.

```http
POST https://merchant.is/cancel
Content-Type: application/json
X-Netgiro-Signature: <signature>
```

```json
{
  "Success": false,
  "Message": "Canceled",
  "TransactionId": "abc-123",
  "ReferenceNumber": "order-123",
  "TotalAmount": 5000
}
```

## Verifying the signature

The `X-Netgiro-Signature` header contains a SHA256 hash that the merchant can use to verify the callback came from Netgiro.

To verify:

1. Take your **SecretKey** (from your integration key)
2. Concatenate: `SecretKey + TransactionId + TotalAmount`
3. Calculate SHA256 of the concatenated string
4. Compare with the `X-Netgiro-Signature` header value

**Example:**

```
SecretKey       = "mysecret"
TransactionId   = "abc-123"
TotalAmount     = "5000"

SHA256("mysecretabc-1235000") = "expected_signature_here"
```

If the calculated signature matches the header value, the callback is authentic.

## Callback vs polling

Callbacks are optional. If not provided, the merchant must poll `GET /v2/checkout/status/{id}` to track payment status.

Merchants can use both approaches:
- **Callback** as the primary notification
- **Polling** as a fallback

This ensures the merchant is notified even if the callback delivery fails.
