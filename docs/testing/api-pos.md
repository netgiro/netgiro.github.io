---
title: API/POS
layout: default
nav_order: 3

parent: Testing
---

# Token generator (For API/POS testing)

Here you can generate an authentication token (Barcode or SMS) for the test customer. There are two ways users can be authenticated:

- Via App with barcode (Use the token generatore below and the full barcode number is 500004-xxxx where xxxx is the generated token.)
- By entering client's SSN (If SSN is used (i.e. 111111-1119 or 222222-2229) you need to provide the 4 letter <em>CustomerAuthenticationToken</em> **in the confirmation step of the process.**)

Keep in mind that the token expires after 5 minutes.

<a href="#" class="btn btn-primary btn-generate-code">Generate token</a> <br>
Token: <br><span class="bold" id="span-code" style="font-size:45px"></span>
<script
  src="https://code.jquery.com/jquery-3.4.1.min.js"
  integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
  crossorigin="anonymous">
</script>
<script src="/scripts/CodeGenerator.js" crossorigin="anonymous" type="application/javascript"></script>
<script src="/scripts/sha256.js" crossorigin="anonymous" type="application/javascript"></script>
<script>
    $(".btn-generate-code").on("click", function (e) {
        RequestConfirmation(e);
        return false;
    });
</script>
