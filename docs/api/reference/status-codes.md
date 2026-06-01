---
sidebar_position: 1
title: Payment Status Codes
---

# Payment Status Codes

The `Status` field in checkout and transaction responses uses the following values:

| Value | Meaning | Merchant action |
|-------|---------|-----------------|
| `Pending` | Customer hasn't confirmed yet | Poll `/v2/checkout/status/{id}` every `PollIntervalMs` ms |
| `Authorized` | Amount held, not charged | Call `/v2/transaction/capture` when ready to charge |
| `Confirmed` | Payment complete | Done — show receipt |
| `Cancelled` | Payment cancelled | Done — show cancellation |
