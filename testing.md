---
title: Testing
has_children: true
nav_order: 5
---

# Testing

## URLs

**Netgíró test URL for Web Pages (IFrame/POST) integration (Web Shop Plugins use this):**

[https://test.netgiro.is/securepay/](https://test.netgiro.is/securepay/) 
- (Production URL is [https://securepay.netgiro.is/v1/](https://securepay.netgiro.is/v1/)).


**Netgíró test URL for Web Services (API) integration (Windows POS systems use this):**

[https://test.netgiro.is/api/](https://test.netgiro.is/api/) 
- (Production URL is [https://api.netgiro.is/v1/](https://api.netgiro.is/v1/)).

## Test provider info

Sandbox has been setup with test providers who either use POST or GET for callback.

[https://test.netgiro.is/partner/] (https://test.netgiro.is/partner/)

User login: sandbox@netgiro.is

Password: 

Select either account with POST or GET method. 

**About POST and GET**

   - GET Method: Data is requested from a specific resource
   - POST Method: Data is submitted to be processed to a specific resource

NETGIRO POST - USER ACCOUNT

**ApplicationID**

881E674F-7891-4C20-AFD8-56FE2624C4B5


**SecretKey**

YCFd6hiA8lUjZejVcIf/LhRXO4wTDxY0JhOXvQZwnMSiNynSxmNIMjMf1HHwdV6cMN48NX3ZipA9q9hLPb9C1ZIzMH5dvELPAHceiu7LbZzmIAGeOf/OUaDrk2Zq2dbGacIAzU6yyk4KmOXRaSLi8KW8t3krdQSX7Ecm8Qunc/A=

NETGIRO GET - USER ACCOUNT

**ApplicationID**
cf4dda0f-2698-4aeb-8092-a41c675590d2

**SecretKey**
5ElNQUxq58KmQIsVlVbOu9Lu04h0QNTkrTfDjYYvvRDO2EAC1L0SbL4M+AZjCeITiTZnKwguYph+Gj6wMr+GRY0pGMx2Cnl5ax/2iQDoNZIpC9HtLsM9Yt5pfD2oL/MG5Kn3FqbdAl22Apuvj+6O40a2Peap+EFPrknni6oQIbo=


## Test customer info

**Test customer credentials**

**Customer 1** - Has unlimited credit for purchases

- SSN: 1111111119 
- Password: meerko1

**Customer 2** - Has NO credit (Good for testing an "error" result)

- SSN: 2222222229
- Password: daspass

## GSM payment verification

To confirm a payment created with GSM number, you can login to the customer on [https://test.netgiro.is/customer/](https://test.netgiro.is/customer/) using the credentials for the Test customer as above.

***SSN** for testing is **1111111119**, **GSM** for testing is **7700001**, **AppCode** can be generated [**here**](https://netgiro.github.io/testing.html)

<img src="https://raw.githubusercontent.com/netgiro/netgiro.github.io/master/images/payment_requests_on_customer.png" alt="payment_requests_on_customer">


## Token generator (For API/POS testing)

Here you can generate an authentication token (Barcode or SMS) for the test customer. There are two ways users can be authenticated:

- Via App with barcode (Use the token generatore below and the full barcode number is 500004-xxxx where xxxx is the generated token.)
- By entering client's SSN (If SSN is used (i.e. 111111-1119 or 222222-2229) you need to provide the 4 letter <em>CustomerAuthenticationToken</em> **in the confirmation step of the process.**)

Keep in mind that the token expires after 5 minutes.

<a href="#" class="btn btn-primary btn-generate-code">Generate token</a> <br>
Token: <br><span class="bold" id="span-code" style="font-size:45px"></span>
<script
  src="https://code.jquery.com/jquery-3.4.1.min.js"
  integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
  crossorigin="anonymous">
</script>
<script src="scripts/CodeGenerator.js" crossorigin="anonymous" type="application/javascript"></script>
<script src="scripts/sha256.js" crossorigin="anonymous" type="application/javascript"></script>
<script>
    $(".btn-generate-code").on("click", function (e) {
        RequestConfirmation(e);
        return false;
    });
</script>
