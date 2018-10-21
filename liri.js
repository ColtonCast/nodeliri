require("dotenv").config();
var moment = require('moment');
var request = require('request');
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var fs = require("fs");



var liriProcess = process.argv[2];
var liriSearch = process.argv.slice(3).join(" ");

switch (liriProcess) {
    case "concert-this":
        console.log("concert search");
    break;
    case "spotify-this-song":
    songSearch();
        console.log("spotify this song");
    break;
    case "movie-this":
    movieSearch();
        console.log("movie this");
    break;
    case "do-what-it-says":
    plannerSearch();
        console.log("do what it says");
    break;
    default:
        console.log("your process request wasn't possible. I'm not THAT smart ya know.");
    break;
}


function songSearch() {

    var spotify = new Spotify(keys.spotify);

    spotify.search({
        type: 'track',
        query: liriSearch,
        limit: 5
    })
        .then(res => {

            const data = res.tracks.items;

            for (var i = 0; i < 5; i++) {
                if (data[i] != undefined) {
                    var spotifydata =
                        "artist: " + data[i].artists[0].name + "\n" +
                        "song: " + data[i].name + "\n" +
                        "album: " + data[i].album.name + "\n"
                }
                console.log(spotifydata);
            } 
        });
}

function movieSearch() {

    request("http://www.omdbapi.com/?t=" + liriSearch + "&plot=full&r=json&apikey=trilogy",
        function (error, response, body) {
            if (error) {
                throw error;
            } else {
                let data = JSON.parse(body);

                var moviedata =
                    "title: " + data.Title + "\n" +
                    "year: " + data.Year + "\n" +
                    "genre: " + data.Genre + "\n" +
                    "plot: " + data.Plot + "\n"
                console.log(moviedata);
            }
        })

}

function plannerSearch() {
    var inputdata = liriSearch + "\n\n"
    fs.appendFile("random.txt", inputdata, function(err) {
        if (err) throw err;
        
    })
    fs.readFile("./random.txt", "utf-8", function(err,data) {
        if (err) throw err;
        console.log("stuff inside of planner: ");
        console.log("---------------------------")
        console.log(data);
    })
}