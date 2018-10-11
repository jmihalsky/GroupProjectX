var week_id = "week01";
var week_num = "1";
var lstore = [];
var game_winner = "";

function give_points(){
    api_score_assembler();
    // api_wky_scores();
    user_points();

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
    console.log(lstore.length);

    for(var i = 0; i < lstore.length; i++)
    {   
        var game_ctl = lstore[i].game;
        game_winner = lstore[i].winner;
        console.log(game_ctl);
        fetchData(game_ctl, game_winner).then(function(){
            db.collection("usr_picks").where("game","==",game_ctl).get().then((snapshot) => {
                snapshot.docs.forEach(doc => {
                    console.log(doc.id, doc.data());
                    var docid = doc.id;
                    var upick = doc.data().user_pick;
                    var dweek = doc.data().week;
                    var dgame = doc.data().game;
                    var duser = doc.data().userid;

                    // updateData(docid,upick,dgame,dweek,duser,game_winner).then(function(){
                    //     award_points(docid,upick,dgame,dweek,duser,game_winner);
                    // });
                })
            });
        });
    }
    
    // for(var i = 0; i < 17; i++)
    // {
    //     var game_ctl = lstore[i].game;
    //     console.log(game_ctl);
    //     game_winner = lstore[i].winner;

    //     db.collection("usr_picks").where("game", "==", game_ctl).get().then((snapshot) => {
    //         snapshot.docs.forEach(doc => {
    //             console.log(doc.id, doc.data());
    //             award_points(doc.id, doc.data().user_pick, doc.data().game, doc.data().week, doc.data().userid, game_winner);
    //         })
    //     });
    // }
}

give_points();

function award_points(id, usr_pick, gamea, weeka, userida, gw){
        if (gw == "T")
        {
            console.log(id,gamea,usr_pick,1,userida,weeka,gw);
            // var docinfo = {
            //     game: gamea,
            //     user_pick: usr_pick,
            //     user_points: 1,
            //     user_id: userida,
            //     week: weeka
            // }
            // db.collection("user_points").doc(id).set(docinfo);
        }
        else if (gw == usr_pick)
        {
            console.log(id,gamea,usr_pick,2,userida,weeka,gw);
            // var docinfo = {
            //     game: gamea,
            //     user_pick: usr_pick,
            //     user_points: 2,
            //     user_id: userida,
            //     week: weeka
            // }
            // db.collection("user_points").doc(id).set(docinfo);
        }
        else
        {
            console.log(id,gamea,usr_pick,0,userida,weeka,gw);
            // var docinfo = {
            //     game: gamea,
            //     user_pick: usr_pick,
            //     user_points: 0,
            //     user_id: userida,
            //     week: weeka
            // }
            // db.collection("user_points").doc(id).set(docinfo);
        }
    
    }