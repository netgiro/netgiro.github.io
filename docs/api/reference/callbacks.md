---
sidebar_position: 2
title: Callbacks
---

# Callbacks

Callbacks are an optional mechanism for receiving payment status updates without polling.

## How callbacks work

If `CallbackUrl` is provided when creating a payment, Netgiro will send a POST request to that URL when the customer confirms the payment. If `CallbackCancelUrl` is provided, Netgiro will POST to it when the payment is cancelled.

## Reliability

:::warning Important
If the `CallbackUrl` does not return a successful HTTP response (2xx), Netgiro will retry **once**. If the retry also fails, the sale will be **cancelled automatically**. The merchant must ensure their callback endpoint is reliable and returns 2xx on success.
:::

## Callback vs polling

Callbacks are optional. If not provided, the merchant must poll `GET /v2/checkout/status/{id}` to track payment status.

Merchants can use both approaches:
- **Callback** as the primary notification
- **Polling** as a fallback

This ensures the merchant is notified even if the callback delivery fails.
