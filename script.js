//Necessity!!
var socket = io();

//=====================
//|| Config Samples  ||
//=====================

document.addEventListener("DOMContentLoaded",function(){
  
//Literally require the DOM handler. Argh.
  var reqform;
  document.getElementById("joinBtn").addEventListener("click", function(){
    if (document.getElementById("nameinput").value == ""){
      reqform = "Guest";
    } else{
      reqform = document.getElementById("nameinput").value;
    }
    socket.emit("new player", reqform);
    document.getElementById("loginScreen").style.display="none";
    document.getElementById("gamewindow").style.display="initial";
  })
  //Placeholder notation . . .
  socket.on("playerlog",function(players){
    //
  })
})