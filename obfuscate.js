var aesjs = require("aes-js");



function conceal(pass){
  var key = [1,2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,117]
  var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
  var phase1 = aesjs.utils.utf8.toBytes(pass);
  var phase2 = aesCtr.encrypt(phase1);
  var phase3 = aesjs.utils.hex.fromBytes(phase2);
  return phase3;
}

function reveal(faux){
  var key = [1,2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,117]
  var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
  var phase1 = aesjs.utils.hex.toBytes(faux);
  var phase2 = aesCtr.decrypt(phase1);
  var phase3 = aesjs.utils.utf8.fromBytes(phase2);
  return phase3;
}

//console.log(conceal("hello"));

//console.log(reveal("34a28c6e1b"));

module.exports = {conceal,reveal}