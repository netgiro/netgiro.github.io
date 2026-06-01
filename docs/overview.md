---
sidebar_position: 1
title: Overview
---

# V2 API Overview

**Base URL:** `https://api.netgiro.is/v2`

The Netgiro V2 API is a purely API-based payment integration. 

## How it works

1. Merchant sends a payment request with the customer's identifier (barcode, access code, or phone number)
2. Depending on the identifier type, the payment is either confirmed instantly or requires the customer to approve in the Netgiro app
3. Merchant polls for status or receives a callback when the payment is confirmed

## Requests and responses

All endpoints accept and return JSON. Standard HTTP methods (GET and POST) are used.

Every response includes at minimum:

```json
{
  "Success": true,
  "Message": null
}
```

For any questions about API integration, contact **dev@netgiro.is**.
