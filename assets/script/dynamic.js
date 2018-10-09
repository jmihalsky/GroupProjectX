
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
    var hOdds = wkGameOdds[doc.game_home_alias].odds
    var aOdds = wkGameOdds[doc.game_away_alias].odds
    var odds = $("<p>");


    home.attr("class", doc.game_number);
    away.attr("class", doc.game_number);
    home.attr("id", doc.game_home_alias);
    away.attr("id", doc.game_away_alias);

    titlep.html("<strong>GAME #" + title + "</strong>")
    gameNames.html(homeName + " <em>VS</em> " + awayName);
    div.attr("class", "newSection");
    records.html("Record: " + hAbv + "   |   Record: " + aAbv);
    odds.html("Odds: " + hOdds + "   |   Odds: " + aOdds);


    div.append(titlep);
    div.append(home);
    div.append(away);
    div.append(gameNames);
    div.append(records);
    div.append(odds);


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

