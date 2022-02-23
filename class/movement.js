console.log("Movement class initialized.");

function sideScroller(){
  //
}


//
function topView(){
  alert("movement!");
  document.addEventListener("keydown", function(event){
    switch (event.keyCode){
      case 87:
        transmitData.up = true;
        break;
      case 83:
        transmitData.down = true;
        break;
      case 65:
        transmitData.left = true;
        break;
      case 68:
        transmitData.right= true;
        break;
    }
  })
  document.addEventListener("keyup", function(event){
    switch (event.keyCode){
      case 87:
        transmitData.up = false;
        break;
      case 83:
        transmitData.down = false;
        break;
      case 65:
        transmitData.left = false;
        break;
      case 68:
        transmitData.right= false;
        break;
    }
  })
}


//==================
//|| 2D Animation ||
//==================
//spriteSheet, in this, has to be utilized as a 4 x 4 x 'n' sheet. The scale factor's up to you, because it takes the width of the sheet, divisible by 4, and then applies frameNum as a determining factor for how many segments the animation is broken into. rowNum is also important as a vertical frame of reference. The whole thing works using coordinates relative to the document's scale factor. 

//This function is housed here because it's dependent on movement, so it made sense to keep it here for reference.
function animate2D(spriteSheet, frameNum, rowNum){
  //
}

module.exports={topView}