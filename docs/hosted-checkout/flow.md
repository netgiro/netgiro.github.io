---
sidebar_position: 3
title: Flow Diagram
---

# Flow Diagram

## Standard flow

```
Merchant Server                  Netgiro                        Customer Browser
      |                              |                                |
      |  POST /Checkout/Payment      |                                |
      |  (JSON + API key)            |                                |
      |----------------------------->|                                |
      |                              |                                |
      |  { CheckoutUrl: "..." }      |                                |
      |<-----------------------------|                                |
      |                              |                                |
      |  302 Redirect to CheckoutUrl |                                |
      |------------------------------------------------------------->|
      |                              |                                |
      |                              |  Customer confirms payment     |
      |                              |<-------------------------------|
      |                              |                                |
      |  Callback POST (if provided) |                                |
      |<-----------------------------|                                |
      |  Return HTTP 200             |                                |
      |----------------------------->|                                |
      |                              |                                |
      |                              |  302 Redirect to SuccessUrl    |
      |                              |  (?TransactionId=...&Status=2) |
      |                              |------------------------------->|
      |                              |                                |
```

## Confirmation types

The combination of `ManualCapture` and `CallbackUrl` determines how the payment is confirmed:

| ManualCapture | CallbackUrl | Behavior |
|---------------|-------------|----------|
| `false` (default) | not provided | **Automatic** — payment confirmed immediately after customer approves |
| `false` | provided | **Server callback** — Netgiro calls your CallbackUrl when customer confirms |
| `true` | any | **Authorization** — payment becomes a reservation, merchant captures later |

## Authorization flow

Set `ManualCapture: true` to hold funds without charging. Useful for bookings, pre-orders, or any scenario where you need to confirm availability before charging.

```
Merchant Server                  Netgiro                        Customer Browser
      |                              |                                |
      |  POST /Checkout/Payment      |                                |
      |  (ManualCapture: true)       |                                |
      |----------------------------->|                                |
      |                              |                                |
      |  { CheckoutUrl: "..." }      |                                |
      |<-----------------------------|                                |
      |                              |                                |
      |  302 Redirect to CheckoutUrl |                                |
      |------------------------------------------------------------->|
      |                              |                                |
      |                              |  Customer confirms             |
      |                              |  (funds held, not charged)     |
      |                              |<-------------------------------|
      |                              |                                |
      |                              |  302 Redirect to SuccessUrl    |
      |                              |------------------------------->|
      |                              |                                |
      |  ... time passes ...         |                                |
      |                              |                                |
      |  POST /v2/transaction/capture|                                |
      |----------------------------->|                                |
      |  Status: Confirmed           |                                |
      |<-----------------------------|                                |
      |                              |                                |
```

After the customer confirms:

1. Funds are held on the customer's account
2. When ready to charge, call [POST /v2/transaction/capture](/docs/api/transaction/capture)
3. To release the hold without charging, call [POST /v2/transaction/cancel](/docs/api/transaction/cancel)
