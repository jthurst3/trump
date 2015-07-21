
var async = require('async'),
    Quote = require('./quote');

module.exports.getRandomQuote = function(numQuotes, next) {
    console.log("getting random quote...");
    // get the number of quotes in our collection
    // from http://stackoverflow.com/questions/10811887/how-to-get-a-all-count-of-mongoose-model
    Quote.count({}, function(err, c) {
        if(err) console.log("ERROR: " + err);
        else {
            // get numQutoes random quotes from the MongoDB database
            // TODO: There must be a faster way of doing this, maybe by querying the database once?
            var i = 0;
            async.doUntil(function(callback) {
                i++;
                var quoteIndex = Math.floor(Math.random() * c);
                Quote.find({"index": quoteIndex}, function(err, quote) {
                    if(err) {
                        console.log("Get quote error: " + err);
                        callback(err);
                    }
                    else callback(null, quote.toObject());
                });
            }, i < numQuotes, function(err, quotes) {
                if(err) console.log("Quotes ERROR: " + err);
                else return next(randomQuotes);
            });
        }
    }
};


