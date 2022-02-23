const THREE = require('three');

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
//This is similar to terminus.class.entity.Client() but this handles "frontend stuff" like appearance and how it's drawn, while the other function handles actual position data that gets transmitted to entities and players, like gridding and such.
function Sprite2D(userdata,ctrlPoint){
  //Establish scale resource, with defined points based on gamemode and movement;

  //Bottom of sprite: Side-scroller
  //Middle of sprite: top-view
}

function View3D(pers,model){
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  const geometry = new THREE.PlaneGeometry(1,1);
  const material  = new THREE.MeshBasicMaterial({color:0xffff00,side:THREE.DoubleSide,wireframe:true});
  const plane = new THREE.Mesh(geometry,material);
  scene.add(plane);
  renderer.render(scene, camera);
}

module.exports = {Sprite2D, View3D}