---
title: API - Check Cart
layout: default
nav_order: 4

parent: Checkout
grand_parent: API
---

# Check Cart
[**https://api.test.netgiro.is/v1/checkout/CheckCart**](https://api.test.netgiro.is/swagger/)

This method needs to be called periodically to check status of cart when customer confirms/rejects cart.
- If `ConfirmationType = Automatic or ServerCallback`, this method just tells provider that payment is created.
- If `ConfirmationType = Manual`, this method tells provider that customer confirmed cart and after that provider needs to confirm it by calling `ConfirmCart`.
	
#### Request body

| Name  | Required | Description |
| ------------- | ------------- |------------- |
| TransactionId  | Yes | Cart identifier  |

#### Response body

| Name  | Values |
| ------------- | ------------- |
| Success | true, false |
| PaymentSuccessful | true, false (describes if cart is confirmed by customer) |
| ResultCode | see ResultCodes section |
| PaymentInfo | object with data about payment |

#### PaymentInfo body

| Name  | Values |
| ------------- | ------------- |
| TransactionId | Identifier of the payment in Netgíró system |
| InvoiceNumber | Invoice number for the payment |
| ReferenceNumber | Reference number parameter from the request, identifying the order in the providers system |
| StatusId | Status of payment: 1 - unconfirmed, 2 - confirmed, 5 - canceled |
| Created | Time when payment was created |
| TotalAmount | Amount of payment |

### Possible responses for `CheckCart`

  - Payment created
    - Success = true
    - PaymentSuccessful = TRUE
    - ResultCode = PaymentConfirmed (10200)
    
  - Cart canceled or doesn't exist, etc.
    - Success = true
    - PaymentSuccessful = false
    - ResultCode = PaymentCanceled (10201)
	
  - Cart active, waiting for customer confirm or reject
    - Success = true
    - PaymentSuccessful = false
    - ResultCode = PendingCustomerConfirmation (10425)
    
  - Cart confirmed by customer, reservation created and provider needs to confirm purchase by calling `ConfirmCart` -> **this is only for cases where provider sends `ConfirmationType = Manual` on `InsertCart`**
    - Success = true
    - PaymentSuccessful = false
    - ResultCode = ReservationCreatedAndWaitingForProviderConfirm (10426)
    
  - Cart active, additional confirmation needed (in cases where SMS code needs to be inserted after SSN to confirm cart)
    - Success = true
    - PaymentSuccessful = false
    - ResultCode = AdditionalConfirmationNeeded (10428)

- Cart confirmed by customer, reservation created and provider needs to confirm purchase by sending callback -> **this is only for cases where provider sends `ConfirmationType = ServerCallback` on `InsertCart`**
    - Success = true
    - PaymentSuccessful = false
    - ResultCode = ReservationCreatedAndWaitingForProviderCallback (10429)