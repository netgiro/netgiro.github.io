---
title: Additional functionality
layout: default
nav_order: 2

parent: HTTP POST and iFrame
---

#  Additional functionality

##  Examples
Here you can see examples of the request message, and also the implementation of message signing using C#.

###  Standard request message
~~~ js
<form method="post" action="https://securepay.test.netgiro.is/">
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

<button type="submit">Test - Pay with Netgiro</button>
</form>
~~~


###  C# message signing

If you are e.g. using ASP.NET you can use this server side helper method in C# to calculate the message signatures: 

~~~ c#
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
~~~

Equivalent methods are easily attainable for PHP, Java, etc. 

Example usage of the method is:

~~~
  CalculateSignature("secret", "222", "1999", "123");
~~~

For validating the response from Netgiro you should verify that the **NetgiroSignature** is correct with => SHA256(SecretKey, ReferenceNumber, TransactionId, InvoiceNumber, TotalAmount, Status), like e.g. 

~~~
  CalculateSignature("secret", "WEB-123", "982as34-1ss23123-4asd12", "1234", "1990", "1");
~~~
