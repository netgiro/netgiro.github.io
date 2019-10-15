---
title: Additional functionality
parent: Netgíró iFrame and HTTP POST
nav_order: 3
---

#  Additional functionality
##  Examples
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
