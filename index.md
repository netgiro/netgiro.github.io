---
title: Netgiro
layout: home
nav_order: 0
---

# Table of contents

{: .warning }
> Please take note that the URLs for the test environment have been changed. <br>
All references of URLs are updated accordingly.

<nav aria-label="Main">
  {% assign pages_top_size = site.html_pages
        | where_exp:"item", "item.title != nil"
        | where_exp:"item", "item.parent == nil"
        | where_exp:"item", "item.nav_exclude != true"
        | size %}
  {% if pages_top_size > 0 %}
    {% include components/nav.html pages=site.html_pages %}
  {% endif %}
  {%- if site.nav_external_links -%}
    <ul class="nav-list">
      {%- for node in site.nav_external_links -%}
        <li class="nav-list-item active">
            {{ node.title }}
        </li>
      {%- endfor -%}
    </ul>
  {%- endif -%}
</nav>