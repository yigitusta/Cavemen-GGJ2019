import Phaser, { Game } from 'phaser';

export default class Player extends Phaser.GameObjects.Container {
  constructor(scene, x, y, children) {
    super(scene, x, y, children);
    const main = scene.add
      .sprite(0, -12, "atlas", "misa-front");
    main.name = "main";
    this.setSize(28, 38);
    this.add(main);
    this.state = {
      speed: 175
    };
    scene.physics.world.enable(this);
    scene.physics.add.collider(this, scene.world);
    scene.add.existing(this);
  }
  static createAnimations(scene) {
    const { anims } = scene;
    anims.create({
      key: "misa-left-walk",
      frames: anims.generateFrameNames("atlas", { prefix: "misa-left-walk.", start: 0, end: 3, zeroPad: 3 }),
      frameRate: 10,
      repeat: -1
    });
    anims.create({
      key: "misa-right-walk",
      frames: anims.generateFrameNames("atlas", { prefix: "misa-right-walk.", start: 0, end: 3, zeroPad: 3 }),
      frameRate: 10,
      repeat: -1
    });
    anims.create({
      key: "misa-front-walk",
      frames: anims.generateFrameNames("atlas", { prefix: "misa-front-walk.", start: 0, end: 3, zeroPad: 3 }),
      frameRate: 10,
      repeat: -1
    });
    anims.create({
      key: "misa-back-walk",
      frames: anims.generateFrameNames("atlas", { prefix: "misa-back-walk.", start: 0, end: 3, zeroPad: 3 }),
      frameRate: 10,
      repeat: -1
    });
  }
  move(direction) {
    this.state.prevVelocity = this.body.velocity.clone();
    this.body.setVelocity(0);
    switch (direction) {
      case "left":
        this._moveLeft();
      break;
      case "right":
        this._moveRight();
      break;
      case "up":
        this._moveUp();
      break;
      case "down":
        this._moveDown();
      break;
      default:
        this._standStill();
        break;
    }
    this.body.velocity.normalize().scale(this.state.speed);
  }
  _moveLeft() {
    this.body.setVelocityX(-this.state.speed);
    this.getByName("main").anims.play("misa-left-walk", true);
  }
  _moveRight() {
    this.body.setVelocityX(this.state.speed);
    this.getByName("main").anims.play("misa-right-walk", true);
  }
  _moveUp() {
    this.body.setVelocityY(-this.state.speed);
    this.getByName("main").anims.play("misa-back-walk", true);
  }
  _moveDown() {
    this.body.setVelocityY(this.state.speed);
    this.getByName("main").anims.play("misa-front-walk", true);
  }
  _standStill() {
    const main = this.getByName("main");
    const { prevVelocity } = this.state;
    main.anims.stop();
    if (prevVelocity.x < 0) main.setTexture("atlas", "misa-left");
    else if (prevVelocity.x > 0) main.setTexture("atlas", "misa-right");
    else if (prevVelocity.y < 0) main.setTexture("atlas", "misa-back");
    else if (prevVelocity.y > 0) main.setTexture("atlas", "misa-front");
  }
}