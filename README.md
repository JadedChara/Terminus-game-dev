# Terminus Industries Game API
Created by: [Nightstrike & The TI Crew](https://www.nightstrike.wixsite.com/terminus-industries)!
## A Brief Introduction...
When I set out to make this, I aimed to introduce adaptability into a framework I had created. I am by no means a professional, but I do enjoy being able to streamline the process for others!

## Usage
This API was designed to introduce functions that make it easier to manage your games, and focus less on the implementation of other modules. 

* **initServer()** - Replace `<'port'>` with your default.Typically you might want to opt for `5000` or `8080`. Replace `<'name of directory folder'>` with whatever folder you intend to serve backend scripts for the game with. I use `static`. Lastly, `<'name of html file'>` is pretty obvious . . . You're going to want to connect it to your `.html` file. Typically this can be `index.html`.
```node 
//initServer - Sets up server. Your main file will act as your control.
initServer(<'port'>, <'name of directory folder'>, <'name of html file'>)

```

* **connecting()** - 3 paramaters need to be used for this. Before initialization, you should create `.json` files with the necessary info. More on this later!
```node
//

```