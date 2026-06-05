---
sidebar_position: 1
title: Overview
---

# Netgiro Developer Documentation

Choose your integration path based on where you accept payments.

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', margin: '2rem 0'}}>

<div style={{border: '1px solid var(--ng-border)', borderRadius: '12px', padding: '1.75rem', borderTop: '4px solid #64C3A2'}}>

<h3 style={{marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
<span style={{fontSize: '1.5rem'}}>🌐</span> Online Checkout
</h3>

<p style={{color: 'var(--ng-text-muted)', fontSize: '0.9rem'}}>For web shops and e-commerce</p>

**Plugin (quickest)**
- [Shopify](/docs/web-shop-plugins/shopify)
- [WooCommerce, Magento, and more](/docs/web-shop-plugins)

**Hosted Checkout (redirect)**
- [Hosted Checkout](/docs/hosted-checkout) — Create a cart via API, redirect the customer to Netgiro's checkout page

**API (custom build)**
- [V2 API Guide](/docs/api) — Full control over the checkout UI

</div>

<div style={{border: '1px solid var(--ng-border)', borderRadius: '12px', padding: '1.75rem', borderTop: '4px solid #00AEEF'}}>

<h3 style={{marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
<span style={{fontSize: '1.5rem'}}>🏪</span> POS Checkout
</h3>

<p style={{color: 'var(--ng-text-muted)', fontSize: '0.9rem'}}>For physical stores and terminals</p>

**POS Module (quickest)**
- [.NET and platform modules](/docs/resources/pos-modules)
- [Netposi — web-based POS](/docs/resources/pos-modules#netposi)

**API (custom build)**
- [V2 API Guide](/docs/api) 
- Base URL: `https://api.netgiro.is/v2`

</div>

</div>

---

## Testing

Whichever path you choose, start in the [sandbox environment](/docs/testing) before going live.

- [**Provider credentials**](/docs/testing/provider) — Test ApplicationId and SecretKey
- [**Customer credentials**](/docs/testing/customer) — Test SSN and passwords
- [**Token generator**](/docs/testing/api-pos) — Generate barcodes

## Resources

- [**Logos**](/docs/resources/logos) — Brand assets and loader screen
- [**Widgets**](/docs/resources/widgets) — Partial payments calculator widgets

## Need help?

- Developer support: **dev@netgiro.is**
- General inquiries: **netgiro@netgiro.is**
- [Partner Portal](https://partner.netgiro.is) — Manage your integration keys
