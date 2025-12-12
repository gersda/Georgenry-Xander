import Phaser from "phaser";
import { dynamicFont, halfPoint } from "./utils.js";
import { playerSettings } from "./settings.js";

export class Level1 extends Phaser.Scene {
  constructor() {
    super("Level1");
  }

  preload() {
    this.load.spritesheet("player", "public/assets/sprites/plrSheet.png", {
      frameWidth: 2880 / 12, // 12 frames horizontally
      frameHeight: 320, // height of one frame
    });
  }

  create() {
    // create the player at 0,0
    this.player = this.physics.add.sprite(0, 0, "player", 0);
    this.player.setCollideWorldBounds(true);

    // keyboard input
    this.cursors = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });

    // animations
    this.#createAnims();

    // graphics
    this.graphics = this.add.graphics();
    this.#draw();

    // resize listener
    this.scale.on("resize", () => this.#onResize(), this);

    // initialize size and position
    this.#onResize();
    this.#playerStartPoint();
  }

  update() {
    this.player.setVelocity(0);

    const left = this.cursors.left.isDown;
    const right = this.cursors.right.isDown;
    const up = this.cursors.up.isDown;
    const down = this.cursors.down.isDown;

    let vx = 0;
    let vy = 0;
    let animation = "idle";

    if (up) {
      vy = -1;
      animation = "walkUp";
    } else if (down) {
      vy = 1;
      animation = "walkDown";
    } else if (left) {
      vx = -1;
      animation = "walkLeft";
    } else if (right) {
      vx = 1;
      animation = "walkRight";
    }

    if (up || down) {
      if (left) vx = -1;
      else if (right) vx = 1;
    }

    const len = Math.hypot(vx, vy);
    if (len > 0) {
      vx = (vx / len) * playerSettings.speed;
      vy = (vy / len) * playerSettings.speed;
    }

    this.player.setVelocity(vx, vy);
    this.player.anims.play(animation, true);
    this.player.relativeX = this.player.x / this.scale.width;
    this.player.relativeY = this.player.y / this.scale.height;
  }

  // called on resize and at start
  #onResize() {
    const w = this.scale.width;
    const h = this.scale.height;

    this.#onResizePlayer(w, h);
  }

  #onResizePlayer(w, h) {
    // scale
    const origWidth = this.player.width;
    const origHeight = this.player.height;

    const scaleX = (playerSettings.sizeW * w) / origWidth;
    const scaleY = (playerSettings.sizeH * h) / origHeight;

    const scale = Math.min(scaleX, scaleY);
    this.player.setScale(scale);

    // position
    if (!this.player.relativeX) this.player.relativeX = 0.5;  // center by default
    if (!this.player.relativeY) this.player.relativeY = 0.5;  // bottom by default

    this.player.x = this.player.relativeX * w;
    this.player.y = this.player.relativeY * h;
  }


  #playerStartPoint() {
    const w = this.scale.width;
    const h = this.scale.height;
    this.player.setPosition(
      halfPoint(w, this.player.displayWidth),
      h - this.player.displayHeight
    );
  }

  #draw() {
    this.graphics.clear();
  }

  #createAnims() {
    const walkLeftFrames = [11, 9, 10, 9];
    const walkRightFrames = [5, 3, 4, 3];
    const walkDownFrames = [2, 0, 1, 0];
    const walkUpFrames = [8, 6, 7, 6];

    this.anims.create({
      key: "walkLeft",
      frames: this.anims.generateFrameNumbers("player", {
        frames: walkLeftFrames,
      }),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: "walkRight",
      frames: this.anims.generateFrameNumbers("player", {
        frames: walkRightFrames,
      }),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: "walkDown",
      frames: this.anims.generateFrameNumbers("player", {
        frames: walkDownFrames,
      }),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: "walkUp",
      frames: this.anims.generateFrameNumbers("player", {
        frames: walkUpFrames,
      }),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("player", { frames: [0] }),
      frameRate: 8,
      repeat: -1,
    });
  }
}
