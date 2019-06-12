// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyDfd0dO5IIqul9DKw7cPlctupxVNHQNAEM",
  authDomain: "train-scheduler-6a29d.firebaseapp.com",
  databaseURL: "https://train-scheduler-6a29d.firebaseio.com",
  projectId: "train-scheduler-6a29d",
  storageBucket: "",
  messagingSenderId: "21509558554",
  appId: "1:21509558554:web:2883afc73fbd3c41"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

//button to add new trains
$("#add-train-btn").on("click", function () {

  var trainName = $("#train-name").val().trim();
  var destination = $("#train-destination").val().trim();
  var firstTrain = $("#train-time").val().trim();
  var frequency = $("#train-frequency").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    dest: destination,
    first: firstTrain,
    freq: frequency
  }

  //Uploads train data to the database
  database.ref().push(newTrain);

    console.log(newTrain);
  // console.log(newTrain.name);
  // console.log(newTrain.dest);
  // console.log(newTrain.first);
  // console.log(newTrain.freq);

  // Clears all of the text-boxes
  $("#train-name").val("");
  $("#train-destination").val("");
  $("#train-time").val("");
  $("#train-frequency").val("");

  return false;
})

// Creates a Firebase event for adding trains to the database and a row in the html
database.ref().on("child_added", function (childSnapshot) {

  // Store everything into a variable
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().dest;
  var firstTrain = childSnapshot.val().first;
  var frequency = childSnapshot.val().freq;

  //First time
  var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");

  // Current time
  var currentTime = moment();

  // Difference between times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
 
  // Time apart (remainder)
  var tRemainder = diffTime % frequency;

  // Mins until train
  var tMinutesTillTrain = frequency - tRemainder;

  // Next train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes").format('LT'); 

  $("#train-table").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");

});