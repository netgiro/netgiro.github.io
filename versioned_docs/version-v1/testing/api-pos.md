---
sidebar_position: 3
title: API/POS
---

# Token generator (For API/POS testing)

Here you can generate an authentication token (Barcode or SMS) for the test customer. There are two ways users can be authenticated:

- Via App with barcode (Use the token generator below and the full barcode number is 500004-xxxx where xxxx is the generated token.)
- By entering client's SSN (If SSN is used (i.e. 111111-1119 or 222222-2229) you need to provide the 4 letter *CustomerAuthenticationToken* **in the confirmation step of the process.**)

Keep in mind that the token expires after 5 minutes.

<a href="#" className="btn btn-primary btn-generate-code" id="btn-generate">Generate token</a>

Token: <span style={{fontSize: '45px', fontWeight: 'bold'}} id="span-code"></span>

<script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossOrigin="anonymous"></script>
<script src="/scripts/CodeGenerator.js" crossOrigin="anonymous" type="application/javascript"></script>
<script src="/scripts/sha256.js" crossOrigin="anonymous" type="application/javascript"></script>
<script dangerouslySetInnerHTML={{__html: `
document.getElementById('btn-generate').addEventListener('click', function(e) {
    e.preventDefault();
    if (typeof RequestConfirmation === 'function') RequestConfirmation(e);
});
`}} />
