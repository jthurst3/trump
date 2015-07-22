
var async = require('async'),
    util = require('util'),
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
            shuffle(numQuotes, c, function(randomNumbers) {
                var i = 0;
                async.doUntil(function(callback) {
                    i++;
                    console.log("getting random quote " + i + "...");
                    Quote.findOne({"index": randomNumbers[i]}, function(err, quote) {
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
            });
        }
    });
};

// generates r random numbers out of the range [1...n] (inclusive) semi-uniformly
var shuffle = function(r, n, next) {
    console.log("shuffling "+r+" numbers out of "+n);
    var numbers = [];
    for(var i = 1; i <= r; i++) {
        console.log("numbers are: " + numbers);
        var number = Math.floor(Math.random() * n) + 1;
        numbers[number] = numbers[number] || number;
        numbers[i] = numbers[i] || i;
        console.log("i is " + i + " and number is " + number);
        var oldi = numbers[number];
        numbers[number] = numbers[i];
        numbers[i] = oldi;
        console.log("indices are: " + numbers[i] + " and " + numbers[number]);
        console.log("numbers are: " + numbers);
    }
    console.log("numbers are: " + numbers);
    return next(numbers);
}

