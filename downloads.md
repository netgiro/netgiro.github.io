---
title: Downloads
has_children: true
nav_order: 6
---

# Downloads & resources

## Logo

Please take a look at our [styleguide](https://netgiro.frontify.com/d/8oC7BJpSmcsa/brand-guidelines#/design-system/logo), where you can download the logo in various formats. Here below you can also download Zip files with the most common types:

| Download link | Description |
| ------------- | ------------- |
| [logos](developer.netgiro.is/Attachments/documents/logo_multi_size.zip) | Set of netgiro logos in multiple sizes you can use when integrating netgiro. |
| [logos in SVG format](developer.netgiro.is/Attachments/documents/Netgiro_logo_svg.zip) | Set of netgiro logos in SVG format. |
| https://developer.netgiro.is/Attachments/Netgiro_Logo_100.png | Path to Netgiro logo (Size 100) |

## Netgíró loader screen

Screen with branding elements and a text to which purpose is to give user information that web-shop is contacting Netgíró payment service (Netposi). In case that connection fails, user can click on a link ("Tengist Netgíró") to establish a connection to Netgíró.

| Download link | Description |
| ------------- | ------------- |
| [logo](https://static.netgiro.is/assets/logo/logo-light-bg.svg) | Logo format used in the design. |
| [loader](https://static.netgiro.is/assets/loaders/dot-loader.gif) | Loader used in the design. |
| [Implementation example - Desktop](http://developer.netgiro.is/Attachments/documents/Netg%C3%ADr%C3%B3-loader-desktop-example.png) | Example of how the loader screen should look on desktop. |
| [Implementation example - Mobile](http://developer.netgiro.is/Attachments/documents/Netg%C3%ADr%C3%B3-loader-mobile-example.png) | Example of how the loader screen should look on mobile. |

**Text required on the screen:**
~~~
"Við sendum þig innan skamms. Tengjumst Netgíró till að klára greiðsluna Tengist Netgíró…"
~~~

## Netgíró Partial Payments Widget

Netgíró branded widget that calculates the lowest possible installment for a given amount.

http://developer.netgiro.is/Attachments/ng-widget.png

| Link to reference | Description |
| ------------- | ------------- |
| [Compact widget script](https://static.netgiro.is/dist/scripts/pp-widget-compact/pp-widget-compact.js) | Library for compact widget that needs to be referenced before sending in the request for a calculation. |

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

https://api.netgiro.is/calculator/index.html
