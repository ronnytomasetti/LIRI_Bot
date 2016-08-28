var fs = require('fs');
var os = require('os');
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('spotify-web-api-node');
var prettyjson = require('prettyjson');
var keys = require('./keys.js');

var first_argv = process.argv[2];
var second_argv = process.argv[3];

/**
* Determine which command to run based on arguments provided or respond with error
* message if argument is not supported.
*
* @param {String} cmd LIRI command user wants to execute.
* @param {String} param If needed, argument value provided by user (ie, song or movie).
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

    twitter_client.get('statuses/user_timeline', {screen_name: user, count: tweet_count}, function(error, tweets) {

        if (error)
            throw error;
        else {
            var data = [];
            var log_options = {
                    keysColor  : 'green',
                    dashColor  : 'green',
                    stringColor: 'white'
                    };

            for ( i in tweets ) {
                var item = {
                        "Created"  : tweets[i].created_at,
                        "Tweet"    : tweets[i].text,
                        "Retweeted": tweets[i].retweet_count,
                        "Favorited": tweets[i].favorite_count
                        };
                data.push(item);
            }

            console.log("------------------------------------------------------------");
            console.log("Successfully retrieved " + tweets.length + " tweets [ max 20 ] from Twitter.com");
            console.log("------------------------------------------------------------");
            console.log(prettyjson.render(data, log_options));
            console.log("------------------------------------------------------------");
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
* @param {String} song Title of song to query using Spotify API.
* @return {}
*/
function spotifyThis(song) {

    var spotify_client = new Spotify({
        clientId : '3ca39f9c22294dde999f49f6d129c02e',
        clientSecret : '5cc62e1dbe1847d4bdb0eb340d6ea7eb'
    });

    spotify_client.searchTracks(song).then( function(data) {

        console.log('I got ' + data.body.tracks.total + ' results!');

        var firstPage = data.body.tracks.items;
        console.log('The tracks in the first page are.. (popularity in parentheses)');

        firstPage.forEach(function(track, index) {
            console.log(index + ': ' + track.name + ' (' + track.popularity + ')');
        });

    }, function(error) {
            console.error(error);
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
* @param {String} movie Title of movie to query using OMDB API.
* @return {}
*/
function movieThis(movie) {

    var query_url = 'http://www.omdbapi.com/?t=' + movie +'&y=&plot=long&r=json';

    console.log(query_url);

    request(query_url, function(error, res, body) {

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

        for ( i in ran_txt)
            console.log("Random Text File: ", ran_txt[i]);
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

        if (error)
            throw error;
        else
            console.log("-- Logged --")
    });
}

/*******************************************
* --- ENTRY POINT --- Executes LIRI command
********************************************/
liriCommandRunner(first_argv, second_argv);
