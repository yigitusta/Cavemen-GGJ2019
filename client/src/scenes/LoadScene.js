import Phaser from 'phaser';

import tiles from  '../assets/tilesets/tuxmon-sample-32px-extruded.png';
import tilemap from '../assets/tilemaps/tuxemon-town.json';
import atlasImg from '../assets/atlas/atlas.png';
import atlasJson from '../assets/atlas/atlas.json';

export default class LoadScene extends Phaser.Scene {
    constructor() {
        super({ key: "load" });
    }
    init() {

    }
    preload() {
      this.load.image("tiles", tiles);
      this.load.tilemapTiledJSON("map", tilemap);
      this.load.atlas("atlas", atlasImg, atlasJson);

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
        this.scene.start("login");
    }
}