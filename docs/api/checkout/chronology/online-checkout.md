---
title: Online Checkout (Webshop)
layout: default
nav_order: 1

parent: Chronology
grand_parent: Checkout
ancestor: API
grandchildren_branch: true
---

# Online Checkout (Webshop)

## Chronology

1.  Provider calls `InsertCart` (specifies `ConfirmationType` and `CustomerId`)
2.  Customer confirms cart *
3.  Provider confirms cart **
-   If `ConfirmationType = Automatic` => Cart is confirmed automatically on server and provider just calls `CheckCart` periodically to check status of cart
-   If `ConfirmationType = Manual` => Provider calls `ConfirmCart`
- If `ConfirmationType = ServerCallback` => Provider gets callback from server that cart is confirmed

### * Customer can confirm cart in 1 way (`CustomerId` param on `InsertCart`):

- If provider entered **GSM** as `CustomerId`
    - Customer gets **push notification** where he can accept/reject payment request (if customer doesn't have Netgiro mobile app he gets SMS to install it)

### ** Provider can confirm cart in 3 ways (`ConfirmationType` param on `InsertCart`):

- If provider specified **ServerCallback** as `ConfirmationType` (`CallbackUrl` has to be specified)
    - Provider gets callback from server that payment is created
    - Provider doesn't need to confirm cart, just calls `CheckCart` periodically and checks if payment is created (or canceled if customer rejected)

- If provider specified **Automatic** as `ConfirmationType`
    - Provider gets callback from server that payment is created
    - Server automatically creates payment after customer confirmation
    - Provider doesn't need to confirm cart, just calls `CheckCart` periodically and checks if payment is created (or canceled if customer rejected)

- If provider specified **Manual** as `ConfirmationType`
    - Server creates reservation after customer confirmation
    - Provider calls `CheckCart` periodically and checks if reservation is created (or canceled if customer rejected)
    - When `CheckCart` returns that reservation is created, provider needs to call `ConfirmCart` to create payment

### Process flow

#### GSM confirmation

![netGiro-checkout-flow-gsm](/images/ng_checkout_flow_gsm_v2.png)