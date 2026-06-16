---
sidebar_position: 2
title: Payment Confirmation
---

# Payment Confirmation

After the customer completes (or cancels) payment on the Netgiro checkout page, two things happen:

1. **Browser redirect** — the customer is sent back to your `SuccessUrl` or `CancelUrl`
2. **Server callback** (optional) — Netgiro calls your `CallbackUrl` server-to-server

## Browser redirect

When the customer completes payment, Netgiro redirects their browser to your `SuccessUrl` with query parameters:

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

When `CallbackUrl` or `CallbackCancelUrl` is provided in the checkout payment request, Netgiro sends a POST request with `Content-Type: application/json` to your server when the payment is confirmed or cancelled.

:::warning Callback reliability
If your `CallbackUrl` does not return HTTP 2xx, Netgiro retries **once**. If the retry also fails, the sale is **cancelled automatically**. Make sure your callback endpoint is reliable.
:::

### Confirm callback

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

### Cancel callback

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

### Verifying the signature

The `X-Netgiro-Signature` header contains a SHA256 hash that you can use to verify the callback came from Netgiro.

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

## Verifying payment status

There are three ways to confirm a payment went through, from most to least reliable:

| Method | How | When to use |
|--------|-----|-------------|
| **Callback** | Netgiro POSTs to your `CallbackUrl` | Best option — server-to-server, can't be tampered with |
| **API check** | Call [GET /v2/transaction/details](/docs/api/transaction/details) | Good fallback — poll from your server using the `TransactionId` |
| **Redirect params** | Parse query parameters on `SuccessUrl` | Least reliable — only use for UI display, never for fulfillment |

**Recommended approach:** Use callbacks as the primary notification, and call the transaction details API as a fallback. Show the customer a success page based on the redirect, but don't fulfill the order until your server has confirmed the payment.
