# Terminus Industries Game API
Created by: [Nightstrike & The TI Crew](https://www.nightstrike.wixsite.com/terminus-industries)!

**WARNING:** Currently incomplete. Key functionality is still being worked on. Use at your own risk.
## A Brief Introduction...
When I set out to make this, I aimed to introduce adaptability into a framework I had created. I am by no means a professional, but I do enjoy being able to streamline the process for others!

## Dependencies

These are not necessary to state explicitly, but if for some reason they don't get pulled when you use this package, then please refer to this repo's `index.js` for how you'd reference your imports.

* [Socket.io](https://socket.io) - Handles websocket connections. ESSENTIAL to your application, or else it won't run.
  ```node
var socketIO = require('socket.io');
  ```
* [Express](https://expressjs.com/) - allows the webpage to be served.
  ```node
var express = require('express');
  ```
*`http`, `path`, etc. ...

## Setup



Example Setup:
```node
//Dependencies
var express = require('express');
var http = require ('http');
var path = require ('path');
var socketIO = require ('socket.io');
var fs = require ('fs');

//Base setup
var app = express();
var server = http.Server(app);
var io = socketIO(server);

var terminus = require("terminus-game-dev-1");

//Establish server for hosting. You'll want to also put in your scripts before going live with your game.

terminus.initSetup(8000, "./lobby.html","./script.js");

```

## Usage
This API was designed to introduce functions that make it easier to manage your games, and focus less on the implementation of other modules. 

* **initSetup()** - This command performs your initial setup, and generates your main files. It's used for initializing your workspace, not correcting corrupted files. Keep in mind the folder layout as you set up your references. This will also launch your game, but connections can be quickly closed if need be.
 
  * `<'html'>` - the name of your served file. Remember to namespace sections properly!

  * `<'script'>` - Your reference file for handling things client-side.

  * `<'port'>` - Straightforward. It's recommended you use one of the defaults for your main server, such as 5000, or 8080.



  Example:
```node 

initServer(8000, './lobby.html', './script.js')

//Result: Serves a lobby with a static folder and the potential for additional client-side asset deployment. Nearly ready! Minor bugs are present at this point.

```

* **initPlayer()** - 3 parameters need to be used for this. Before initialization, you should create `.json` files with the necessary info. More on this later, once it's complete!!
```node
//

```

## To-do
- [X] `initServer(port,html,script)`
  - [X] Server starts up!
  - [X] Communication with `/static` folder.
  - [X] Generation of Database folder.
    - [ ] Archive logging.
- [X] `initPlayer()`
  - [X] Data transmitted, including messages
    - [ ] *BUGFIX: Message sending breaks loop, resulting in repeated logs of player info.*
  - [ ] Movement handlers
    - [ ] Top-view
    - [ ] Side-scrolling
    - [ ] 3D ([three.js](https://threejs.org))
  - [ ] Physics
    - [ ] Gravity
    - [ ] Acceleration
    - [ ] Sliding
  - Gameplay types
    - [ ] Racing
    - [ ] PVP
      - [ ] FPS
  - [ ] Gamemode handlers
  - [ ] Rendering Handlers
  - [ ] *Functionality: Store data server-side to prevent exploits.*
- [ ] Accounts
  - [X] Transmission of data (i.e. presets and messages)
  - [ ] DB for account access and recording of data.
  - [ ] Failsafes.
