
var socket = io();


var exampleStart={
  x:400, // 1/2 of map width
  y:250, // 1/2 of map height
  status:"idle", //"idle","dead","alive"
  rot:0,
  HP:100,
  msg:"",
  rank:1,
  hitzone:undefined,


}

//chat can be either 'false', or JSON info.
function clientConnect(start,button,txtInput,chatState){
  var userdata = start;
  socket.emit('new player',userdata);
  if(chatState !== false ){

    //Once the document is fully loaded, then we start calling player interactions. I'm working away on this one. Login screens are basically mandatory in order to preserve server integrity.
    document.addEventListener("DOMContentLoaded",function(){
      
      //Sending messages by clicking
      var msgBtn = document.getElementById(button);
      msgBtn.addEventListener("click",function(event){

        socket.emit("msgClick",document.getElementById(txtInput).value);
        document.getElementById(txtInput).value="";

      })

      //Sending messages by pressing 'enter' key
      
        
    })
  }
}



//================================
//||  Actual Front-end Example  ||
//================================
clientConnect(exampleStart,"sendmessage","msgContent",true);



//=============
//||  TO DO  ||
//=============
//Extensive framework for supporting movement, two types of position mapping(Scrolling, static map), two types of rendering(2D,3D), and account saving systems.


//loginCheck(boolUse)
//Pings back whether a user has selected 

//dataRetrieve(username,password)
//Once logged in, the system will dynamically update your data in the Archive for easy continuation

//
//