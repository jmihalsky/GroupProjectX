
var week = curWeek;
var apikey = "ac3cad31a30047cb96196832877aaad8";
var api2_url = "https://api.fantasydata.net/v3/nfl/odds/JSON/GameOddsByWeek/2018/" + week;


var homeTeam;
var awayTeam;
var homeTeamOdds;
var awayTeamOdds;


$(function () {
    $.ajax({
        url: api2_url,
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "ac3cad31a30047cb96196832877aaad8");
        },
        type: "GET",
        data: "{body}",
    }).done(function (data) {

        for (var i = 0; i < data.length; i++) {
            homeTeam = (data[i].HomeTeamName);
            awayTeam = (data[i].AwayTeamName);
            homeTeamOdds = (data[i].PregameOdds["0"].HomeMoneyLine);
            awayTeamOdds = (data[i].PregameOdds["0"].AwayMoneyLine);
            game_odds_key = awayTeam+"|"+homeTeam;
            var odds = awayTeamOdds+":"+homeTeamOdds;
            console.log(game_odds_key+" "+odds);
        }
    })
});