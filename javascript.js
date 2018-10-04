var config = {
    apiKey: "AIzaSyDt5x_pqLf1mnSYcnqvB1Jeti1IV-PUs0g",
    authDomain: "thecatch-d2bff.firebaseapp.com",
    databaseURL: "https://thecatch-d2bff.firebaseio.com",
    projectId: "thecatch-d2bff",
    storageBucket: "thecatch-d2bff.appspot.com",
    messagingSenderId: "555051450877"
  };
  firebase.initializeApp(config);


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
