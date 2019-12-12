---
title: Checkout-test
has_children: true
nav_order: 9
---

# Checkout-test

Testing url (with swagger documentation): [**https://test.netgiro.is/api/checkout**](https://test.netgiro.is/api/swagger/ui/index#/Checkout)

Example application: [**https://demoshop.netgiro.is/**](https://demoshop.netgiro.is/) with source code [**here**](https://github.com/netgiro/api-demo-client)

For any questions and concerns about API integration, please contact this mail: **dev@netgiro.is**

<details>	
  <summary>Collapsed Block	
</summary>	

  <h2 id="header">Header</h2>	
</details>

<h2>Online checkout (webshop)</h2>
	
<details>	
  <summary>Collapsed Block	
</summary>	

<h3>Chronology</h3>
<ol>
  <li>Provider calls <code>InsertCart</code> (specifies <code>ConfirmationType</code> and <code>CustomerId</code>)</li>
  <li>Customer confirms cart *</li>
  <li>Provider confirms cart **</li>
  <ul>
    <li>If <code>ConfirmationType = Automatic</code> => Cart is confirmed automatically on server and provider just calls <code>CheckCart</code> periodically to check status of cart</li>
    <li>If <code>ConfirmationType = Manual</code> => Provider calls <code>ConfirmCart</code></li>
    <li>If <code>ConfirmationType = ServerCallback</code> => Provider gets callback from server that cart is confirmed</li>
  </ul>
</ol>

<h3>*Customer can confirm cart in 1 way (`CustomerId` param on `InsertCart`):</h3>
<ul>
  <li>If provider entered <b>GSM</b> as `CustomerId`</li>
    <ul>
      <li> Customer gets <b>push notification</b> where he can accept/reject payment request (if customer doesn't have Netgiro mobile app he gets SMS to install it)</li>
    </ul>
</ul>
</details>

<h3>**Provider can confirm cart in 3 ways (<code>ConfirmationType</code> param on <code>InsertCart</code>):</h3>
- If provider specified **ServerCallback** as `ConfirmationType` (`CallbackUrl` has to be specified)
	- Provider gets callback from server that payment is created
	- Provider doesn't need to confirm cart, just calls `CheckCart` periodically and checks if payment is created (or canceled if customer rejected)

- If provider specified **Automatic** as `ConfirmationType`
	- Server automatically creates payment after customer confirmation
	- Provider doesn't need to confirm cart, just calls `CheckCart` periodically and checks if payment is created (or canceled if customer rejected)

- If provider specified **Manual** as `ConfirmationType`
	- Server creates reservation after customer confirmation
	- Provider calls `CheckCart` periodically and checks if reservation is created (or canceled if customer rejected)
		- When `CheckCart` returns that reservation is created, provider needs to call `ConfirmCart` to create payment

</h3>Process flow</h3>

![ng-checkout-flow-gsm](https://raw.githubusercontent.com/netgiro/netgiro.github.io/master/images/ng_checkout_flow_gsm_v2.png)
</details>
<br>

## Offline checkout (POS)
	
### Chronology
1. Provider calls `InsertCart` (specifies `ConfirmationType` and `CustomerId`)
	- If provider didn't specified `CustomerId` he needs to call `ConfirmCart` (with `CustomerId`) after `InsertCart`
2. Customer confirms cart *
3. Provider confirms cart **
	- If `ConfirmationType = Automatic` => Cart is confirmed automatically on server and provider just calls `CheckCart` periodically to check status of cart
	- If `ConfirmationType = Manual` => Provider calls `ConfirmCart`
	- If `ConfirmationType = ServerCallback` => Provider gets callback from server that cart is confirmed
    
### *Customer can confirm cart in 3 ways (`CustomerId` param on `InsertCart` or `ConfirmCart`):
- If provider entered **GSM** as `CustomerId`
	- Customer gets **push notification** where he can accept/reject payment request (if customer doesn't have Netgiro mobile app he gets SMS to install it)
	- Customer accepts payment request

- If provider entered **SSN** as `CustomerId`
	- Customer gets **SMS with payment code**
	- Provider enters payment code and calls `ConfirmCart`

- If provider entered **AppCode** (customer reads it from mobile app) as `CustomerId`
	- Provider calls `ConfirmCart`
		
### **Provider can confirm cart in 3 ways (`CustomerId` param on `InsertCart`):
- If provider specified **ServerCallback** as `ConfirmationType` (`CallbackUrl` has to be specified)
	- **this is only possible if POS is connected with server which can receive callback from Netgiro api**
	- Provider gets callback from server that payment is created
	- Provider doesn't need to confirm cart, just calls `CheckCart` periodically and checks if payment is created (or canceled if customer rejected)

- If provider specified **Automatic** as `ConfirmationType`
	- Server automatically creates payment after customer confirmation
	- Provider doesn't need to confirm cart, just calls `CheckCart` periodically and checks if payment is created (or canceled if customer rejected)

- If provider specified **Manual** as `ConfirmationType`
	- Server creates reservation after customer confirmation
	- Provider calls `CheckCart` periodically and checks if reservation is created (or canceled if customer rejected)
	- When `CheckCart` returns that reservation is created, provider needs to call `ConfirmCart` to create payment
<br>

## InsertCart
[**https://test.netgiro.is/api/checkout/InsertCart**](https://test.netgiro.is/api/swagger/ui/index#!/Checkout/Checkout_InsertCart)

Creates and inserts cart

	
Request body:

| Name  | Required | Description |
| ------------- | ------------- |------------- |
| Amount  | Yes | Total amount of the purchase  |
| Reference  | Yes | Reference |
| CustomerId* | Yes | SSN, SMS code, AppCode or GSM number for client identification |
| ConfirmationType** | Yes | Provider's way of confirming purchases after customer confirmation |
| CallbackUrl***| No | Url to which will be made post request after customer has confirmed the sale |
| Description | No | Purchase description |

***SSN** for testing is **1111111119**, **GSM** for testing is **7700001**

**Confirmation type values: `0 - automatic`, `1 - server callback`, `2 - manual`

***If you provide `CallbackUrl` on `InsertCart`:
  - Callback on that url will be received when customer confirms payment request in mobile app
  - Callback won't be received if customer cancelled, but `CheckCart` will check that cart is canceled
 <br> <br>

Response body:

| Name | Values |
| ------------- |------------- |
| Success | true, false |
| ResultCode | 200, 400 (or any other error code) |
| TransactionId | GUID (cart identifier used later for checking or canceling cart) |
| ProcessCartCheckIntervalMiliseconds | int? (The pace how often the cart should be checked by provider) |

Possible responses for `InsertCart`:
  - Successful insert
      - Success = true
      - ResultCode = Success (200)
      - TransactionId = GUID

  - Wrong gsm (or not a customer) or any other validation error
    - Success = false
    - ResultCode = GenericError (400) or any other error code
<br>

## CheckCart
[**https://test.netgiro.is/api/checkout/CheckCart**](https://test.netgiro.is/api/swagger/ui/index#!/Checkout/Checkout_CheckCart)

This method needs to be called periodically to check status of cart when customer confirms/rejects cart.
- If `ConfirmationType = Automatic or ServerCallback`, this method just tells provider that payment is created.
- If `ConfirmationType = Manual`, this method tells provider that customer confirmed cart and after that provider needs to confirm it by calling `ConfirmCart`.
	
Request body:

| Name  | Required | Description |
| ------------- | ------------- |------------- |
| TransactionId  | Yes | Cart identifier  |

<br><br>
Response body:

| Name  | Values |
| ------------- | ------------- |
| Success | true, false |
| PaymentSuccessful | true, false (describes if cart is confirmed by customer) |
| ResultCode | 10200, 10201, 10425, 10426 |
| PaymentInfo | object with data about payment |

PayementInfo body:

| Name  | Values |
| ------------- | ------------- |
| TransactionId | Identifier of the payment in Netgíró system |
| InvoiceNumber | Invoice number for the payment |
| ReferenceNumber | Reference number parameter from the request, identifying the order in the providers system |
| StatusId | Status of payment: 1 - unconfirmed, 2 - confirmed, 5 - canceled |
| Created | Time when payment was created |
| TotalAmount | Amount of payment |

Possible responses for `CheckCart`:
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

  - Payment created
    - Success = true
    - PaymentSuccessful = TRUE
    - ResultCode = PaymentConfirmed (10200)
<br>

## ConfirmCart
[**https://test.netgiro.is/api/checkout/ConfirmCart**](https://test.netgiro.is/api/swagger/ui/index#!/Checkout/Checkout_ConfirmCart)

Confirms cart from provider side if `ConfirmationType = Manual`.

	
Request body:

| Name  | Required | Description |
| ------------- | ------------- |------------- |
| TransactionId  | Yes | Cart identifier  |
| Identifier  | No | Customer identifier(SSN, app code, phone number) |

 <br> <br>
Response body:

| Name  | Values |
| ------------- | ------------- |
| Success | true, false |
| PaymentSuccessful | true, false |
| ResultCode | 200, 400 (or any other error code) |
| PaymentInfo | object with data about payment |

PayementInfo body:

| Name  | Values |
| ------------- | ------------- |
| TransactionId | Identifier of the payment in Netgíró system |
| InvoiceNumber | Invoice number for the payment |
| ReferenceNumber | Reference number parameter from the request, identifying the order in the providers system |
| StatusId | Status of payment: 1 - unconfirmed, 2 - confirmed, 5 - canceled |
| Created | Time when payment was created |
| TotalAmount | Amount of payment |

Possible responses for `ConfirmCart`:
  - Payment failed
    - Success = true
    - PaymentSuccessful = false
    - ResultCode = 400 or some error other code
    
  - Payment created
    - Success = true
    - PaymentSuccessful = true
    - ResultCode = PaymentConfirmed (10200)
<br>

## CancelCart
[**https://test.netgiro.is/api/checkout/CancelCart**](https://test.netgiro.is/api/swagger/ui/index#!/Checkout/Checkout_CancelCart)
 <br><br>
Cancels cart (if customer hasn't already confirmed it). If customer already confirmed cart it can't be canceled from provider side.

	
Request body:

| Name  | Required | Description |
| ------------- | ------------- |------------- |
| TransactionId  | Yes | Cart identifier  |

 <br> <br>
Response body:

| Name  | Values |
| ------------- | ------------- |
| Success | true, false |
| ResultCode | 10200, 10201 |
| PaymentInfo | object with data about payment |

PayementInfo body:

| Name  | Values |
| ------------- | ------------- |
| TransactionId | Identifier of the payment in Netgíró system |
| InvoiceNumber | Invoice number for the payment |
| ReferenceNumber | Reference number parameter from the request, identifying the order in the providers system |
| StatusId | Status of payment: 1 - unconfirmed, 2 - confirmed, 5 - canceled |
| Created | Time when payment was created |
| TotalAmount | Amount of payment |

Possible responses for `CancelCart`:
  - Customer confirms before provider cancel (payment exists, can't be canceled)
    - Success = false
    - ResultCode = PaymentConfirmed (10200)
			
  - Provider cancels on time
    - Success = true
    - ResultCode = PaymentCanceled (10201)
