---
title: Checkout
parent: API
nav_order: 7
---

# Netgiro API - checkout

Testing url (with swagger documentation): [**https://test.netgiro.is/api/checkout**](https://test.netgiro.is/api/swagger/ui/index#/Checkout)

More info for testing process (test provider AppId and SecretKey, test user credentials etc.) can be found [**here**](https://netgiro.github.io/testing.html)

Also, example application can be found at [**https://demoshop.netgiro.is/**](https://demoshop.netgiro.is/) with source code [**here**](https://github.com/netgiro/api-demo-client)

For any questions and concerns about API integration, please contact this mail: **dev@netgiro.is**

<h2>Online checkout (webshop)</h2>
	
<details>	
  <summary>Details	
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

<h3>* Customer can confirm cart in 1 way (<code>CustomerId</code> param on <code>InsertCart</code>):</h3>
<ul>
  <li>If provider entered <b>GSM</b> as <code>CustomerId</code></li>
    <ul>
      <li>Customer gets <b>push notification</b> where he can accept/reject payment request (if customer doesn't have Netgiro mobile app he gets SMS to install it)</li>
    </ul>
</ul>

<h3>** Provider can confirm cart in 3 ways (<code>ConfirmationType</code> param on <code>InsertCart</code>):</h3>
<ul>
  <li>If provider specified <b>ServerCallback</b> as <code>ConfirmationType</code> (<code>CallbackUrl</code> has to be specified)</li>
    <ul>
      <li>Provider gets callback from server that payment is created</li>
      <li>Provider doesn't need to confirm cart, just calls <code>CheckCart</code> periodically and checks if payment is created (or canceled if customer rejected)</li>
    </ul>
</ul>

<ul>
  <li>If provider specified <b>Automatic</b> as <code>ConfirmationType</code></li>
    <ul>
      <li>Provider gets callback from server that payment is created</li>
      <li>Server automatically creates payment after customer confirmation</li>
      <li>Provider doesn't need to confirm cart, just calls <code>CheckCart</code> periodically and checks if payment is created (or canceled if customer rejected)</li>
    </ul>
</ul>

<ul>
  <li>If provider specified <b>Manual</b> as <code>ConfirmationType</code></li>
    <ul>
      <li>Server creates reservation after customer confirmation</li>
      <li>Provider calls <code>CheckCart</code> periodically and checks if reservation is created (or canceled if customer rejected)</li>
      <li>When <code>CheckCart</code> returns that reservation is created, provider needs to call <code>ConfirmCart</code> to create payment</li>
    </ul>
</ul>

<h3>Process flow</h3>
<h4>GSM confirmation</h4>
<img src="https://raw.githubusercontent.com/netgiro/netgiro.github.io/master/images/ng_checkout_flow_gsm_v2.png" alt="ng-checkout-flow-gsm">
</details>

<h2>Offline checkout (POS)</h2>

<details>	
  <summary>Details	
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

<h3>* Customer can confirm cart in 3 ways (<code>CustomerId</code> param on <code>InsertCart</code>):</h3>
<ul>
  <li>If provider entered <b>GSM</b> as <code>CustomerId</code></li>
    <ul>
      <li>Customer gets <b>push notification</b> where he can accept/reject payment request (if customer doesn't have Netgiro mobile app he gets SMS to install it)</li>
    </ul>
  <li>If provider entered <b>SSN</b> as <code>CustomerId</code></li>
    <ul>
      <li>Customer gets <b>SMS with payment code</b> (customer reads it from SMS message) and provider enters payment code into POS and calls <code>ConfirmCart</code> </li>
    </ul>
  <li>If provider entered <b>AppCode</b> (customer reads it from mobile app) as <code>CustomerId</code></li>
    <ul>
      <li>Provider calls <code>ConfirmCart</code></li>
    </ul>
</ul>

<h3>** Provider can confirm cart in 3 ways (<code>ConfirmationType</code> param on <code>InsertCart</code>):</h3>
<ul>
  <li>If provider specified <b>ServerCallback</b> as <code>ConfirmationType</code> (<code>CallbackUrl</code> has to be specified)</li>
    <ul>
      <li>Provider gets callback from server that payment is created</li>
      <li>Provider doesn't need to confirm cart, just calls <code>CheckCart</code> periodically and checks if payment is created (or canceled if customer rejected)</li>
    </ul>
</ul>

<ul>
  <li>If provider specified <b>Automatic</b> as <code>ConfirmationType</code></li>
    <ul>
      <li>Provider gets callback from server that payment is created</li>
      <li>Server automatically creates payment after customer confirmation</li>
      <li>Provider doesn't need to confirm cart, just calls <code>CheckCart</code> periodically and checks if payment is created (or canceled if customer rejected)</li>
    </ul>
</ul>

<ul>
  <li>If provider specified <b>Manual</b> as <code>ConfirmationType</code></li>
    <ul>
      <li>Server creates reservation after customer confirmation</li>
      <li>Provider calls <code>CheckCart</code> periodically and checks if reservation is created (or canceled if customer rejected)</li>
      <li>When <code>CheckCart</code> returns that reservation is created, provider needs to call <code>ConfirmCart</code> to create payment</li>
    </ul>
</ul>

<h3>Process flow</h3>
<h4>AppCode confirmation</h4>
<img src="https://raw.githubusercontent.com/netgiro/netgiro.github.io/master/images/ng_checkout_flow_appcode_v2.png" alt="ng-checkout-flow-gsm">
<br>
<h4>SSN confirmation</h4>
<img src="https://raw.githubusercontent.com/netgiro/netgiro.github.io/master/images/ng_checkout_flow_ssn_v2.png" alt="ng-checkout-flow-gsm">
<br>
<h4>GSM confirmation</h4>
<img src="https://raw.githubusercontent.com/netgiro/netgiro.github.io/master/images/ng_checkout_flow_gsm_v2.png" alt="ng-checkout-flow-gsm">
</details>		

## Result codes
In addition to the normal result codes (200, 400, etc.), custom codes have been introduced that provide a detailed explanation of the situation that occurred during payment. They are listed below:

| Code | Explanation |
| -------- | ---------------|
| 10200 | Payment completed |
| 10201 | Payment canceled | 
| 10202 | Payment already canceled | 
| 10203 | Payment already confirmed | 
| 10302 | Customer declined payment | 
| 10304 | Cart not valid | 
| 10305 | Minimum amount error | 
| 10306 | Customer does not exist | 
| 10307 | Customer declined payment | 
| 10422 | Customer declined payment |
| 10423 | Customer declined payment |
| 10424 | Cart not found |
| 10425 | Pending customer payment confirmation (to confirm payment request in mobile app) |
| 10426 | Reservation created and waiting for provider confirmation (when ConfirmationType = Manual, provider needs to call ConfirmCart) |
| 10427 | Confirmation type not valid (when calling InsertCart) |
| 10428 | Additional confirmation needed (in cases when after SSN, provider needs to enter SMS code from customer) |
| 10429 | Reservation created and waiting for provider callback response (when ConfirmationType = ServerCallback) |


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

***SSN** for testing is **1111111119**, **GSM** for testing is **7700001**, **AppCode** can be generated [**here**](https://netgiro.github.io/testing.html) at the bottom of page


**Confirmation type values: `0 - automatic`, `1 - server callback`, `2 - manual`

***If you provide `CallbackUrl` on `InsertCart`:
  - Callback on that url will be received when customer confirms payment request in mobile app
  - Callback won't be received if customer cancelled, but `CheckCart` will check that cart is canceled
 <br> <br>

Response body:

| Name | Values |
| ------------- |------------- |
| Success | true, false |
| ResultCode | see ResultCodes section |
| TransactionId | GUID (cart identifier used later for checking or canceling cart) |
| ProcessCartCheckIntervalMiliseconds | int? (The pace how often the cart should be checked by provider) |

Possible responses for `InsertCart`:
  - Successful insert
      - Success = true
      - ResultCode = Success (200)
      - TransactionId = GUID

  - Not a customer or any other validation error
    - Success = false
    - ResultCode = GenericError (400) or any other error code
    
**After you create cart with CustomerId = 7700001 (GSM number as CustomerId) you can simulate customer confirmation or rejection (as in mobile app) on [https://test.netgiro.is/customer/](https://test.netgiro.is/customer/). See explanation [here.](https://github.com/netgiro/netgiro.github.io/blob/master/testing.md#gsm-payment-verification)**

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
| ResultCode | see ResultCodes section |
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
| ResultCode | see ResultCodes section |
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
| ResultCode | see ResultCodes section |
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
