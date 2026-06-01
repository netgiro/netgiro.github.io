---
sidebar_position: 2
title: Payment Status
---

# Payment Status

**GET** `/v2/checkout/status/{transactionId}`

Poll the status of a payment.

## Response

```json
{
  "Success": true,
  "Message": null,
  "Status": "Pending",
  "TransactionId": "abc-123",
  "PollIntervalMs": 2000
}
```

## Status values

| Status | Meaning |
|--------|---------|
| `Pending` | Customer hasn't confirmed yet |
| `Authorized` | Amount held, not charged |
| `Confirmed` | Payment complete |
| `Cancelled` | Payment cancelled |

`PollIntervalMs` is only present when the status is `Pending` — it tells the merchant how frequently to poll (in milliseconds).

## Error — transaction not found

```json
{
  "Success": false,
  "Message": "Transaction not found",
  "Status": null,
  "TransactionId": "abc-123",
  "PollIntervalMs": null
}
```
