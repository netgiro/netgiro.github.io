---
title: Customer
layout: default
nav_order: 2

parent: Testing
---

# Test customer info

{: .warning }
> Please take note that the URL for test server has moved from [https://test.netgiro.is/customer]() to [https://customer.test.netgiro.is/]().

[https://customer.test.netgiro.is/](https://customer.test.netgiro.is/)

## Test customer credentials

**Customer 1** - Has unlimited credit for purchases

- SSN: 1111111119 
- Password: meerko1

**Customer 2** - Has NO credit (Good for testing an "error" result)

- SSN: 2222222229
- Password: daspass

## GSM payment verification

To confirm a payment created with GSM number, you can login to the customer panel using the credentials for the Test customer as above.

***SSN** for testing is **1111111119**, **GSM** for testing is **8223281**, **AppCode** can be generated [**here**](/docs/testing/api-pos)

![customer-payment-requests](/images/payment_requests_on_customer.png)

## Auto approved and auto declined GSM numbers

For testing payment requests without confirming them manually, the sandbox has two GSM numbers that resolve the request on their own:

| GSM | Result |
| ------------- | ------------- |
| **8111111** | **Auto approved** - the purchase goes through: it is booked on the test customer (SSN **1111111119**), the loan is created, and the merchant gets the success callback and the success redirect. |
| **8222222** | **Auto declined** - the purchase is cancelled: the cart goes to canceled and the merchant gets the cancel callback and the cancel redirect, the same as when a customer rejects the request in the app. |

{: .info }
> With these numbers you do not need to log in to the customer panel or the app to confirm the request - use them when you want to test the merchant side of both outcomes end to end.
