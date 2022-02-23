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

function init(port,players){
  const loading1 = setInterval(() => {
    var pinglist = "";
    for(j=0;j<players.length;j++){
      pinglist = pinglist + chalk.green(players[i].name) + chalk.grey(" : ") + chalk.white(players[i].ping) + ("\n");
    }
    const frame = frameset1[i = ++i % frameset1.length]
    logUpdate(chalk.blue('Starting server on port: ') + chalk.hex('#00FF00').bgGray.bold.underline(" " + port + " ") + "\n\n" + chalk.bgGray("            ") + "\n" + chalk.bgGray(" ") + chalk.magenta(frame) + chalk.bgGray(" ") + "\n" + chalk.bgGray("            ") + pinglist);

  }, 80)
  logUpdate.done();
}
module.exports = {init}