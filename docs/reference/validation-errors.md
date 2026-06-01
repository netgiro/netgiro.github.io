---
sidebar_position: 3
title: Validation Errors
---

# Validation Errors

When required fields are missing or invalid, the API returns HTTP 400 with details about the validation failure.

## Response format

```json
{
  "Success": false,
  "Message": "'Amount' must be greater than '0'.",
  "Status": null,
  "TransactionId": null,
  "PollIntervalMs": null
}
```

## Common validation errors

| Condition | Message |
|-----------|---------|
| Missing amount | `'Amount' must be greater than '0'.` |
| Missing reference | `'Reference' must not be empty.` |
| Missing customer identifier | `'CustomerIdentifier' must not be empty.` |
| Invalid customer identifier | `Customer not verified.` |
| Customer blacklisted | `Customer is blacklisted` |
| Invalid API key | `API key is required` (HTTP 401) |
| Transaction not found | `Transaction not found` |
