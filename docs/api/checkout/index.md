---
sidebar_position: 3
title: Checkout
---

# Checkout

The checkout endpoints handle payment creation and status polling.

**Base URL:** `https://api.netgiro.is/v2/checkout`

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | [`/v2/checkout/payment`](./payment.md) | Create a payment or authorization |
| GET | [`/v2/checkout/status/{transactionId}`](./status.md) | Poll payment status |

## Customer identifier types

The `CustomerIdentifier` field determines the checkout flow:

| Type | Format | Behavior |
|------|--------|----------|
| Barcode | Scanned at POS register | Instant confirmation |
| Access code | 10 numeric digits (e.g. `1234567890`) | Instant confirmation |
| Phone (Icelandic GSM) | 7 digits, starts with 6, 7, or 8 (e.g. `8881234`) | Remote — customer confirms in Netgiro app |

See [Checkout Flows](./flows.md) for detailed flow diagrams.
