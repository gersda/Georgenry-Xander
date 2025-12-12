import Phaser from "phaser";
import { BaseScene } from "./base_scene.js";
import { Player } from "./player.js";
import * as Utils from "./utils.js";

export class Level1 extends BaseScene {
  constructor() {
    super("Level1");
  }

  preload() {
    this.load.spritesheet("player", "public/assets/sprites/plrSheet.png", {
      frameWidth: 4096 / 12, // 12 frames horizontally
      frameHeight: 428, // height of one frame
    });
  }

  create() {
    super.create()

    // create player
    this.player = new Player(this, 0, 0);
    
    
    // position at center bottom
    const playerWidth = this.player.displayWidth;
    const playerHeight = this.player.displayHeight;
    const playerStartingX = Utils.halfPoint(this.scale.width, playerWidth);
    const playerStartingY = this.scale.height - playerHeight;
    
    this.player.setPosition(playerStartingX, playerStartingY);

    // Graphics (if needed)
    this.graphics = this.add.graphics();
  }

  update() {
    this.player.update();
  }
}