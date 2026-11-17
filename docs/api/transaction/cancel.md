---
sidebar_position: 3
title: Cancel
---

# Cancel

**POST** `/v2/transaction/cancel`

Cancel a payment that has not been charged yet. To return money from a confirmed payment, use [refund](./refund.md).

| Status | What cancel does |
|--------|------------------|
| `Pending` | Withdraws the customer's payment request, so it can no longer be confirmed |
| `Authorized` | Releases the hold. Nothing is charged to the customer |
| `Confirmed` | Refused. Use [refund](./refund.md) for the full or partial amount |
| `Cancelled` | Nothing to do. Returns `Cancelled` again, so it is safe to retry |

## Request body

```json
{
  "TransactionId": "abc-123"
}
```

## Response

```json
{
  "Success": true,
  "Message": null,
  "Status": "Cancelled",
  "TransactionId": "abc-123",
  "PollIntervalMs": null
}
```

## Error — already confirmed

Returned when the payment has been confirmed.

```json
{
  "Success": false,
  "Message": "Payment is already confirmed. Use refund to return the amount.",
  "Status": null,
  "TransactionId": "abc-123",
  "PollIntervalMs": null
}
```

## Error — customer is confirming

Returned when the customer confirms at the same moment and the payment is still being processed. The message can also be `Loan created`. Check the [payment status](../checkout/status.md), then cancel an `Authorized` payment again or refund a `Confirmed` one.

```json
{
  "Success": false,
  "Message": "Cart in wrong status.",
  "Status": null,
  "TransactionId": "abc-123",
  "PollIntervalMs": null
}
```

## Error — transaction not found

Returned when the transaction does not exist or belongs to another merchant.

```json
{
  "Success": false,
  "Message": "Cart does not exist!",
  "Status": null,
  "TransactionId": "abc-123",
  "PollIntervalMs": null
}
```
