import Phaser from 'phaser';
import io from 'socket.io-client';

import CST from '../CST';
export default class LoginScene extends Phaser.Scene {
  constructor() {
    super({ key: CST.SCENES.LOGIN });
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
            this.scene.start(CST.SCENES.MAIN, { players, player });
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