import Phaser from 'phaser';

import tiles from  '../assets/tilesets/tuxmon-sample-32px-extruded.png';
import tilemap from '../assets/tilemaps/tuxemon-town.json';
import atlasImg from '../assets/atlas/atlas.png';
import atlasJson from '../assets/atlas/atlas.json';

import * as utils from '../utils/utils';
import Player from '../components/Player';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "main" });
    this.state = {};
  }
  init({ username }) {
    this.state.username = username;
  }
  preload() {
    this.load.image("tiles", tiles);
    this.load.tilemapTiledJSON("map", tilemap);
    this.load.atlas("atlas", atlasImg, atlasJson);
  }
  create() {
    this.createMap();
    this.createPlayer();
    this.createCamera();
    this.createUI();
    this.debugGraphics();
    this.cursors = this.input.keyboard.createCursorKeys();
    this.events.on('resize', utils.handleGameResize, this);
  }
  update(time, delta) {
    this.updatePlayer();
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
    Player.createAnimations(this);
    const {x, y} = this.map.findObject("Objects", obj => obj.name === "Spawn Point");
    this.player = new Player(this, x, y, null, { username: this.state.username });
  }
  createCamera() {
    const camera = this.cameras.main;
    camera.startFollow(this.player);
    camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    camera.setSize(this.sys.game.config.width, this.game.config.height);
  }
  debugGraphics() {
    // Debug graphics
    this.input.keyboard.once("keydown_D", event => {
      // Turn on physics debugging to show player's hitbox
      this.physics.world.createDebugGraphic();

      // Create worldLayer collision graphic above the player, but below the help text
      const graphics = this.add
        .graphics()
        .setAlpha(0.75)
        .setDepth(20);
      this.world.renderDebug(graphics, {
        tileColor: null, // Color of non-colliding tiles
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
      });
    });
  }
  updatePlayer() {
    const dirs = utils.cursorToDir(this.cursors);
    this.player.move(dirs);
  }
}