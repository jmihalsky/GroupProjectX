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

//function startup() {
$("#login").css("display", "block");
$("#main").css("display", "none");
//}

// Still to do : data validation
const emailTxt = $("#emailInput").val().trim();
const passwordTxt = $("#passwordInput").val().trim();
const btnLogin = $("#loginBtn");
const btnLogout = $("#logoutBtn");
const btnNewUser = $("#newUserBtn");

// Login button action - no such button - created for login
btnLogin.on("click", function (e) { 
  e.preventDefault();
  const email = emailTxt;
  const pass = passwordTxt;
  const auth = firebase.auth();
  auth.signInWithEmailAndPassword(email, pass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
  $("#login").css("display", "none");
  $("#main").css("display", "block");
});


// No new button yet - id should be signupBtn
btnNewUser.on("click",function(e){
    e.preventDefault();
    const email = emailTxt;
    const pass = passwordTxt;
    const auth = firebase.auth();
    auth.createUserWithEmailAndPassword(email, pass).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
    $("#login").css("display", "none");
    $("#main").css("display", "block");
});

// No logout button yet - hidden until signed in... - id has to be logoutBtn
btnLogout.on("click", function(e){
    e.preventDefault();
    firebase.auth().signOut();
})

// Listen for change in authentication state
auth.onAuthStateChanged(firebaseUser, function(){
    if (firebaseUser){
       console.log(firebaseUser);
        $("#logoutBtn").css("display","block");
        $("#login").css("display", "none");
        $("#main").css("display", "block");
    } else{
       console.log("not logged in");
        $("#logoutBtn").css("display","none");
        $("#login").css("display", "block");
        $("#main").css("display", "none");
    }
});
console.log(firebase.auth());
// startup();