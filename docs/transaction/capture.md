---
sidebar_position: 2
title: Capture
---

# Capture

**POST** `/v2/transaction/capture`

Capture a previously authorized payment. Used after a payment was created with `ManualCapture: true`.

## Request body

```json
{
  "TransactionId": "abc-123",
  "Amount": 4200
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| TransactionId | string | Yes | The authorized transaction |
| Amount | decimal | No | Partial capture amount. Omit for full authorized amount. |

## Response

```json
{
  "Success": true,
  "Message": null,
  "Status": "Confirmed",
  "TransactionId": "abc-123",
  "PollIntervalMs": null
}
```
