import Phaser from 'phaser';
import CST from '../CST';
export default class Player extends Phaser.GameObjects.Container {
  constructor(scene, x, y, children, { username, id, food }) {
    super(scene, x, y, children);
    const main = Object.assign(
      scene.add.sprite(0, -12, "atlas", "misa-front"),
      { name: "main"}
    );
    this.add(main);
    const name = Object.assign(
      scene.add.text(-26, -36, username, {
        font: "12px monospace",
        fill: "#000000",
        backgroundColor: "rgba(255, 255, 255, 0.7)"
      }),
      { name: "name" }
    );
    this.add(name);
    scene.add.existing(this);
    this.setSize(CST.PLAYER.WIDTH, CST.PLAYER.HEIGHT);
    scene.physics.add.existing(this, false);
    scene.physics.add.collider(this, scene.world);
    this.id = id;
    this.food = food;
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
  move({left, right, up, down}, speed = 175) {
    if (!window.conversationBoxOpened) {
      const main = this.getByName("main");
      const prevVelocity = this.body.velocity.clone();
      this.body.setVelocity(0);

      if (left) {
        this.body.setVelocityX(-speed);
      } else if (right) {
        this.body.setVelocityX(speed);
      }

      if (up) {
        this.body.setVelocityY(-speed);
      } else if (down) {
        this.body.setVelocityY(speed);
      }

      this.body.velocity.normalize().scale(speed);

      if (left) {
        main.anims.play("misa-left-walk", true);
        this.facing = "left";
      } else if (right) {
        main.anims.play("misa-right-walk", true);
        this.facing = "right";
      } else if (up) {
        main.anims.play("misa-back-walk", true);
        this.facing = "up";
      } else if (down) {
        main.anims.play("misa-front-walk", true);
        this.facing = "down";
      } else {
        main.anims.stop();
        if (prevVelocity.x < 0) {
          main.setTexture("atlas", "misa-left");
          this.facing = "left";
        }
        else if (prevVelocity.x > 0) {
          main.setTexture("atlas", "misa-right");
          this.facing = "right";
        }
        else if (prevVelocity.y < 0) {
          main.setTexture("atlas", "misa-back")
          this.facing = "up";
        }
        else if (prevVelocity.y > 0) {
          main.setTexture("atlas", "misa-front");
          this.facing = "down";
        }
      }
    }
  }

  addMessageBox(data) {
    const message = Object.assign(
      this.scene.add.text(-26, -100, data, {
        font: "12px monospace",
        fill: "#ffffff",
        backgroundColor: "rgba(22, 160, 133, 0.8)",
        padding: { x: 20, y: 15 },
        wordWrap: { width: 250, useAdvancedWrap: true }
      }),
      { name: "message" }
    );

    this.add(message);

    setTimeout(() => {
      message.destroy();
    }, 3000);
  }
}