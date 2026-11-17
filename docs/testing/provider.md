---
sidebar_position: 1
title: Provider
---

# Test provider setup

To start testing, register your own test account:

1. Go to [https://partner.test.netgiro.is/Account/Register](https://partner.test.netgiro.is/Account/Register)
2. Create your account
3. Log in at [https://partner.test.netgiro.is/](https://partner.test.netgiro.is/)
4. Navigate to your integration settings to find your **ApplicationId** and **SecretKey**

Use your **SecretKey** as the `X-Netgiro-Api-Key` header value when calling the V2 API and hosted checkout test endpoints. The ApplicationId is not accepted as an API key.
