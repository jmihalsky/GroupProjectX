
var api3_url = "https://api.fantasydata.net/v3/nfl/stats/JSON/Standings/2018";

var teamRecord=[];

$(function () {
    $.ajax({
        url: api3_url,
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", apikey);
        },
        type: "GET",
        data: "{body}",
    }).done(function (data) {
        //console.log(data);
        for (var i = 0; i < data.length; i++) {
            var tmRecord = {
                team:"",
                record:"",
            };
            tmRecord.team = (data[i].Team);
            var wins = (data[i].Wins).toString();
            var losses = (data[i].Losses).toString();
            var ties = (data[i].Ties).toString();
            tmRecord.record=wins+"-"+losses+"-"+ties;
            teamRecord.push(tmRecord);
        }
    })
});

console.log(teamRecord);