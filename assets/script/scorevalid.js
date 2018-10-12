var week_id = "week05";
var week_num = "5";
var lstore = [];
var game_winner = "";

function give_points() {
    api_score_assembler();
    // api_wky_scores();
    user_points();

    Storage.prototype.getObj = function (key) {
        return JSON.parse(this.getItem(key))
    };


    lstore = JSON.parse(sessionStorage.getItem("gameresults"));
    console.log(lstore.length);


    for (var i = 0; i < lstore.length; i++) {
        var game_ctl = lstore[i].game;
        game_winner = lstore[i].winner;
        console.log(game_ctl);
        console.log(game_winner);

        getData(game_ctl, game_winner);
    }
}

function getData(game_ctl, game_winner) {
    db.collection("user_picks").where("game", "==", game_ctl).get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            console.log(doc.id, doc.data());
            var docid = doc.id;
            var upick = doc.data().user_pick;
            var dweek = doc.data().week;
            var dgame = doc.data().game;
            var duser = doc.data().userid;

            award_points(docid, upick, dgame, dweek, duser, game_winner);
        })

    })
}


function award_points(id, usr_pick, gamea, weeka, gw) {
    if (gw == "T") {
        console.log(id, gamea, usr_pick, 1, weeka, gw);

        db.collection("user_picks").doc(id).set({
            game: gamea,
            user_pick: usr_pick,
            user_points: 1,
            user_id: userID,
            week: weeka
        })
    }
    else if (gw == usr_pick) {
        console.log(id, gamea, usr_pick, 2, weeka, gw);
        db.collection("user_picks").doc(id).set({
            game: gamea,
            user_pick: usr_pick,
            user_points: 2,
            user_id: userID,
            week: weeka
        })
    }
    else {
        console.log(id, gamea, usr_pick, 0, weeka, gw);
        db.collection("user_picks").doc(id).set({
            game: gamea,
            user_pick: usr_pick,
            user_points: 1,
            user_id: userID,
            week: weeka
        })
    }

}

give_points();




