---
sidebar_position: 4
title: Transaction
---

# Transaction

The transaction endpoints handle post-payment operations: viewing details, capturing authorizations, cancellations, and refunds.

**Base URL:** `https://api.netgiro.is/v2/transaction`

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | [`/v2/transaction/details/{transactionId}`](./details.md) | Get transaction details |
| POST | [`/v2/transaction/capture`](./capture.md) | Capture an authorization |
| POST | [`/v2/transaction/cancel`](./cancel.md) | Cancel a payment or reservation |
| POST | [`/v2/transaction/refund`](./refund.md) | Refund (partial or full) |
