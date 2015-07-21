/* mongooseDB.js
 * modified from https://github.com/sjuvekar/3Dthon/blob/master/models/mongooseDB.js
 * September 1, 2013
*/

var mongoose = require('mongoose');
var mongodb = require('mongodb');

var uristring = process.env.MONGOLAB_URI;

module.exports.mongooseInit = function() {
    mongoose.connect(uristring, function (err, res) {
	if (err) { 
	    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
	} else {
	    console.log ('Succeeded connection to database.');
	}
    });
};
