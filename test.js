//Environmental Var
require("dotenv").config();

//Variables
var fs = require("fs");
var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var operator = process.argv[2];
var pro = process.argv;
var termRaw = [];
var searchTerm = "";

//Functions
function terminology() {
  for (var i = 3; i < pro.length; i++) {
    termRaw.push(pro[i]);
  }
  searchTerm = termRaw.join("+");
  console.log(searchTerm);
}

function terminologySpotify() {
  for (var i = 3; i < pro.length; i++) {
    termRaw.push(pro[i]);
  }
  searchTerm = termRaw.join(" ");
  console.log(searchTerm);
}

function movies() {
  terminology();
  if (searchTerm === "") {
    searchTerm = "Mr.Nobody";
  }
  var queryURL =
    "http://www.omdbapi.com/?t=the+dark+knight&y=&plot=short&apikey=trilogy";
  console.log(queryURL);
  axios.get(queryURL).then(function(error, response) {
    if (error) {
      console.log(response);
      return console.log("Error occurred: " + error);
    }

    console.log("============================");
    console.log("Title: " + response.data.Title);
    console.log("Year: " + response.data.Year);
    console.log("Country: " + response.data.Country);
    console.log("Actors/Actresses: " + response.data.Actors);
    console.log("Plot Summary: " + response.data.Plot);
    console.log("IMDB Rating: " + response.data.imdbRating);
    console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
    console.log("============================");
  });
}

function spotifyThis() {
  terminologySpotify();
  //Need to get authorization code
  spotify.search({ type: "track", query: searchTerm }, function(err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }
    console.log(data);
  });
}

function concertThis() {
  terminology();
  var queryURL =
    "https://rest.bandsintown.com/artists/" +
    searchTerm +
    "/events?app_id=codeacademy";
  console.log(queryURL);
  axios.get(queryURL).then(function(concert) {
    for (var x = 0; x < concert.data.length; x++) {
      console.log("================");
      console.log("Venue: " + concert.data[x].venue.name);
      console.log("Date: " + concert.data[x].datetime);
      console.log("Country: " + concert.data[x].venue.country);
      console.log("City: " + concert.data[x].venue.city);
      console.log("================");
    }
  });
}

function random() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    var dataArr = data.split(",");
    searchTerm = dataArr[1];
    console.log(searchTerm);
    spotify.search({ type: "track", query: searchTerm }, function(err, data) {
      if (err) {
        return console.log("Error occurred: " + err);
      }
      console.log(data);
    });
  });
}
switch (operator) {
  case "movie-this":
    movies(searchTerm);
    break;
  case "spotify-this-song":
    spotifyThis(searchTerm);
    break;
  case "concert-this":
    concertThis(searchTerm);
    break;
  case "do-what-it-says":
    random();
    break;
}
