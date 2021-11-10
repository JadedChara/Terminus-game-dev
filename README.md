# Terminus Industries Game API
Created by: [Nightstrike & The TI Crew](https://www.nightstrike.wixsite.com/terminus-industries)!
## A Brief Introduction...
When I set out to make this, I aimed to introduce adaptability into a framework I had created. I am by no means a professional, but I do enjoy being able to streamline the process for others!

## Setup
1. Establish your planned structure for your game.
2. Create your `template.html` file which will serve as a basis for cleaning up any corrupted code and generating new 'rooms' for your game.
3. Ensure you have all required dependencies.


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

//(incomplete, but let's pretend there's a 'require' statement for this API while I figure out how to work with npm's system.)

//Establish server for hosting. You'll want to also put in your scripts before going live with your game.
initServer(5000,'lobbies','lobby.html', 'lobbyformat.html');

//

```

## Usage
This API was designed to introduce functions that make it easier to manage your games, and focus less on the implementation of other modules. 

* **initServer()** - This command will establish a direct connection for hosting your server(s), and will serve whatever scripts you've placed in the folder. Effectively, it creates a folder for you if you don't have one already, and will utilize that for managing your server. Using different ports, you can host more than one server at a go.

  * `<'port'>` - Straightforward. It's recommended you use one of the defaults for your main server, such as 5000, or 8080.

  * `<'directory'>` - Returns a relatively non-harmful error if the server folder already exists, but if it doesn't, it will generate it. (Either way it will run, the error's just part of my debugging.)
  
  * `<'html'>` - The name of your 'server' you want to host, such as `'lobby.html'` or `'event.html'`. You'll want to make sure you have a `'template.html'` file in the same folder as the file this function is in(not your chosen directory).

  * `<'template'>` - the name of your template file. It's recommended you use `template.html` as the name.
  

  Example:
```node 
//initServer - Sets up server. Your main file will act as your control.
initServer(8000, 'servers', 'lobby.html', 'lobbyformat.html')

//Result: '/servers' folder with 'lobby.html' file generated from 'lobbyformat.html'. It will also allow for the scripts in the folder to be served.

```

* **initPlayer()** - 3 parameters need to be used for this. Before initialization, you should create `.json` files with the necessary info. More on this later!
```node
//

```