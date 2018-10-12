var week_id = "week05";
var week_num = "5";
var lstore = [];
var game_winner = "";
var game_ctl = "";

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
        game_ctl = lstore[i].game;
        game_winner = lstore[i].winner;
        console.log(game_ctl, game_winner);
        get_games(game_ctl, game_winner);
    }


}

give_points();

function get_games(game_ctl, game_winner) {
    console.log(game_ctl, game_winner);
    db.collection("usr_picks").where("game", "==", game_ctl).get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            console.log(doc.id, doc.data(), game_winner);
            var docid = doc.id;
            var upick = doc.data().user_pick;
            var dweek = doc.data().week;
            var dgame = doc.data().game;
            var duser = doc.data().userid;
            award_points(docid, upick, dgame, dweek, duser, game_winner);
        })
    });
}

function award_points(id, usr_pick, gamea, weeka, userida, gw) {
    if (gw == "T") {
        console.log(id, gamea, usr_pick, 1, userida, weeka, gw);
        var docinfo = {
            game: gamea,
            user_pick: usr_pick,
            user_points: 1,
            user_id: userida,
            week: weeka
        }
        db.collection("usr_picks").doc(id).set(docinfo);
    }
    else if (gw == usr_pick) {
        console.log(id, gamea, usr_pick, 2, userida, weeka, gw);
        var docinfo = {
            game: gamea,
            user_pick: usr_pick,
            user_points: 2,
            user_id: userida,
            week: weeka
        }
        db.collection("usr_picks").doc(id).set(docinfo);
    }
    else {
        console.log(id, gamea, usr_pick, 0, userida, weeka, gw);
        var docinfo = {
            game: gamea,
            user_pick: usr_pick,
            user_points: 0,
            user_id: userida,
            week: weeka
        }
        db.collection("usr_picks").doc(id).set(docinfo);
    }

}
