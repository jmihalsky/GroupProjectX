function startup() {
    $("#login").css("display", "block");
    $("#main").css("display", "none");
}

$("#loginBtn").on("click", function (e) {
    e.preventDefault();
    $("#login").css("display", "none");
    $("#main").css("display", "block");
})






startup();
