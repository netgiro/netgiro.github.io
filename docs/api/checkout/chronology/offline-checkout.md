---
title: Offline Checkout (POS)
layout: default
nav_order: 2

parent: Chronology
grand_parent: Checkout
ancestor: API
---

# Offline Checkout (POS)

## Chronology
1. Provider calls `InsertCart` (specifies `ConfirmationCode` and `CustomerId`)
2. Customer confirms cart *
3. Provider confirms cart **
- If `ConfirmationType = Automatic` => Cart is confirmed automatically on server and provider just calls `CheckCart` periodically to check status of cart
- If `ConfirmationType = Manual` => Provider calls `ConfirmCart`
- If `ConfirmationType = ServerCallback` => Provider gets callback from server when cart is confirmed

### * Customer can confirm cart in 3 ways (`CustomerId` param on `InsertCart`):

- If provider entered **GSM** as `CustomerId`
    - Customer gets **push notification** where he can accept/reject payment request (if customer doesn't have Netgiro mobile app he gets SMS to install it)

- If provider entered **SSN** as `CustomerId`
    - Customer gets **SMS with payment code** (customer reads it from SMS message) and provider enters payment code into POS and calls `ConfirmCart`

- If provider entered **AppCode** (customer reads it from mobile app) as `CustomerId`
    - Provider calls `ConfirmCart`

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

## Process flow

### AppCode confirmation

![netGiro-checkout-flow-appCode](/images/ng_checkout_flow_appcode_v2.png)  

### SSN confirmation

![netGiro-checkout-flow-ssn](/images/ng_checkout_flow_ssn_v2.png)  

### GSM confirmation

![netGiro-checkout-flow-gsm](/images/ng_checkout_flow_gsm_v2.png)