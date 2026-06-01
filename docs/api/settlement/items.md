---
sidebar_position: 2
title: Settlement Items
---

# Settlement Items

**GET** `/v2/settlement/items/{settlementNumber}`

Get the individual transactions included in a settlement.

### Example

```
GET /v2/settlement/items/100000-000069
```

## Response

```json
[
  {
    "TotalAmount": 5000,
    "CostAmount": 100,
    "Created": "2026-05-10T10:30:00",
    "LoanNumber": "L-123456"
  }
]
```
