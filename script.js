
var socket = io();


//chat can be either 'false', or JSON info.
function clientConnect(){
  var userdata = {
    x:0,
    y:0,
    rot:0,
    HP:100,
    msg:"",
    rank:1
  }
  socket.emit('new player',userdata);
}
clientConnect();

document.addEventListener("DOMContentLoaded",function(){
  
  var msgBtn = document.getElementById("sendmessage");
  msgBtn.addEventListener("click",function(event){
    socket.emit("msgClick",document.getElementById("msgContent").value);
    document.getElementById("msgContent").value = "";
  })
  //
  //
  //
})