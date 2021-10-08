//===================
//||    IMPORTS    ||
//===================

//web framework
//Source: https://github.com/expressjs/express
var express = require('express');

//http webpage setup
//Source: NodeJS default API
var http = require('http');

//file nav
//Source: NodeJS default API
var path = require('path');

//Advanced server management (multiplayer)
//Source: https://github.com/socketio/socket.io
var socketIO = require('socket.io');

var fs = require('fs');

//================================
//||    PRIMARY SERVER SETUP    ||
//================================

//Calls the main express function.
var app = express();

//uses the express function to generate a server with http
var server = http.Server(app);

//Sets up the multiplayer feature with socketIO
var io = socketIO(server);

//Sets a port to listen on for connecting to the game.


function initServer(port,directory, html){
  fs.mkdir(path.join(__dirname, directory), (err) => {
    if (err) {
        return console.error(err);
    }});
  
  app.set('port', port);
  //Sets up a hosting directory to use for the created html
  app.use(directory, express.static(__dirname + directory))
  //Connects the html and starts up the server!
  app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'index.html'));
  });
  //Listens on a secondary port.
  server.listen(port, function() {
    console.log('Starting server on port 5000');
  });
}

function connecting(playerjson, rankjson, factorjson){
  
  //Disconnect handling
  io.on('connection', function(socket) {
    socket.on("disconnect", () => {
      delete players[socket.id];
    });
  });
  
  //
}