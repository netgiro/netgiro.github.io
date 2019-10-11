# Netgíró iFrame and HTTP POST
### Introduction
Netgíró provides simple and easy solution for enabling online payments. Netgíró HTTP POST integration is aimed at web sites that have implemented their own cart and checkout process. (HTTP GET is not supported for sending purchase data to Netgiro)

![netgiro-iframe-process](https://user-images.githubusercontent.com/47334837/66639927-2d9aca00-ec18-11e9-86ca-d8251a890961.png)

Customer browses merchant's shop and chooses the items she wants to buy. When the customer is ready to checkout she gets redirected to Netgíró site. On Netgíró site the customer will be presented with payment options. After successful purchase the customer will be redirected back to merchant's site.

You can choose if you want to integrate Netgíró into your site using a redirect to Netgíró site, or you want to display Netgíró inside an iframe on your site. The process is practically the same for both approaches.

### HTTP Post request
| Name | Data Type | Required | Description | Example  |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| ApplicationID | string | Yes | Merchant identifier | 1234 |
| PaymentSuccessfulURL  | string | No | If supplied, Netgíró will redirect the user to this url after successful purchase| shop.com/success |
| PaymentCancelledURL | string  | No  | If supplied, Netgíró will show cancel button to user and redirect to this url | shop.com/cancel |
| PaymentConfirmedURL | string | No  | If supplied, Netgíró will make server call to this url to confirm purchase. If call fails, purchase is canceled | shop.com/confirm |
|  PrefixUrlParameters| boolean | No | If provider is using WordPress or some other framework that has reserved terms, by sending this parameter, all response parameters from Netgíró will be prefixed to avoid collision. (http://codex.wordpress.org/Function_Reference/register_taxonomy#Reserved_Terms)| true |
| ConfirmationType | Numeric\(0,1,2) | Yes | 0 – No confirmation (default)  1 – Server side call from Netgíró on PaymentConfirmedURL  2 – purchase is in status ready, and merchant needs to confirm the purchase to Netgíró |
| [deprecated] ReturnCustomerInfo   | boolean |  No | Indicates if Netgíró should return customer information to the merchant site  | true or false |
| AllowCustomerMessage| boolean |  No | Indicates if Netgíró should show additional input field to customer, and return that information to the merchant site  |true |
| Message| string |  No | Message that will be shown to customer on checkout page  |Tickets valid until 01.05. |
| CustomerId| string|  No | If provider has enabled fast checkouts, here they can send customerId received from netgiro for faster checkout  | usr123456asd |
| [deprecated] OrderId | string | No| Identifier of the order in the merchants system | WEB-123 |
| ReferenceNumber | string | Yes | Identifier of the order in the merchants system | WEB-123 |
| Signature | string | Yes | Signature for the message, calculated as SHA256(SecretKey + ReferenceNumber / //[deprecated]// OrderId  + TotalAmount + ApplicationId) |  |
| TotalAmount | numeric  | Yes | Total amount for order. This amount should include total price of items, shipping and any additional costs, as well as any discounts | 1990 |
| ShippingAmount | numeric | No | Additional shipping cost | 1990 |
| HandlingAmount | numeric | No | Additional handling cost | 1990 |
| DiscountAmount | numeric | No | Discount amount for the order | 1990 |
|  Description | string | No | If provider is not sending any item information, he can just send description of the sale  | AB-34 |
|  LocationId | string | No | Provider's location identification  | 1234 |
|  RegisterId| string | No | Provider's terminal identification | 1234 |
|  CurrentTimeUtc| DateTime | No | Time of request from merchant | 2014-02-28T12:33:45 |
|  ValidToTimeUtc| DateTime | No | Time until the offer is valid to (offer will be valid for CurrentTimeUtc - ValidToTimeUtc | 2014-02-28T12:38:45|
|  Items[n].ProductNo | string | Yes | Product identifier from merchants system | AB-34 |
| Items[n].Name | string | Yes | Product name | Example product |
| Items[n].Description | string | No | Description of the product | Example product description |
| Items[n].UnitPrice | numeric | Yes | Price of single product | 1990 |
| Items[n].Amount | numeric | Yes | Total price for product | 3980 |
| Items[n].Quantity | numeric | Yes | Quantity of products | 2000 |
