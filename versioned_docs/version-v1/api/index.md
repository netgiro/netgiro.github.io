---
sidebar_position: 3
title: API
---

# API

Netgiro provides Web API for easy client integration. API is available on [https://api.netgiro.is/v1/](https://api.netgiro.is/v1/).

You can integrate your application with Netgiro from any platform that supports standard HTTP requests and can process JSON or XML results (.NET, Java, PHP, etc.).

## Requests/responses

Netgiro API works with standard http methods.

GET and POST are used in all of our API calls.

By default actions expect JSON objects and return results as JSON objects. API supports content negotiation so you can specify XML as content type if you prefer.
