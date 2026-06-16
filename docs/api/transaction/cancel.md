---
sidebar_position: 3
title: Cancel
---

# Cancel

**POST** `/v2/transaction/cancel`

Cancel a payment, reservation, or pending checkout. Works at any stage — pending customer confirmation, authorized hold, or confirmed payment.

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
