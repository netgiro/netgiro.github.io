---
title: Checkout
parent: API
nav_order: 7
---

# Netgíró API - checkout

Testing url: [**https://test.netgiro.is/api/checkout**](https://test.netgiro.is/api/checkout)

Swagger documentation: [**https://test.netgiro.is/api/swagger/ui/index#/Checkout**](https://test.netgiro.is/api/swagger/ui/index#/Checkout)

Example application: [**https://demoshop.netgiro.is/**](https://demoshop.netgiro.is/) with source code [**here**](https://github.com/netgiro/api-demo-client)

## Netgiró API - checkout flow
- Provider creates cart on his website
	- InsertCart method
    
- Customer gets notification in his Netgiró mobile app about cart created from provider
	- Customer confirms/rejects cart
    
- Provider gets customer response
	- If CallbackUrl provided on InsertCart
		- Provider gets callback on that url that customer confirmed cart

	- If CallbackUrl not provided on InsertCart
		- Provider needs to call CheckCart periodically to check if customer confirmed cart

	- Also, CheckCart can be used from provider to check if customer rejected cart

## InsertCart
**https://test.netgiro.is/api/checkout/InsertCart**
<br><br>
Creates and inserts cart

 <br>
Request body:

| Name  | Required | Description |
| ------------- | ------------- |------------- |
| Amount  | Yes | Total amount of the purchase  |
| Reference  | Yes | Reference |
| CustomerId | Yes | GSM number for confirming purchase |
| Description | No | Optional parameter which describes purchase |
| CallbackUrl*| No | Url to which will be made post request after customer has confirmed the sale |

*If you provide CallbackUrl on InsertCart:
  - Callback on that url will be received when customer confirms payment request in mobile app
  - Callback won't be received if customer cancelled, but CheckCart will check that purchase is canceled
 <br> <br>

Response body:

| Name | Values |
| ------------- |------------- |
| Success | true or false |
| ResultCode | 200 or 400 |
| TransactionId | GUID (cart identifier used later for checking or canceling cart) |


Possible responses for InsertCart:
  - Successful insert
      - Success = true
      - ResultCode = Success (200)
      - TransactionId = GUID

  - Wrong gsm (or not a customer) or any other validation error
    - Success = false
    - ResultCode = GenericError (400)

## CancelCart
**https://test.netgiro.is/api/checkout/CancelCart**
 <br><br>
Cancels cart (if customer hasn't already confirmed it). If customer already confirmed cart it can't be canceled from provider side.

 <br>
Request body:

| Name  | Required | Description |
| ------------- | ------------- |------------- |
| TransactionId  | Yes | Cart identifier  |

 <br> <br>
Response body:

| Name  | Values |
| ------------- | ------------- |
| Success | true or false |
| ResultCode | 10200 or 10201 |


Possible responses for CancelCart:
  - Customer confirms before provider cancel (loan exists, can't be canceled)
    - Success = false
    - ResultCode = PaymentConfirmed (10200)
			
  - Provider cancels on time
    - Success = true
    - ResultCode = PaymentCanceled (10201)


## CheckCart
**https://test.netgiro.is/api/checkout/CheckCart**
 <br><br>
If CallbackUrl is not provided on InsertCart, provider won't get callback and needs to check the status of the purchase manually.
This can be done by calling CheckCart method.

 <br>
Request body:

| Name  | Required | Description |
| ------------- | ------------- |------------- |
| TransactionId  | Yes | Cart identifier  |

<br><br>
Response body:

| Name  | Values |
| ------------- | ------------- |
| Success | true or false |
| PaymentSuccessful | true or false (describes if cart is confirmed by customer) |
| ResultCode | 10200 or 10201 or 10425 |

Possible responses for CheckCart:
  - Cart canceled or doesn't exist, etc.
    - Success = true
    - PaymentSuccessful = false
    - ResultCode = PaymentCanceled (10201)
	
  - Cart active, waiting for customer confirm or reject
    - Success = true
    - PaymentSuccessful = false
    - ResultCode = PendingCustomerConfirmation (10425)
	
  - Cart canceled
    - Success = true
    - PaymentSuccessful = false
    - ResultCode = PaymentCanceled (10201)

  - Cart confirmed
    - Success = true
    - PaymentSuccessful = TRUE
    - ResultCode = PaymentConfirmed (10200)
