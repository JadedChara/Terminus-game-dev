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


//
//
//
function initServer(port,directory, html, template){
  //Creates the directory you want to host
  fs.mkdir(path.join(__dirname, directory), (err) => {
    if (err) {
        return console.error(err);
    }});
  //For this, you should have a template file you use in order to host additional servers.
  fs.writeFile(directory + '/' + html,template)
  //Sets port you plan on using for connecting clients. Be sure you forward this when self-hosting.
  app.set('port', port);
  //Sets up a hosting directory to use for the created html.
  app.use(directory, express.static(__dirname + directory))
  //Connects the html and starts up the server!
  app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, directory + '/' + html));
  });
  //Listens on a secondary port.
  server.listen(port, function() {
    console.log('Starting server on port:'+ port);
  });
}


//playerjson = base values of player based on survival aspect. coordinates, 
//rankjson = Structure of permissions for ranking; See template files . . .
//factorjson = Additional attributes for player entities such as speed and size . . . 
function initPlayer(playerjson, rankjson, factorjson){
  
  //Disconnect handling
  io.on('connection', function(socket) {
    socket.on("disconnect", () => {
      delete players[socket.id];
    });
  });
  
  //
}