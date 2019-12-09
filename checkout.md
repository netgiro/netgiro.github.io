---
title: Checkout
parent: API
nav_order: 7
---

# Netgíró API - checkout

Testing url: [**https://test.netgiro.is/api/checkout**](https://test.netgiro.is/api/checkout)

Swagger documentation: [**https://test.netgiro.is/api/swagger/ui/index#/Checkout**](https://test.netgiro.is/api/swagger/ui/index#/Checkout)

Example application: [**https://demoshop.netgiro.is/**](https://demoshop.netgiro.is/) with source code [**here**](https://github.com/netgiro/api-demo-client)

- There are 3 different confirmation types on InsertCart using which provider can confirm cart (after customer confirmation):
	1. Automatic
		- provider's side automatically confirms cart and creates loan
	2. Manual
		- provider's side has to manualy confirm cart (call method ConfirmCart) and creates loan
	3. Server callback
		- provider's side gets server callback after loan created
		- not available in offline version (on POS)

## Online version flow		
- Provider creates cart on his website
	- calls InsertCart method (specifies ConfirmationType and CustomerId)
    
### CustomerId variations
- If provider entered **GSM** as CustomerId
	- Customer gets **push notification** where he can accept/reject payment request (if customer doesn't have Netgiro mobile app he gets SMS to install it)
	- Customer accepts payment request

- If provider entered **SSN** as CustomerId
	- Customer gets **SMS with payment code**
	- Provider enters payment code and calls ConfirmCart

- If provider entered **AppCode** (customer reads it from mobile app) as CustomerId
	- Provider calls ConfirmCart
		
### ConfirmationType variations
- If provider specified **ServerCallback** as ConfirmationType (CallbackUrl has to be specified)
	- Provider gets callback from server that loan is created

- If provider specified **Automatic** as ConfirmationType
	- Server automatically creates loan after customer confirmation
	- Provider calls CheckCart periodically and checks if loan is created (or canceled if customer rejected)

- If provider specified **Manual** as ConfirmationType
	- Server creates reservation after customer confirmation
	- Provider calls CheckCart periodically and checks if reservation is created (or canceled if customer rejected)
	- When CheckCart returns that reservation is created, provider calls ConfirmCart to create loan
	<br><br>
- Provider has to periodically call CheckCart on his side to check if loan is created of canceled

## Offline version flow (POS)
- Same as in online version, except there is no ServerCallback as ConfirmationType option in offline versions

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
| CustomerId | Yes | GSM number for confirming purchase (use 7700001 on test api) |
| ConfirmationType | No | Provider's way of confirming purchases after customer confirmation (0 - automatic, 1 - server callback, 2 - manual) |
| Description | No | Purchase description |
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
