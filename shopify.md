---
title: Shopify
parent: Web shop plugins
has_children: true
nav_order: 10
---

# Netgíró Payments for Shopify

<img src="/images/shopify-logo-785x231.png">

Netgíró is available as an alternative payment method using Shopify's new Payments Platform.

Here are steps to integrate for [new merchants](https://netgiro.github.io/shopify-new-merchants)

Here are steps to integrate for [migrating merchants](https://netgiro.github.io/shopify-migrating-merchants) (who previously installed Netgíró as an HPSDK alternative payment method, as HPSDK integrations will be deprecated by Shopify by 2022-July-31, and will no longer be able to process payments, per: https://shopify.dev/docs/hosted-payment-sdk).

## Test Mode

Currently, only production Netgiro merchant accounts are supported for placing test orders.  Test orders will not be visible in your Netgiro partner portal 
but will show up in Shopify store admin if the order was completed.  Production orders will be visible in both the Netgíró partner portal and your
Shopify store admin.

**Note!** 
If you do check "Test mode" for the payment method, make sure to uncheck "Test mode" as soon as testing is done.  Netgíró does not pay out for 
test orders if a live customer places a real order while "Test mode" was checked


    
        
