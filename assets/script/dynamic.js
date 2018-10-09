
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
$("#pickTeams").on("click", ".pickButton", function () {
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


    home.attr("class", doc.game_number);
    away.attr("class", doc.game_number);
    home.attr("id", doc.game_home_alias);
    away.attr("id", doc.game_away_alias);

    titlep.html("<h2>GAME #" + title + "</h2>")
    gameNames.html("<h3>" + awayName + " <em>VS</em> " + homeName + "</h3>");
    div.attr("class", "newSection");
    records.html("<h4> Record: " + aAbv + "   |   Record: " + hAbv + "</h4>");

    // add radio buttons for user to pick winning team
    var usr_picks = $("<div>");
    usr_picks.addClass("game" + doc.game_number + "pick");

    var pck_in_a = $("<input>");
    pck_in_a.attr("type", "radio");
    pck_in_a.attr("name", doc.game_number);
    pck_in_a.attr("id", doc.game_away_alias);

    var pck_lbl_a = $("<label>");
    pck_lbl_a.attr("for", doc.game_number);
    pck_lbl_a.html("<h4>" + doc.game_away_name + "</h4>");

    var pck_in_b = $("<input>");
    pck_in_b.attr("type", "radio");
    pck_in_b.attr("name", doc.game_number);
    pck_in_b.attr("id", doc.game_home_alias);

    var pck_lbl_b = $("<label>");
    pck_lbl_b.attr("for", doc.game_number);
    pck_lbl_b.html("<h4>" + doc.game_home_name + "</h4>");
    usr_picks.append(pck_in_a, pck_lbl_a, pck_in_b, pck_lbl_b);


    //start display
    div.append(titlep);
    div.append(away);
    div.append(home);
    div.append(gameNames);
    div.append(records);


    //add odds
    var week = divEmpty;

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

        if ((wkGameOdds[doc.game_home_alias] == undefined) || (wkGameOdds[doc.game_away_alias] === undefined)) {
            var odds = $("<p>");
            odds.html("<h4>No Odds</h4>");
            div.append(odds);
        } else {
            var hOdds = wkGameOdds[doc.game_home_alias].odds;
            var aOdds = wkGameOdds[doc.game_away_alias].odds;

            var odds = $("<p>");
            odds.html("<h4> Odds: " + hOdds + "   |   Odds: " + aOdds + "</h4>");
            div.append(odds);
        }

    }

    div.append(usr_picks);
    $("." + divEmpty).append(div);
}


function addButton() {
    var button = $("<button>").text("Submit Picks");
    button.attr("class", divEmpty);
    button.attr("id", "submit");
    $("." + divEmpty).append(button);
    $("." + divEmpty).css("margin-bottom", "70px");
}

$(document.body).on("click", "button", "." + divEmpty, function () {
    console.log("testing");
    submit_picks();
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

function submit_picks() {
    db.collection("season2018").doc(divEmpty).get().then(function(doc) {
        if(doc.exists) 
        {
            var radio_arry = doc.data().games;
                for(var i = 0; i < radio_arry.length; i++)
                {
                    var user_pick = $("input[name=" + radio_arry[i] + "]:checked").attr("id");
                    db.collection("usr_picks").add({
                        usrid: userID,
                        week: divEmpty,
                        game: radio_arry[i],
                        usr_pick: user_pick,
                        usr_points: 0
                    })
                }
            // if(doc.data().week_status == "closed")
            // {
            //     console.log("closed");
            // }
            // else
            // {
            //     var radio_arry = doc.data().games;
            //     for(var i = 0; i < radio_arry.legnth; i++)
            //     {
            //         var user_pick = $("input[name" + radio_arry[i] + "]:checked").attr("id");
            //         db.collection("usr_picks").add({
            //             usrid: userID,
            //             week: divEmpty,
            //             game: radio_arry[i],
            //             usr_pick: user_pick,
            //             usr_points: 0
            //         })
            //     }
            // }
        }
        else
        {
            console.log("document does not exist");
        }
    });
}
