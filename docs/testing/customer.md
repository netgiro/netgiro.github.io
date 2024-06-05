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
