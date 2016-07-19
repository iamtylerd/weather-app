"use strict";
// This module has no knowledge of the DOM, or where the data goes after it is fetched from Firebase.
// It is only concerned with getting and setting data in the db

let $ = require('jquery'),
    firebase = require("./firebaseConfig"),
    fb = require("./fb-getter"),
    userWeather = null,
    fbData = fb();

    function getWeather(inputZip) {
	return new Promise(function( resolve, reject) {
		$.ajax({
			url: `http://api.openweathermap.org/data/2.5/weather?zip="${inputZip}",us&appid=0609895ab180a32aa2aadaec24b7e048`
		}).done(function(weatherData) {
			console.log(weatherData)
			userWeather = weatherData;
			resolve(weatherData);
		});
	});
}

	function getUserWeather() {
		return userWeather;
	}

	function saveClouds(clouds) {
	return new Promise(function (resolve, reject) {
		$.ajax({
			url: `${fbData.url}/clouds.json`,
			type: "POST",
			data: JSON.stringify(clouds),
			dataType: "json"
		}).done(function(cloudId) {
			resolve(cloudId);
		});
	});
}

	function saveWeather(weather) {
	return new Promise(function (resolve, reject) {
		$.ajax({
			url: `${fbData.url}/weather.json`,
			type: "POST",
			data: JSON.stringify(weather),
			dataType: "json"
		}).done(function(weatherId) {
			resolve(weatherId);
		});
	});
}

module.exports = {getWeather, getUserWeather, saveClouds, saveWeather}