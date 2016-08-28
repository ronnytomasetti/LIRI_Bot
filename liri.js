var fs = require('fs');
var os = require('os');
var request = require('request');
var Twitter = require('twitter');
var spotify = require('spotify');
var keys = require('./keys.js');

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
            //TODO: IMPLEMENT WAY FOR USER TO PUT IN THEIR OWN ACCOUNT INFORMATION.
            myTweets();
            break;
        case "spotify-this-song":
            //TODO: VALIDATE SONG STRING BEFORE PASSING TO FUNCTION.
            spotifyThis(param)
            break;
        case "movie-this":
            //TODO: VALIDATE MOVIE STRING BEFORE PASSING TO FUNCTION.
            movieThis(param)
            break;
        case "do-what-it-says":
            //TODO: ADD SOMETHING AWESOME TO THIS FUNCTION.
            doWhatItSays();
            break;
        default:
            console.log(first_argv + " : command not found");
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

    var twitter_client = new Twitter({
        consumer_key: keys.twitterKeys.consumer_key,
        consumer_secret: keys.twitterKeys.consumer_secret,
        access_token_key: keys.twitterKeys.access_token_key,
        access_token_secret: keys.twitterKeys.access_token_secret
    });

    var user = 'RonnyTomasetti';
    var tweet_count = 20;

    twitter_client.get('statuses/user_timeline', {screen_name: user, count: tweet_count}, function(error, tweets, response) {

        if(error)
            throw error;
        else {
            console.log("**********************************************");
            console.log("TWEETS: ", tweets);
            console.log("**********************************************");
            console.log( "RESPONSE", response);
            console.log("**********************************************");
        }
    });
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

    spotify.search({ type: 'track', query: song }, function(error, data) {

        if (error) {
            console.log('Error occurred: ' + error);
            return;
        }
        else {
            console.log("**********************************************");
            console.log("Spotify Data: ", data);
            console.log("**********************************************");
        }
    });
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

    var queryUrl = 'http://www.omdbapi.com/?t=' + movie +'&y=&plot=long&r=json';

    console.log(queryUrl);

    request(queryUrl, function(error, res, body) {

        if (!error && res.statusCode == 200) {
            console.log("MOVIE DATA: ", JSON.parse(body))
        }
    });
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

    fs.readFile("random.txt", "utf8", function(err, random_txt) {

        var ran_txt = random_txt.split(',');

        for(index in ran_txt)
            console.log("Random Text File: ", ran_txt[index]);
    });

    var log_entry = "Ran do-what-it-says command";

    appendLogFile(log_entry);
}

/**
* Appends new log entry to log.txt file.
*
* @param {}
* @return {}
*/
function appendLogFile(log_entry) {

    fs.appendFile('log.txt', log_entry + os.EOL, 'utf8', function(error) {

        if(error)
            console.log(error);
        else
            console.log("-- Logged --")
    });
}

/*******************************************
* --- ENTRY POINT --- Executes LIRI command
********************************************/
liriCommandRunner(first_argv, second_argv);
