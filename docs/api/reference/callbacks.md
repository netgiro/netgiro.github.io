---
sidebar_position: 2
title: Callbacks
---

# Callbacks

Callbacks are an optional mechanism for receiving payment status updates without polling.

## How callbacks work

When `CallbackUrl` is provided on payment creation, Netgiro sends a **POST** request with `Content-Type: application/json` to that URL when the payment status changes.

If `CallbackCancelUrl` is provided, Netgiro sends a POST to it when the payment is cancelled.

## Callback vs polling

Callbacks are optional. If not provided, the merchant must poll `GET /v2/checkout/status/{id}` to track payment status.

Merchants can use both approaches:
- **Callback** as the primary notification
- **Polling** as a fallback

This ensures the merchant is notified even if the callback delivery fails.

## Reliability

:::warning Important
If the `CallbackUrl` does not return a successful HTTP response (2xx), Netgiro will retry **once**. If the retry also fails, the sale will be **cancelled automatically**. The merchant must ensure their callback endpoint is reliable and returns 2xx on success.
:::
