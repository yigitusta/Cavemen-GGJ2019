import Phaser from 'phaser';

export default class Player extends Phaser.GameObjects.Container {
  constructor(scene, x, y, children) {
    super(scene, x, y, children);
    const main = Object.assign(
      scene.add.sprite(0, -12, "atlas", "misa-front"),
      { name: "main" }
    );
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
  move({left, right, up, down}) {
    const main = this.getByName("main");
    const prevVelocity = this.body.velocity.clone();
    this.body.setVelocity(0);

    if (left) {
      this.body.setVelocityX(-this.state.speed);
    } else if (right) {
      this.body.setVelocityX(this.state.speed);
    }

    if (up) {
      this.body.setVelocityY(-this.state.speed);
    } else if (down) {
      this.body.setVelocityY(this.state.speed);
    }

    this.body.velocity.normalize().scale(this.state.speed);

    if (left) {
      main.anims.play("misa-left-walk", true);
    } else if (right) {
      main.anims.play("misa-right-walk", true);
    } else if (up) {
      main.anims.play("misa-back-walk", true);
    } else if (down) {
      main.anims.play("misa-front-walk", true);
    } else {
      main.anims.stop();
      if (prevVelocity.x < 0) main.setTexture("atlas", "misa-left");
      else if (prevVelocity.x > 0) main.setTexture("atlas", "misa-right");
      else if (prevVelocity.y < 0) main.setTexture("atlas", "misa-back");
      else if (prevVelocity.y > 0) main.setTexture("atlas", "misa-front");
    }
  }
}