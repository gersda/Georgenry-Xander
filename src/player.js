import Phaser from "phaser";
import { Settings } from "./settings.js";

export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "player", 0);
    
    // add to scene
    scene.add.existing(this);
    scene.physics.add.existing(this);
    
    // setup
    this.setCollideWorldBounds(true);
    this.setScale(Settings.player.scaleW, Settings.player.scaleH);
    
    // create animations
    this.#createAnims();
    
    // setup keyboard input
    this.cursors = scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
  }
  
  update() {
    this.setVelocity(0);

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
      vx = (vx / len) * Settings.player.speed;
      vy = (vy / len) * Settings.player.speed;
    }

    this.setVelocity(vx, vy);
    this.anims.play(animation, true);
  }
  
  #createAnims() {
    const scene = this.scene;
    
    // if animations already exist dont make them again
    if (scene.anims.exists("walkLeft")) return;
    
    const walkLeftFrames = [11, 9, 10, 9];
    const walkRightFrames = [5, 3, 4, 3];
    const walkDownFrames = [2, 0, 1, 0];
    const walkUpFrames = [8, 6, 7, 6];

    scene.anims.create({
      key: "walkLeft",
      frames: scene.anims.generateFrameNumbers("player", {
        frames: walkLeftFrames,
      }),
      frameRate: 8,
      repeat: -1,
    });
    scene.anims.create({
      key: "walkRight",
      frames: scene.anims.generateFrameNumbers("player", {
        frames: walkRightFrames,
      }),
      frameRate: 8,
      repeat: -1,
    });
    scene.anims.create({
      key: "walkDown",
      frames: scene.anims.generateFrameNumbers("player", {
        frames: walkDownFrames,
      }),
      frameRate: 8,
      repeat: -1,
    });
    scene.anims.create({
      key: "walkUp",
      frames: scene.anims.generateFrameNumbers("player", {
        frames: walkUpFrames,
      }),
      frameRate: 8,
      repeat: -1,
    });
    scene.anims.create({
      key: "idle",
      frames: scene.anims.generateFrameNumbers("player", { frames: [0] }),
      frameRate: 8,
      repeat: -1,
    });
  }
}