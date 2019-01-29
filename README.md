# Cavemen

![Game Screenshot](https://github.com/yigitusta9/Cavemen-GGJ2019/blob/master/README.jpg)

Cavemen is a game about pre-historic ice age period. It is a multiplayer survival game where players have to find shelter for their survival and food to restore their health. Players can attack each other and take the food dropped from dead (or disconnected) players. During the night time if the players are not in a cave they will lose their health gradually.

[Play Now!][play-link]

Note: It might take a while to load for the first time if there hasn't been any players online recently.

## Controls
  - 'WASD' to move.
  - 'Space' to hit other players, you must be next to them and facing them to hit them.
  - 'T' to open chat box talk to other players. You can even taunt them by typing '14' or '9'. (I hope Microsoft won't make a copyright claim for the taunts.)
  - 'H' to fill health by consuming food collected.

## Tech

Frameworks, tools, libraries, technologies used listed below:

* [Phaser][phaser-link] - A fast, fun and free open source HTML5 game framework. (Uses WebGL)
* [Tiled][tiled-link] - Easy to use and flexible level editor.
* [Parcel][parcel-link] - Blazing fast, zero configuration web application bundler
* [Socket.io Server + Client][socketio-link] - Realtime application framework
* [node.js][nodejs-link] - Evented I/O for the backend
* [Express][express-link] - Fast node.js network app framework
* [Web Speech API: Speech Synthesis][speech-link] - Converting strings to speech

## Related Tutorials

Tutorials we followed/inspired by:
* [Agario Clone][agario-clone-link] - Agar.io tutorial by The Coding Train from Youtube.
* [Modular Game Worlds in Phaser 3 (Tilemaps #1) — Static Maps][static-maps-link] - A series of blog posts from Michael Hadley explaining usage of tile maps with phaser 3. I highly suggest you to go through all of these blog posts if you are into HTML5 game development. Topics like advanced physics and dynamic tile maps are covered in these blog posts.

## Installation - Development

**Installing the dependencies for the game server and starting it:**

```sh
$ cd Cavemen-GGJ2019
$ npm i
$ npm run dev
```

The game server will be started at the port **3000**. In the root directory, **server.js** is the only file responsible from the game server. As you make changes to **server.js**, the server will be restarted.

**Installing dependencies for the client and building it:**

```sh
$ cd client
$ npm i
$ npm run build
```

The game server is also responsible for hosting the game files, so you can navigate to **localhost:3000** in your browser to start playing the game immediately.

If you want to enable hot reload for the client during development, simply run the following inside client folder (make sure the dependencies are installed and the game server is running first):

```sh
$ npm start
```

**Note:** Since we developed this game in two days, we didn't very thoroughly consider aspects like software maintainability, scalability and security. So, we suggest you to make improvements upon the structure if you want to use the code on a game project.

## About Our Jam
### Theme

[Global Game Jam's 2019 theme: 'What Home Means To You?'][ggj-2019-theme]

Our game adheres to the theme by requiring players to find and enter a cave during night time, otherwise they lose their health meanwhile due to the cold. For us, "Home" means a place keeping us warm for the night.

### Diversifiers

[About GGJ's 2019 Diversifiers][ggj-2019-diversifiers]

- Always Room for One More (Sponsored by Origin Access) - Make a game where new players can join at any time.
- Use the Source, Luke (Sponsored by GitHub) - Use one or more open source tools, game engines or libraries in your game (and thank them in in the Technology Notes section on the submission page).
- This is where we came in, right? - Make a looping game and have the player start at a random point in the storyline.

### Jam Site
Special thanks to [IGDA Hacettepe][igda-hacettepe] for organizing and hosting the jam site [Hacettepe Üniversitesi Teknokent][jam-site].

### Jam Song
Our jam song is [Daft Punk - Giorgio by Moroder][jam-song]

### Team
- [Arda Zaman][arda-zaman] - Software Developer
- [Demircan Yiğit Öney][demircan-oney] - Game Artist
- [Yiğit Usta][yigit-usta] - Software Developer

#### License: [ Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)][license-link]
#### [Info about GGJ Legal & Policies][ggj-legal-link]

   [ggj-2019-theme]: <https://www.youtube.com/watch?v=pUohwjq9RkA>
   [ggj-2019-diversifiers]: <https://globalgamejam.org/news/ggj19-diversifiers>
   [play-link]: <http://cavemenn.herokuapp.com>
   [phaser-link]: <https://phaser.io>
   [parcel-link]: <https://parceljs.org>
   [socketio-link]: <https://socket.io>
   [nodejs-link]: <https://nodejs.org>
   [express-link]: <https://expressjs.com>
   [tiled-link]: <https://www.mapeditor.org>
   [speech-link]: <https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis>
   [agario-clone-link]: <https://www.youtube.com/watch?v=JXuxYMGe4KI>
   [static-maps-link]: <https://medium.com/@michaelwesthadley/modular-game-worlds-in-phaser-3-tilemaps-1-958fc7e6bbd6>
   [jam-site]: <https://globalgamejam.org/2019/jam-sites/hacettepe-%C3%BCniversitesi-teknokent>
   [igda-hacettepe]: <https://www.facebook.com/igdahacettepe/>
   [arda-zaman]: <https://www.linkedin.com/in/ardazaman>
   [demircan-oney]: <https://demircan.artstation.com>
   [yigit-usta]: <http://yigitusta.com>
   [jam-song]: <https://www.youtube.com/watch?v=zhl-Cs1-sG4>
   [license-link]: <https://creativecommons.org/licenses/by-nc-sa/4.0/>
   [ggj-legal-link]: <https://globalgamejam.org/legal-policies>
