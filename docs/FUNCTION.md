# **Terminus Industries Game API**
For a proper understanding of the workings of this API, its recommended you take a look at the examples in this documentation. Several demos are also on the works.
```node
var terminus = require('terminus-game-dev-1');
```
## Server Functions
For usage in your `index.js` , `main.js` or whatever file serves as your location of code execution.
### `terminus.initSetup()`
Should be housed in the main server file you're running. It will generate template stuff for you so you can technically run this, then edit the stuff as you see fit.

```node
//Import
var terminus = require('terminus-game-dev-1');

//Initialize server setup, and begin listening for events...
terminus.initSetup([<port>], [<html>],[<script>]);

//port can be replaced with any value, but 8000 and 3030 are typically recommended for things like this.
//html has to use a ./ namespace for referencing, while script directly corrects any attempts at injection by using an external reference file, again with the ./ reference.

```
### `terminus.initPlayer()`

This specifies the initialization and communication back and forth. This is necessary if you want it to be something other than a useless static site.

```node
//Import
var terminus = require('terminus-game-dev-1');

//Initialize server setup, and begin listening for events...
terminus.initSetup([<port>], [<html>],[<script>]);

//port can be replaced with any value, but 8000 and 3030 are typically recommended for things like this.
//html has to use a ./ namespace for referencing, while script directly corrects any attempts at injection by using an external reference file, again with the ./ reference.

//Open connections for players to register, and details to be transmitted as needed.
terminus.initPlayer(); //no fields needed

```
