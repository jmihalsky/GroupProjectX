var week = curWeek;
var apikey = "ac3cad31a30047cb96196832877aaad8";
var api2_url = "https://api.fantasydata.net/v3/nfl/odds/JSON/GameOddsByWeek/2018/" + week;
var api3_url = "https://api.fantasydata.net/v3/nfl/stats/JSON/Standings/2018";
var teamRecord = {

};

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
                team: "",
                record: "",
            };
            tmRecord.team = (data[i].Team);
            var wins = (data[i].Wins).toString();
            var losses = (data[i].Losses).toString();
            var ties = (data[i].Ties).toString();
            tmRecord.record = wins + "-" + losses + "-" + ties;
            teamRecord[tmRecord.team] = {
                team: tmRecord.team,
                record: tmRecord.record,
            }
        }
        console.log(teamRecord.ARI.record);
    })
});



// var wkGameOdds=[];

// $(function () {
//     $.ajax({
//         url: api2_url,
//         beforeSend: function (xhrObj) {
//             xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "ac3cad31a30047cb96196832877aaad8");
//         },
//         type: "GET",
//         data: "{body}",
//     }).done(function (data) {

//         for (var i = 0; i < data.length; i++) {
//             var gameStats = {
//                 key:"",
//                 hTeam:"",
//                 aTeam:"",
//                 hTeamOdds:0,
//                 aTeamOdds:0
//             };
//             gameStats.hTeam = (data[i].HomeTeamName);
//             gameStats.aTeam = (data[i].AwayTeamName);
//             gameStats.hTeamOdds = (data[i].PregameOdds["0"].HomeMoneyLine);
//             gameStats.aTeamOdds = (data[i].PregameOdds["0"].AwayMoneyLine);
//             gameStats.key = gameStats.aTeam+"|"+gameStats.hTeam;
//             wkGameOdds.push(gameStats);
//         }
//     })
// });

//console.log(wkGameOdds);