---
title: Checkout
parent: API
nav_order: 7
---

# Netgíró  API - checkout

Testing url for Netgíró  API - checkout is: https://test.netgiro.is/api/checkout

Swagger documentation for the API can be found at: https://test.netgiro.is/api/swagger/ui/index#/Checkout

Example application for testing Netgiro API can be found at: https://demoshop.netgiro.is/ and its source code is available on: https://github.com/netgiro/api-demo-client

## Implementation

Netgíró  API can be implemented following the next steps:


### Initiate purchase

**InsertCart

In this step InsertCart method (https://test.netgiro.is/api/checkout/InsertCart) has to be called with the following parameters in the request body: Amount, Description, Reference, CustomerId (CustomerId is his GSM number), and  CallbackUrl (url to which we will make post request after customer had confirmed the sale).

### Checking status of the purchase

After customer has confirmed the purchase, we will make a post request to the CallbackUrl you've provided in the InserCart request.

**CheckCart** method

If you need to check the status of the purchase manually, you can call the CheckCart method (https://test.netgiro.is/api/checkout/CheckCart). In the request of a CheckCart method, TransactionId returned from the InsertCart method has to be sent as a parameter.

CheckCart method can return various responses:

1. If Success value of true and PaymentSuccessful url are returned, sale has been confirmed by the customer
2. If ResultCode of 10423 is returned, customer has canceled the sale
3. If none of the above are returned, customer did not take any action
