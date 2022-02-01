//Necessity!!
var socket = io();

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
  })
  //Placeholder notation . . .
  var logcontext = resourcemap.playerlog.getContext("2d");
  
//  resourcemap.playermap.drawImage(document.getElementById("insignia"), 15, 15)
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
  }
}