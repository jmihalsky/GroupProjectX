var api_key = "cyjttwb6yrpsss57fcjjs8mc";

var base_url = "https://cors-anywhere.herokuapp.com/https://api.sportradar.us/nfl/official/";

var acces_level = "trial";

var api_ver = "v5";

var lang = "en";

var year = "2018";

var season = "REG";

var format = "json";

var full_api_string = "";

var api_reponse = [];


function api_assembler(){
    full_api_string = base_url + acces_level + "/" + api_ver +"/" + lang + "/games/" + year + "/" + season + "/schedule." + format + "?api_key=" + api_key;
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
    
    var usr = db.ref().child("usrs").push({
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
                game_home_team: response.weeks[i].games[x].home.name
            });
        }
    }

    });
};


function api_all(){
    api_assembler();
    api_test();
}

api_all();