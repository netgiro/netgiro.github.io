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
| Missing API key | `API key is required` (HTTP 401) |
| Invalid, archived or ApplicationId used as API key | `Invalid API key` (HTTP 401) — see [Authentication](../authentication.md#invalid-api-key) |
| Transaction not found (status) | `Transaction not found` |
| Transaction not found or another merchant's (capture) | `Loan does not exist` |
| Transaction not found or another merchant's (cancel) | `Cart does not exist!` |
