---
sidebar_position: 5
title: Confirm Cart
---

# Confirm Cart
[**https://api.test.netgiro.is/v1/Checkout/ConfirmCart**](https://api.test.netgiro.is/swagger/)

Confirms cart from provider side if `ConfirmationType = Manual`.

#### Request body

| Name  | Required | Description |
| ------------- | ------------- |------------- |
| TransactionId  | Yes | Cart identifier  |
| Identifier  | No | Customer identifier (SSN, app code, phone number) |

#### Response body

| Name  | Values |
| ------------- | ------------- |
| Success | true, false |
| PaymentSuccessful | true, false |
| ResultCode | see ResultCodes section |
| PaymentInfo | object with data about payment |

#### PaymentInfo body

| Name  | Values |
| ------------- | ------------- |
| TransactionId | Identifier of the payment in Netgiro system |
| InvoiceNumber | Invoice number for the payment |
| ReferenceNumber | Reference number parameter from the request, identifying the order in the providers system |
| StatusId | Status of payment: 1 - unconfirmed, 2 - confirmed, 5 - canceled |
| Created | Time when payment was created |
| TotalAmount | Amount of payment |

### Possible responses for `ConfirmCart`
  - Payment failed
    - Success = true
    - PaymentSuccessful = false
    - ResultCode = 400 or some error other code
    
  - Payment created
    - Success = true
    - PaymentSuccessful = true
    - ResultCode = PaymentConfirmed (10200)
