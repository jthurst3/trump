// socket-script.js
// script that exposes a socket.io connection
// Modified from CMU Protolab -- Twerp code
// 20 July 2015

window.addEventListener("load", function() {

    socket = io({
        transports: ['websocket', 'flashsocket', 'htmlfile', 'xhr-polling', 'jsonp-polling', 'polling'] 
    }).connect('http://localhost:8080');

});

