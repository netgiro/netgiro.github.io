---
sidebar_position: 1
title: Overview
---

# Netgiro Developer Documentation

There are two ways to integrate Netgiro payments:

## Option 1: API Integration

Build a custom integration using the Netgiro REST API. You own the checkout UI — Netgiro handles the payment processing behind the scenes. Best for custom-built stores, POS systems, and apps.

- [**Get started with the V2 API**](/docs/api) — Authentication, checkout, transactions, settlements
- **Base URL:** `https://api.netgiro.is/v2`

## Option 2: Web Shop Plugin

Use a pre-built plugin for your e-commerce platform. No API work needed — install the plugin, enter your credentials, and you're live.

- [**Shopify**](/docs/web-shop-plugins/shopify) — Install from the Shopify App Store
- [**WooCommerce, Magento, PrestaShop, and more**](/docs/web-shop-plugins) — See all supported platforms

---

## Testing

Whichever path you choose, start in the [sandbox environment](/docs/testing) before going live.

- [**Provider credentials**](/docs/testing/provider) — Test ApplicationId and SecretKey
- [**Customer credentials**](/docs/testing/customer) — Test SSN and passwords
- [**Token generator**](/docs/testing/api-pos) — Generate barcodes and SMS tokens

## Resources

- [**POS Modules**](/docs/resources/pos-modules) — .NET module and installable POS packages
- [**Logos**](/docs/resources/logos) — Brand assets and loader screen
- [**Widgets**](/docs/resources/widgets) — Partial payments calculator widgets

## Need help?

- Developer support: **dev@netgiro.is**
- General inquiries: **netgiro@netgiro.is**
- [Partner Portal](https://partner.netgiro.is) — Manage your integration keys
