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
    this.player = this.physics.add.sprite(
      this.scale.width / 2,
      300,
      "player",
      0
    );
    this.cursors = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });

    this.player.setCollideWorldBounds(true);

    this.player.setScale(0.5);

    const walkLeftFrames = [11, 9, 10, 9];
    const walkRightFrames = [5, 3, 4, 3];
    const walkDownFrames = [2, 0, 1, 0];
    const walkUpFrames = [8, 6, 7, 6];

    this.anims.create({
      key: "walkLeft",
      frames: this.anims.generateFrameNumbers("player", {
        frames: walkLeftFrames,
      }), //start: 9, end: 11
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: "walkRight",
      frames: this.anims.generateFrameNumbers("player", {
        frames: walkRightFrames,
      }), // start: 3, end: 5
      frameRate: 8,
      repeat: -1,
    });
    // up
    this.anims.create({
      key: "walkDown",
      frames: this.anims.generateFrameNumbers("player", {
        frames: walkDownFrames,
      }), //start: 0, end: 2
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: "walkUp",
      frames: this.anims.generateFrameNumbers("player", {
        frames: walkUpFrames,
      }), //start: 6, end: 8
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("player", { frames: [0] }),
      frameRate: 8,
      repeat: -1,
    });

    this.graphics = this.add.graphics();
    this.drawResponsive();
    this.scale.on("resize", this.drawResponsive, this);
  }

  update() {
    this.player.setVelocity(0);

    const left = this.cursors.left.isDown;
    const right = this.cursors.right.isDown;
    const up = this.cursors.up.isDown;
    const down = this.cursors.down.isDown;
     
    let vx = 0; // -1/0/1
    let vy = 0; // -1/0/1

    // vertical priority animation logic
    let animation = "idle";

    // basic movement
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

    // diagonal movement
    if (up || down) {
    if (left) vx = -1;
    else if (right) vx = 1;
    }

    // normalize speed
    const len = Math.hypot(vx, vy);
    if (len > 0) {
    vx = (vx / len) * playerSettings.speed; 
    vy = (vy / len) * playerSettings.speed;
    }

    this.player.setVelocity(vx, vy);
    this.player.anims.play(animation, true);
  }

  drawResponsive() {
    const w = this.scale.width;
    const h = this.scale.height;

    this.graphics.clear();
  }
}
