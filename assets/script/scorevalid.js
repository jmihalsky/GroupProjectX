var week_id = "week05";
var week_num = "5";
var lstore = [];
var game_winner = "";
var game_ctl = "";

function give_points(){
    api_score_assembler();
    // api_wky_scores();
    user_points();
    console.log(curWeek);

    var fetchData = function () {
        return new Promise(function (resolve,reject) {
            resolve();
        });
    };

    var updateData = function () {
        return new Promise(function (resolve,reject) {
            resolve();
        });
    };

    Storage.prototype.getObj = function(key){
        return JSON.parse(this.getItem(key))
    };

    lstore = JSON.parse(sessionStorage.getItem("gameresults"));

    for(var i = 0; i < lstore.length; i++)
    {
        game_ctl = lstore[i].game;
        game_winner = lstore[i].winner;
        console.log(game_ctl, game_winner);
        get_games(game_ctl,game_winner);
    }

    usr_total_str();
}

give_points();

function get_games(game_ctl, game_winner){
    db.collection("usr_picks").where("game", "==", game_ctl).get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            console.log(doc.id,doc.data(),game_winner);
            var docid = doc.id;
            var upick = doc.data().user_pick;
            var dweek = doc.data().week;
            var dgame = doc.data().game;
            var duser = doc.data().userid;
            award_points(docid,upick,dgame,dweek,duser,game_winner);
        })
    });
}

function award_points(id, usr_pick, gamea, weeka, userida, gw){
        if (gw == "T")
        {
            console.log(id,gamea,usr_pick,1,userida,weeka,gw);
            var docinfo = {
                game: gamea,
                user_pick: usr_pick,
                user_points: 1,
                user_id: userida,
                week: weeka
            }
            db.collection("usr_picks").doc(id).set(docinfo);
        }
        else if (gw == usr_pick)
        {
            console.log(id,gamea,usr_pick,2,userida,weeka,gw);
            var docinfo = {
                game: gamea,
                user_pick: usr_pick,
                user_points: 2,
                user_id: userida,
                week: weeka
            }
            db.collection("usr_picks").doc(id).set(docinfo);
        }
        else
        {
            console.log(id,gamea,usr_pick,0,userida,weeka,gw);
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

function usr_total_str(){
    db.collection("usr").get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            var uid = doc.data().userid;
            var udocid = doc.id;
            usr_totaler(uid,week_id,udocid);
        })
    });
}

function usr_totaler(uid,week_id,udocid){
    var utotal = 0;
    var utot = 0;
    db.collection("usr_picks").where("user_id","==",uid).where("week","==",week_id).get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            console.log(doc.data(),udocid);
            var upoints = doc.data().user_points;
            utotal += upoints;
            return utotal;
        })
    });
    utot = utotal;
    week_totaler(udocid,uid,week_id,utot);
}

function week_totaler(udocid,uid,week_id,utot){
    if (week_id == "week01")
    {
        var docupt = {
            week01total: utot
        }
    }
    else if (week_id == "week02")
    {
        var docupt = {
            week02total: utot
        }
    }
    else if (week_id == "week03")
    {
        var docupt = {
            week03total: utot
        }
    }
    else if (week_id == "week04")
    {
        var docupt = {
            week04total: utot
        }
    }
    else if (week_id == "week05")
    {
        var docupt = {
            week05total: utot
        }
    }
    else if (week_id == "week06")
    {
        var docupt = {
            week06total: utot
        }
    }
    else if (week_id == "week07")
    {
        var docupt = {
            week07total: utot
        }
    }
    else if (week_id == "week08")
    {
        var docupt = {
            week08total: utot
        }
    }
    else if (week_id == "week09")
    {
        var docupt = {
            week09total: utot
        }
    }
    else if (week_id == "week10")
    {
        var docupt = {
            week10total: utot
        }
    }
    else if (week_id == "week11")
    {
        var docupt = {
            week11total: utot
        }
    }
    else if (week_id == "week12")
    {
        var docupt = {
            week12total: utot
        }
    }
    else if (week_id == "week13")
    {
        var docupt = {
            week13total: utot
        }
    }
    else if (week_id == "week14")
    {
        var docupt = {
            week14total: utot
        }
    }
    else if (week_id == "week15")
    {
        var docupt = {
            week15total: utot
        }
    }
    else if (week_id == "week16")
    {
        var docupt = {
            week16total: utot
        }
    }
    else if (week_id == "week17")
    {
        var docupt = {
            week17total: utot
        }
    }

    db.collection("usr").doc(udocid).update(docupt);
}