---
sidebar_position: 4
title: Refund
---

# Refund

**POST** `/v2/transaction/refund`

Refund a transaction, partially or in full.

## Request body

```json
{
  "TransactionId": "abc-123",
  "RefundAmount": 2000,
  "Description": "Returned item",
  "IdempotencyKey": "ref-001"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| TransactionId | string | Yes | Transaction to refund |
| RefundAmount | int | Yes | Amount to refund in ISK (no decimals, e.g. `2000` = 2.000 kr) |
| Description | string | No | Reason for refund (visible in merchant portal) |
| IdempotencyKey | string | Yes | Unique key — prevents duplicate refunds. Only one refund per key is processed. |

## Response

```json
{
  "Success": true,
  "Message": "Refund successful"
}
```
