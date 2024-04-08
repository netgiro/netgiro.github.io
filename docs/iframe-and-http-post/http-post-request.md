---
layout: default
title: HTTP POST Request
parent: HTTP POST and iFrame
nav_order: 1
---

# HTTP POST Request

When the customer is ready to checkout you must make a POST request to Netgíró with the following parameters:
 
| Name | Data Type | Required | Description | Example |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| ApplicationID | string | Yes | Merchant identifier | 1234 |
| PaymentSuccessfulURL | string | No | If supplied, Netgíró will redirect the user to this url after successful purchase. | shop.com/success |
| PaymentCancelledURL | string  | No | If supplied, Netgíró will show cancel button to user and redirect to this url | shop.com/cancel |
| PaymentConfirmedURL | string | No | If supplied, Netgíró will make server call to this url to confirm purchase. If call fails, purchase is canceled | shop.com/confirm |
| PrefixUrlParameters| boolean | No | If provider is using WordPress or some other framework that has reserved terms, by sending this parameter, all response parameters from Netgíró will be prefixed to avoid collision. (http://codex.wordpress.org/Function_Reference/register_taxonomy#Reserved_Terms)| true |
| ConfirmationType** | Numeric\(0,1,2) | Yes | 0 – No confirmation (default)  1 – Server side call from Netgíró on PaymentConfirmedURL  2 – purchase is in status ready, and merchant needs to confirm the purchase to Netgíró |
| Message| string | No | Message that will be shown to customer on checkout page  |Tickets valid until 01.05. |
| CustomerId| string|  No | Can be phone number or SSN so thatdata is prefilled for faster checkout | usr123456asd |
| ReferenceNumber | string | Yes | Identifier of the order in the merchants system | WEB-123 |
| Signature | string | Yes | Signature for the message, calculated as SHA256(SecretKey + ReferenceNumber / [deprecated] OrderId  + TotalAmount + ApplicationId) |
| TotalAmount | numeric | Yes | Total amount for order. This amount should include total price of items, shipping and any additional costs, as well as any discounts | 1990 |
| Description | string | No | If provider is not sending any item information, he can just send description of the sale  | AB-34 |
| LocationId | string | No | Provider's location identification | 1234 |
| RegisterId| string | No | Provider's terminal identification | 1234 |
| CurrentTimeUtc| DateTime | No | Time of request from merchant | 2014-02-28T12:33:45 |
| ValidToTimeUtc| DateTime | No | Time until the offer is valid to (offer will be valid for CurrentTimeUtc - ValidToTimeUtc | 2014-02-28T12:38:45 |

Amounts should be passed in lowest denomination of the currency, without thousand or decimal separators. For example, if the amount is €19.90 then it should be represented as 1990. Also if the amount is ISK 1990 then it should be represented as 1990.
Quantity should be passed in 1/1000 units. For example if the quantity is 2 then it should be represented as 2000.

You should repeat Items[n] fields for every product in the cart, **where n is a sequential number starting from 0**.

**Payment processing depends on ConfirmationType. If type is manual confirmation, any unconfirmed payments will not be processed, and will be marked invalid after 7 days.

## HTTP Post integration with iFrame
You can display Netgíró inside your site using an iFrame. In that case, you have to set the Iframe parameter of the request to true.

To display Netgíró within an iframe you have to set up the iframe element on your site, and post the Netgíró request to the iframe.

## Payment confirmations
Only confirmed payments are processed in Netgíró and in bank. If the payment is not confirmed, it can be confirmed manually, calling the confirmation POST request or doing it in merchant’s Netgíró pages. Netgíró has 3 types of confirmation options:

### Automatic confirmation (default)
If nothing is provided in request, Netgíró automatically marks successful payment as confirmed. Payment can be canceled before it is settled to merchant
### Merchant payment confirmation
If merchant sets parameters (ConfirmationType=1, PaymentConfirmedURL=”url on merchant pages”), Netgíró sets the payment to pending, and before redirecting tries to confirm payment by calling the PaymentConfirmedURL. **Requests can be GET or POST with parameters shown in table below.**

| Name | Data Type | Required | Description | Example  |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| [deprecated] OrderId | string | No|Identifier of the order in the merchants system | WEB-123 |
| ReferenceNumber | string | Yes | Identifier of the order in the merchants system | WEB-123 |
| [deprecated] ConfirmationCode | string | No| Reference number for the payment in Netgíró system | 982as34-1ss23123-4asd12 |
| TransactionId | string | Yes | Identifier of the payment in Netgíró system | 982as34-1ss23123-4asd12 |
| InvoiceNumber | numeric | Yes | Invoice number for the payment. Customer gets this number in his invoice via email and in Netgíró system. | 1234 |
| Signature  | string | Yes | Signature for the message calculated as SHA256(SecretKey, ReferenceNumber / [deprecated] OrderId , ConfirmationCode, InvoiceNumber) |  |
| NetgiroSignature| string | Yes | Signature for the message calculated as SHA256(SecretKey, ReferenceNumber / [deprecated] OrderId, TransactionId, InvoiceNumber, TotalAmount, Status) | |
| TotalAmount | numeric  | Yes | Total amount for order. This amount should include total price of items, shipping and any additional costs, as well as any discounts | 1990 |
| Status| numeric| yes| 1 - unconfirmed, 2 - confirmed, 5 - canceled | 1 |
| [deprecated] Name| string | No | - | - |
| [deprecated] Email| string | No | - | - |

If Netgíró receives “OK” (HTTP status 200), payment is confirmed, and user is redirected back to the merchant pages (defined in PaymentSuccessfulURL) with response ([chapter HTTP-Redirect](#http-redirect)).

### Manual confirmation

If merchant sets parameters (ConfirmationType=2), Netgíró sets the payment to pending, redirects user back to merchant pages (PaymentSuccessfulURL), with response like in table below.

| Name | Data Type | Required | Description | Example  |
| [deprecated] OrderId | string | No | Identifier of the order in the merchants system | WEB-123 |
| ReferenceNumber | string | Yes | Identifier of the order in the merchants system | WEB-123 |
| [deprecated] ConfirmationCode | string | No | Reference number for the payment in Netgíró system | 982as34-1ss23123-4asd12 |
| TransactionId | string | Yes | Identifier of the payment in Netgíró system | 982as34-1ss23123-4asd12 |
| InvoiceNumber | numeric | Yes | Invoice number for the payment. Customer gets this number in his invoice via email and in Netgíró system. | 1234 |
| Signature | string | Yes | Signature for the message calculated as SHA256(SecretKey, ReferenceNumber / [deprecated] OrderId, ConfirmationCode, InvoiceNumber) |

After that merchant needs to call manual confirm payment ([chapter 2.4](#manual-payment-confirmation)).

## HTTP Redirect

After successful purchase Netgíró will redirect the user to PaymentSuccessfulURL you provided, together with the following parameters:

| Name | Data Type | Required | Description | Example value  |
| TransactionId | string | Yes | Identifier of the payment in Netgíró system | 982as34-1ss23123-4asd12 |
| InvoiceNumber | numeric | Yes | Invoice number for the payment. Customer gets this number in his invoice via email and in Netgíró system. | 1234 |
| ReferenceNumber | string | Yes | Identifier of the order in the merchants system | WEB-123 |
| [deprecated] Orderid | string | No | Identifier of the order in the merchants system | WEB-123 |
| [deprecated] ConfirmationCode | string | No | Identifier of the payment in Netgíró system | 982as34-1ss23123-4asd12 |
| [deprecated] Signature | string | No | Signature for the message calculated as SHA256(SecretKey, ReferenceNumber / [deprecated]OrderId) |
| NetgiroSignature| string | Yes | Signature for the message calculated as SHA256(SecretKey, ReferenceNumber / [deprecated] OrderId, TransactionId, InvoiceNumber, TotalAmount, Status) |
| Status | numeric| yes| 1 - unconfirmed, 2 - confirmed, 5 - canceled | 1 |
| Address | string | No | Customer address line 1 | Address line 1 |
| Address2 | string | No | Customer address line 2 | Address line 2 |
| City | string | No | Customers city | London |
| Country | string | No | Customers country | England |
| Zip | numeric | No | Customers zip code | 10000 |
| CustomerMessage| string | No | Comment customer entered in the input field | My name is John Doe, please mark that on delivery |
| [deprecated] Name| string | No | - | - |
| [deprecated] Email| string | No | - | - |
| CustomerId| string | No | Virtual id of customer if he accepted to connect | 1234-xxxx-12344567-afar |

[deprecated] - These fields are being deprecated, please use other fields with same description.

**If <em>PrefixUrlParameters</em> was used in request all parameters will have "ng_" before name, example <em>ng_invoiceNumber</em>.**

Also, if you get HTTP error 414 (URI too long) on PaymentSuccessfulURL for too many parameters in URL, you can request to accept just 3 key parameters from table above: Signature, InvoiceNumber and OrderId.

For validating the response from Netgiro you should verify that the **NetgiroSignature** is correct with => SHA256(SecretKey, ReferenceNumber, TransactionId, InvoiceNumber, TotalAmount, Status). See chapter Message Signing for Security below for details on the encryption mechanism.

## Message signing for security

To prevent users from manipulating prices of items sent over to the Gateway each sale is encrypted with a secret key that only the merchant and Netgiro knows.

Each merchant is given an identifier and secret key which are used in creating a digital signature. Digital signature is sent together with the message ensuring the validity of the request. On every request Netgíró checks the validity of the signature, and so should your site. Every request with an invalid signature should be discarded.

Netgíró uses SHA256 hash algorithm for generating the signatures. Input string for the signature should be UTF8 encoded. The result of the signature is serialized as hex string. 

For example if you are posting a cart with the following values:

- SecretKey: **secret**
- ReferenceNumber: **222**
- Total Amount*: **1999**
- ApplicationId: **123**

The input string for the hash function is determined using: 

 ~~~ 
 SecretKey + ReferenceNumber + Total Amount + ApplicationId 
 ~~~

Which gives:
~~~
secret2221999123
~~~

The signature is then the result of the hash function 
~~~
SHA256("secret2221999123") = 8980d8fa8e6cdd593d646e235f77bf6175fbad630f6688aeaa922145f58e5719
~~~

If there is a problem with calculating the signature you should check if the following is true for you:

~~~
SHA256("abc") = ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad
~~~

You can try out the encryption with http://www.xorbin.com/tools/sha256-hash-calculator


![sha256-calculator](/images/sha256calculator.png)
Xorbin's SHA256 hash calculator

## Manual payment confirmation

If merchant is confirming payments manually ([2.1.3.3](#manual-confirmation)) he will need to confirm payment though [netgiro API](/docs/api/checkout/confirm-cart)
