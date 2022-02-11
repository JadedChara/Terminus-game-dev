const logUpdate = require('log-update');
const chalk = require('chalk');

const frameset1 = [
  '----------',
  '+---------',
  '■---------',
  '■+--------',
  '■■--------',
  '■■+-------',
  '■■■-------',
  '■■■+------',
  '■■■■------',
  '■■■■+-----',
  '■■■■■-----',
  '■■■■■+----',
  '■■■■■■----',
  '■■■■■■+---',
  '■■■■■■■---',
  '■■■■■■■+--',
  '■■■■■■■■--',
  '■■■■■■■■+-',
  '■■■■■■■■■-',
  '■■■■■■■■■+',
  '■■■■■■■■■■',
  '■■■■■■■■■+',
  '■■■■■■■■■-',
  '■■■■■■■■+-',
  '■■■■■■■■--',
  '■■■■■■■+--',
  '■■■■■■■---',
  '■■■■■■+---',
  '■■■■■■----',
  '■■■■■+----',
  '■■■■■-----',
  '■■■■+-----',
  '■■■■------',
  '■■■+------',
  '■■■-------',
  '■■+-------',
  '■■--------',
  '■+--------',
  '■---------',
  '+---------',
  //■
  ];
let i = 0;

function init(port){
  const loading1 = setInterval(() => {
    const frame = frameset1[i = ++i % frameset1.length]
    logUpdate(chalk.blue('Starting server on port: ') + chalk.hex('#00FF00').bgGray.bold.underline(" " + port + " ") + "\n\n" + chalk.bgGray("            ") + "\n" + chalk.bgGray(" ") + chalk.magenta(frame) + chalk.bgGray(" ") + "\n" + chalk.bgGray("            "));

  }, 80)
  logUpdate.done();
}
module.exports = {init}