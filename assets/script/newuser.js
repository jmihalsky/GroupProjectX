function new_user(){
    db.collection("usr").doc(userID).get().then(function(doc) {
        if(doc.exists) {
            console.log("User exists");
        }
        else
        {
            db.collection("usr").doc(userID).set({
                userid: userID,
                username: "",
                week01total: 0,
                week02total: 0,
                week03total: 0,
                week04total: 0,
                week05total: 0,
                week06total: 0,
                week07total: 0,
                week08total: 0,
                week09total: 0,
                week10total: 0,
                week11total: 0,
                week12total: 0,
                week13total: 0,
                week14total: 0,
                week15total: 0,
                week16total: 0,
                week17total: 0,
            });
        }
    })
   
}

