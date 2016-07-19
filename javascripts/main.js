"use strict"


let $ = require('jquery'),
    db = require("./db-interaction"),
    // templates = require("./dom-builder"),
    login = require("./user"),
    weatherObject = null,
    firebase = require("./firebaseConfig"),
    currentUser = null;



firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    currentUser = user.uid;
    console.log("before");
  } else {
    currentUser = null;
    console.log("not logged in");
  }
});


$("#searchBtn").click(function () {
	let userZip;
	userZip = $("#zipInput").val();
	db.getWeather(userZip)
	.then(function () {
	weatherObject = db.getUserWeather();
	var userClouds = buildCloudObj(weatherObject.clouds);
	// db.saveClouds(userClouds);
	})
});

$("#saveBtn").click(function () {
	var weather = buildWeatherObj(weatherObject.main);
	db.saveWeather(weather);
});


$("#auth-btn").click(function() {
  console.log("clicked auth");
  login()
  .then(function(result) {
    let user = result.user;
    console.log("logged in", user.uid);
  }).catch(function(error) {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;
    // The email of the user's account used.
    let email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    let credential = error.credential;
    // ...
  });
});

function buildCloudObj(clouds) {
    let cloudObj = {
   	clouds: clouds,
    uid: currentUser
  };
  return cloudObj;
}

function buildWeatherObj(weather) {
	let weatherObj = {
		humidity: weather.humidity,
		temp: weather.temp,
		uid: currentUser
	};
	return weatherObj;
}











