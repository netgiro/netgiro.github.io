---
title: Requests
layout: default
nav_order: 1

parent: API
---

# Requests
 
## Headers
 
 Every API request requires custom headers to be sent with HTTP request/response. Netgíró defines four custom headers:
 
| Name  | Description | Example  |
| ------------- | ------------- | ------------- |
| netgiro_appkey  | This header needs to contain client’s application id. Every client gets unique application id when he registers with Netgíró.  | 881E674F-7891-4C20-AFD8-56FE2624C4B5  |
| netgiro_nonce  | Timestamp integer value (recommended in the form of number of ticks since 1.1.1900.).  | 12345  |
| netgiro_signature  | 	Signature created from: secret + nonce + url of action + request body.  | fab2e49378897fc3e36a51c747fe90792e604080459f4ea2c782596ce7e31cd |
| netgiro_referenceId  | Reference returned by netgiro that uniquely identifies call, and should be stored for later reference(debugging purposes).  | 3ff79557-bce0-4ecf-889e-6a9e909dcd1b |

## General request protocol

Every API request must have full set of Netgíró header attributes. With every request client needs to send

* netgiro_appkey
* netgiro_nonce
* netgiro_signature

![netgiro-api-request](/images/Netgiro-API-request.png)

Netgíró will check headers of every request and verify if all headers are present and if **netgiro_signature** is valid. If any of the headers are missing or if signature isn’t valid request will be rejected.

Response from Netgíró will contain same set of headers, with different nonce, new signature and **netgiro_referenceId**, which identifies call in netgiro system(useful when contacting netgiro support to identify which call). Client should verify response that he gets from the server. Servers signature should match the one client creates on same data. If signatures don’t match client should discard any data he got from the server.