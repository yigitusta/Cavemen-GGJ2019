import Phaser from 'phaser';
import * as Graphics from "../utils/graphics";

export default class LoginScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'Login'
    });
  }

  preload() {

  }

  create() {
    this.input.keyboard.on('keydown_A', (event) => {
      this.scene.start('main');
    });
  }

  update() {

  }
}