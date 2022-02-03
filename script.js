//Init
var socket = io();
var movement = {
  up:false,
  down:false,
  left:false,
  right:false,
  //sprint:false
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

//============================
//||  Clientside Gibberish  ||
//============================

document.addEventListener("DOMContentLoaded",function(){
  
  var resourcemap = {
    connectBtn:document.getElementById("joinBtn"),
    nameinput:document.getElementById("nameinput"),
    passinput:document.getElementById("passinput"),
    playerlog:document.getElementById("playerlog"),
    
    playermap:document.getElementById("playermap").getContext("2d"),
    chatlog:document.getElementById("chatlog"),
    loginscreen:document.getElementById("loginScreen"),
    gamewindow:document.getElementById("gamewindow")
  };
//Literally require the DOM handler. Argh.
  function ClientInit(resourcemap, movedata){
    var reqform = {
      name:"Guest",
      pass:""
    };
    resourcemap.connectBtn.addEventListener("click", function(){
      if (resourcemap.nameinput.value == ""){
        reqform.name = "Guest";
        reqform.pass = "";
      } else{
        reqform.name = resourcemap.nameinput.value;
        reqform.pass = resourcemap.passinput.value;
      }
      socket.emit("new player", reqform);
      resourcemap.loginscreen.style.display = "none";
      resourcemap.gamewindow.style.display = "initial";
      resourcemap.playerlog.addEventListener("keydown", function(event){
      switch (event.keycode){
        case 87:
          movedata.up = true;
          document.getElementById("titletext").value="UP";
          break;
        case 83:
          movedata.down = true;
          document.getElementById("titletext").value="DOWN";
          break;
        case 65:
          movedata.left = true;
          document.getElementById("titletext").value="LEFT";
          break;
        case 68:
          movedata.right= true;
          document.getElementById("titletext").value="RIGHT";
          break;
      }
    })
      resourcemap.playerlog.addEventListener("keyup",function(event){
      switch (event.keycode){
        case 87:
          movedata.up = false;
          document.getElementById("titletext").value="";
          break;
        case 83:
          movedata.down = false;
          document.getElementById("titletext").value="";
          break;
        case 65:
          movedata.left = false;
          document.getElementById("titletext").value="";
          break;
        case 68:
          movedata.right= false;
          document.getElementById("titletext").value="";
          break;
      }
    })
      setInterval(function(){
        socket.emit("movement", movedata)
      },100)
    })
    //resourcemap.passinput.addEventListener("keypress", function(){
      //
    //})
    //Placeholder notation . . .
    var logcontext = resourcemap.playerlog.getContext("2d");
    
  
  //resourcemap.playermap.drawImage(document.getElementById("insignia"), 15, 15)
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
        logcontext.fillText(players[id].name, 10, (15+(15*i)))
        logcontext.fillStyle = "grey";
        logcontext.textalign = "right";
        logcontext.fillText(players[id].score, (resourcemap.playerlog.width-15), (15+(15*i)))
        i++;
      }
    })
  }
  ClientInit(resourcemap, movement);
})

