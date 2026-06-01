---
sidebar_position: 1
title: Settlement List
---

# Settlement List

**GET** `/v2/settlement/list`

List settlements for the authenticated provider. All query parameters are optional.

## Query parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| dateFrom | date | Start date filter (e.g. `2026-01-01`) |
| dateTo | date | End date filter (e.g. `2026-06-01`) |
| settlementNumber | string | Filter by specific settlement number |

### Example

```
GET /v2/settlement/list?dateFrom=2026-01-01&dateTo=2026-06-01&settlementNumber=100000-000069
```

## Response

```json
[
  {
    "ProviderName": "Merchant Ltd",
    "Number": "100000-000069",
    "Created": "2026-05-15T00:00:00",
    "Amount": 150000,
    "CostAmount": 3000,
    "BankTransferTransactionDate": "2026-05-20T00:00:00",
    "NumberOfSales": 42,
    "TotalAmount": 153000,
    "Status": "Paid"
  }
]
```
