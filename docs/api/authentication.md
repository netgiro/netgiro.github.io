---
sidebar_position: 2
title: Authentication
---

# Authentication

Every request to the V2 API must include your API key in a custom header.

## Headers

| Header | Required | Description |
|--------|----------|-------------|
| `X-Netgiro-Api-Key` | Yes | Your ApplicationId GUID from the provider integration key |
| `NETGIRO_CLIENTINFO` | No | Identifies your integration platform (e.g. `System: WooCommerce 5.0`). Used for debugging and support. |

### Example

```
X-Netgiro-Api-Key: 881E674F-7891-4C20-AFD8-56FE2624C4B5
NETGIRO_CLIENTINFO: System: Custom POS
```


## Error response

If the API key is missing or invalid, you'll receive an HTTP 401 response:

```json
{
  "Success": false,
  "Message": "API key is required"
}
```

## Getting your API key

Your ApplicationId is available in the [Netgiro Partner Portal](https://partner.netgiro.is). Log in and navigate to your integration settings.

For testing, use the sandbox credentials from the [testing guide](/docs/testing/provider).
