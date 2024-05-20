---
title: API - Cancel Cart
layout: default
nav_order: 6

parent: Checkout
grand_parent: API
---

# Cancel Cart
[**https://api.test.netgiro.is/checkout/CancelCart**](https://api.test.netgiro.is/swagger/)

Cancels cart (if customer hasn't already confirmed it). If customer already confirmed cart it can't be canceled from provider side.

	
#### Request body

| Name  | Required | Description |
| ------------- | ------------- |------------- |
| TransactionId  | Yes | Cart identifier  |


#### Response body

| Name  | Values |
| ------------- | ------------- |
| Success | true, false |
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

### Possible responses for `CancelCart`
  - Customer confirms before provider cancel (payment exists, can't be canceled)
    - Success = false
    - ResultCode = PaymentConfirmed (10200)
			
  - Provider cancels on time
    - Success = true
    - ResultCode = PaymentCanceled (10201)