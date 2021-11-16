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

function initSetup(directory, html, script, assetFolder, template){
  fs.mkdir(directory, (err) => {
    if (err) {
        return console.error(err);
    }},{recursive:true});
  //For this, you should have a template file you use in order to host additional servers.
  fs.mkdir (directory + "/" + assetFolder, (err) => {
    if (err){
      return console.error(err);
    }
  })
  fs.mkdir 
  fs.readFile(template, 'utf8',function(err, data){
    if (err) {throw err};
    console.log(data);
    fs.writeFile(directory + '/' + html,data,function(){});
  });

  fs.readFile(script, 'utf8', function(err, data){
    fs.writeFile(directory+ '/' + script,data,function(){})
  });
  fs.mkdir("./Database", (err) => {
    if(err){
      return console.error(err);
    }
  })
  fs.mkdir("./Database/World", (err) => {
    if(err){
      return console.error(err);
    }
  })
  fs.mkdir("./Database/Members", (err) => {
    if(err){
      return console.error(err);
    }
  })
  fs.mkdir("./Database/Backups", (err) => {
    if(err){
      return console.error(err);
    }
  })
  fs.writeFile("./Database/Members/archive.json","{}", function(){})
}

function initServer(port, directory, html, template){
  //Creates the directory you want to host
  fs.mkdir(directory, (err) => {
    if (err) {
        return console.error(err);
    }},{recursive:true});
  //For this, you should have a template file you use in order to host additional servers.
  
  fs.readFile(template, 'utf8',function(err, data){
    if (err) {throw err};
    console.log(data);
    fs.writeFile(directory + '/' + html,data,function(){});
  });

  
  //Sets port you plan on using for connecting clients. Be sure you forward this when self-hosting.
  app.set('port', port);
  //Sets up a hosting directory to use for the created html.
  app.use(directory, express.static(directory))
  //Connects the html and starts up the server!
  app.get('/', function(request, response) {
  response.sendFile(path.join((__dirname), directory + '/' + html));
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

    socket.on('new player', function(userdata){
      //DB references!
      fs.readFile("./Database/Members/archive.json",'utf8',function(err,data){
        if (err){throw err};
        //data[userdata.username]
      })
      //players[socket.id] = playerjson;
    })
  });

  
  
  //
}

//initServer(8000, "voidtests","voidtest.html","./lobbyformat.html");

function configModeration(commands, rankjson, permissions){
  //
}
module.exports = {initServer, initSetup};

initSetup("directory","lobby.html","./script.js","./JSON-stash","./lobbyformat.html")