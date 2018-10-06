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

const btnLogin = $("#loginBtn");
const btnLogout = $("#logoutBtn");
const btnNewUser = $("#newUserBtn");

// Login button action - no such button - created for login
btnLogin.on("click", function(e) { 
  e.preventDefault();
  var x = $(".form-control").val();
if (x == "") {
    alert('Please sign in or create an account to use "The Catch"');
} else {
    const emailTxt = $("#emailInput").val().trim();
    const passwordTxt = $("#passwordInput").val().trim();
    const email = emailTxt;
    const pass = passwordTxt;
    const auth = firebase.auth();
    if ($("#createAccount").is(":checked")) {
        //creates a new account with username and password
        console.log("I checked box");
        const promise = auth.createUserWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
        display();
        
       
      } else {
          console.log("i did not check box");
          //logs in with existing user
          const promise = auth.signInWithEmailAndPassword(email, pass);
          promise.catch(e => console.log(e.message));
          display();
          }
  //removes login widget to show stats

}
});
function display(){
    $("#login").css("display", "none");
    $("#main").css("display", "block");
};


// No logout button yet - hidden until signed in... - id has to be logoutBtn
btnLogout.on("click", function(e){
    e.preventDefault();
    firebase.auth().signOut();
    $("#login").css("display", "block");
    $("#main").css("display", "none");
})



// Listen for change in authentication state
auth.onAuthStateChanged(firebaseUser => {
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


// Show last week's games and stats
$(document).ready(function(){
    $('.multiple-items').slick({
        infinite:true,
        slidesToShow: 5,
        slidesToScroll:3
    });
});


// Calculate curWeek using moment
function getWeek(){
    var now = moment();
    if (now is Between X and X){ return 1}
    else if (){ return 2}
    else if (){ return 3}
    else if (){ return 4}
    else if (){ return 5}
    else if (){ return 6}
    else if (){ return 7}
    else if (){ return 8}
    else if (){ return 9}
    else if (){ return 10}
    else if (){ return 11}
    else if (){ return 12}
    else if (){ return 13}
    else if (){ return 14}
    else if (){ return 15}
    else if (){ return 16}
    else if (){ return 17}
}
