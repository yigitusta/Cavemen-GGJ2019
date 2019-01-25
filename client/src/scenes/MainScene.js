import Phaser from 'phaser';
import * as utils from '../utils/utils';
import StatusBar from '../components/StatusBar';
import Player from '../components/Player';

import CST from '../CST';
export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key:  CST.SCENES.MAIN });
    this.state = {};
  }
  init({ players, player }) {
    this.state.players = players;
    this.state.player = player;
  }
  create() {
    this.createAnimations();
    this.createMap();
    this.createPlayer();
    this.createPlayers();
    this.createCamera();
    this.createUI();
    this.debugGraphics();
    this.cursors = this.input.keyboard.createCursorKeys();
    this.events.on('resize', utils.handleGameResize, this);
    this.events.on('heartbeat', this.handlePlayers, this);

    this.statusBar = new StatusBar(this);
    this.statusBar.createStatusBar({ health: 100, foodNumber: 960 }, this);

  }
  update(time, delta) {
    this.updatePlayer();
    this.notifyServer();
  }
  notifyServer() {
    const socket = window.socket;
    const {x, y, id} = this.player;
    socket.emit('update', {x ,y, id});
  }
  handlePlayers(players) {
    // current players obtained from server other than the current player
    const currentPlayers = players.filter(p => p.id !== this.player.id);

    // handle disconnected players
    this.players.forEach((player) => {
      if (!currentPlayers.find((currentPlayer) => currentPlayer.id === player.id)) {
        this.players.splice(this.players.findIndex(p => p.id === player.id), 1);
        player.destroy();
      }
    });

    // handle new players
    currentPlayers.forEach((currentPlayer) => {
      if (!this.players.find((player) => currentPlayer.id === player.id)) {
        this.players.push(new Player(this, currentPlayer.x, currentPlayer.y, null, { username: currentPlayer.username, id: currentPlayer.id }));
      }
    });

    // update player locations
    this.players.forEach(player => {
      // find the corresponding player from the data obtained from current players from server
      const currentPlayer = currentPlayers.find((cp) => player.id === cp.id);
      const vx = Math.floor(currentPlayer.x - player.x);
      const vy = Math.floor(currentPlayer.y - player.y);

      if (vx > 0) {
        player.move({ right: true }, vx);
      } else if (vx < 0) {
        player.move({ left: true }, vx);
      }

      if (vy > 0) {
        player.move({ down: true }, vy);
      } else if (vy < 0) {
        player.move({ up: true }, vy);
      }

      if (vx * vx + vy * vy < 1) {
        player.move({}, 0);
      }

      player.x = currentPlayer.x;
      player.y = currentPlayer.y;
    });
  }
  createAnimations() {
    Player.createAnimations(this);
  }
  createMap() {
    this.map = this.make.tilemap({ key: "map" });
    const tileset = this.map.addTilesetImage("tuxmon-sample-32px-extruded", "tiles");
    const below = this.map.createStaticLayer("Below Player", tileset, 0, 0);
    const world = this.map.createStaticLayer("World", tileset, 0, 0);
    const above = this.map.createStaticLayer("Above Player", tileset, 0, 0);

    world.setCollisionByProperty({ collides: true });
    above.setDepth(10);
    this.world = world;
  }
  createUI() {
    // const x = this.add
    //   .text(16, 16, 'Arrow keys to move\nPress "D" to show hitboxes', {
    //     font: "18px monospace",
    //     fill: "#000000",
    //     padding: { x: 20, y: 10 },
    //     backgroundColor: "#ffffff"
    //   })
    //   .setScrollFactor(0)
    //   .setDepth(30);
  }
  createPlayer() {
    const { x, y, id, username } = this.state.player;
    this.player = new Player(this, x, y, null, { username, id });
    delete this.state.player;
  }
  createPlayers() {
    this.players = this.state.players.map(({x, y, id, username}) => {
      return new Player(this, x, y, null, { username, id });
    });
    delete this.state.players;
  }
  createCamera() {
    const camera = this.cameras.main;
    camera.startFollow(this.player);
    camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    camera.setSize(this.sys.game.config.width, this.game.config.height);
  }
  debugGraphics() {
    this.input.keyboard.once("keydown_D", event => {
      this.physics.world.createDebugGraphic();

      const graphics = this.add
        .graphics()
        .setAlpha(0.75)
        .setDepth(20);
      this.world.renderDebug(graphics, {
        tileColor: null,
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
        faceColor: new Phaser.Display.Color(40, 39, 37, 255)
      });
    });
  }
  updatePlayer() {
    const dirs = utils.cursorToDir(this.cursors);
    this.player.move(dirs);
  }
}