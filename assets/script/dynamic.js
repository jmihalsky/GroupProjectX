
db.collection("season2018").get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderList(doc);
    })
})


//global vars
var pickTeamsList = $("#pickTeams");
var divEmpty;



//create elements and render list with buttons
function renderList(doc) {
    console.log(doc.data());
    var div = $("<div>");
    var name = $("<span>");
    var button = $("<button>");

    div.attr("class", doc.id);

    button.attr("class", "pickButton");
    button.attr("id", doc.id);
    button.text("Make your picks!")

    name.text(doc.id);

    div.append(name);
    div.append(button);
    div.append("<hr>");

    pickTeamsList.append(div);

}


//on PICK TEAMS button it will empty and display 
$(document.body).on("click", ".pickButton", function () {
    var weekDoc = $(this).attr("id");

    db.collection("season2018").doc(weekDoc).collection(weekDoc).get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            renderPicks(doc.data());
        })
    })

    divEmpty = weekDoc;
    $("." + divEmpty).empty();
    setTimeout(addButton, 500);
})


function renderPicks(doc) {
    var week = divEmpty;
    var div = $("<div>");
    var titlep = $("<p>");
    var title = doc.game_number;
    var gameNames = $("<p>");
    var homeName = doc.game_home_name;
    var awayName = doc.game_away_name;
    var home = $("<img src=./assets/images/" + doc.game_home_alias + ".gif>");
    var away = $("<img src=./assets/images/" + doc.game_away_alias + ".gif>");
    var hAbv = teamRecord[doc.game_home_alias].record;
    var aAbv = teamRecord[doc.game_away_alias].record;
    var records = $("<p>");


    home.attr("class", doc.game_number);
    away.attr("class", doc.game_number);
    home.attr("id", doc.game_home_alias);
    away.attr("id", doc.game_away_alias);

    titlep.html("<strong>GAME #" + title + "</strong>")
    gameNames.html(homeName + " <em>VS</em> " + awayName);
    div.attr("class", "newSection");
    records.html("Record: " + hAbv + "   |   Record: " + aAbv);

    div.append(titlep);
    div.append(home);
    div.append(away);
    div.append(gameNames);
    div.append(records);

    if (week === "week01") { week = 1 };
    if (week === "week02") { week = 2 };
    if (week === "week03") { week = 3 };
    if (week === "week04") { week = 4 };
    if (week === "week05") { week = 5 };
    if (week === "week06") { week = 6 };
    if (week === "week07") { week = 7 };
    if (week === "week08") { week = 8 };
    if (week === "week09") { week = 9 };
    if (week === "week10") { week = 10 };
    if (week === "week11") { week = 11 };
    if (week === "week12") { week = 12 };
    if (week === "week13") { week = 13 };
    if (week === "week14") { week = 14 };
    if (week === "week15") { week = 15 };
    if (week === "week16") { week = 16 };
    if (week === "week17") { week = 17 };


    if (curWeek == week) {
        var hOdds = wkGameOdds[doc.game_home_alias].odds;
        var aOdds = wkGameOdds[doc.game_away_alias].odds;
        var odds = $("<p>");
        odds.html("Odds: " + hOdds + "   |   Odds: " + aOdds);
        div.append(odds);
    }


    $("." + divEmpty).append(div);
}


function addButton() {
    var button = $("<button>").text("Submit Picks");
    button.attr("class", divEmpty);
    $("." + divEmpty).append(button);
}

$(document.body).on("click", "button", "." + divEmpty, function () {
    $("." + divEmpty).empty();

    var div = $("." + divEmpty);
    var name = $("<span>");
    var button = $("<button>");

    div.attr("class", divEmpty);

    button.attr("class", "pickButton");
    button.attr("id", divEmpty);
    button.text("Make your picks!")

    name.text(divEmpty);

    div.append(name);
    div.append(button);
    div.append("<hr>");
});

