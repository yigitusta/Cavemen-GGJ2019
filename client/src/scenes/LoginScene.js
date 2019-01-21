import Phaser from 'phaser';
import { handleGameResize } from '../utils/utils';

export default class LoginScene extends Phaser.Scene {
  constructor() {
    super({ key: "login" });
  }
  preload() {

  }
  create() {
    this.input.keyboard.addListener("keydown", this.keyPress, this);
  }
  update(time, delta) {

  }
  keyPress(e) {
    if (e.code === "Space") {
      this.scene.start("main");
    }
  }
}