var applicationKey = "881e674f-7891-4c20-afd8-56fe2624c4b5";
var secretKey = "YCFd6hiA8lUjZejVcIf/LhRXO4wTDxY0JhOXvQZwnMSiNynSxmNIMjMf1HHwdV6cMN48NX3ZipA9q9hLPb9C1ZIzMH5dvELPAHceiu7LbZzmIAGeOf/OUaDrk2Zq2dbGacIAzU6yyk4KmOXRaSLi8KW8t3krdQSX7Ecm8Qunc/A=";
var apiUrl = "https://api.test.netgiro.is/v1/";

function RequestConfirmation(e) {
    e.preventDefault();

    var dataSerialized = $.param({
        Customer: '1111111119'
    });

    var url = apiUrl + "Account/RequestConfirmation?" + dataSerialized;
    var nonce = (new Date()).getTime();

    // Signature should be calculated server side, so that secret key stays a secret
    var signature = CryptoJS.SHA256(secretKey + nonce + url);

    GetRequest(e, signature, url, nonce);
}

function GetRequest(e, signature, url, nonce) {
    $("#span-code").html("Loading...");
    $.ajax({
        url: url,
        cache: true,
        type: "GET",
        beforeSend: function (request) {
            request.setRequestHeader("Netgiro_AppKey", applicationKey);
            request.setRequestHeader("Netgiro_Nonce", nonce);
            request.setRequestHeader("Netgiro_Signature", signature);
        },
        success: function (response) {
            $("#span-code").html(response.Message);
        },
        error: function (error) {
            $("#span-code").html("Error loading code!");
        }
    });
}
