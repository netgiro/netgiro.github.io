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

:::note Unknown transactions
A `transactionId` that does not exist, or that belongs to another merchant, returns `Success: true` with `Status: "Cancelled"`. Only poll transaction IDs that your own payment requests returned.
:::

## Error — transaction not found

Returned when the customer has confirmed but no payment was recorded for the transaction.

```json
{
  "Success": false,
  "Message": "Transaction not found",
  "Status": null,
  "TransactionId": "abc-123",
  "PollIntervalMs": null
}
```
