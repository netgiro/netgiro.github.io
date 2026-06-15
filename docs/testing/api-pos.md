---
sidebar_position: 3
title: API/POS
---

import TokenGenerator from '@site/src/components/TokenGenerator';

# Token generator (For API/POS testing)

Here you can generate an authentication token (Barcode or SMS) for the test customer. There are two ways users can be authenticated:

- Via App with barcode (Use the token generator below and the full barcode number is 500004-xxxx where xxxx is the generated token.)
- By entering client's SSN (If SSN is used (i.e. 111111-1119 or 222222-2229) you need to provide the 4 letter *CustomerAuthenticationToken* **in the confirmation step of the process.**)

Keep in mind that the token expires after 5 minutes.

<TokenGenerator />
