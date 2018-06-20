
  var config = {
    apiKey: "AIzaSyA6c9sOlpLNnl6g6i73cQDHtJpw7yWTB8A",
    authDomain: "homework7-6c8d1.firebaseapp.com",
    databaseURL: "https://homework7-6c8d1.firebaseio.com",
    projectId: "homework7-6c8d1",
    storageBucket: "homework7-6c8d1.appspot.com",
    messagingSenderId: "331390138276"
  };
  firebase.initializeApp(config);




var database = firebase.database();
var name = "";
var destination = "";
var time = "";
var rate = "";
var tMinutesTillTrain = 0;


$("#button").on("click", function (event) {
    event.preventDefault();

    name = $("#name").val().trim();
    destination = $("#destination").val().trim();
    time = $("#time").val().trim();
    rate = $("#rate").val().trim();

    $(".form-control").val("");

    database.ref().push({
        name: name,
        destination: destination,
        time: time,
        rate: rate,
        tMinutesTillTrain: tMinutesTillTrain
    });

})


database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    var sv = childSnapshot.val();
    var newName = (sv.name);
    var newDestination = (sv.destination);
    var newTime = (sv.time);
    var newRate = (sv.rate);

    
    var firstTimeConverted = moment(newTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted); 
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % newRate;
    console.log(tRemainder);

    var tMinutesTillTrain = newRate - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log(nextTrain);

    var trainArrival = nextTrain.format("hh:mm");
    console.log(trainArrival);

    console.log(newName);
    console.log(newDestination);
    console.log(newRate);

    $("#data-holder").append("<tr><td>" + newName + "</td><td>" + newDestination + "</td><td>" + newRate + "</td><td>" + trainArrival + "</td><td>"
        + tMinutesTillTrain + "</td></tr>");



}, function (errorObject) {

    console.log("Errors handled: " + errorObject.code);
});

$("#reset").on("click", function () {
    $("td").empty();
})