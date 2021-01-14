---
title: Downloads
has_children: true
nav_order: 8
---

# Downloads & resources

## Logo

Please take a look at our [styleguide](https://netgiro.frontify.com/d/8oC7BJpSmcsa/brand-guidelines#/design-system/logo), where you can download the logo in various formats. Here below you can also download Zip files with the most common types:

| Download link | Description |
| ------------- | ------------- |
| [logos](https://github.com/netgiro/netgiro.github.io/raw/master/images/logo.zip) | Set of netgiro logos in multiple sizes and formats (png and svg) you can use when integrating netgiro. |
| [logo link](https://raw.githubusercontent.com/netgiro/netgiro.github.io/master/images/Netgiro_Logo_100.png) | Path to Netgiro logo (Size 100) |

## Netgíró loader screen

Screen with branding elements and a text to which purpose is to give user information that web-shop is contacting Netgíró payment service. Here is example of it:

<img src="https://raw.githubusercontent.com/netgiro/netgiro.github.io/master/images/Netgiro-loader-screen-example.png" alt="loader-screen-example">

In table below there are logo and loader links that are used on loader screen, also there is finished html example which you can use as loader screen.

| Download link | Description |
| ------------- | ------------- |
| [logo](https://static.netgiro.is/assets/logo/logo-light-bg.svg) | Logo format used in the design. |
| [loader](https://static.netgiro.is/assets/loaders/dot-loader.gif) | Loader used in the design. |
| [Netgiro loader screen example - html](https://raw.githubusercontent.com/netgiro/netgiro.github.io/master/documents/NetgiroRedirectPage.html) | Example of html for loader screen |


**Text required on the screen:**
~~~
"Við sendum þig innan skamms. Tengjumst Netgíró till að klára greiðsluna Tengist Netgíró…"
~~~

## Netgíró Partial Payments Widget

Netgíró branded widget that calculates the lowest possible installment for a given amount.

<img src="images/ng-widget-2.png?raw=true" alt="widget.png">

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

[https://api.netgiro.is/calculator/swagger/index.html](https://api.netgiro.is/calculator/swagger/index.html)

## Netgíró API

Full api reference can be found at [https://api.netgiro.is/v1/help](https://api.netgiro.is/v1/help).

## Demo projects

| Download link | Description |
| ------------- | ------------- |
| [Demo projects](https://github.com/netgiro/netgiro.github.io/raw/master/documents/demos/NetgiroDemos.zip) | Demo projects showing integration with Netgiro on ASP.NET MVC project. |
| [Html demo projects](https://github.com/netgiro/netgiro.github.io/raw/master/documents/demos/Netgiro%20-%20html%20demos.zip) | Demo project showing integration with Netgiro using only html and javascript. |

## POS modules

If you need to create your own POS integration for systems running on Windows you can use our .NET POS module. It's quite convenient method for fast and secure integration. The whole payment workflow is at hand with few lines of code in your system. See the .NET POS module documentation for more info. We also have a module written in Delphi available. 
<b>For any specific detail and further technical instructions about POS integration, please contact our developers at dev[at]netgiro.is.</b>

| Download link | Description | Last updated | Details |
| ------------- | ------------- | ------------- | ------------- |
| [.NET POS module 3.2](https://github.com/netgiro/netgiro.github.io/raw/master/documents/Netg%C3%ADr%C3%B3%20-%20POS%20Module%20(v_3.2.1).zip) | 	.NET POS module (version 3.2). Supports .NET 3.5 and .NET 4.0+ | 29.4.2019. | Documentation included  |

## Installable POS modules based on your system

We support all the major POS systems in Iceland. Please contact us at [netgiro@netgiro.is](mailto:netgiro@netgiro.is) for details and download packages based on your system version.

| POS System | Description | 
| ------------- | ------------- | 
| Centara |	Centara | 
| Dynamics Ax |	Microsoft Dynamics Ax |  
| DK |	dkPos and dk iPos |  
| LS Retail |	Module for various LS Retail versions  |   
| Business Central / NAV 2018  |		Business Central / NAV 2018 module |
| SagaPOS |	SagaPOS from Strikamerki/Origo |   

## Netposi

Netposi is Netgíró's POS web only solution. You need to be registered Netgíró partner to use it.

| Download link | Description |
| ------------- | ------------- |
| [Netposi manual](https://github.com/netgiro/netgiro.github.io/raw/master/documents/Netposa-lei%C3%B0beiningar-v1.0.pdf) |	Quick instructions to get you up and running in no time - the quickest way to start charging Netgíró users. |
