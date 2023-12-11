---
title: Signing
layout: default
nav_order: 3

parent: API
has_children: true
permalink: /docs/api/signing
---

# Signing

Signature represents computed hash that both client and Netgíró have to create so other can verify if it came from authenticated source.

When you register with Netgíró, you receive a secret key that you need to use in order to sign your requests. Netgíró also knows this secret key and can verify (using appkey and signature) who sent the request and if it’s valid.

To create signature you have to use **HMACSHA256** hash function. This function accepts a key that it uses to compute hash values. If key and value supplied to this function are the same, it will always produce the same result.

For key, you should use secret key you got from Netgíró, and for value it will always be string created from Netgíró header attribute values.

Here is a helper method used to calculate the message signatures:

```c#
public static string CalculateSignature(params string[] args)
    {
        string input = string.Join("", args);
        var sha = System.Security.Cryptography.SHA256.Create();
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

`CalculateSignature(secret, nonce, requestUrl, formData);`
