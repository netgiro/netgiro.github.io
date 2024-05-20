---
title: API - Insert Cart
layout: default
nav_order: 3

parent: Checkout
grand_parent: API
---

# Insert Cart
[**https://api.test.netgiro.is/checkout/InsertCart**](https://api.test.netgiro.is/swagger/)
	
#### Request body

| Name  | Required | Description |
| ------------- | ------------- |------------- |
| Amount  | Yes | Total amount of the purchase  |
| Reference  | Yes | Reference |
| CustomerId* | Yes | SSN, SMS code, AppCode or GSM number for client identification |
| ConfirmationType** | Yes | Provider's way of confirming purchases after customer confirmation |
| CallbackUrl***| No | Url to which a POST request will be made after customer has confirmed the sale |
| CallbackCancelUrl***| No | Url to which a POST request will be made after customer has cancelled the sale |
| Description | No | Purchase description |
| CartItemRequests | No | Cart items |

***SSN** for testing is **1111111119**, **GSM** for testing is **7700001**, **AppCode** can be generated [**here**](/docs/testing/api-pos) at the bottom of page


**Confirmation type values: `0 - automatic`, `1 - server callback`, `2 - manual`

***If you provide `CallbackUrl` on `InsertCart`:
  - Callbacks are sent as POST requests (to the given URL) and will be considered acknowledged only if they respond with 200 OK.
  - Callback on `CallbackUrl` will be received when customer confirms payment request in mobile app
  - If provided, callback on `CallbackCancelUrl` will be received when customer cancels the cart. You can also use `CheckCart` to check the cart status.

#### Response body

| Name | Values |
| ------------- |------------- |
| Success | true, false |
| ResultCode | see ResultCodes section |
| TransactionId | GUID (cart identifier used later for checking or canceling cart) |
| ProcessCartCheckIntervalMiliseconds | int? (The pace how often the cart should be checked by provider) |

### Possible responses for `InsertCart`
  - Successful insert
      - Success = true
      - ResultCode = Success (200)
      - TransactionId = GUID

  - Not a customer or any other validation error
    - Success = false
    - ResultCode = GenericError (400) or any other error code
    
**After you create cart with CustomerId = 7700001 (GSM number as CustomerId) you can simulate customer confirmation or rejection (as in mobile app) on [https://customer.test.netgiro.is/](https://customer.test.netgiro.is/). See explanation [here.](/docs/testing/customer#gsm-payment-verification)**