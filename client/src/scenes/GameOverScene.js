import Phaser from 'phaser';

import CST from '../CST';

export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: CST.SCENES.GAME_OVER });
    }
    create() {
        const txt = "GAME OVER, REFRESH TO PLAY AGAIN.";
        speechSynthesis.speak(new SpeechSynthesisUtterance(txt));
        this.add.text(16, 16, txt, {
            fill: "#fff",
            font: "18px monospace",
            padding: { x: 20, y: 10 },
        });
    }
}