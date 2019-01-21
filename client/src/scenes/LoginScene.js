import Phaser from 'phaser';
import { handleGameResize } from '../utils/utils';
import { drawGraphics } from '../components/Graphics';
export default class LoginScene extends Phaser.Scene {
  constructor() {
    super({ key: "login" });
  }
  preload() {
  }
  create() {
    const x = drawGraphics({x: 500, y: 500, width: 700, height: 700}, this);
    this.add.graphics(x);
    this.input.keyboard.addListener("keydown", this.keyPress, this);
  }
  update(time, delta) {

  }
  keyPress(e) {
    if (this.scene.settings.key == "login") {
      console.log(this.scene);
    }

    if (e.code === "Space") {
      this.scene.start("main");
    }
  }
}