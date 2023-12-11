---
title: Widgets
layout: default
nav_order: 3

parent: Resources
---

## Compact Partial Payments Widget

![compact-payments-widget](/images/pp-widget-compact.png)

| Link to reference | Description |
| ------------- | ------------- |
| [Compact widget script](https://static.netgiro.is/dist/scripts/pp-widget-compact/pp-widget-compact.js) | Library for compact widget that needs to be referenced before sending in the request for a calculation. |

## Slider Partial Payments Widget

![slider-payments-widget](/images/pp-slider-widget.png)

| Link to reference | Description |
| ------------- | ------------- |
| [Slider widget script](https://static.netgiro.is/dist/scripts/pp-widget/pp-widget.js) | Library for slider widget that needs to be referenced before sending in the request for a calculation. |

In order to get our calculations, you need to send in following parameters:

| Parameter | Type | Description |
| ------------- | ------------- | ------------- |
| amount | Number | Valid values: from 9900 to 1000000 |
| containerId | String | Element on the page that will contain the widget. Query selector will select the first element matching the CSS selector on the document. Widget's width will adjust to the container. |

If either of the parameters are invalid, widget won't be generated on your pages.

Example :
~~~
NetgiroCalculator({amount: 10000, containerId: "#widget-wrapper"})
~~~

## Calculations API

Netgiro exposes public API that you can use to calculate partial payments in Netgiro

[https://api.netgiro.is/calculator/swagger/index.html](https://api.netgiro.is/calculator/swagger/index.html)

