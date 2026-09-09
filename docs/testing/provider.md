---
title: Provider
layout: default
nav_order: 1

parent: Testing
---

# Test provider info

{: .warning }
> Please take note that the URL for test server has moved from [https://test.netgiro.is/partner/]() to [https://partner.test.netgiro.is/]().

Sandbox test provider accounts are self-service. **Every provider is required to register their own test account** - the shared default test accounts (and their ApplicationID/SecretKey pairs) are no longer available.

## Register your test provider account

Register here: [https://partner.test.netgiro.is/Account/Register](https://partner.test.netgiro.is/Account/Register)

Once registered, you log in to the sandbox partner portal at [https://partner.test.netgiro.is/](https://partner.test.netgiro.is/) with the credentials you signed up with. New test accounts use **POST** for the callback - the GET callback is *legacy* and exists only on older integrations, so if you need to test against one, please contact Netgíró customer support.

## Your ApplicationID and SecretKey

Every provider gets a unique **ApplicationID** and **SecretKey** when registering with Netgíró. You find yours in the sandbox partner portal under **Stillingar -> Grunnupplýsingar**: press **"Listi yfir öll vörumerki"** and select the store you are testing with. If you have problems finding your ApplicationID and/or SecretKey, please contact Netgíró customer support.

{: .info }
> Use your own ApplicationID and SecretKey in place of the values shown in the examples throughout this documentation. Those values are illustrative only and will not authenticate against the sandbox.
