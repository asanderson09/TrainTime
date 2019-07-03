// $(document).ready(function () {
//     console.log("working")  

// });

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDz9LiSdCq3GS5Tp-cRDk0orvAA9B3zi8c",
    authDomain: "traintime-3db33.firebaseapp.com",
    databaseURL: "https://traintime-3db33.firebaseio.com",
    projectId: "traintime-3db33",
    storageBucket: "traintime-3db33.appspot.com",
    messagingSenderId: "691179320317",
    appId: "1:691179320317:web:5a988d2dc6133503"
};

firebase.initializeApp(config);
console.log(config);

var database = firebase.database();

var currentTime = moment();

database.ref().on('child_added', function (childSnap) {
    var name = childSnap.val().name;
    var destination = childSnap.val().destination;
    var firstTime = childSnap.val().firstTime;
    var frequency = childSnap.val().frequency;
    var min = childSnap.val().min;
    var next = childSnap.val().next;
    $("#train-table > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + next + "</td><td>" + min + "</td></tr>");
});


// Gets information from form

$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    var train = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTime = $("#time-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    //subtracts the first train time back a year to ensure it's before current time.
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract("1, years");
    // the time difference between current time and the first train
    var difference = currentTime.diff(moment(firstTimeConverted), "minutes");
    var remainder = difference % frequency;
    var minUntilTrain = frequency - remainder;
    var nextTrain = moment().add(minUntilTrain, "minutes").format("hh:mm a");


    var newTrain = {
        name: train,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency,
        min: minUntilTrain,
        next: nextTrain
    }
    console.log(newTrain);
    database.ref().push(newTrain);

    // clears users input after hitting submit button
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");

    console.log(train);
    console.log(destination);
    console.log(firstTime);
    console.log(frequency);

    
});
