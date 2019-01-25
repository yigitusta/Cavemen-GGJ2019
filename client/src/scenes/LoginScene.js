import Phaser from 'phaser';
import io from 'socket.io-client';
import * as Graphics from "../utils/graphics";

import PlayerShape from '../../../common/PlayerShape';
import CST from '../CST';
export default class LoginScene extends Phaser.Scene {
  constructor() {
    super({ key: CST.SCENES.LOGIN });
    this.state = {
      username: ""
    };

  }
  create() {
    const camera = this.cameras.main;

    const background = this.add.image(0,0, "gamescreen");
    // background.setSize(camera.config.width, camera.config.height);

    this.add.image(camera.centerX - 335, camera.config.height / 2 - 250, "logo");
    
    // this.add.text(camera.centerX / 2, 200, 'Caveman', {
    //   font: "100px Lobster",
    //   fill: "#fff",
    // });

    Graphics.addLine({
      x: camera.centerX / 2 - 165,
      y: camera.centerY / 2 + 260,
      x2: camera.centerX / 2 + 450,
      y2: camera.centerY / 2 + 260,
      color: 0xFFFFFF,
      stroke: 4,
      ctx: this
    });

    const textEntry = this.add.text(camera.centerX / 2 - 165, camera.centerY / 2 + 200, 'Enter your name', { font: '32px Courier', fill: '#ffffff' });
    const text = this.add.text(
      camera.centerX / 2 - 165,
      camera.centerY / 2 + 317,
      'Play', { 
        font: '32px Courier', 
        fill: '#4a4a4a',
        backgroundColor: "#ffffff",
        padding: {
          x: 260,
          y: 10
        }
      }
    );

    text.setInteractive();
    
    // button.setInteractive();
    this.input.on('gameobjectdown', (event) => {
      console.log(event);
      this.submitForm(textEntry);
    });

    this.input.keyboard.on('keydown', (event) => {
      if (textEntry.text == 'Enter your name') {
        textEntry.text = '';
      }

      if (event.keyCode === 8 && textEntry.text.length > 1) {
        textEntry.text = textEntry.text.substr(0, textEntry.text.length - 1);
      } else if (event.keyCode === 8 && textEntry.text.length == 1) {
          textEntry.text = 'Enter your name:';
      } else if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode < 90)) {
          textEntry.text += event.key;
      }

      if (event.key === "Enter") {
        this.submitForm(textEntry);
      }
    });
  }

  submitForm(textEntry) {
    const socket = window.socket = io(`http://${window.location.hostname}:${process.env.PORT || 3000}`);

    const player = new PlayerShape(null, textEntry.text);

    socket.emit('start', player, (data) => {
      if (data.status === true) {
        const { player, players } = data;
        this.scene.start(CST.SCENES.MAIN, { players, player });
      }
    });

    socket.on('heartbeat', (data) => {
      this.scene.get(CST.SCENES.MAIN).events.emit('heartbeat', data);
    });
  }
}