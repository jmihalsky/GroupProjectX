var api_key = "cyjttwb6yrpsss57fcjjs8mc";

var base_url = "https://cors-anywhere.herokuapp.com/https://api.sportradar.us/nfl/official/";

var acces_level = "trial";

var api_ver = "v5";

var lang = "en";

var year = "2018";

var season = "REG";

var format = "json";

var full_api_string = "";

var season_week = "4";

var weekly_scores = {
    game_week: "",
    game_num: []
};



function api_assembler(){
    full_api_string = base_url + acces_level + "/" + api_ver +"/" + lang + "/games/" + year + "/" + season + "/schedule." + format + "?api_key=" + api_key;
}

function api_score_assembler(){
    full_api_string = base_url + acces_level + "/" + api_ver + "/" + lang + "/games/" + year + "/" + season + "/" + season_week + "/schedule." + format + "?api_key=" + api_key;
    console.log(full_api_string);
}

function api_test(){
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
    // event.preventDefault();

    var usrname = "test@gmail.com";
    
    var usr = database.ref().child("usrs").push({
        usr_usrname: usrname
    });

    for (var i = 0; i < response.weeks.length; i++)
    {
        var weeks = usr.child("week" + response.weeks[i].sequence).push({
            week: response.weeks[i].sequence
        });
        
        for(var x = 0; x < response.weeks[i].games.length; x++)
        {
                var games = weeks.child("game" + response.weeks[i].games[x].number).push({
                    game_number: response.weeks[i].games[x].number,
                    game_away_team: response.weeks[i].games[x].away.name,
                    game_away_alias: response.weeks[i].games[x].away.alias,
                    game_home_team: response.weeks[i].games[x].home.name,
                    game_home_alias: response.weeks[i].games[x].home.alias,
                    game_sch_date: response.weeks[i].games[x].scheduled,
                    game_status: response.weeks[i].games[x].status,
                    game_usr_sel: "",
                    game_usr_points: 0

                });
        }
    }

    });
};

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
            
        }

    });
};


function api_all(){
    // api_assembler();
    // api_test();
    api_score_assembler();
    api_wky_scores();
}

api_all();

