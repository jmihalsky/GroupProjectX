var api_key = "cyjttwb6yrpsss57fcjjs8mc";

var base_url = "https://cors-anywhere.herokuapp.com/https://api.sportradar.us/nfl/official/";

var acces_level = "trial";

var api_ver = "v5";

var lang = "en";

var year = "2018";

var season = "REG";

var format = "json";

var full_api_string = "";

var weekly_scores = {
    game_week: "",
    game_num: []
};

var usr_token = "is1gD2ofCig383rgT4CdFEscOKs2";

function api_score_assembler(){
    full_api_string = base_url + acces_level + "/" + api_ver + "/" + lang + "/games/" + year + "/" + season + "/" + week_num + "/schedule." + format + "?api_key=" + api_key;
    console.log(full_api_string);
}



function api_wky_scores(){
    $.ajax({
        url: full_api_string,
        method: "GET",
        headers: {
            'Access-Control-Allow-Origin' : '*',
            'AcceAccess-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'

        }
    })
    .then(function(response){
        console.log(response);
        weekly_scores.game_week = "week" + response.week.sequence;

        for(var i = 0; i < response.week.games.length; i++)
        {
            weekly_scores.game_num.push("game" + response.week.games[i].number);

            var game_wn = "";

            if (response.week.games[i].scoring.away_points == response.week.games[i].scoring.home_points)
            {
                game_wn = "T";
            }
            else if (response.week.games[i].scoring.away_points > response.week.games[i].scoring.home_points)
            {
                game_wn = response.week.games[i].away.alias;
            }
            else
            {
                game_wn = response.week.games[i].home.alias;
            }

            var game_no = "game" + response.week.games[i].number;
            weekly_scores[game_no] = {};
            weekly_scores[game_no]["game_number"] = response.week.games[i].number;
            weekly_scores[game_no]["game_away_alias"] = response.week.games[i].away.alias;
            weekly_scores[game_no]["game_away_score"] = response.week.games[i].scoring.away_points;
            weekly_scores[game_no]["game_home_alias"] = response.week.games[i].home.alias;
            weekly_scores[game_no]["game_home_score"] = response.week.games[i].scoring.home_points;
            weekly_scores[game_no]["winner"] = game_wn;
        }

        console.log(weekly_scores);
    });
};
