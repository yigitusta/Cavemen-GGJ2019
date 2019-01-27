import Phaser from 'phaser';

import tiles from  '../assets/tiles/cavemen_tileset.png';
import tilemap from '../assets/tiles/cavemen_map.json';
import atlasImg from '../assets/atlas/atlas.png';
import atlasJson from '../assets/atlas/atlas.json';
import CST from '../CST';
import meat from '../assets/images/meat.png';
import gamescreen from '../assets/images/splash.png';
import logo from '../assets/images/logo.png';

import start_the_game_already_mp3 from '../assets/audio/start_the_game.mp3';
import ooh_ogg from '../assets/audio/ooh.ogg';
export default class LoadScene extends Phaser.Scene {
    constructor() {
        super({ key: CST.SCENES.LOAD });
    }
    init() {

    }
    preload() {
        this.load.image("tiles", tiles);
        this.load.tilemapTiledJSON("map", tilemap);
        this.load.atlas("atlas", atlasImg, atlasJson);
        this.load.image("meat", meat);
        this.load.image("logo", logo);
        this.load.image("gamescreen", gamescreen);
        this.load.audio("start_the_game_already", start_the_game_already_mp3);
        this.load.audio("ooh", ooh_ogg);

        this.add.text(this.cameras.main.centerX - 180, this.cameras.main.centerY - 200, "LOADİNG...", {
            fill: "#fff",
            font: "80px monospace",
        });

        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff //white
            }
        })

        this.load.on("progress", (percent) => {
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
        })
    }
    create() {
        this.scene.start(CST.SCENES.LOGIN);
    }
}