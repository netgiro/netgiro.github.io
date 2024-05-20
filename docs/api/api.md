---
title: API
layout: default
nav_order: 3

has_children: true
permalink: /docs/api
---

# API

Netgíró provides Web API for easy client integration. API is available on [https://api.netgiro.is/](https://api.netgiro.is/).

You can integrate your application with Netgíró from any platform that supports standard HTTP requests and can process JSON or XML results (.NET, Java, PHP, etc.).

## Requests/responses

Netgíró API works with standard http methods.

GET and POST are used in all of our API calls.

By default actions expect JSON objects and return results as JSON objects. API supports content negotiation so you can specify XML as content type if you prefer.