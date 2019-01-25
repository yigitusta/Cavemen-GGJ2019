import Phaser from 'phaser';
import * as Graphics from "../utils/graphics";
import io from 'socket.io-client';
import Player from '../components/Player';
import tiles from  '../assets/tilesets/tuxmon-sample-32px-extruded.png';
import atlasImg from '../assets/atlas/atlas.png';
import atlasJson from '../assets/atlas/atlas.json';

export default class LoginScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'Login'
    });
    this.state = {
      username: ""
    };
  }
  preload() {
    for(let i =0; i < 15500; i++) {
      this.load.atlas("atlas", atlasImg, atlasJson);
    };

    const loadingBar = this.add.graphics({
      fillStyle: {
        color: 0xFFFFFF
      }
    })
    this.load.on('progress', (percent) => {
      const width = this.game.renderer.width;
      const height = this.game.renderer.height;
      
      const generatedWidth = (width * percent) / 2;
      Graphics.addRect({ x: width / 2 - generatedWidth / 2, y: height / 2, width: generatedWidth, height: 50, ctx: this });
    });
  }
  create() {
    this.add.text(10, 10, 'Enter your name:', { font: '32px Courier', fill: '#ffffff' });

    const textEntry = this.add.text(10, 50, '', { font: '32px Courier', fill: '#ffff00' });
    this.input.keyboard.on('keydown', (event) => {
      if (event.keyCode === 8 && textEntry.text.length > 0)
      {
          textEntry.text = textEntry.text.substr(0, textEntry.text.length - 1);
      }
      else if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode < 90))
      {
          textEntry.text += event.key;
      }
      if (event.key === "Enter") {

        const socket = io(`http://localhost:${process.env.PORT || 3000}`);

        const player = {
          x: Math.floor(Math.random() * 400),
          y: Math.floor(Math.random() * 400),
          username: textEntry.text
        };

        socket.emit('start',player, (data) => {
          if (data.status === true) {
            //window.player = player;
            const players = data.players;
            this.scene.start("main", { players, player });
          }
        });

        socket.on('heartbeat', (data) => {
          console.log("Players: ", data);
        });
      }
    });
  }

  update() {

  }
}