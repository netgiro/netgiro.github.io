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

**ApplicationID**
~~~
881E674F-7891-4C20-AFD8-56FE2624C4B5
~~~

**SecretKey**
~~~
YCFd6hiA8lUjZejVcIf/LhRXO4wTDxY0JhOXvQZwnMSiNynSxmNIMjMf1HHwdV6cMN48NX3ZipA9q9hLPb9C1ZIzMH5dvELPAHceiu7LbZzmIAGeOf/OUaDrk2Zq2dbGacIAzU6yyk4KmOXRaSLi8KW8t3krdQSX7Ecm8Qunc/A=
~~~

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
  crossorigin="anonymous"></script>
<script src="https://raw.githubusercontent.com/netgiro/netgiro.github.io/master/scripts/CodeGenerator.js" crossorigin="anonymous"></script>
<script src="https://raw.githubusercontent.com/netgiro/netgiro.github.io/master/scripts/sha256.js" crossorigin="anonymous"></script>
<script>
    $(".btn-generate-code").on("click", function (e) {
        RequestConfirmation(e);
        return false;
    });
</script>
