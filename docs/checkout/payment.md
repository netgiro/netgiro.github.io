---
sidebar_position: 1
title: Create Payment
---

# Create Payment

**POST** `/v2/checkout/payment`

Create a payment or authorization.

## Request body

```json
{
  "Amount": 5000,
  "Reference": "order-123",
  "CustomerIdentifier": "1234567890",
  "CallbackUrl": "https://merchant.is/confirm",
  "CallbackCancelUrl": "https://merchant.is/cancel",
  "ManualCapture": false
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Amount | decimal | Yes | Payment amount |
| Reference | string | Yes | Merchant's order ID |
| CustomerIdentifier | string | Yes | Barcode, access code, or phone number |
| CallbackUrl | string | No | URL Netgiro calls when customer confirms |
| CallbackCancelUrl | string | No | URL Netgiro calls when payment is cancelled |
| ManualCapture | bool | No | Default `false`. Set `true` for authorization/hold |

## Responses

### Barcode — instant payment

```json
{
  "Success": true,
  "Message": null,
  "Status": "Confirmed",
  "TransactionId": "abc-123",
  "PollIntervalMs": null
}
```

### Phone — remote confirmation (pending)

```json
{
  "Success": true,
  "Message": null,
  "Status": "Pending",
  "TransactionId": "abc-123",
  "PollIntervalMs": 2000
}
```

The customer receives a push notification in the Netgiro app. Poll [`/v2/checkout/status/{id}`](status) until the status changes to `Confirmed`.

### Barcode with `ManualCapture: true` — authorization

```json
{
  "Success": true,
  "Message": null,
  "Status": "Authorized",
  "TransactionId": "abc-123",
  "PollIntervalMs": null
}
```

The amount is held. Call [`/v2/transaction/capture`](../transaction/capture) later to charge.

### Phone with `ManualCapture: true` — pending authorization

```json
{
  "Success": true,
  "Message": null,
  "Status": "Pending",
  "TransactionId": "abc-123",
  "PollIntervalMs": 2000
}
```

After the customer confirms in the app, the status becomes `Authorized` (not `Confirmed`). The merchant still needs to call [`/v2/transaction/capture`](../transaction/capture).

### Error — customer blacklisted

```json
{
  "Success": false,
  "Message": "Customer is blacklisted",
  "Status": null,
  "TransactionId": "abc-123",
  "PollIntervalMs": null
}
```

### Error — customer not verified

```json
{
  "Success": false,
  "Message": "Customer not verified.",
  "Status": null,
  "TransactionId": null,
  "PollIntervalMs": null
}
```
