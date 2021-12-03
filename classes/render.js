//==========================
//|| Color Randomization  ||
//==========================

//General idea: Truly random colors for your game. There occassionally are similar tones, but that's just up to chance.

//Generates a random number, then converts it to hex.
function colorRandomizer(){
  //The initial placeholder...
  var hexstring = "#";
  //...and the reference list
  var hexcodes = [0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"];
  //repeats 6 times...
  for(var i = 0; i<6; i++) {
    //...appending values to hexstring.
    //For now, it does not do alphabetical values, mainly due to a glitch during setup.
    hexstring = hexstring + hexcodes[Math.round(Math.random()*10)];
  };
  //Ouput value. You can use colorRandomizer() in place of color input for creative randomization.
  return hexstring;
};

//=========================
//||  2D Sprite Drawing  ||
//=========================

//General idea: Retrieves player sprite from player data and draws it on the canvas. By doing it this way, the sprite can be more dynamic based upon movement and timing. Probably going to work in movement for sprites later.

function Sprite2D(userdata,ctrlPoint){
  //Establish scale resource, with defined points based on gamemode and movement;

  //Bottom of sprite: Side-scroller
  //Middle of sprite: top-view
}