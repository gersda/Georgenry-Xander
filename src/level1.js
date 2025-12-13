import Phaser from "phaser";
import { BaseScene } from "./base_scene.js";
import { Player } from "./player.js";
import * as Utils from "./utils.js";
import { Settings } from "./settings.js";

export class Level1 extends BaseScene {
  constructor() {
    super("Level1");
  }

  preload() {
    Player.preload(this);
    this.load.image("blocks", "public/assets/blocks.png", {});
  }

  create() {
    super.create();

    // blocks
    this.blocks = this.physics.add.image(
      this.scale.width * 0.5,
      this.scale.height * 0.5,
      "blocks"
    );
    this.blocks.setScale(0.25);

    // create player
    this.player = new Player(this, 0, 0);

    // position at center bottom
    const playerWidth = this.player.displayWidth;
    const playerHeight = this.player.displayHeight;
    const playerStartingX = Utils.halfPoint(this.scale.width, playerWidth);
    const playerStartingY = this.scale.height - playerHeight;

    this.player.setPosition(playerStartingX, playerStartingY);

    // main camera
    var cam = this.cameras.main
    cam.setZoom(Settings.mainCamera.zoom);
    cam.startFollow(
      this.player,
    );

    // graphics
    this.graphics = this.add.graphics();
  }

  update() {
    this.player.update();
  }
}
