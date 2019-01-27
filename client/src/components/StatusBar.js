
import Phaser from 'phaser';
import * as Graphics from "../utils/graphics";

import CST from '../CST';
import { spawn } from 'child_process';
import meat from '../assets/images/meat.png';

export default class StatusBar {
	constructor() {
    if (document.querySelector('.statusBar') == null) {
      const statusBar = document.createElement("div");
      statusBar.classList.add('statusBar');
      const style = document.createElement("style");

      style.innerHTML = `
        .statusBar {
          background-color: rgba(44, 62, 80, 0.9);
          width: CST.STATUS_BAR.WIDTH;
          height: CST.STATUS_BAR.HEIGHT;
          position: fixed;
          z-index: 1;
          top: 15px;
          left: 30px;
          padding: 10px 20px;
          display: flex;
          align-items:center;
          justify-content:flex-start;
          flex-wrap: nowrap;
          border-radius: 3px;
          animation: 200ms ease-out forwards anim;
        }

        @keyframes anim {
          0% {
            transform: scale(0);
          }

          100% {
            transform: scale(1);
          }
        }
      `;

      this.statusBarStyle = style;
      this.statusBar = statusBar;

      document.querySelector("head").append(style);
      document.querySelector("body").appendChild(statusBar);
    }
  }

  createStatusBar({ health = 100, food = 100 }) {
    if (document.querySelector('.statusBar .health') == null) {
      this.createHealthBar({ health });
    }

    if (document.querySelector('.statusBar .food') == null) {
      this.createFood({ food });
    }
  }

	createHealthBar({ health }) {
    const width = health * 2;
    const rect = document.createElement("div");
    rect.classList.add("health");

    const rect2 = document.createElement("div");
    rect2.classList.add("health-after");

    const text = document.createElement('text');
    text.classList.add('health-text');
    text.innerText = `%${health}`;

    rect.appendChild(rect2);
    rect.appendChild(text);

    this.statusBarStyle.innerHTML += `
      .statusBar .health {
        background-color: #c0392b;
        width: ${width}px;
        height: 24px;
        position: relative;
      }

      .statusBar .health-after {
        display: block;
        position: absolute;
        left:0;
        top:0;
        width: ${width}px;
        height: 100%;
        transition: 200ms ease-out;
        background-color: #e74c3c;
      }

      .statusBar .health-text {
        color: #fff;
        font-size: 1.4rem;
        font-weight:bold;
        position: absolute;
        left:0;
        top:0;
        width: 100%;
        height: 100%;
        text-align: center;
        line-height: 24px;
      }
    `;

    this.statusBar.appendChild(rect);
  };

  setHealth({ health }) {
    const width = health * 2;
    this.statusBarStyle.innerHTML += `
      .statusBar .health-after {
        width: ${width}px;
      }
    `;

    document.querySelector('.health-text').innerText = `%${health}`;
  }

  setFood({ food }) {
    document.querySelector('.statusBar .food span').innerText = food;
  }

  createFood({food}) {
    const div = document.createElement('div');
    div.classList.add('food');
    const img = document.createElement('img');
    img.setAttribute('src', meat);

    const text = document.createElement('span');
    text.innerText = food;

    div.appendChild(img);
    div.appendChild(text);

    this.statusBar.appendChild(div);

    this.statusBarStyle.innerHTML += `
      .statusBar .food {
        font-size:18px;
        font: 18px monospace;
        color: #fff;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-left: 15px;
      }
    `;
  }

  destroy() {
    this.statusBar.remove();
  }
};