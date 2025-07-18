---
title: GET Example
layout: default
nav_order: 1

parent: Signing
grand_parent: API
---

# GET Example
 
#### GET Request

| Name  | Example Value | 
| ------------- | ------------- |
|netgiro_appkey | 881E674F-7891-4C20-AFD8-56FE2624C4B5 |
|request_url | https://api.netgiro.is/v1/Sales/GetList?AllForCompany=true |
|netgiro_nonce | 635318618538563781 |

- formData is "" (empty string) since we don't send anything in body (GET request)

Lets say our secret is:

`YCFd6hiA8lUjZejVcIf/LhRXO4wTDxY0JhOXvQZwnMSiNynSxmNIMjMf1HHwdV6cMN48NX3ZipA9q9hLPb9C1ZIzMH5dvELPAHceiu7LbZzmIAGeOf/OUaDrk2Zq2dbGacIAzU6yyk4KmOXRaSLi8KW8t3krdQSX7Ecm8Qunc/A=` (base 64 encoded)

Then calling the `CalculateSignature` method to obtain **netgiro_signature** should return:

- `CalculateSignature(secret, netgiro_nonce, request_url, request_formData)` 

- `1fcfcbf71b1350cf914ebb952c71d74551416a965ee3b65c38a16b35e687f87c` (base 64 encoded string)