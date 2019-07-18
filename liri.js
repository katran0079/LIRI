//Environmental Var
require("dotenv").config();

//Variables
var keys = require("./keys.js");
var axios = require("axios");

//var spotify = new Spotify(keys.spotify);
var operator = process.argv[2];
var pro = process.argv;
var termRaw = [];
var searchTerm = 0;

function terminology() {
  for (var i = 3; i < pro.length; i++) {
    termRaw.push(pro[i]);
  }
  searchTerm = termRaw.join("+");
  console.log(searchTerm);
}

function movies() {
  terminology();
  var queryURL =
    "http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy";
  console.log(queryURL);
  axios.get(queryURL).then(function(response) {
    console.log(response.data.Title);
    console.log(response.data.Year);
    console.log(response.data.imbdRating);
    console.log(response.data.Runtime);
  });
}

movies();
