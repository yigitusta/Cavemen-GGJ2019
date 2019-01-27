import Phaser from 'phaser';
import io from 'socket.io-client';
import * as utils from '../utils/utils';
import * as Graphics from '../utils/graphics';

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
    background.setScale(2.5,2.5);


    this.add.image(camera.centerX, camera.centerY- 250, "logo");

    Graphics.addLine({
      x: camera.centerX - 320,
      y: camera.centerY / 2 + 260,
      x2: camera.centerX + 350,
      y2: camera.centerY / 2 + 260,
      color: 0xFFFFFF,
      stroke: 4,
      ctx: this
    });

    const textEntry = this.add.text(camera.centerX - 320, camera.centerY / 2 + 200, 'Enter your name', { font: '32px Courier', fill: '#ffffff' });
    const text = this.add.text(
      camera.centerX - 320,
      camera.centerY / 2 + 317,
      'Play', {
        font: '32px Courier',
        fill: '#4a4a4a',
        backgroundColor: "#ffffff",
        padding: {
          x: 295,
          y: 10
        }
      }
    );

    const howtoPlay = this.add.text(
      camera.centerX - 460,
      camera.centerY / 2 + 500,
      '<-- How To Play -->', {
        font: '32px Courier',
        fill: '#4a4a4a',
        padding: {
          x: 295,
          y: 10
        }
      }
    );

    howtoPlay.setInteractive();
    howtoPlay.on('pointerdown', () => {
      const modal = document.querySelector('#howToPlay');
      modal.classList.add('active');
      modal.querySelector('.close').addEventListener('click', function() {
        modal.classList.remove('active');
      });
    });

    text.setInteractive();
    const start = new Promise((resolve, reject) => {
      text.on('pointerdown', (event) => {
        resolve(textEntry.text);
      });

      this.input.keyboard.on('keydown', (event) => {
        if (textEntry.text == 'Enter your name') {
          textEntry.text = '';
        }

        if (event.keyCode === 8 && textEntry.text.length > 1) {
          textEntry.text = textEntry.text.substr(0, textEntry.text.length - 1);
        } else if (event.keyCode === 8 && textEntry.text.length == 1) {
            textEntry.text = 'Enter your name';
        } else if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode <= 90)) {
            textEntry.text += event.key;
        }

        if (event.key === "Enter") {
          resolve(textEntry.text);
        }
      });
    });

    start.then((txt) => this.submitForm(txt));
    this.events.on('resize', utils.handleGameResize, this);
  }

  submitForm(text) {
    const socket = window.socket = io(`http://${window.location.hostname}:${process.env.PORT || 3000}`);

    const player = new PlayerShape(null, text);

    socket.emit('start', player, (data) => {
      if (data.status === true) {
        const { player, players } = data;
        this.scene.start(CST.SCENES.MAIN, { players, player });
        document.querySelector('#day-bar').classList.remove('hidden');
      }
    });

    socket.on('heartbeat', (data) => {
      this.scene.get(CST.SCENES.MAIN).events.emit('heartbeat', data);
    });
  }
}