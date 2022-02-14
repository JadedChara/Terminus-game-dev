//===================
//||    IMPORTS    ||
//===================

//Encryption/Decryption. Whoo!
//https://github.com/ricmoo/aes-js
var aesjs = require('aes-js');

//String coloring for server-side
//Source: https://github.com/chalk/chalk
var chalk = require('chalk');

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

io.attach(server, {
  pingInterval:10000,
  pingTimeout:5000,
  cookie:false
})

//
//
//

function initSetup(port, html, script) {

  fs.mkdir("./static", { recursive: true }, (err) => {
    if (err) {
      return console.error(err);
    }
  })

  fs.readFile(script, 'utf8', function(err, data) {
    fs.writeFile('./static/' + script, data, function() {
      if (err) {
        return console.error(err);
      }
    })
  });
  fs.mkdir("./Database", { recursive: true }, (err) => {
    if (err) {
      return console.error(err);
    }
  })
  fs.mkdir("./Database/World", { recursive: true }, (err) => {
    if (err) {
      return console.error(err);
    }
  })
  fs.mkdir("./Database/Members", { recursive: true }, (err) => {
    if (err) {
      return console.error(err);
    }
  })
  fs.mkdir("./Database/Backups", { recursive: true }, (err) => {
    if (err) {
      return console.error(err);
    }
  })
  fs.writeFile("./Database/Members/archive.json", "{}", function() { })

  app.set('port', port);
  app.use(('/static'), express.static("./static"))
  app.get('/', function(request, response) {
    response.sendFile(html, { root: ("./") });
  });
  server.listen(port, function() {
    console.clear();
    console.log();
    const keepalive = require("./keepalive.js");
    keepalive.init(port);
  });
}

var players = {};
function initPlayer() {
  players = {};

  //Connection handling
  io.on('connection', function(socket) {

    //Disconnect handling
    //Clears player info from player json
    socket.on("disconnect", () => {
      delete players[socket.id];
    });

    //New Player handling
    socket.on('new player', function(reqform) {
      
      //default data for player
      var userdata = {
        name: reqform.name,
        pass: reqform.pass,
        x: 400,
        y: 250,
        status: "idle",
        rot: 0,
        HP: 100,
        msg: "",
        rank: 1,
        hitzone: undefined,
        score: 0,
        movement:{}
      }

      //Admin check using default environmentals
      if (userdata.name == process.env.ADMINNAME && userdata.pass == process.env.ADMINPASS) {
        userdata.rank = 2;
      }

      //initializes player instance finally
      players[socket.id] = userdata;

      //Movement handler. Tad buggy.
      socket.on('movement', function(movement){
        players[socket.id].movement = movement;
      })
      
    })

    //Message handler. Not yet functional
    socket.on('msgClick', function(msgr) {
      players[socket.id].msg = msgr;
    })

  });
  
  //tick management
  setInterval(function() {
    io.sockets.emit('state', players);
  }, 1000 / 60);



  //
}

//initServer(8000, "voidtests","voidtest.html","./lobbyformat.html");

function configModeration(commands, rankjson, permissions) {
  //
}
module.exports = { initSetup, initPlayer };


initSetup(8000, "./lobby.html", "./script.js")

initPlayer();
