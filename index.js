//===================
//||    IMPORTS    ||
//===================


//3D handling. Three.js is basically the only option rn.
//Source: https://github.com/mrdoob/three.js
const THREE = require('three');

//Encryption/Decryption. Whoo!
//Source: https://github.com/ricmoo/aes-js
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

//File system management
//Built-in utility
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

//Pinging for debug purposes
io.attach(server, {
  pingInterval:10000,
  pingTimeout:5000,
  cookie:false
})

//First of the class system
var moveMode = require("./class/movement.js");


//====================
//|| CORE FUNCTIONS ||
//====================


//Key function for setting up. This will be further broken up and specified later.
function initSetup(config) {
/*
  fs.readFile(path.resolve(config.script),'utf8', function(err,data){
    script = data;
  })
  fs.readFile(path.resolve(config.html),'utf8', function(err,data){
    html = data
  })*/
  //Sets up reference folder for storing public scripts.
  fs.mkdir("./static", { recursive: true }, (err) => {
    if (err) {
      return console.error(err);
    }
  })

  //Reads your script file set-up, and creates a copy for `/static`. Express uses static for hosting, so it's kinda' necessary.  
  fs.readFile(config.script, 'utf8', function(err, data) {
    fs.writeFile('./static/' + config.script, data, function() {
      if (err) {
        return console.error(err);
      }
    })
  });

  //Initializes your database. All player and game/world data gets stored here.
  fs.mkdir("./Database", { recursive: true }, (err) => {
    if (err) {
      return console.error(err);
    }
  })

  //World folder. Environment stuff. Obstacles, NPCs, etc.
  if(config.doWorld == true){
    fs.mkdir("./Database/World", { recursive: true }, (err) => {
      if (err) {
        return console.error(err);
      }
    })
  }
  //Member folder. Will be encrypted using 'obfuscate' file.
  if(config.doAccounts == true) {
    fs.mkdir("./Database/Members", { recursive: true }, (err) => {
      if (err) {
        return console.error(err);
      }
    })
  }
  //Backup folder. In case of crashes. The plan is to have all data compressed and written to here every couple of minutes, storing up to 5 backups.
  if(config.doBackups == true){
    fs.mkdir("./Database/Backups", { recursive: true }, (err) => {
      if (err) {
        return console.error(err);
      }
    })
  }
  //Due for an update. Plan is to have this serve as the format, but not yet sure how to implement it.
  fs.writeFile("./Database/Members/archive.json", "{}", function() { })

  //Configures express app. Uses `./` as the root name because DIRNAME_ would NOT work.
  app.set('port', config.port);
  app.use(('/static'), express.static("./static"));
  app.use(('/class'),express.static("./static"));
  app.get('/', function(request, response) {
    response.sendFile(config.html, { root: ("./") });
  });
  app.get('/movement.js', function(request, response){
    response.sendFile(__dirname+"/class/movement.js");
  })

  //Initializes server instance, and adds a fancy ping bar. Will add TPS and other stats eventually.
  server.listen(config.port, function() {
    console.clear();
    console.log();
    const keepalive = require("./keepalive.js");
    keepalive.init(config.port,players);
  });
}

//Defines player object as a JSON.
var players = {};

//Needed for initializing the socket.io connections.
function initPlayer() {
  //Redefines player for sake of debugging.
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
        ping:0,
        x: 400,
        y: 250,
        z: 0,
        status: "idle",
        rot: 0,
        HP: 100,
        msg: "",
        rank: 1,
        hitzone: {},
        score: 0,
        movement:{}
      }
      //Not yet implemented, but this will encrypt the data, providing a minor extra layer of security. Considering this is a game, it's not a major issue, honestly.
      var token=[];
      for(var i = 0; i<32; i++){
        token.push(Math.floor(Math.random()*100));
      }

      //Also not yet implemented, but this will facilitate the account system, as well as temporary guests. Guest data is basically substitituted with a temporary token stored via service workers.
      fs.readFile("./Members/archive.json",'utf8', function(err,data){
        //if bad pass/name, socket.emit incorrect data, plus which is incorrect.
      })
      
      //Admin check using default environmentals
      if (userdata.name == process.env.ADMINNAME && userdata.pass == process.env.ADMINPASS) {
        userdata.rank = 2;
      }

      //initializes player instance finally!
      //if(status == true){
        players[socket.id] = userdata;
      //}
    
      //Movement handler. Tad buggy.
      socket.on('movement', function(movement){
        players[socket.id].movement = movement;
        if(movement.left){
          players[socket.id].x -= 5;
        }if(movement.right){
          players[socket.id].x += 5;
        }if(movement.up){
          players[socket.id].y -= 5;
        }if(movement.down){
          players[socket.id].y +=5;
        }
      })
    }) 

    //
    socket.on('latency',function(ms){
      players[socket.id].ping = (Date.now()-ms);
    })
    
    //Message handler. Not yet functional
    socket.on('msgClick', function(msgr) {
      players[socket.id].msg = msgr;
    })

  });
  
  //tick management. Surprisingly not laggy, even though this is all being constructed via Repl.it.
  setInterval(function() {
    io.sockets.emit('state', players);
    //console.clear();
    //console.log(players);
  }, 1000 / 60);
  
  //Due for additional changes at some point.
}

//Moderator config command. Still working out how best to approach this.
function configModeration(commands, rankjson, permissions) {
  //
}


//==================================
//|| FINAL PACKAGE CONFIG/TESTING ||
//==================================


//Defines main package functions!
module.exports = { initSetup, initPlayer };

//Not to be included for release. Initializes the web app.
var serverconfig = require("./configs/serverconfig.json")
initSetup(serverconfig)

//Allows for communication on the web app. Also not to be included in released files.
initPlayer();
