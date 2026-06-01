---
sidebar_position: 1
title: Transaction Details
---

# Transaction Details

**GET** `/v2/transaction/details/{transactionId}`

Retrieve details about a transaction.

## Response

```json
{
  "IsRefundable": true,
  "Status": "paid",
  "Created": "2026-05-28T10:30:00",
  "InvoiceNumber": 12345,
  "TotalAmount": 5000,
  "TransactionId": "abc-123",
  "SettlementDate": "2026-06-15T00:00:00"
}
```

## Response fields

| Field | Description |
|-------|-------------|
| IsRefundable | Whether the transaction can still be refunded |
| Status | Human-readable status: `paid`, `unpaid`, `canceled`, `reservation` |
| Created | When the transaction was created |
| InvoiceNumber | Netgiro invoice number |
| TotalAmount | Payment amount |
| TransactionId | Transaction identifier |
| SettlementDate | Date after which money is settled to the provider |
