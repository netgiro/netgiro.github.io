---
title: Shopify integration
---

# Shopify integration

<img src="http://developer.netgiro.is/Attachments/shopify/shopify-logo-785x231.png">

## How to Configure Netgiro as Payment Gateway in Shopify

1) [Click here](https://accounts.shopify.com/store-login?redirect=authorize_gateway%2F1030172) and login to Shopify to get invitation for Netgiro's payment gateway.

2)  In the Shopify admin interface add Netgiro by clicking the "Add payment gateway" button.

    <img src="http://developer.netgiro.is/Attachments/shopify/Shopify_AddNetgiro.png">

3)  On the Payments settings page select Netgiro as an "Alternative payment".

    <img src="http://developer.netgiro.is/Attachments/shopify/Shopify_Settings.png">

4) Copy/Paste the ApplicatioID and SecretKey codes.

    - For **TESTING** check **"Use Test Mode"** and use the following codes:
 
      - **ApplicationID:** 881E674F-7891-4C20-AFD8-56FE2624C4B5
    
      - **SecretKey:** YCFd6hiA8lUjZejVcIf/LhRXO4wTDxY0JhOXvQZwnMSiNynSxmNIMjMf1HHw
                        dV6cMN48NX3ZipA9q9hLPb9C1ZIzMH5dvELPAHceiu7LbZzmIAGeOf/OUaDrk
                        2Zq2dbGacIAzU6yyk4KmOXRaSLi8KW8t3krdQSX7Ecm8Qunc/A=

      **Note!**    
      When testing, orders are subject to Shopify's **transaction fees**. You need to cancel the order within Shopify to avoid the fee.
      See: [Placing a test order](https://help.shopify.com/en/manual/checkout-settings/test-orders)
    
    
    
    - For **PRODUCTION** codes you need to login to the provider's portal and get the codes from the [settings portal page](https://partner.netgiro.is/Account/Login?ReturnUrl=%2FSettings)
    
      **Note!** 
      When using production codes **"Use Test Mode"** may **NOT** be checked, otherwise you'll get a security error.
      
      <img src="http://developer.netgiro.is/Attachments/shopify/Shopify_Codes.png">
      
  5) Click Activate.
    
  6) [Click here](https://netgiro.github.io/testing.html) to see the testing guideline on how to proceed with testing.
  
      **Note!**    
       If you have a credit card payment gateway from Borgun or Valitor it might disappear when adding Netgiro. 
       Then you need to reselect the respective payment gateway and re-activate it in Shopify. 
       See [Borgun's documentation](https://docs.borgun.is/hostedpayments/plugins/shopify/) for more info
    
        
