---
title: API
has_children: true
nav_order: 6
---

# Introduction
Netgíró provides web API for easy client integration. API is available on https://api.netgiro.is/v1/. You can integrate your application with Netgíró from any platform that supports standard HTTP requests and can process JSON or XML results (.NET, Java, PHP, etc.).


# Request protocol
 
## Netgíró  headers
 
 Every API request requires custom headers to be sent with HTTP request/response. Netgíró defines four custom headers:
 
| Name  | Description | Example  |
| ------------- | ------------- | ------------- |
| netgiro_appkey  | This header needs to contain client’s application id. Every client gets unique application id when he registers with Netgíró.  | 881E674F-7891-4C20-AFD8-56FE2624C4B5  |
| netgiro_nonce  | Timestamp integer value (recommended in the form of number of ticks since 1.1.1900.).  | 12345  |
| netgiro_signature  | 	Signature created from: secret + nonce + url of action + request body.  |   |
| netgiro_referenceId  | Reference returned by netgiro that uniquely identifies call, and should be stored for later reference(debugging purposes).  | 3ff79557-bce0-4ecf-889e-6a9e909dcd1b |

## Requests/responses

Netgíró API works with standard http methods. GET and POST are used in all of our API calls.

By default actions expect JSON objects and return results as JSON objects. API supports content negotiation so you can specify XML as content type if you prefer.

## General request protocol

Every API request must have full set of Netgíró header attributes. With every request client needs to send

* netgiro_appkey
* netgiro_nonce
* netgiro_signature
Where netgiro_signature is computed as explained in chapter signing

<img src="images/Netgiro-API-request.png?raw=true" alt="Netgiro-API-request.png">

Netgíró will check headers of every request and verify if all headers are present and if **netgiro_signature** is valid. If any of the headers are missing or if signature isn’t valid request will be rejected.

Response from Netgíró will contain same set of headers, with different nonce, new signature and **netgiro_referenceId**, which identifies call in netgiro system(useful when contacting netgiro support to identify which call). Client should verify response that he gets from the server. Servers signature should match the one client creates on same data. If signatures don’t match client should discard any data he got from the server.

## Signing

Signature represents computed hash that both client and Netgíró have to create so other can verify if it came from authenticated source.

When you register with Netgíró, you receive a secret key that you need to use in order to sign your requests. Netgíró also knows this secret key and can verify (using appkey and signature) who sent the request and if it’s valid.

To create signature you have to use **HMACSHA256** hash function. This function accepts a key that it uses to compute hash values. If key and value supplied to this function are the same, it will always produce the same result.

For key, you should use secret key you got from Netgíró, and for value it will always be string created from Netgíró header attribute values.

Here is a helper method used to calculate the message signatures:

```javascript
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
```
Example usage of the method is:

`CalculateSignature(secret, nonce, request_url, formData);`

Example:

* nonce = 1234
* request_url = www
* formdata = data
Input value should be formatted as follows:

`noncerequest_urlformData`

Value for hash would be:

`1234wwwdata`

If we have attributes with these values:

#### Request

| Name  | Value | 
| ------------- | ------------- |
|netgiro_appkey|881E674F-7891-4C20-AFD8-56FE2624C4B5|
|request_url|https://api.netgiro.is/v1/payment/GetByReference?ReferenceNumber=1378809819034|
|netgiro_nonce|635318618538563781|

(formData is "" since we don't send anything in body)

formated value should look like this:

`635318618538563781https://api.netgiro.is/v1/payment/GetByReference?ReferenceNumber=1378809819034`

If secret key is:

`YCFd6hiA8lUjZejVcIf/LhRXO4wTDxY0JhOXvQZwnMSiNynSxmNIMjMf1HHwdV6cMN48NX3ZipA9q9hLPb9C1ZIzMH5dvELPAHceiu7LbZzmIAGeOf/OUaDrk2Zq2dbGacIAzU6yyk4KmOXRaSLi8KW8t3krdQSX7Ecm8Qunc/A=` (base 64 encoded)

Then **netgiro_signature** needs to be:

`ec7fa41fa070a191b3e48caa6c49ea52e43b6fcc0a62ba32a4844fdea4b85e5a` (base 64 encoded string)

## Netgíró response

Every Netgíró response has common set of parameters and can have additional parameters depending on call type. **ApiResponse** is most basic response.

#### SimpleResponse

| Name  | Data Type | Description| Example | 
| ------------- | ------------- | ------------- | ------------- |
|Success|boolean|Result of call|true|
|Message|string|Additional message explaining the result	|Success|
|ResultCode|int|Code of the result. Explained in detail in section Resultcodes	|200|
