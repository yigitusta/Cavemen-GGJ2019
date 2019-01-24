import Phaser from 'phaser';
import * as Graphics from "../utils/graphics";
import io from 'socket.io-client';

export default class LoginScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'Login'
    });
    this.state = {
      username: ""
    };
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
        this.scene.start("main", { username: textEntry.text });

        const socket = io(`http://localhost:${process.env.PORT || 3000}`);

        const player = {
          x: 0,
          y: 0,
          username: textEntry.text
        };

        socket.emit('start',player, (data) => {
          if (data === true) {
            window.player = player;
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