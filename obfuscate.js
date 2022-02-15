var aesjs = require("aes-js");



function conceal(pass,key){
  var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
  var phase1 = aesjs.utils.utf8.toBytes(pass);
  var phase2 = aesCtr.encrypt(phase1);
  var phase3 = aesjs.utils.hex.fromBytes(phase2);
  return phase3;
}

function reveal(faux,key){
  var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
  var phase1 = aesjs.utils.hex.toBytes(faux);
  var phase2 = aesCtr.decrypt(phase1);
  var phase3 = aesjs.utils.utf8.fromBytes(phase2);
  return phase3;
}

      var token=[];
      for(var i = 0; i<32; i++){
        token.push(Math.floor(Math.random()*100));
      }
console.log(token);
var sample = conceal("Hello",token);
console.log(sample);
console.log(reveal(sample,token));
module.exports = {conceal,reveal}