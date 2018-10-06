const config = {
    apiKey: "AIzaSyDt5x_pqLf1mnSYcnqvB1Jeti1IV-PUs0g",
    authDomain: "thecatch-d2bff.firebaseapp.com",
    databaseURL: "https://thecatch-d2bff.firebaseio.com",
    projectId: "thecatch-d2bff",
    storageBucket: "thecatch-d2bff.appspot.com",
    messagingSenderId: "555051450877"
};
firebase.initializeApp(config);
var database = firebase.database();
var auth = firebase.auth();
var showData = false;


$("#login").css("display", "block");
$("#main").css("display", "none");

var errorSection = $(".error");
var btnLogin = $("#loginBtn");
var btnLogout = $("#logoutBtn");

//clicking login button
btnLogin.on("click", function (e) {
    e.preventDefault();
    var x = $(".form-email").val();
    var y = $(".form-password").val();
    if ((x == "") || (y == 0)) {
        $(errorSection).html("<p>Please fill out both email/password to use 'The Catch'.</p>");
    } else {
        var emailTxt = $("#emailInput").val().trim();
        var passwordTxt = $("#passwordInput").val().trim();
        var email = emailTxt;
        var pass = passwordTxt;
        var auth = firebase.auth();
        if ($("#createAccount").is(":checked")) {
            //creates a new account with username and password
            console.log("I checked box");
            auth.createUserWithEmailAndPassword(email, pass).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // [START_EXCLUDE]
                if (errorCode == 'auth/weak-password') {
                    $(errorSection).html("<p>The password is too weak.</p>");
                } else if (errorCode == 'auth/email-already-in-use') {
                    $(errorSection).html("<p>The email address is already in use by another account.<p>");
                } else if (errorCode) {
                    console.log(errorCode);
                    console.log(errorMessage);
                } else {
                    showData = true;
                    $(errorSection).empty();
                }
                return showData;
                display();
                console.log(error);
                // [END_EXCLUDE]
            });
            // [END authwithemail]
        } else {
            console.log("i did not check box");
            //logs in with existing user
            auth.signInWithEmailAndPassword(email, pass).catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                // [START_EXCLUDE]
                if (errorCode === 'auth/wrong-password') {
                    $(errorSection).html("<p>Wrong Password</p>");
                } else if (errorCode) {
                    console.log(errorMessage);
                } else {
                    $(errorSection).empty();
                    showData = true;
                }
                return showData;
                display();
                console.log(error);
            });
        }
    }
});


function display() {
    if (showdata == true) {
        $("#login").css("display", "none");
        $("#main").css("display", "block");
    } else {
        $("#login").css("display", "block");
        $("#main").css("display", "none");
    }
};


// No logout button yet - hidden until signed in... - id has to be logoutBtn
btnLogout.on("click", function (e) {
    e.preventDefault();
    firebase.auth().signOut();
    $(errorSection).empty();
    $("#login").css("display", "block");
    $("#main").css("display", "none");
})



// Listen for change in authentication state
auth.onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log(firebaseUser);
        $("#logoutBtn").css("display", "block");
        $("#login").css("display", "none");
        $("#main").css("display", "block");
    } else {
        console.log("not logged in");
        $("#logoutBtn").css("display", "none");
        $("#login").css("display", "block");
        $("#main").css("display", "none");
    }
});

console.log(firebase.auth());
// startup();


// Show last week's games and stats
$(document).ready(function(){
    $('.multiple-items').slick({
        infinite:true,
        slidesToShow: 5,
        slidesToScroll:3
    });
});