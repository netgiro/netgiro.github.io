---
title: Demo shop
parent: Testing
nav_order: 6
---

# Demo shop
## Netgiro API - checkout

Testing url for Netgiro API - checkout is: https://test.netgiro.is/api/checkout

Swagger documentation for the API can be found at: https://test.netgiro.is/api/swagger/ui/index#/Checkout

Example application for testing Netgiro API can be found at: https://demoshop.netgiro.is/ and its source code is available on: https://github.com/netgiro/api-demo-client


Netgiro API can be implemented following the next steps:

1. InsertCart method (https://test.netgiro.is/api/checkout/InsertCart) has to be called when clicking the Buy/Checkout button in your system with the following parameters in the request body: Amount, Description and Reference and CustomerId (CustomerId is his GSM number).

2. After successfull response from InsertCart method you need to create a frontend loop which will check the status of the cart every few seconds (recommendation is 3 seconds). This check will be performed using CheckCart method from https://test.netgiro.is/api/checkout/CheckCart

Check cart method can return various responses:

1. If Success value of true and PaymentSuccessful url are returned, sale has been confirmed by the customer
2. If ResultCode of 10423 is returned, customer has canceled the sale
3. If none of the above are returned, customer did not take any action

 
