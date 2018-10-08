
db.collection("season2018").get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderList(doc);
    })

})


//global vars
var pickTeamsList = $("#pickTeams");


//create elements and render list with buttons
function renderList(doc) {
    var li = $("<li>");
    var name = $("<span>");
    var button = $("<button>");

    button.attr("class", "btn btn-primary");
    button.attr("name", "pickButton")
    button.attr("id", doc.id);
    button.text("Make your picks!")

    name.text(doc.id);

    li.append(name);
    li.append(button);
    pickTeamsList.append(li);
}

pickTeamsList.on("click", "button", function () {
    var weekDoc = $(this).attr("id");
    console.log(weekDoc);
})

