var week = 5;
var apikey = "ac3cad31a30047cb96196832877aaad8";
var api2_url = "https://api.fantasydata.net/v3/nfl/odds/JSON/GameOddsByWeek/2018/"+week;


$(function(){
    // var params = {
    //     //request parameters
    // };
    $.ajax({
    url: api2_url, // + $.param(params),
    beforeSend: function(xhrObj){
        // Request headers
        xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","ac3cad31a30047cb96196832877aaad8");
    },
    type: "GET",
    // Request body
    data: "{responses}",
    })
    .done(function(data) {
        alert("success");
    })
    .fail(function() {
        alert("error");
    });
});

console.log(responses);

