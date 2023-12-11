---
title: API - Result Codes
layout: default
nav_order: 7

parent: Checkout
grand_parent: API
---

# Result Codes
In addition to the normal result codes (200, 400, etc.), custom codes have been introduced that provide a detailed explanation of the situation that occurred during payment. They are listed below:

| Code | Explanation |
| -------- | ---------------|
| 10200 | Payment completed |
| 10201 | Payment canceled | 
| 10202 | Payment already canceled | 
| 10203 | Payment already confirmed | 
| 10302 | Customer declined payment | 
| 10304 | Cart not valid | 
| 10305 | Minimum amount error | 
| 10306 | Customer does not exist | 
| 10307 | Customer declined payment | 
| 10422 | Customer declined payment |
| 10423 | Customer declined payment |
| 10424 | Cart not found |
| 10425 | Pending customer payment confirmation (to confirm payment request in mobile app) |
| 10426 | Reservation created and waiting for provider confirmation (when ConfirmationType = Manual, provider needs to call ConfirmCart) |
| 10427 | Confirmation type not valid (when calling InsertCart) |
| 10428 | Additional confirmation needed (in cases when after SSN, provider needs to enter SMS code from customer) |
| 10429 | Reservation created and waiting for provider callback response (when ConfirmationType = ServerCallback) |