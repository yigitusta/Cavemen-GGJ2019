import Phaser from 'phaser';

import CST from '../CST';

export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: CST.SCENES.GAME_OVER });
    }
    create() {
        this.add.text(16, 16, "GAME OVER, BITCH.", {
            fill: "#fff",
            font: "18px monospace",
            padding: { x: 20, y: 10 },
        });
    }
}