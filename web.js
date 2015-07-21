/*
 * web.js
 * Routing file for application
 * NOTE: Much of this code has been templated from other websites I've worked on
 *
 * J. Hassler Thurston
 * Did Trump Really Say That? website
 * 20 July 2015
 */

var env = require('node-env-file');
env(__dirname + '/.env');

var util = require('util'),
    express = require('express'),
    http = require('http'),
    mongooseDB = require('./models/mongooseDB'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    io = require("socket.io")(http),
    jade = require('jade'),
    async = require('async');

// start the web framework
var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(session({
    store: new MongoStore({
        url: process.env.MONGOLAB_URI
    }),
    secret:'secretkey',
    resave: true,
    saveUninitialized: true
}));

app.use(express.static(__dirname));
app.use('/assets', express.static(__dirname + "/assets"));
// connect to the MongoDB database
mongooseDB.mongooseInit();

// homepage. By default, redirect this to the /index page
app.get('/', function(request, response) {
    response.redirect("/index");
});

io.on('connection', function (socket) {

});

// listen on port 8080 (or another port if it's specified in the .env file)
app.set('port', process.env.PORT || 8080);

// create the server
var server = http.createServer(app);

// start the server
io.listen(server.listen(app.get('port'), function() {
    console.log("Listening on " + app.get('port'));
    console.log("hostname is: " + util.inspect(server.address()));
}));


