//Necessity!!
var socket = io();

//=====================
//|| Config Samples  ||
//=====================

//If a dev uses the login system, then password is a required field. It's recommended that this stuff gets stored via JSON styling, for easy access.

document.addEventListener("DOMContentLoaded",function(){
  var loginConfig = {
    //inputs needed for transmission
    name:document.getElementById("nameinput").value,
    //password:document.getElementById("passwordinput")
  }
  //All page resources needed for initialization
  var resourceMap = {
    //login elements
    loginBtn:document.getElementById(""),
    registerBtn:document.getElementById(""),
    guestBtn:document.getElementById("JoinBtn"),
    //divs
    homepage:document.getElementById("loginScreen"),
    menupage:"",
    gamepage:document.getElementById("gamewindow"),
  }
  //starting values
  resourceMap.homepage.display = "initial";
  resourceMap.menupage.display = "none";
  resourceMap.gamepage.display = "none";
  //game info
  var gameConfig = {
    map = document.getElementById("playermap"),
    chatBox = document.getElementById("chatlog"),
    msgBtn = document.getElementById("sendmessage"),
    //helpBtn = document.getElementById("")
  }
  //kickoff!
  loginInit(loginConfig, resourceMap, false);
})

//=================
//||  Functions  ||
//=================

//
function loginInit(loginConfig,resourceMap,accountBoolean){
  if (accountBoolean == false){
    resourceMap.homepage.display = "none";
    if(resourceMap.menupage == ""){
      resourceMap.gamepage.display = "initial";
      gameInit(loginConfig,gameConfig);
    } else{
      resourceMap.menupage.display = "initial";
    }
  }if (accountBoolean == true){
    socket.emit("dbPull",loginConfig);
  }else {
    console.log("Improper usage of loginInit");
    process.exit();
  }
};

//
function gameInit(loginConfig,gameConfig){};

//
function clientInit(){};
