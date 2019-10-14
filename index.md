# Netgíró iFrame and HTTP POST
# Introduction
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

#### Manual confirmation

If merchant sets parameters (ConfirmationType=2), Netgíró sets the payment to pending, redirects user back to merchant pages (PaymentSuccessfulURL), with response like in table below.

| Name | Data Type | Required | Description | Example  |
| [deprecated] OrderId | string | No | Identifier of the order in the merchants system | WEB-123 |
| ReferenceNumber | string | Yes | Identifier of the order in the merchants system | WEB-123 |
| [deprecated] ConfirmationCode | string | No | Reference number for the payment in Netgíró system | 982as34-1ss23123-4asd12 |
| TransactionId | string | Yes | Identifier of the payment in Netgíró system | 982as34-1ss23123-4asd12 |
| InvoiceNumber | numeric | Yes | Invoice number for the payment. Customer gets this number in his invoice via email and in Netgíró system. | 1234 |
| Signature | string | Yes | Signature for the message calculated as SHA256(SecretKey, ReferenceNumber / [deprecated] OrderId, ConfirmationCode, InvoiceNumber) |  |

After that merchant needs to call manual confirm payment ([[#Manual-payment-confirmation|chapter 2.4]]).

#### HTTP Redirect

After successful purchase Netgíró will redirect the user to PaymentSuccessfulURL you provided, together with the following parameters:

| Name | Data Type | Required | Description | Example value  |
| TransactionId | string | Yes | Identifier of the payment in Netgíró system | 982as34-1ss23123-4asd12 |
| InvoiceNumber | numeric | Yes | Invoice number for the payment. Customer gets this number in his invoice via email and in Netgíró system. | 1234 |
| ReferenceNumber | string | Yes | Identifier of the order in the merchants system | WEB-123 |
| [deprecated] Orderid | string | No | Identifier of the order in the merchants system | WEB-123 |
| [deprecated] ConfirmationCode | string | No | Identifier of the payment in Netgíró system | 982as34-1ss23123-4asd12 |
| [deprecated] Signature | string | No | Signature for the message calculated as SHA256(SecretKey, ReferenceNumber / [deprecated]OrderId) | |
| NetgiroSignature| string | Yes | Signature for the message calculated as SHA256(SecretKey, ReferenceNumber / [deprecated] OrderId, TransactionId, InvoiceNumber, TotalAmount, Status) | |
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

**If //PrefixUrlParameters// was used in request all parameters will have "ng_" before name, example //ng_invoiceNumber//.**

Also, if you get HTTP error 414 (URI too long) on PaymentSuccessfulURL for too many parameters in URL, you can request to accept just 3 key parameters from table above: Signature, InvoiceNumber and OrderId.

For validating the response from Netgiro you should verify that the **NetgiroSignature** is correct with => SHA256(SecretKey, ReferenceNumber, TransactionId, InvoiceNumber, TotalAmount, Status). See chapter Message Signing for Security below for details on the encryption mechanism.

#### Message signing for security

To prevent users from manipulating prices of items sent over to the Gateway each sale is encrypted with a secret key that only the merchant and Netgiro knows.

Each merchant is given an identifier and secret key which are used in creating a digital signature. Digital signature is sent together with the message ensuring the validity of the request. On every request Netgíró checks the validity of the signature, and so should your site. Every request with an invalid signature should be discarded.

Netgíró uses SHA256 hash algorithm for generating the signatures. Input string for the signature should be UTF8 encoded. The result of the signature is serialized as hex string. 

For example if you are posting a cart with the following values:

* SecretKey: **secret**
*ReferenceNumber: **222**
*Total Amount*: **1999**
*ApplicationId: **123**

The input string for the hash function is determined using: 
{{{
 SecretKey + ReferenceNumber + Total Amount + ApplicationId 
}}}

(X) For **subscriptions** the "TotalAmount" parameter value should be 0 and the Total Amount for the signature is the amount in **Subscriptions[n].IntervalPrice**.

Which gives:
{{{
secret2221999123
}}}

The signature is then the result of the hash function 
{{{
SHA256("secret2221999123") = 8980d8fa8e6cdd593d646e235f77bf6175fbad630f6688aeaa922145f58e5719
}}}

If there is a problem with calculating the signature you should check if the following is true for you:

{{{
SHA256("abc") = ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad
}}}

You can try out the encryption with http://www.xorbin.com/tools/sha256-hash-calculator


{{/sha256calculator.png|Xorbin's SHA256 hash calculator}}

#### Manual payment confirmation

If merchant is confirming payments manually ([[#Manual-confirmation|2.1.3.3]]) he will need to confirm payment either in his Netgíró merchant pages, or by making POST request to ConfirmPayment.Url for confirm payment is Url 
for Netgíró payment + ConfirmPayment).

| Name | Data Type | Required | Description | Example |
| ApplicationID | string | Yes | Merchant identifier | 1234 |
| [deprecated] OrderId | string | No|Identifier of the order in the merchants system | WEB-123 |
| ReferenceNumber | string | Yes | Identifier of the order in the merchants system | WEB-123 |
| [deprecated] ConfirmationCode | string | No| Reference number for the payment in Netgíró system | 982as34-1ss23123-4asd12 |
| TransactionId | string | Yes | Identifier of the payment in Netgíró system | 982as34-1ss23123-4asd12 |
| TotalAmount | numeric  | Yes | Total amount for order. This amount should include total price of items, shipping and any additional costs, as well as any discounts | 1990 |
| InvoiceNumber | numeric | Yes | Invoice number for the payment. Customer gets this number in his invoice via email and in Netgíró system. | 1234 |
| Result| boolean | Yes | True - confirm payment. False - cancel payment. | True|
| Signature | string | Yes | Signature for the message calculated as SHA256(SecretKey, ApplicationId, ReferenceNumber / [deprecated] OrderId, TransactionId / [deprecated], ConfirmationCode, InvoiceNumber, TotalAmount, Result) |  |

###  Additional functionality
###  Examples
Here you can see examples of the request message, and also the implementation of message signing using C#.

####  Standard request message
This is an example of a sale with two items. The request message also contains supported parameters such as shipping and handling:

[[[code lang=js|
<form method="post" action="https://test.netgiro.is/securepay">
<!-- Example form data -->

<!-- Options -->
<input type="hidden" name="ApplicationID" value="881E674F-7891-4C20-AFD8-56FE2624C4B5" />
<input type="hidden" name="Iframe" value="false" />
<input type="hidden" name="Signature" value="44aeac414ef7053c75a2d707dcfa54dd96cd21632925472b01d6f7547d57d09a" /> <!-- SEE MESSAGE SIGNING PROCEDURE -->
<input type="hidden" name="PaymentSuccessfulURL" value="" />

<!-- Order header -->
<input type="hidden" name="ReferenceNumber" value="order-123" />
<input type="hidden" name="TotalAmount" value="10000" />
<input type="hidden" name="ShippingAmount" value="500" />
<input type="hidden" name="HandlingAmount" value="1500" />

<!-- Order items -->
<input type="hidden" name="Items[0].ProductNo" value="1" />
<input type="hidden" name="Items[0].Name" value="First" />
<input type="hidden" name="Items[0].Description" value="Green table" />
<input type="hidden" name="Items[0].UnitPrice" value="2000" />
<input type="hidden" name="Items[0].Amount" value="6000" />
<input type="hidden" name="Items[0].Quantity" value="3000" />

<input type="hidden" name="Items[1].ProductNo" value="2" />
<input type="hidden" name="Items[1].Name" value="Second" />
<input type="hidden" name="Items[1].Description" value="Blue chair" />
<input type="hidden" name="Items[1].UnitPrice" value="2000" />
<input type="hidden" name="Items[1].Amount" value="2000" />
<input type="hidden" name="Items[1].Quantity" value="1000" />

<button type="submit">Test - Pay with Netgiro</button>
</form>
]]]

####  Request message with subscription

his is an example of the request message with a subscription item + two standard one time items in the same transaction. (Normally when dealing with subscriptions however they are the only item in the cart):

[[[code lang=js|
<form method="post" action="https://test.netgiro.is/securepay">
<!-- Example form data -->

<!-- Options -->
<input type="hidden" name="ApplicationID" value="0000000000000" />
<input type="hidden" name="Iframe" value="false" />
<input type="hidden" name="Signature" value="0000000000000000000" />
<input type="hidden" name="PaymentSuccessfulURL" value="" />

<!-- Order header -->
<input type="hidden" name="ReferenceNumber" value="order-123" />
<input type="hidden" name="TotalAmount" value="10000" />
<input type="hidden" name="ShippingAmount" value="500" />
<input type="hidden" name="HandlingAmount" value="1000" />

<!-- Order items -->
<input type="hidden" name="Items[0].ProductNo" value="1" />
<input type="hidden" name="Items[0].Name" value="First" />
<input type="hidden" name="Items[0].Description" value="asd" />
<input type="hidden" name="Items[0].UnitPrice" value="2000" />
<input type="hidden" name="Items[0].Amount" value="6000" />
<input type="hidden" name="Items[0].Quantity" value="3000" />

<input type="hidden" name="Items[1].ProductNo" value="2" />
<input type="hidden" name="Items[1].Name" value="Second" />
<input type="hidden" name="Items[1].Description" value="asd" />
<input type="hidden" name="Items[1].UnitPrice" value="2000" />
<input type="hidden" name="Items[1].Amount" value="2000" />
<input type="hidden" name="Items[1].Quantity" value="1000" />

<!-- Subscription items -->
<input type="hidden" name="Subscriptions[0].Name" value="Subscription description"/>
<input type="hidden" name="Subscriptions[0].Interval" value="Month"/>
<input type="hidden" name="Subscriptions[0].IntervalCount" value="1"/>
<input type="hidden" name="Subscriptions[0].Quantity" value="1000"/>
<input type="hidden" name="Subscriptions[0].TrialPeriodDays" value="15"/>

</form>
]]]

####  C# message signing

If you are e.g. using ASP.NET you can use this server side helper method in C# to calculate the message signatures: 

[[[code lang=c#|
public static string CalculateSignature(params string[] args)
    {
        string input = string.Join("", args);
        var sha = new System.Security.Cryptography.SHA256CryptoServiceProvider();
        var hashArray = sha.ComputeHash(System.Text.Encoding.UTF8.GetBytes(input));
        string calculatedSignature = string.Empty;

        foreach (byte b in hashArray)
        {
            calculatedSignature += b.ToString("x2");
        }

        return calculatedSignature;
    }
]]]

Equivalent methods are easily attainable for PHP, Java, etc. 

Example usage of the method is:

{{{
  CalculateSignature("secret", "222", "1999", "123");
}}}

For validating the response from Netgiro you should verify that the **NetgiroSignature** is correct with => SHA256(SecretKey, ReferenceNumber, TransactionId, InvoiceNumber, TotalAmount, Status), like e.g. 

{{{
  CalculateSignature("secret", "WEB-123", "982as34-1ss23123-4asd12", "1234", "1990", "1");
}}}


####  ASP.NET Web forms remote post

If you are using ASP.Net web forms, you can send the POST request to Netgíró using the following helper class:

[[[code lang=c#|
public class RemotePost
    {
        private System.Collections.Specialized.NameValueCollection Inputs = new System.Collections.Specialized.NameValueCollection();

        public string Url = "";
        public string Method = "post";
        public string FormName = "form1";

        public RemotePost(string url) {
            this.Url = url;
        }

        public void Add(string name, string value)
        {
            Inputs.Add(name, value);
        }

        public void Post()
        {
            System.Web.HttpContext.Current.Response.Clear();
            System.Web.HttpContext.Current.Response.Write("<html><head>");
            System.Web.HttpContext.Current.Response.Write(
string.Format("</head><body onload=\"document.{0}.submit()\">", FormName));
            System.Web.HttpContext.Current.Response.Write(string.Format("<form name=\"{0}\" method=\"{1}\" action=\"{2}\" >", FormName, Method, Url));
            for (int i = 0; i < Inputs.Keys.Count; i++)
            {
                System.Web.HttpContext.Current.Response.Write(string.Format("<input name=\"{0}\" type=\"hidden\" value=\"{1}\">", Inputs.Keys[i], Inputs[Inputs.Keys[i]]));
            }
            System.Web.HttpContext.Current.Response.Write("</form>");
            System.Web.HttpContext.Current.Response.Write("</body></html>");
            System.Web.HttpContext.Current.Response.End();
        }
    }
]]]

###  Resources
#### Production data

Production url: https://securepay.netgiro.is/v1/

For production data contact customer support.

