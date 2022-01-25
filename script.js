//Necessity!!
var socket = io();

//=====================
//|| Config Samples  ||
//=====================

document.addEventListener("DOMContentLoaded",function(){
  document.getElementById("joinBtn").addEventListener("click", function(){
    socket.emit("new player", document.getElementById("nameinput").value)
  })
})