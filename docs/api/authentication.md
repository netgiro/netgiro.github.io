---
sidebar_position: 2
title: Authentication
---

# Authentication

Every request to the V2 API must include your API key in a custom header. The API key is the **SecretKey** of your integration key.

:::warning Keep the key secret
Call the API from your server only. Never put the SecretKey in a web page, browser JavaScript or an app that customers can download. Anyone who has it can create payments, capture, cancel and refund on your behalf.

Your **ApplicationId** is not an API key and is rejected. It is a public identifier, for example in hosted checkout forms.
:::

## Headers

| Header | Required | Description |
|--------|----------|-------------|
| `X-Netgiro-Api-Key` | Yes | The SecretKey of your integration key |
| `NETGIRO_CLIENTINFO` | No | Identifies your integration platform (e.g. `System: WooCommerce 5.0`). Used for debugging and support. |

### Example

```
X-Netgiro-Api-Key: YOUR_SECRET_KEY
NETGIRO_CLIENTINFO: System: Custom POS
```


## Error responses

Both cases return HTTP 401.

### Missing API key

```json
{
  "Success": false,
  "Message": "API key is required"
}
```

### Invalid API key

Returned when the key does not match an active integration key: a wrong value, an ApplicationId, an archived integration key, or an inactive merchant account.

```json
{
  "Data": null,
  "Success": false,
  "Message": "Invalid API key",
  "ResultCode": 401
}
```

## Getting your API key

Your SecretKey is shown with your integration key in the [Netgiro Partner Portal](https://partner.netgiro.is). Log in and navigate to your integration settings.

For testing, use the sandbox credentials from the [testing guide](/docs/testing/provider).
