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
        console.log("bands in town api was wacky and 404 when trying to look it up");
        break;
    case "spotify-this-song":
        songSearch();
        break;
    case "movie-this":
        movieSearch();
        break;
    case "do-what-it-says":
        plannerSearch();
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
                var dataR = JSON.parse(body);

                var moviedata =
                    "title: " + dataR.Title + "\n" +
                    "year: " + dataR.Year + "\n" +
                    "genre: " + dataR.Genre + "\n" +
                    "rating: " + dataR.imdbRating + "\n" +
                    "actors: " + dataR.Actors + "\n" +
                    "plot: " + dataR.Plot + "\n" +
                console.log(moviedata);
            }
        })

}

function plannerSearch() {
    var inputdata = liriSearch + "\n\n"
    fs.appendFile("random.txt", inputdata, function (err) {
        if (err) throw err;

    })
    fs.readFile("./random.txt", "utf-8", function (err, data) {
        if (err) throw err;
        console.log("stuff inside of planner: ");
        console.log("---------------------------")
        console.log(data);
    })
}