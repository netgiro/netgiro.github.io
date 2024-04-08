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
|request_url | https://api.test.netgiro.is/checkout/InsertCart |
|netgiro_nonce | 39084373214935208 |

For the body we will be sending the following object:
```json
{
  "amount": 100,
  "reference": "1005122-122331-113",
  "customerId": "7700001",
  "confirmationType": 0
}
```

Lets say our secret is:

`YCFd6hiA8lUjZejVcIf/LhRXO4wTDxY0JhOXvQZwnMSiNynSxmNIMjMf1HHwdV6cMN48NX3ZipA9q9hLPb9C1ZIzMH5dvELPAHceiu7LbZzmIAGeOf/OUaDrk2Zq2dbGacIAzU6yyk4KmOXRaSLi8KW8t3krdQSX7Ecm8Qunc/A=` (base 64 encoded)

Then calling the `CalculateSignature` method to obtain **netgiro_signature** should return:

- `CalculateSignature(secret, netgiro_nonce, request_url, JsonSerializer.Serialize(requestBody))` 

- `d463a978220c9095ef5134c512fe24d8084f656453cf5b5aabed8a1576ef1d0b` (base 64 encoded string)