---
title: Sales
parent: API
nav_order: 8
---

# Netgiro API - sales

Testing url (with swagger documentation): [**https://test.netgiro.is/api/sales**](https://test.netgiro.is/api/swagger/ui/index#/sales)

More info for testing process (test provider AppId and SecretKey, test user credentials etc.) can be found [**here**](https://netgiro.github.io/testing.html)

Also, example application can be found at [**https://demoshop.netgiro.is/**](https://demoshop.netgiro.is/) with source code [**here**](https://github.com/netgiro/api-demo-client)

For any questions and concerns about API integration, please contact this mail: **dev@netgiro.is**

## Transaction
[**https://test.netgiro.is/api/transaction**](https://test.netgiro.is/api/swagger/ui/index#!/sales/transaction)

Get details about sale

	
Request body:

| Name  | Required | Description |
| ------------- | ------------- |------------- |
| TransactionId  | Yes | Identifier of the payment in Netgíró system  |

Response body:

| Name | Values |
| ------------- |------------- |
| Success | true, false |
| ResultCode | normal result codes (200, 400, etc.) |
| Message | string (additional message explaining the result) |
| IsRefundable | bool (the value which tells us if the sale is refundable) |
| Status | string (status of sale: paid, unpaid, canceled, new) |
| Created | DateTime (time when sale was created) |
| InvoiceNumber | int (invoice number for the sale) |
| TotalAmount | decimal (total amount of sale) |
| TransactionId | GUID (identifier of the payment in Netgíró system) |
| SettlementDate | DateTime (date after which the money will be settled to provider) |

Possible responses for `Transaction`:
  - Successful get
      - Success = true
      - ResultCode = Success (200)
      - Message = string
      - IsRefundable = bool
      - Status = string
      - Created = DateTime
      - InvoiceNumber = int
      - TotalAmount = decimal
      - TransactionId = GUID
      - SettlementDate = DateTime

  - Sale not found
    - Success = false
    - Message = Sale not found

  - Any other error
    - Success = false
    - Message = Error on request.
    - ResultCode = 500

<br>