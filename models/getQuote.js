
var async = require('async'),
    Quote = require('./quote');

module.exports.getRandomQuote = function(numQuotes, next) {
    // get the number of quotes in our collection
    // from http://stackoverflow.com/questions/10811887/how-to-get-a-all-count-of-mongoose-model
    Quote.count({}, function(err, c) {
        if(err) console.log("ERROR: " + err);
        else {
            // get numQutoes random quotes from the MongoDB database
            // TODO: There must be a faster way of doing this, maybe by querying the database once?
            var randomQuotes = [];
            var i = 0;
            async.doUntil(function(callback) {
                i++;
                console.log("getting random quote " + i + "...");
                var quoteIndex = Math.floor(Math.random() * c);
                Quote.findOne({"index": quoteIndex}, function(err, quote) {
                    if(err) {
                        console.log("Get quote error: " + err);
                        callback(err);
                    }
                    else {
                        console.log("quote is: " + quote);
                        randomQuotes.push(quote.toObject());
                        callback(null);
                    }
                });
            }, function() { return i >= numQuotes}, function(err) {
                if(err) console.log("Quotes ERROR: " + err);
                else return next(randomQuotes);
            });
        }
    });
};


