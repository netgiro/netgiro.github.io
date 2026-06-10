---
sidebar_position: 3
title: Flow Diagram
---

# Flow Diagram

## Standard flow

```mermaid
sequenceDiagram
    participant M as Merchant Server
    participant N as Netgiro
    participant C as Customer Browser

    M->>N: POST /Checkout/Payment<br/>(JSON + API key)
    N-->>M: { CheckoutUrl: "..." }
    M->>C: 302 Redirect to CheckoutUrl
    C->>N: Opens checkout page
    N->>C: Checkout UI
    C->>N: Confirms payment
    opt CallbackUrl provided
        N->>M: POST callback (JSON)
        M-->>N: HTTP 200
    end
    N->>C: 302 Redirect to SuccessUrl<br/>(?TransactionId=...&Status=2)
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

```mermaid
sequenceDiagram
    participant M as Merchant Server
    participant N as Netgiro
    participant C as Customer Browser

    M->>N: POST /Checkout/Payment<br/>(ManualCapture: true)
    N-->>M: { CheckoutUrl: "..." }
    M->>C: 302 Redirect to CheckoutUrl
    C->>N: Confirms payment
    Note over N: Funds held,<br/>not charged
    N->>C: 302 Redirect to SuccessUrl

    Note over M,N: Time passes...

    M->>N: POST /v2/transaction/capture
    N-->>M: Status: Confirmed
```

After the customer confirms:

1. Funds are held on the customer's account
2. When ready to charge, call [POST /v2/transaction/capture](/docs/api/transaction/capture)
3. To release the hold without charging, call [POST /v2/transaction/cancel](/docs/api/transaction/cancel)
