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
| [logo](https://github.com/netgiro/netgiro.github.io/blob/master/images/Netgiro_Logo_100.png) | Path to Netgiro logo (Size 100) |

## Netgíró loader screen

Screen with branding elements and a text to which purpose is to give user information that web-shop is contacting Netgíró payment service (Netposi). In case that connection fails, user can click on a link ("Tengist Netgíró") to establish a connection to Netgíró.

| Download link | Description |
| ------------- | ------------- |
| [logo](https://static.netgiro.is/assets/logo/logo-light-bg.svg) | Logo format used in the design. |
| [loader](https://static.netgiro.is/assets/loaders/dot-loader.gif) | Loader used in the design. |
| [Implementation example - Desktop](https://raw.githubusercontent.com/netgiro/netgiro.github.io/master/images/Netg%C3%ADr%C3%B3-loader-desktop-example.png) | Example of how the loader screen should look on desktop. |
| [Implementation example - Mobile](https://raw.githubusercontent.com/netgiro/netgiro.github.io/master/images/Netg%C3%ADr%C3%B3-loader-mobile-example.png) | Example of how the loader screen should look on mobile. |

**Text required on the screen:**
~~~
"Við sendum þig innan skamms. Tengjumst Netgíró till að klára greiðsluna Tengist Netgíró…"
~~~

## Netgíró Partial Payments Widget

Netgíró branded widget that calculates the lowest possible installment for a given amount.

<img src="images/ng-widget.png?raw=true" alt="widget.png">

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

## Netgíró API

Full api reference can be found at https://api.netgiro.is/v1/help . For now there is only .NET wrappers for API calls, soon there will be for all platforms. Also .NET wrappers are listed in NuGet, so it's easy to version and get them.

## API wrappers

| Download link | Description | Last updated | Details |
| ------------- | ------------- | ------------- | ------------- |
| [API wrapper 3.5](https://github.com/netgiro/netgiro.github.io/raw/master/documents/wrappers/Netg%C3%ADr%C3%B3%20-%20API%20Wrapper%203.5.zip) | API wrapper for .NET 3.5 | 2.2.2016. |  |
| [API wrapper 4.0](https://github.com/netgiro/netgiro.github.io/raw/master/documents/wrappers/Netg%C3%ADr%C3%B3%20-%20API%20Wrapper%204.0.zip) | API wrapper for .NET 4.0 | 2.2.2016. |  |

## Demo projects

| Download link | Description |
| ------------- | ------------- |
| [Demo projects](https://github.com/netgiro/netgiro.github.io/raw/master/documents/demos/NetgiroDemos.zip) | Demo projects showing integration with Netgiro on ASP.NET MVC project. |
| [Html demo projects](https://github.com/netgiro/netgiro.github.io/raw/master/documents/demos/Netgiro%20-%20html%20demos.zip) | Demo project showing integration with Netgiro using only html and javascript. |

## POS modules

If you need to create your own POS integration for systems running on Windows you can use our .NET POS module. It's quite convenient method for fast and secure integration. The whole payment workflow is at hand with few lines of code in your system. See the .NET POS module documentation for more info. We also have a module written in Delphi available.

| Download link | Description | Last updated | Details |
| ------------- | ------------- | ------------- | ------------- |
| [.NET POS module 3.2](https://github.com/netgiro/netgiro.github.io/raw/master/documents/Netg%C3%ADr%C3%B3%20-%20POS%20Module%20(v_3.2.1).zip) | 	.NET POS module (version 3.2). Supports .NET 3.5 and .NET 4.0+ | 29.4.2019. |  |
| [.NET POS module 3.0 - Documentation](https://github.com/netgiro/netgiro.github.io/raw/master/documents/Netg%C3%ADr%C3%B3%20-%20POS%20Module%20(v_3.0)%20-%20Documentation.zip) | .NET POS module (version 3.0) documentation | 18.3.2019. |  |

## Installable POS modules based on your system

We support all the major POS systems in Iceland. Please contact us for details and download packages based on your system version.

| Download link | Description | Last updated | Details |
| ------------- | ------------- | ------------- | ------------- |
| Centara |	Centara |  |  |
| Dynamics Ax |	Microsoft Dynamics Ax |  |  |
| DK |	dkPos and dk iPos |  |  |
| LS Retail 6 |	LS Retail 6 (LS NAV 2009) |  |  |
| LS Retail 8 - LS Retail 10 |	Module for various LS Retail versions (LS NAV 2013-2017) |  |  |
| [Business Central / NAV 2018 (VERSION 1.0.1.9)](https://github.com/netgiro/netgiro.github.io/raw/master/documents/Netgiro_NAV2018_1.0.1.9.zip) |		Business Central / NAV 2018 module | 27.9.2019. | V.1.0.1.9. - Setup improvements |
| Business Central / NAV 2018 (VERSION 1.0.1.8 - Not available) |	Business Central / NAV 2018 module | 22.8.2019. | 	V.1.0.1.8. - Simplified store setup |
| SagaPOS |	SagaPOS from Strikamerki/Origo |  |  |

## Netposi

Netposi is Netgíró's POS web only solution. You need to be registered Netgíró partner to use it.

| Download link | Description |
| ------------- | ------------- |
| [Netposi manual](https://github.com/netgiro/netgiro.github.io/raw/master/documents/Netposa-lei%C3%B0beiningar-v1.0.pdf) |	Quick instructions to get you up and running in no time - the quickest way to start charging Netgíró users. |
