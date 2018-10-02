var api_key = "cyjttwb6yrpsss57fcjjs8mc";

var base_url = "https://cors-anywhere.herokuapp.com/https://api.sportradar.us/nfl/official/";

var acces_level = "trial";

var api_ver = "v5";

var lang = "en";

var year = "2017";

var season = "REG";

var format = "json";

var full_api_string = "";

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
    });
};
// https://api.sportradar.us/nfl/official/{access_level}/{version}/{language_code}/games/{year}/{nfl_season}/schedule.{format}?api_key={your_api_key}

function api_all(){
    api_assembler();
    api_test();
}

api_all();