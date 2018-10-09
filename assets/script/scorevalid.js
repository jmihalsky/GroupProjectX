var week_id = "week05";
var week_num = "5";

function give_points(){
    api_score_assembler();
    api_wky_scores();
    
    db.collection("usr_picks").where("week", "==", week_id).get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            console.log(doc.data());
        })
    });
}

give_points();