---
title: POST Example
layout: default
nav_order: 2

parent: Signing
grand_parent: API
---

# POST Example
 
#### POST Request

| Name  | Example Value | 
| ------------- | ------------- |
|netgiro_appkey | 881E674F-7891-4C20-AFD8-56FE2624C4B5 |
|request_url | https://api.test.netgiro.is/v1/Checkout/InsertCart |
|netgiro_nonce | 39084373214935208 |

For the body we will be sending the following object:
```cs
var requestBody = new
{
    Amount = 1000,
    Reference = "991100-123",
    CustomerId = "8223281",
    ConfirmationType = 1,
    CallbackUrl = "www.example.com/callback-success/991100-123",
    CallbackCancelUrl = "www.example.com/callback-cancel/991100-123"
};
```

Lets say our secret is:

`YCFd6hiA8lUjZejVcIf/LhRXO4wTDxY0JhOXvQZwnMSiNynSxmNIMjMf1HHwdV6cMN48NX3ZipA9q9hLPb9C1ZIzMH5dvELPAHceiu7LbZzmIAGeOf/OUaDrk2Zq2dbGacIAzU6yyk4KmOXRaSLi8KW8t3krdQSX7Ecm8Qunc/A=` (base 64 encoded)

Then calling the `CalculateSignature` method to obtain **netgiro_signature** should return:

- `CalculateSignature(secret, netgiro_nonce, request_url, JsonSerializer.Serialize(requestBody))` 

- `8ff35684c44ae5279f16f5b024b80a7f4de18f45b71aafc9c03a2f07ac3e9856` (base 64 encoded string)