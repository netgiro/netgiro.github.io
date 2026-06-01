---
sidebar_position: 2
title: API
---

# V2 API

**Base URL:** `https://api.netgiro.is/v2`

The V2 API is a purely REST-based payment integration. No iframe, no redirect — the merchant owns the checkout UI completely. It works identically for POS and online integrations.

## Quick start

1. Get your **ApplicationId** from the [Partner Portal](https://partner.netgiro.is) (or use the [test credentials](/docs/testing/provider))
2. Set the `X-Netgiro-Api-Key` header on every request
3. POST to `/v2/checkout/payment` with an amount and customer identifier
4. Handle the response — instant confirmation for barcodes, or poll for phone-based payments

```bash
curl -X POST https://api.netgiro.is/v2/checkout/payment \
  -H "X-Netgiro-Api-Key: YOUR_APPLICATION_ID" \
  -H "Content-Type: application/json" \
  -d '{
    "Amount": 5000,
    "Reference": "order-123",
    "CustomerIdentifier": "1234567890"
  }'
```

## Endpoints

| Section | Description |
|---------|-------------|
| [**Authentication**](./authentication.md) | API key setup and error handling |
| [**Checkout**](./checkout/index.md) | Create payments and poll status |
| [**Transaction**](./transaction/index.md) | Details, capture, cancel, refund |
| [**Settlement**](./settlement/index.md) | Settlement reports and line items |
| [**Reference**](./reference/index.md) | Status codes, callbacks, validation errors |

## Customer identifier types

The `CustomerIdentifier` you send determines the checkout flow:

| Type | Format | Behavior |
|------|--------|----------|
| Barcode | Scanned at POS register | Instant confirmation |
| Access code | 10 numeric digits (e.g. `1234567890`) | Instant confirmation |
| Phone (Icelandic GSM) | 7 digits, starts with 6, 7, or 8 (e.g. `8881234`) | Customer confirms in Netgiro app |

See [Checkout Flows](./checkout/flows.md) for detailed diagrams of each flow.
