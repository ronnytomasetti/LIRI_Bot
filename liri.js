var fs = require('fs');
var request = require('request');
var Twitter = require('twitter');
var spotify = require('spotify');

var keys = require('./keys.js');
var twitter_cKey = keys.twitterKeys.consumer_key;
var twitter_cSecret = keys.twitterKeys.consumer_secret;
var twitter_atKey = keys.twitterKeys.access_token_key;
var twitter_atSecret = keys.twitterKeys.access_token_secret;

var first_argv = process.argv[2];
var second_argv = process.argv[3];

/**
* Determine which command to run based on arguments provided or respond with error
* message if argument is not supported.
*
* @param {string} cmd LIRI command user wants to execute.
* @param {string} param If needed, argument value provided by user (ie, song or movie).
* @return {}
*/
function liriCommandRunner(cmd, param) {
    switch (cmd) {
        case "my-tweets":
            myTweets();
            break;
        case "spotify-this-song":
            spotifyThis(param)
            break;
        case "movie-this":
            movieThis(param)
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
        default:
            console.log(first_argv + ": command not found");
    }
}

/**
* Command:
* node liri.js my-tweets
*
* Description:
* Console output containing last 20 tweets and dtg when tweets were created.
*
* @param {}
* @return {}
*/
function myTweets() {

}

/**
* Command:
* node liri.js spotify-this-song '<song name here>'
*
* Description:
* Console output containing the following song data: Song title, album title,
* artist(s), preview link for Spotify. If no song is provided, default will
* display data for "The Sign" by Ace of Base.
*
* @param {string} song Title of song to query using Spotify API.
* @return {}
*/
function spotifyThis(song) {

}

/**
* Command:
* node liri.js movie-this '<movie name here>'
*
* Description:
* Console output containing the following movie data: Movie title, plot,
* release year, country where movie was produced, language, IMDB rating,
* actors, Rotten Tomatoes rating, Rotten Tomatoes URL.
*
* If no movie specified, output data for the movie 'Mr. Nobody'.
*
* @param {string} movie Title of movie to query using OMDB API.
* @return {}
*/
function movieThis(movie) {

}

/**
* Command:
* node liri.js do-what-it-says
*
* Description:
* Read random.txt file and call one of LIRI's commands contained in that file.
*
* @param {}
* @return {}
*/
function doWhatItSays() {

}

/**
* Append new data to log.txt file.
*
* @param {}
* @return {}
*/
function appendLogFile() {

}

/*******************************************
* --- ENTRY POINT --- Executes LIRI command
********************************************/
liriCommandRunner(first_argv, second_argv);
