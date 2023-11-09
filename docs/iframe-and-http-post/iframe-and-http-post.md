---
layout: default
title: HTTP POST and iFrame
nav_order: 1

has_children: true
permalink: /docs/iframe-and-http-post
---

# HTTP Post and iFrame Introduction
Netgíró provides simple and easy solution for enabling online payments. Netgíró HTTP POST integration is aimed at web sites that have implemented their own cart and checkout process. (HTTP GET is not supported for sending purchase data to Netgiro)

![netgiro-iframe-process](/images/netgiro-iframe-process.png)

Customer browses merchant's shop and chooses the items she wants to buy. When the customer is ready to checkout she gets redirected to Netgíró site. On Netgíró site the customer will be presented with payment options. After successful purchase the customer will be redirected back to merchant's site.

You can choose if you want to integrate Netgíró into your site using a redirect to Netgíró site, or you want to display Netgíró inside an iframe on your site. The process is practically the same for both approaches.
