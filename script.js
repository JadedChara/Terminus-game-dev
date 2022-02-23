//================================
//|| PRIMARY DECLARATION/CONFIG ||
//================================

//init
var socket = io();

var movement = {
  up:false,
  down:false,
  left:false,
  right:false
}

var controls = {
  up:{
    value:movement.up,
    key:87
  },
  down:{
    value:movement.down,
    key:83
  },
  left:{
    value:movement.left,
    key:65
  },
  right:{
    value:movement.right,
    key:68
  },
}

//=========================
//||  CLIENTSIDE CONFIG  ||
//=========================

document.addEventListener("DOMContentLoaded",function(){
  //var moveMode = require("./movement.js");
  var resourcemap = {
    connectBtn:document.getElementById("joinBtn"),
    nameinput:document.getElementById("nameinput"),
    passinput:document.getElementById("passinput"),
    playerlog:document.getElementById("playerlog"),
    
    playermap:document.getElementById("playermap"),
    chatlog:document.getElementById("chatlog"),
    loginscreen:document.getElementById("loginScreen"),
    gamewindow:document.getElementById("gamewindow")
  };
//Literally require the DOM handler. Argh.
  function ClientInit(resourcemap, movedata){
    //Client data defaults
    var reqform = {
      name:"Guest",
      pass:""
    };

    //Attempting to sidestep the bug, but failing.

    //keydown listener. DOES NOT WORK
    document.addEventListener("keydown", function(event){
      switch (event.keyCode){
        case 87:
          movedata.up = true;
          break;
        case 83:
          movedata.down = true;
          break;
        case 65:
          movedata.left = true;
          break;
        case 68:
          movedata.right= true;
          break;
      }
    })

    //keyup listener. DOES NOT WORK
    document.addEventListener("keyup", function(event){
      switch (event.keyCode){
        case 87:
          movedata.up = false;
          break;
        case 83:
          movedata.down = false;
          break;
        case 65:
          movedata.left = false;
          break;
        case 68:
          movedata.right = false;
          break;
      }
    })
    //moveMode.topView(movedata);
    //Click listener. Initializes connection.
    resourcemap.connectBtn.addEventListener("click", function(){
      if (resourcemap.nameinput.value == ""){
        reqform.name = "Guest " + Math.floor(Math.random()*1000);
        reqform.pass = "";
      } else{
        reqform.name = resourcemap.nameinput.value;
        reqform.pass = resourcemap.passinput.value;
      }
      socket.emit("new player", reqform);
      resourcemap.loginscreen.style = "display:none";
      resourcemap.gamewindow.style = "display:initial";

      setInterval(function(){
        socket.emit("movement", movedata);
        socket.emit("latency", Date.now());
      },100)
    
    //Debugging purposes. Will not be packed in the final version explicitly. You need to specify the debugMode
    var logcontext = resourcemap.playerlog.getContext("2d");
    socket.on("state",function(players){
      logcontext.clearRect(0,0,resourcemap.playerlog.width, resourcemap.playerlog.height)
      var i = 0;
      for (var id in players){
        logcontext.font = "14px Arial bold";
        if(players[id].rank == 2){
          logcontext.fillStyle = "green";
        }else{
          logcontext.fillStyle = "grey";
        }
        logcontext.textalign = "left";
        
        if (players[id].ping >= 1400){
          //GET A BETTER CONNECTION
          logcontext.fillStyle = "black";
        }else if(players[id].ping >= 1300){
          //sad ping
          logcontext.fillStyle = "red";
        }else if(players[id].ping >= 1200){
          //poor ping
          logcontext.fillStyle = "orange";
        }else if(players[id].ping >= 1100){
          //Meh ping
          logcontext.fillStyle = "yellow";
        }else if(players[id].ping >= 1000){
          //Decent ping
          logcontext.fillStyle = "green";
        }else if(players[id].ping < 1000){
          //GOD ping
          logcontext.fillStyle = "blue";
        }
        logcontext.fillText(players[id].name + " : " + players[id].ping, 10, (15+(15*i)))
/*        logcontext.fillStyle = "grey";
        logcontext.textalign = "right";
        logcontext.fillText(players[id].x + " " + players[id].y + " " + players[id].score, (resourcemap.playerlog.width-90), (15+(15*i)))*/
        i++;
      }
    })
    })
  }
  ClientInit(resourcemap, movement);
})

module.exports = {ClientInit}