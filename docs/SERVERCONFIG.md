# Server Setup

Example:
```json
{
  "Accounts":true,
  "Backups":true,
  "World":true,
  "encrypt":true,
  "rooms":[{
    "gametype":{
      "name":"Lobby",
      "render":"topview",
      "mode":"pvp",
      "entities":{
        "use":true,
        "list":[],
        "behaviors":[]
      },
      "environment":{
        "type":"custom",
        "map2D":"./example.png",
        "map3D":"./example2.json"
      },
      "obstacles":{
        "models":[],
        "behaviors":[]
      },
      "ranks":{
        "names":[],
        "perms":[]
      }
  }
  }]
}
```

Alright, let's break this apart and assess what it means:
* `Accounts:<boolean>` - If true, this stores account details. It will also enable the processing of ranks.
* `Backups:<boolean>` - If true, this stores compressed versions of the data, up to 5 versions, in the event of a crash or corruption.
* `World:<boolean>` - If true, this records world changes, and stores them by chunk.

If all three of these are set to false, then the Database folder will not be created, and no storage will occur. 



* `encrypt:<boolean>` - Not necessary, but will use /obfuscate.js (built using aesjs) to conceal info, and store both account info and keys. Then the whole thing will be further encrypted as a text file using process.env.TOKEN, and the final thing is recorded in users.txt.
* `rooms:[array]` - This will allow for users to be in multiple areas, and enable chunk storing. It's stupidly complex how I'm going to handle this...
  * `gametype:{object}`- Actual room info for each one. PAIN.
* ``
* ``
