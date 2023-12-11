---
title: Response
layout: default
nav_order: 2

parent: API
---

# Netgíró response

Every Netgíró response has common set of parameters and can have additional parameters depending on call type. **ApiResponse** is most basic response.

#### Api Response

| Name  | Data Type | Description| Example | 
| ------------- | ------------- | ------------- | ------------- |
|Success|boolean|Result of call|true|
|Message|string|Additional message explaining the result	|Success|
|ResultCode|int|Code of the result. Explained in detail in section Resultcodes	|200|