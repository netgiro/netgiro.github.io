---
sidebar_position: 1
title: Shopify
---

# Netgiro Payments for Shopify

![shopify-logo](/images/shopify-logo-785x231.png)

Netgiro is available as an alternative payment method using Shopify's new Payments Platform.

Here are steps to integrate for [new merchants](./new-merchants.md)

Here are steps to integrate for [migrating merchants](./migrating-merchants.md) (who previously installed Netgiro as an HPSDK alternative payment method, as HPSDK integrations will be deprecated by Shopify by 2022-July-31, and will no longer be able to process payments).

## Test Mode

Currently, only production Netgiro merchant accounts are supported for placing test orders. Test orders will not be visible in your Netgiro partner portal but will show up in Shopify store admin if the order was completed. Production orders will be visible in both the Netgiro partner portal and your Shopify store admin.

:::warning Note
If you do check "Test mode" for the payment method, make sure to uncheck "Test mode" as soon as testing is done. Netgiro does not pay out for test orders if a live customer places a real order while "Test mode" was checked.
:::
