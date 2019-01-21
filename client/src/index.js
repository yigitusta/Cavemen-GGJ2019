import Phaser from 'phaser';
import LoginScene from './scenes/LoginScene';
import MainScene from './scenes/MainScene';

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
  scene: [
    LoginScene,
    MainScene
  ]
};

const game = new Phaser.Game(config);
window.game = game;

handleWindowResize();

if (module.hot) {
  module.hot.accept(() => {});

  module.hot.dispose(() => {
    window.location.reload();
  });
}