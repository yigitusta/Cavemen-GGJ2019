import Phaser from 'phaser';
import * as utils from '../utils/utils';
import StatusBar from '../components/StatusBar';
import Player from '../components/Player';
import * as Scoreboard from '../components/Scoreboard';

import CST from '../CST';
export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: CST.SCENES.MAIN });
    this.state = {};
  }
  init({ players, player }) {
    this.state.players = players;
    this.state.player = player;
    this.meatImages = [];
  }
  create() {
    this.start_the_game_sound = this.sound.add("start_the_game_already");
    this.ooh_sound = this.sound.add("ooh");
    this.handleMessaging();
    this.handleNewmeat();
    this.createAnimations();
    this.createMap();
    this.createUI();
    this.createPlayer();
    this.createPlayers();
    this.createCamera();
    this.cursors = this.input.keyboard.createCursorKeys();
    this.events.on('resize', utils.handleGameResize, this);
    this.events.on('heartbeat', this.handlePlayers, this);

    window.chat = document.querySelector('#chat-app');
    this.WASD = utils.getWASD(this);
    // this.input.on('pointerup', this.handleCombat.bind(this));
    this.input.keyboard.on('keyup', this.handleInput.bind(this));
    this.handleTopDayBar();

    Scoreboard.startSorting();
  }
  update(time, delta) {
    this.updatePlayer();
    this.notifyServer();
  }
  handleNewmeat() {
    window.socket.on('new-meat', newMeats => {
      newMeats.forEach(({x, y}) => this.createMeat({x, y}));
    });
  }
  handleMessaging() {
    window.socket.on('message', data => {
      const p = this.players.find(e => e.id === data.id );
      p.addMessageBox(data.message);
      if (data.message === "14") {
        this.start_the_game_sound.play();
      }
      if (data.message === "9") {
        this.ooh_sound.play();
      }
    });
  }
  createUI() {
    this.statusBar = new StatusBar(this);
    this.statusBar.createStatusBar({ health: 100, food: 10 }, this);
    Scoreboard.open();
  }
  handleTopDayBar() {
    const socket = window.socket;
    const dayBar = document.querySelector('#day-bar');

    socket.on('dayCycle', (data) => {
    let { health, id } = this.player;
      window.day = data;

      if (!dayBar.classList.contains(data.period)) {
        dayBar.className = '';
        dayBar.classList.add(data.period);
      }

      if (data.period == 'night') {
        document.querySelector('#day-background').className = '';
        document.querySelector('#day-background').classList.add('active');
        document.querySelector('.online-players').classList.add('night');

        const res = this.isInsideCave();

        if (res == false) {
          health = Math.floor(health - 3.2);
        }

        socket.emit('healthExtract', {id, health});

      } else {
        document.querySelector('#day-background').className = '';
        document.querySelector('.online-players').classList.remove('night');
      }

      dayBar.querySelector('span').innerText = data.number;
    });
  }

  isInsideCave() {
    const { x, y, id } = this.player;

    let currentCaveIndex = null;
    const cave = [
      {
        x: 590,
        y: 855
      },
      {
        x: 1855,
        y: 467
      },
      {
        x: 1554,
        y: 790
      },
      {
        x: 1137,
        y: 1715
      },
      {
        x: 1342,
        y: 1719
      }
    ];

    cave.map((c, index) => {
      if ((Math.abs(c.x-x) <= 85) && (Math.abs(c.y-y) <= 85 )) {
        currentCaveIndex = index;
      }
    })

    if (currentCaveIndex != null) {
      return cave[currentCaveIndex];
    }

    return false;
  }

  handleCombat() {
    let hitPlayer;
    switch (this.player.facing) {
      case "left":
      hitPlayer = this.players.find(p => (
        p.x < this.player.x &&
        p.x > this.player.x - 2.5 * (CST.PLAYER.WIDTH / 2) &&
        p.y < this.player.y + .75 * CST.PLAYER.HEIGHT &&
        p.y > this.player.y - .75 * CST.PLAYER.HEIGHT
      ));
      break;
      case "right":
      hitPlayer = this.players.find(p => (
        p.x < this.player.x + 2.5 * (CST.PLAYER.WIDTH / 2) &&
        p.x > this.player.x &&
        p.y < this.player.y + .75 * CST.PLAYER.HEIGHT &&
        p.y > this.player.y - .75 * CST.PLAYER.HEIGHT
      ));
      break;
      case "up":
      hitPlayer = this.players.find(p => (
        p.x < this.player.x + .75 * CST.PLAYER.WIDTH &&
        p.x > this.player.x - .75 * CST.PLAYER.WIDTH &&
        p.y < this.player.y &&
        p.y > this.player.y - 2.5 * (CST.PLAYER.HEIGHT / 2)
      ));
      break;
      case "down":
      hitPlayer = this.players.find(p => (
        p.x < this.player.x + .75 * CST.PLAYER.WIDTH &&
        p.x > this.player.x - .75 * CST.PLAYER.WIDTH &&
        p.y < this.player.y + 2.5 * (CST.PLAYER.HEIGHT / 2) &&
        p.y > this.player.y
      ));
      break;
    }
    if (!!hitPlayer) {
      speechSynthesis.cancel();
      speechSynthesis.speak(new SpeechSynthesisUtterance("take that"));
      window.socket.emit('hit', {
        id: hitPlayer.id,
        damage: 10
      });
    }
  }
  notifyServer() {
    const socket = window.socket;
    const { x, y, id } = this.player;
    socket.emit('update', { x, y, id }, ({ health, food }) => {
      this.player.health = health;
      this.player.food = food;

      const healthText = document.querySelector('.statusBar .health-text');
      const foodText = document.querySelector('.statusBar .food span');

      if (healthText && healthText.textContent.replace('%','') != health) {
        this.statusBar.setHealth({ health });
      }

      if (foodText && foodText.textContent != food) {
        this.statusBar.setFood({ food });
        Scoreboard.updatePlayer({
          id: this.player.id,
          food: this.player.food
        });
      }
    });
  }
  handlePlayers({ players, meats }) {
    // current players obtained from server other than the current player
    const currentPlayers = players.filter(p => p.id !== this.player.id);

    // handle disconnected players
    this.players.forEach((player) => {
      if (!currentPlayers.find((currentPlayer) => currentPlayer.id === player.id)) {
        this.players.splice(this.players.findIndex(p => p.id === player.id), 1);
        Scoreboard.removePlayer(player);
        player.destroy();
      }
    });

    // handle new players
    currentPlayers.forEach((currentPlayer) => {
      if (!this.players.find((player) => currentPlayer.id === player.id)) {
        const p = new Player(
          this,
          currentPlayer.x,
          currentPlayer.y,
          null,
          { username: currentPlayer.username, id: currentPlayer.id, food: currentPlayer.food }
        );
        Scoreboard.addPlayer({
          id: currentPlayer.id,
          username: currentPlayer.username,
          food: currentPlayer.food
        });
        this.players.push(p);
        this.physics.add.collider(this.player, p);
      }
    });

    // update player locations and scoreboard food
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

      if (currentPlayer.food !== player.food) {
        Scoreboard.updatePlayer({ id: currentPlayer.id, food: currentPlayer.food });
        player.food = currentPlayer.food;
      }
    });

    if (this.meats == null) {
      this.meats = meats;
      this.meatGenerator();
    } else {
      if (this.meats.toString() != meats.toString()) {
        this.meats = meats;
        this.meatGenerator();
      }
    }
  }
  createAnimations() {
    Player.createAnimations(this);
  }
  createMap() {
    this.map = this.make.tilemap({ key: "map" });
    const tileset = this.map.addTilesetImage("cavemen_tileset", "tiles");
    const below = this.map.createStaticLayer("Below Player", tileset, 0, 0);
    const world = this.map.createStaticLayer("World", tileset, 0, 0);
    const above = this.map.createStaticLayer("Above Player", tileset, 0, 0);

    world.setCollisionByProperty({ collides: true });
    above.setDepth(1);
    this.world = world;
    this.above = above;
  }

  createPlayer() {
    const { x, y, id, username } = this.state.player;
    Scoreboard.addPlayer(this.state.player);
    this.player = new Player(this, x, y, null, { username, id });
    delete this.state.player;
  }
  createPlayers() {
    Scoreboard.addPlayers(this.state.players);
    this.players = this.state.players.map(({ x, y, id, username, food }) => {
      const p = new Player(this, x, y, null, { username, id, food });
      this.physics.add.collider(this.player, p);
      return p;
    });
    delete this.state.players;
  }
  createCamera() {
    const camera = this.cameras.main;
    camera.startFollow(this.player);
    camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    camera.setSize(this.sys.game.config.width, this.game.config.height);
  }
  updatePlayer() {
    const dirs = this.WASD && this.WASD();
    this.player.move(dirs);
    if (this.player.health && this.player.health <= 0) {
      this.scene.start(CST.SCENES.GAME_OVER);
      document.querySelector('#day-bar').classList.add('hidden');
      this.statusBar.destroy();
      Scoreboard.close();
      window.socket.emit('forceDisconnect');
    }
  }
  meatGenerator() {
    this.meatImages.map((image) => {
      image.destroy();
    });
    // this.world.setBounds(0,0, 2000, 2000);
    this.cameras.main.setCollideWorldBounds = false;

    this.meats.map((meat) => {
      this.createMeat(meat);
    });
  }
  createMeat(meat) {
    if (this.above.hasTileAtWorldXY(meat.x, meat.y) || this.world.hasTileAtWorldXY(meat.x, meat.y)) {
      return;
    }
    const player = this.player;
    const image = this.physics.add.image(meat.x, meat.y, 'meat');
    image.body.collideWorldBounds = false;
    this.meatImages.push(image);

    const id = this.player.id;
    this.physics.add.overlap(image, player, () => {
      const food = parseInt(document.querySelector('.food span').textContent);
      const obj = {
        x: image.x,
        y: image.y,
        id: id,
        food: food + 1
      };

      image.destroy();
      window.socket.emit('meatEating', obj);
    }, null, this);
  }
  handleInput(event) {
    if (event.keyCode == 9) {
      return;
    }

    let entry = window.chat.querySelector("input[type='text']");
    if (event.keyCode == 84) {
      if (!window.conversationBoxOpened) {
        this.handleConversationBox();
        window.conversationBoxOpened = true;
        return;
      }
    }

    if (window.conversationBoxOpened) {
      if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.ENTER) {
        this.player.addMessageBox(entry.value);
        if (entry.value === "14") {
          this.start_the_game_sound.play();
        }
        if (entry.value === "9") {
          this.ooh_sound.play();
        }
        window.socket.emit('message', {
          x: this.player.x,
          y: this.player.y,
          message: entry.value
        });
        window.chat.classList.add('remove');
        window.chat.classList.remove('active');
        entry.value = '';
        window.conversationBoxOpened = false;
      } else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.ESC) {
        window.chat.classList.add('remove');
        window.chat.classList.remove('active');
        entry.value = '';
        window.conversationBoxOpened = false;
      }
    }

    if (!window.conversationBoxOpened) {
      if (event.key == 'h') {
        this.spentMeat();
      }

      if (event.keyCode == 32) {
        this.handleCombat();
      }
    } else {
      if (event.keyCode === 8 && entry.value.length > 0) {
        entry.value = entry.value.substr(0, entry.value.length - 1);
      } else if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode <= 90)) {
          entry.value += event.key;
      }
    }
  }
  spentMeat() {
    const {player} = this;
    const health = player.health;
    const food = player.food;

    if (health <= 95 && food >= 5) {
      const obj = {
        id: player.id,
        food: food - 5,
        health: health + 10
      };

      window.socket.emit('foodSpending', obj);
    }
  }

  handleConversationBox() {
    let entry = window.chat.querySelector("input[type='text']");
    entry.value = '';

    if (window.chat.classList.contains('active')) {
      window.chat.classList.add('remove');
      entry.value = '';
    } else {
      window.chat.classList.add('active');
    }
  }
}