import constants from './constants/constants';
import Phaser from 'phaser';
import MainScene from './scenes/main';
import { handleWindowResize } from './utils/utils';

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: "#222222",
  parent: "game-container",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 }
    }
  },
  scene: [MainScene]
};

window.game = new Phaser.Game(config);

handleWindowResize();

if (module.hot) {
  module.hot.accept(() => {});

  module.hot.dispose(() => {
    window.location.reload();
  });
}