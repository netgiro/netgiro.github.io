# Netgíró iFrame and HTTP POST
### Introduction
Netgíró provides simple and easy solution for enabling online payments. Netgíró HTTP POST integration is aimed at web sites that have implemented their own cart and checkout process. (HTTP GET is not supported for sending purchase data to Netgiro)

![netgiro-iframe-process](https://user-images.githubusercontent.com/47334837/66639927-2d9aca00-ec18-11e9-86ca-d8251a890961.png)

Customer browses merchant's shop and chooses the items she wants to buy. When the customer is ready to checkout she gets redirected to Netgíró site. On Netgíró site the customer will be presented with payment options. After successful purchase the customer will be redirected back to merchant's site.

You can choose if you want to integrate Netgíró into your site using a redirect to Netgíró site, or you want to display Netgíró inside an iframe on your site. The process is practically the same for both approaches.

### HTTP Post request
| Name | Data Type | Required | Description | Example |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| ApplicationID | string | Yes | Merchant identifier | 1234 |
| PaymentSuccessfulURL | string | No | If supplied, Netgíró will redirect the user to this url after successful purchase | shop.com/success |
| PaymentCancelledURL | string  | No | If supplied, Netgíró will show cancel button to user and redirect to this url | shop.com/cancel |
| PaymentConfirmedURL | string | No | If supplied, Netgíró will make server call to this url to confirm purchase. If call fails, purchase is canceled | shop.com/confirm |
| PrefixUrlParameters| boolean | No | If provider is using WordPress or some other framework that has reserved terms, by sending this parameter, all response parameters from Netgíró will be prefixed to avoid collision. (http://codex.wordpress.org/Function_Reference/register_taxonomy#Reserved_Terms)| true |
| ConfirmationType** | Numeric\(0,1,2) | Yes | 0 – No confirmation (default)  1 – Server side call from Netgíró on PaymentConfirmedURL  2 – purchase is in status ready, and merchant needs to confirm the purchase to Netgíró |
| [deprecated] ReturnCustomerInfo | boolean | No | Indicates if Netgíró should return customer information to the merchant site | true or false |
| AllowCustomerMessage| boolean | No | Indicates if Netgíró should show additional input field to customer, and return that information to the merchant site | true |
| Message| string | No | Message that will be shown to customer on checkout page  |Tickets valid until 01.05. |
| CustomerId| string|  No | If provider has enabled fast checkouts, here they can send customerId received from netgiro for faster checkout | usr123456asd |
| [deprecated] OrderId | string | No | Identifier of the order in the merchants system | WEB-123 |
| ReferenceNumber | string | Yes | Identifier of the order in the merchants system | WEB-123 |
| Signature | string | Yes | Signature for the message, calculated as SHA256(SecretKey + ReferenceNumber / [deprecated] OrderId  + TotalAmount + ApplicationId) |
| TotalAmount | numeric | Yes | Total amount for order. This amount should include total price of items, shipping and any additional costs, as well as any discounts | 1990 |
| ShippingAmount | numeric | No | Additional shipping cost | 1990 |
| HandlingAmount | numeric | No | Additional handling cost | 1990 |
| DiscountAmount | numeric | No | Discount amount for the order | 1990 |
| Description | string | No | If provider is not sending any item information, he can just send description of the sale  | AB-34 |
| LocationId | string | No | Provider's location identification | 1234 |
| RegisterId| string | No | Provider's terminal identification | 1234 |
| CurrentTimeUtc| DateTime | No | Time of request from merchant | 2014-02-28T12:33:45 |
| ValidToTimeUtc| DateTime | No | Time until the offer is valid to (offer will be valid for CurrentTimeUtc - ValidToTimeUtc | 2014-02-28T12:38:45 |
| Items[n].ProductNo | string | Yes | Product identifier from merchants system | AB-34 |
| Items[n].Name | string | Yes | Product name | Example product |
| Items[n].Description | string | No | Description of the product | Example product description |
| Items[n].UnitPrice | numeric | Yes | Price of single product | 1990 |
| Items[n].Amount | numeric | Yes | Total price for product | 3980 |
| Items[n].Quantity | numeric | Yes | Quantity of products | 2000 |

#### Subscriptions
Subscriptions are optional, but each cart needs to have at least one item or subscription.

| Name | Data Type | Required | Description | Example |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| Subscriptions[n].Name | string | yes | Name of subscription | Golf club membership |
| Subscriptions[n].Code | string | no | Code of predefined subscription. This field can be used to associate subscription to predefined*** subscription in provider, so provider can easily change parameters of all subscriptions in future. | NG123 |
| Subscriptions[n].IntervalType | numeric | yes | Interval of subscription(1 - week, 2 - month, 3 - year) | 2 |
| Subscriptions[n].IntervalPrice | numeric | yes | Price of one subscription interval | 1000 |
| Subscriptions[n].BillingInterval | numeric | yes | Bill every X intervals | 1 |
| Subscriptions[n].TotalIntervalCount | numeric | no | Total number of intervals(if NULL, subscription has no end date) | 12 |
| Subscriptions[n].Quantity | numeric | yes | Quantity of a subscription item | 1000|
| Subscriptions[n].TrialPeriodDays| numeric | no | If subscription has free period at start(it will not be billed for TrialPeriodDays) | 30 |

Amounts should be passed in lowest denomination of the currency, without thousand or decimal separators. For example, if the amount is €19.90 then it should be represented as 1990. Also if the amount is ISK 1990 then it should be represented as 1990.
Quantity should be passed in 1/1000 units. For example if the quantity is 2 then it should be represented as 2000.

Subscription will result with a new loan that will have an amount of IntervalPrice x Quantity x BillingInterval.

You should repeat Items[n] fields for every product in the cart, where n is a sequential number starting from 0.

*Partial payments depend on agreement with Netgíró, and provided options depend on that.

**Payment processing depends on ConfirmationType. If type is manual confirmation, any unconfirmed payments will not be processed, and will be marked invalid after 7 days.

***Subscriptions can be predefined in providers portal https://partner.netgiro.is.

### HTTP Post integration with iFrame
You can display Netgíró inside your site using an iFrame. In that case, you have to set the Iframe parameter of the request to true.

To display Netgíró within an iframe you have to set up the iframe element on your site, and post the Netgíró request to the iframe.

### Partial payments
Netgíró offers the option of paying with partial payments i.e. multiple installments. Partial payments must be enabled before you can use them in the post request.

You can control how Netgíró displays partial payment options to the user with two optional parameters:

PaymentOption
If you don’t provide the value for this parameter, or provide the value 1, the user will be presented with the options to pay using 14 days
If you provide the value 2 for this parameter, the user will be presented with the options to pay using multiple payments
If you provide the value 2 for this parameter, the user will be presented with the option to pay using multiple payments, where merchant pays for interest
MaxNumberOfInstallments
This parameter controls the maximum number of installments the user can choose to pay with. Please note that Netgíró determines the number of installments based on minimum monthly rate and other factors, so the actual number of installments offered to the user can be smaller than specified with this parameter, but it will never be bigger

### Payment confirmations
Only confirmed payments are processed in Netgíró and in bank. If the payment is not confirmed, it can be confirmed manually, calling the confirmation POST request or doing it in merchant’s Netgíró pages. Netgíró has 3 types of confirmation options:

#### Automatic confirmation (default)
If nothing is provided in request, Netgíró automatically marks successful payment as confirmed. Payment can be canceled before it is settled to merchant
#### Merchant payment confirmation
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

If Netgíró receives “OK” (HTTP status 200), payment is confirmed, and user is redirected back to the merchant pages (defined in PaymentSuccessfulURL) with response ([[#HTTP-Redirect|chapter HTTP-Redirect]])
