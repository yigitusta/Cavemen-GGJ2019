import Phaser from 'phaser';

import tiles from  '../assets/tiles/tuxemon-tileset.png';
import tilemap from '../assets/tiles/tuxemon-map.json';
import atlasImg from '../assets/atlas/atlas.png';
import atlasJson from '../assets/atlas/atlas.json';
import CST from '../CST';
import meat from '../assets/images/meat.png';
import gamescreen from '../assets/images/gamescreen.png';
import logo from '../assets/images/logo.png';

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

        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff //white
            }
        })

        this.load.on("progress", (percent) => {
            loadingBar.fillRect(50, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
        })
    }
    create() {
        this.scene.start(CST.SCENES.LOGIN);
    }
}