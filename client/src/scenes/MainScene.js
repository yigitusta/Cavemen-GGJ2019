import Phaser from 'phaser';
import * as utils from '../utils/utils';
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
    console.log(players);
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
  }
  update(time, delta) {
    this.updatePlayer();
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
    const x = this.add
      .text(16, 16, 'Arrow keys to move\nPress "D" to show hitboxes', {
        font: "18px monospace",
        fill: "#000000",
        padding: { x: 20, y: 10 },
        backgroundColor: "#ffffff"
      })
      .setScrollFactor(0)
      .setDepth(30);
  }
  createPlayer() {
    const p = this.state.player;
    this.player = new Player(this, p.x, p.y, null, { username: p.username });
  }
  createPlayers() {
    this.players = this.state.players.map((player) => {
      return new Player(this, player.x, player.y, null, { username: player.username })
    })
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