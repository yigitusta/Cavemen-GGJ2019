
import Phaser from 'phaser';
import * as Graphics from "../utils/graphics";


export default class StatusBar extends Phaser.GameObjects.Container {
	constructor(scene) {
		super(scene);
    
    this.statusBar = scene.add.group();


    // this.statusBar.setScrollFactor(0);
    // this.statusBar.setDepth(depth);

    scene.add.existing(this);
  }
  
  // setPriority({ shape, depth }) {
  //   shape.setScrollFactor(0);
  //   shape.setDepth(depth);
  // }

  createStatusBar({ health = 100, foodNumber = 960 }, ctx) {
    this.createBackground({ width: (health * 2) + 130 }, ctx);
    this.createHealthBar({ health }, ctx);
    this.createFood({ x: ((health * 2) + 80), foodNumber }, ctx);
  }

  createBackground({ width }, ctx) {
    const rect = Graphics.addRect({ x: 20, y: 20, width, height: 40, color: 0xffffff, alpha: 0.9, ctx });

    rect.setScrollFactor(0);
    rect.setDepth(30);
    this.statusBar.add(rect);
  }

	createHealthBar({ health }, ctx) {
    const width = health * 2;
    const rect = Graphics.addRect({ x: 40, y: 30, width, height: 20, color: 0xe74c3c, ctx });

    rect.setScrollFactor(0);
    rect.setDepth(30);

    this.statusBar.add(rect);
  };
  
  createFood({x, foodNumber= 960 }, ctx) {
    const img = ctx.add.image(x, 40, "meat");
    const text = ctx.add.text(x + 20, 30, foodNumber, {
      font: '18px monospace',
      fill: '#4a4a4a',
    });

    
    img.setScrollFactor(0);
    img.setDepth(30);
    
    text.setScrollFactor(0);
    text.setDepth(30);

    this.statusBar.add(img);
    this.statusBar.add(text);
  }
};