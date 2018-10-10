var week_id = "week01";
var week_num = "1";
var lstore = [];
var game_winner = "";

function give_points(){
    api_score_assembler();
    // api_wky_scores();
    user_points();

    Storage.prototype.getObj = function(key){
        return JSON.parse(this.getItem(key))
    };

    lstore = JSON.parse(sessionStorage.getItem("gameresults"));
    
    for(var i = 0; i < lstore.length; i++)
    {
        var game_ctl = lstore[i].game;
        game_winner = lstore[i].winner;

        db.collection("usr_picks").where("game", "==", game_ctl).get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                console.log(doc.id, doc.data());
                award_points(doc.id, doc.data().user_pick);
            })
        });
    }
}

give_points();

function award_points(id, usr_pick){
        if (game_winner == "T")
        {
            db.collection("user_picks").doc(id).update({
                user_points: 1
            })
        }
        else if (game_winner == usr_pick)
        {
            db.collection("user_picks").doc(id).update({
                user_points: 2
            })
        }
        else
        {
            db.collection("user_picks").doc(id).update({
                user_points: 0
            })
        }
    
    }