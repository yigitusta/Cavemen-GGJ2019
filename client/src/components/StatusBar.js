
import Phaser from 'phaser';
import * as Graphics from "../utils/graphics";

import CST from '../CST';

export default class StatusBar {
	constructor() {
    const statusBar = document.createElement("div");
    statusBar.style = {
      backgroundColor: "#fff",
      width: CST.STATUS_BAR.WIDTH,
      height: CST.STATUS_BAR.HEIGHT,
      margin: "16px",
      position: "fixed",
      zIndex: 1
    }
    this.statusBar = statusBar;
    document.querySelector("body").append(statusBar);
  }

  createStatusBar({ health = 100, food = 100 }) {
    this.createHealthBar(health);
    this.createFood({ x: ((health * 2) + 80), food });
  }

	createHealthBar(health) {
    const width = health * 2;
    const rect = document.createElement("div");
    rect.classList.add("health");
    rect.style = {
      left: 40,
      top: 30,
      width,
      color: "#e74c3c",
      position: "relative"
    };
    this.statusBar.append(rect);
  };

  setHealth(health) {
    const width = health * 2;
    this.statusBar.querySelector(".health");
  }

  createFood({x, food = 100 }, ctx) {
    /*const img = ctx.add.image(x, 40, "meat");
    const text = ctx.add.text(x + 20, 30, food, {
      font: '18px monospace',
      fill: '#4a4a4a',
    });
    */
  }
};